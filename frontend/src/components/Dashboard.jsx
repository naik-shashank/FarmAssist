import { useState, useEffect } from "react"
import { Copy, CheckCircle, Clock, BarChart2 } from "lucide-react"

const Dashboard = () => {
  const [apiKey, setApiKey] = useState("")
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("upload")
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch("https://farmassist-api.onrender.com/api/user/dashboard", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setDashboardData(data)
        setApiKey(data.api_key)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  if (loading) {
    return <div className="container mx-auto py-12 px-4 text-lg">Loading dashboard...</div>
  }

  if (error) {
    return <div className="container mx-auto py-12 px-4 text-lg">Error: {error}</div>
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      {/* API Key Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your API Key</h2>
        <div className="flex items-center">
          <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-l-lg p-3 font-mono text-base overflow-x-auto">
            {apiKey || "Please Upgrade to Get Your API_KEY!!"}
          </div>
          <button
            onClick={copyApiKey}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-r-lg transition-colors"
            aria-label="Copy API key"
          >
            {copied ? <CheckCircle size={24} /> : <Copy size={24} />}
          </button>
        </div>
        <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
          Keep this key secret. Do not share it in client-side code.
        </p>
      </div>

      {/* API Usage Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">API Usage</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                <BarChart2 size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Total API Calls</h3>
                <p className="text-3xl font-bold">{(dashboardData.total_api_calls + dashboardData.totalRemaining).toLocaleString()}</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ 
                  width: `${(dashboardData.total_api_calls / (dashboardData.total_api_calls + dashboardData.totalRemaining)) * 100}%` 
                }}
              ></div>
            </div>
            <p className="text-base text-gray-600 dark:text-gray-400 mt-2">
              {dashboardData.total_api_calls.toLocaleString()} used --It includes both Api_key REq's & Web Req's--
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                <CheckCircle size={24} className="text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Remaining API Calls</h3>
                <p className="text-3xl font-bold">{dashboardData.totalRemaining.toLocaleString()}</p>
              </div>
            </div>
            <p className="text-base text-gray-600 dark:text-gray-400 mt-2">It includes both Api_key REq's & Web Req's</p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                <Clock size={24} className="text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Last Request</h3>
                <p className="text-xl font-bold">{formatDate(dashboardData.lastRequestAt)}</p>
              </div>
            </div>
            <p className="text-base text-gray-600 dark:text-gray-400 mt-2">API is active 24/7</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex">
            <button
              className={`px-6 py-4 text-base font-medium ${
                activeTab === "history"
                  ? "border-b-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              Analysis History
            </button>
          </nav>
        </div>

        <div className="p-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Analysis History</h2>
            {dashboardData.history.length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-lg">
                No analysis history yet
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Image
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Filename
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Result
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Confidence
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {dashboardData.history.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-10 h-10 rounded overflow-hidden bg-gray-200 dark:bg-gray-700">
                            <img 
                              src={item.imageUrl} 
                              alt={item.fileName} 
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-base font-medium">{item.fileName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-base text-gray-600 dark:text-gray-400">{formatDate(item.date)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1.5 inline-flex text-sm leading-5 font-semibold rounded-full ${
                              item.result !== "healthy"
                                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            }`}
                          >
                            {item.result}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-base font-medium">{item.confidence}%</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
