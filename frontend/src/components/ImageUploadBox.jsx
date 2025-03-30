import React from "react";
import { Upload, AlertCircle, Check } from "lucide-react";
import { useState } from "react";

const Hero = ({ openAuthModal }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState(null);
  const [toastMessage] = useState('');

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith("image/")) {
      handleImageUpload(files[0]);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(file);
    }
  };

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target.result);
      setAnalysisResult(null);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async () => {
    if (!uploadedImage) return;
    

    setIsAnalyzing(true);
    
    try {
      // Convert Data URL to Blob
      const blob = await fetch(uploadedImage).then(res => res.blob());
      const file = new File([blob], "uploaded_image.jpg", { type: blob.type });
  
      // Create FormData and append the file
      const formData = new FormData();
      formData.append("image", file);
  
      // Get token
      const token = localStorage.getItem("token");
  
      // Make API call
      const response = await fetch("http://localhost:8000/api/predict", {
        method: "POST",
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error(response.status);
      }
  
      const result = await response.json();

     
      setAnalysisResult({
        isHealthy: result.prediction === "healthy",
        confidence: result.confidence,
        class_name:result.class_name,
        details:result.genimi,
        error: false
      });
      
      setRemainingAttempts(result.remaining_attempts);
    
    
    } catch (error) {
      console.error("Analysis error:", error);
    
      if (error.message === "402") {
        setAnalysisResult({
          error: true,
          isValid: false,
          details: "0 Remaining Attempts. Please Upgrade.",
        });
      } else {
        setAnalysisResult({
          error: true,
          isValid: true,
          details: "Analysis failed. Please try again.",
        });
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setUploadedImage(null);
    setAnalysisResult(null);
  };

  return (
    <section className="py-24 px-6">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
          {toastMessage}
        </div>
      )}
      
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 w-full max-w-lg mx-auto">
            {!uploadedImage ? (
              <div
                className={`border-4 border-dashed rounded-2xl p-12 text-center transition-all ${
                  isDragging
                    ? "border-green-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-400 dark:border-gray-700 hover:border-green-400 dark:hover:border-green-500"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 mb-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Upload size={40} className="text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Upload an Image</h3>
                  <p className="text-lg text-gray-700 dark:text-gray-400 mb-6">
                    Drag and drop an image here, or click to browse
                  </p>
                  <input type="file" id="image-upload" accept="image/*" className="hidden" onChange={handleFileInput} />
                  <label
                    htmlFor="image-upload"
                    className="px-8 py-3 bg-green-600 text-white text-lg font-medium rounded-lg hover:bg-green-700 transition-all cursor-pointer"
                  >
                    Upload Image
                  </label>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                <div className="relative">
                  <img src={uploadedImage} alt="Uploaded" className="w-full h-80 object-cover" />
                  {analysisResult && (
                    <div
                      className={`absolute top-6 right-6 px-4 py-2 rounded-full text-white text-lg font-medium ${
                        analysisResult.error? analysisResult.isValid? "bg-yellow-500":"bg-green-500": !analysisResult.isHealthy ? "bg-red-500" : "bg-green-500"
                      }`}
                    >
                      {
                      analysisResult.error? analysisResult.isValid? "Uanble To Predict":"Unauthorized": analysisResult.class_name
                      }
                    </div>
                  )}
                </div>
                <div className="p-8">
                {analysisResult ? (
  <div className="space-y-6">
    {analysisResult.error ? (
      <div className="flex items-center gap-3">
        <AlertCircle className="text-yellow-500" size={32} />
        <h3 className="text-2xl font-bold">{analysisResult.details}</h3>
      </div>
    ) : (
      <>
        <div className="flex items-center gap-3">
          {!analysisResult.isHealthy ? (
            <AlertCircle className="text-red-500" size={32} />
          ) : (
            <Check className="text-green-500" size={32} />
          )}
          <h3 className="text-2xl font-bold">{analysisResult.details}</h3>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6">
          <div className="flex justify-between mb-3">
            <span className="text-gray-700 dark:text-gray-300 text-lg">Confidence</span>
            <span className="font-semibold text-lg">{analysisResult.confidence}%</span>
          </div>
          <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-4">
            <div
              className={`h-4 rounded-full ${
                analysisResult.isHealthy ? "bg-green-500": "bg-red-500"
              }`}
              style={{ width: `${analysisResult.confidence}%` }}
            ></div>
          </div>
        </div>
      </>
    )}
    <div className="flex gap-6">
      <button
        onClick={resetAnalysis}
        className="flex-1 px-6 py-3 border border-gray-400 dark:border-gray-600 text-lg font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
      >
        Try Another
      </button>
      {remainingAttempts !== null && (
        <div className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-lg text-center rounded-lg">
          Remaining: {remainingAttempts}
        </div>
      )}
    </div>
  </div>
) : (
  <button
    onClick={analyzeImage}
    className="w-full px-6 py-4 bg-green-600 text-white text-xl font-semibold rounded-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2"
    disabled={isAnalyzing}
  >
    {isAnalyzing ? (
      <>
        <div className="animate-spin rounded-full h-6 w-6 border-4 border-white border-t-transparent"></div>
        Analyzing...
      </>
    ) : 'Analyze Image'}
  </button>
)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;