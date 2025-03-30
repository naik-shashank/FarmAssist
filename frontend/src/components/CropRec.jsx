import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

// Custom Red Location Icon
const redIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

const ChangeMapView = ({ position }) => {
  const map = useMap();
  map.setView(position, 12);
  return null;
};

const SearchBox = ({ setFullAddress, setPosition, setWeather }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${input}`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching location:", error);
      setSuggestions([]);
    }
  };

  const handleSelect = async (place) => {
    setQuery(place.display_name);
    setFullAddress(place.display_name);
    setPosition([parseFloat(place.lat), parseFloat(place.lon)]);
    setSuggestions([]);
    
    // Fetch lat/lng-based weather data
    try {
      const geoResponse = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
          address: place.display_name,
          key: "AIzaSyDyFsKc7zgLnTch-TLea1epPV09EZ920uA",
        },
      });
      const { lat, lng } = geoResponse.data.results[0].geometry.location;
      
      const weatherResponse = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          lat,
          lon: lng,
          appid: "7dc5c9875aebd7b0151a5ecd46bdd1e9",
          units: "metric",
        },
      });

      setWeather({
        temperature: weatherResponse.data.main.temp,
        humidity: weatherResponse.data.main.humidity,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div style={{ position: "relative", marginBottom: "10px" }}>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          fetchSuggestions(e.target.value);
        }}
        placeholder="🔍 Search for a location..."
        style={{ width: "100%", padding: "10px", borderRadius: "8px", outline: "none" }}
      />
      {suggestions.length > 0 && (
        <ul style={{ position: "absolute", width: "100%", background: "white", listStyle: "none", padding: "5px", borderRadius: "8px", zIndex: 1000 }}>
          {suggestions.map((place) => (
            <li key={place.place_id} onClick={() => handleSelect(place)}
                style={{ padding: "10px", cursor: "pointer" }}>{place.display_name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

const MapCropPrediction = () => {
  const [fullAddress, setFullAddress] = useState("");
  const [position, setPosition] = useState([12.9716, 77.5946]);
  const [weather, setWeather] = useState({ temperature: null, humidity: null });
  const [ph, setPh] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [prediction, setPrediction] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePredict = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://127.0.0.1:8001/predict", {
        N: 50.0,
        P: 40.0,
        K: 30.0,
        temperature: weather.temperature,
        humidity: weather.humidity,
        ph: parseFloat(ph),
        rainfall: parseFloat(rainfall),
      });

      if (!response.data.recommended_crops) {
        throw new Error("No crop recommendations received from API.");
      }
      setPrediction(response.data.recommended_crops);
    } catch (err) {
      setError(err.message || "Failed to fetch prediction. Ensure the API is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-6 p-6 bg-gray-100 dark:bg-gray-900 rounded-lg">
      <div className="w-1/2 bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-3">📍 Search Location</h2>
        <SearchBox setFullAddress={setFullAddress} setPosition={setPosition} setWeather={setWeather} />
        <MapContainer center={position} zoom={12} style={{ height: "350px", borderRadius: "8px" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <ChangeMapView position={position} />
          <Marker position={position} icon={redIcon}>
            <Popup>{fullAddress || "Selected Location"}</Popup>
          </Marker>
        </MapContainer>
        <input type="number" placeholder="pH Level" value={ph} onChange={(e) => setPh(e.target.value)} className="w-full p-2 mt-2 border rounded" />
        <input type="number" placeholder="Rainfall (mm)" value={rainfall} onChange={(e) => setRainfall(e.target.value)} className="w-full p-2 mt-2 border rounded" />
      </div>

      <div className="w-1/2 bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-semibold mb-4">🌾 Crop Prediction</h2>
        <p className="mb-4">Location: {fullAddress || "Select a place on the map"}</p>
        <button onClick={handlePredict} className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition" disabled={loading}>
          {loading ? "Predicting..." : "Predict Crop"}
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {prediction.length > 0 && prediction.map((crop, index) => (
          <div key={index} className="p-2 bg-green-200 rounded mt-2">{crop}</div>
        ))}
      </div>
    </div>
  );
};

export default MapCropPrediction;
