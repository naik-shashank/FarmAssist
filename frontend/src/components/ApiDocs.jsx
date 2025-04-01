import { useState } from "react"
import { Copy, Check, Code } from "lucide-react"

const CodeBlock = ({ language, code }) => {
  const [copied, setCopied] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <div className="absolute top-2 right-2">
        <button
          onClick={copyCode}
          className="p-2 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
      <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  )
}

const ApiDocs = () => {
  const [activeTab, setActiveTab] = useState("javascript")

  const apiEndpoint = "https://farmassist-api.onrender.com/api/predict/api-key"

  const javascriptCode = `// Using fetch API
const apiKey = 'YOUR_API_KEY';
const fileInput = document.getElementById('image-upload');

async function detectPlantDisease(file) {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch('${apiEndpoint}', {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${apiKey}\`
      },
      body: formData
    });
    
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example usage
fileInput.addEventListener('change', (e) => {
  detectPlantDisease(e.target.files[0]);
});`

  const reactCode = `import { useState } from 'react';

function PlantDiseaseDetector() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiKey = 'YOUR_API_KEY';

  const handleFileUpload = async (file) => {
    if (!file) return;
    
    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('${apiEndpoint}', {
        method: 'POST',
        headers: {
          'Authorization': \`Bearer \${apiKey}\`
        },
        body: formData
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => handleFileUpload(e.target.files[0])}
        accept="image/*"
      />
      <button disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze Image'}
      </button>
      
      {result && (
        <div>
          <p>Prediction: {result.prediction}</p>
          <p>Confidence: {result.confidence}%</p>
          <p>Remaining Attempts: {result.remaining_attempts}</p>
        </div>
      )}
    </div>
  );
}`

  const pythonCode = `import requests

api_key = 'YOUR_API_KEY'
api_endpoint = '${apiEndpoint}'

def detect_PlantDisease(image_path):
    headers = {
        'Authorization': f'Bearer {api_key}'
    }
    
    with open(image_path, 'rb') as f:
        files = {'image': f}
        response = requests.post(api_endpoint, files=files, headers=headers)
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code}")
        print(response.text)
        return None

# Example usage
result = detect_PlantDisease('path/to/image.jpg')
print(result)`

  const nodeCode = `const axios = require('axios');
const fs = require('fs');

const apiKey = 'YOUR_API_KEY';
const apiEndpoint = '${apiEndpoint}';

async function detectPlantDisease(filePath) {
  const formData = new FormData();
  formData.append('image', fs.createReadStream(filePath));

  try {
    const response = await axios.post(apiEndpoint, formData, {
      headers: {
        'Authorization': \`Bearer \${apiKey}\`,
        ...formData.getHeaders()
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Example usage
detectPlantDisease('path/to/image.jpg')
  .then(result => console.log(result))
  .catch(error => console.error('Failed to analyze image:', error));`

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">API Documentation</h1>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Integrate PlantDisease detection capabilities using our API. Follow these steps:
            </p>

            <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>Obtain your API key from the dashboard</li>
              <li>Send image files in multipart/form-data format</li>
              <li>Handle responses with prediction results</li>
            </ol>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-green-800 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 dark:bg-green-800 rounded-full p-1">
                  <Code size={16} className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-medium text-green-800 dark:text-green-300">Base URL</h3>
                  <p className="text-green-600 dark:text-green-400 font-mono">{apiEndpoint}</p>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-2">Authentication</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Include your API key in the Authorization header:
            </p>
            <CodeBlock language="bash" code={`Authorization: Bearer YOUR_API_KEY`} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">API Reference</h2>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg mb-6">
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-medium px-2 py-1 rounded-full">
                    POST
                  </span>
                  <span className="ml-2 font-mono text-sm">/api/predict/api-key</span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 dark:text-gray-400 mb-4">Analyze an image file for PlantDisease detection.</p>

                <h4 className="font-semibold mb-2">Request Format</h4>
                <CodeBlock
                  language="bash"
                  code={`Content-Type: multipart/form-data
                  
- Field name: image (required)
- File type: image/*`}
                />

                <h4 className="font-semibold mt-4 mb-2">Success Response</h4>
                <CodeBlock
                  language="json"
                  code={`{
  "filename": "Img_10.jpg",
  "prediction": "healthy",
  "class_name": 'Apple Healthy',
  "class_index": 3,
  "genimi": 'No Care Needed',
  "confidence": 99.9,
  "remaining_attempts": 29
}`}
                />

                <h4 className="font-semibold mt-4 mb-2">Error Response</h4>
                <CodeBlock
                  language="json"
                  code={`{
  "status": "fail",
  "data": "This endpoint expects API_KEY, Please get it from FarmAsssist.com"
}`}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex">
              <button
                onClick={() => setActiveTab("javascript")}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === "javascript"
                    ? "border-b-2 border-green-600 dark:border-green-400 text-green-600 dark:text-green-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                JavaScript
              </button>
              <button
                onClick={() => setActiveTab("react")}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === "react"
                    ? "border-b-2 border-green-600 dark:border-green-400 text-green-600 dark:text-green-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                React
              </button>
              <button
                onClick={() => setActiveTab("python")}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === "python"
                    ? "border-b-2 border-green-600 dark:border-green-400 text-green-600 dark:text-green-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                Python
              </button>
              <button
                onClick={() => setActiveTab("node")}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === "node"
                    ? "border-b-2 border-green-600 dark:border-green-400 text-green-600 dark:text-green-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                Node.js
              </button>
            </nav>
          </div>

          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Code Examples</h2>

            {activeTab === "javascript" && (
              <div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Example of how to use our API with vanilla JavaScript:
                </p>
                <CodeBlock language="javascript" code={javascriptCode} />
              </div>
            )}

            {activeTab === "react" && (
              <div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Example of how to integrate our API in a React component:
                </p>
                <CodeBlock language="jsx" code={reactCode} />
              </div>
            )}

            {activeTab === "python" && (
              <div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Example of how to use our API with Python:</p>
                <CodeBlock language="python" code={pythonCode} />
              </div>
            )}

            {activeTab === "node" && (
              <div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Example of how to use our API with Node.js:</p>
                <CodeBlock language="javascript" code={nodeCode} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApiDocs
