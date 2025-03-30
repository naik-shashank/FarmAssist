import { useState } from "react";
import axios from "axios";

const PredictCropComponent = () => {
  const [prediction, setPrediction] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    address: "",
    ph: "",
    rainfall: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handlePredict = async () => {
    setLoading(true);
    setError(null);

    try {
      const geoResponse = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json",
        {
          params: {
            address: data.address,
            key: "AIzaSyDyFsKc7zgLnTch-TLea1epPV09EZ920uA",
          },
        }
      );

      if (!geoResponse.data.results.length) {
        throw new Error("Location not found. Please enter a valid address.");
      }

      const location = geoResponse.data.results[0].geometry.location;
      const { lat, lng } = location;

      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            lat: lat,
            lon: lng,
            appid: "7dc5c9875aebd7b0151a5ecd46bdd1e9",
            units: "metric",
          },
        }
      );

      const { temp, humidity } = weatherResponse.data.main;

      const response = await axios.post("http://127.0.0.1:8001/predict", {
        N: 50.0,
        P: 40.0,
        K: 30.0,
        temperature: parseFloat(temp),
        humidity: parseFloat(humidity),
        ph: parseFloat(data.ph),
        rainfall: parseFloat(data.rainfall),
      });

      if (!response.data.recommended_crops) {
        throw new Error("No crop recommendations received from API.");
      }

      setPrediction(response.data.recommended_crops);
    } catch (err) {
      setError(
        err.message || "Failed to fetch prediction. Ensure the API is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg text-center ">
      <h2 className="text-xl font-semibold mb-4">Crop Prediction</h2>

      <div className="flex justify-center items-center flex-col gap-5">
        <input
          type="text"
          name="address"
          value={data.address}
          onChange={handleChange}
          placeholder="Address"
          className="p-3 w-[30rem] rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none"
        />
        <input
          type="number"
          name="ph"
          value={data.ph}
          onChange={handleChange}
          placeholder="pH"
          className="p-3 w-[30rem] rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none"
        />
        <input
          type="number"
          name="rainfall"
          value={data.rainfall}
          onChange={handleChange}
          placeholder="Rainfall (mm)"
          className="p-3 w-[30rem] rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none"
        />
      </div>

      <button
        onClick={handlePredict}
        className="px-6 w-[30rem] py-3 mt-5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:opacity-90 transition-transform transform hover:scale-105"
        disabled={loading}
      >
        {loading ? "Predicting..." : "Predict Crop"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {prediction.length > 0 && (
        <div className="mt-6 p-6 bg-gray-200 dark:bg-gray-800 rounded-lg text-gray-900 dark:text-white text-center">
          <h3 className="text-lg font-semibold">Recommended Crops:</h3>
          <div className="text-xl text-green-600 dark:text-green-400 font-bold flex flex-wrap justify-center gap-4 mt-2">
            {prediction.map((crop, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-green-100 dark:bg-green-900 rounded-lg"
              >
                {crop}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictCropComponent;