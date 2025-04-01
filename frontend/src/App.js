import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";  // Import styles

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Pricing from "./components/Pricing";
import Payment from "./components/Payment";
import Dashboard from "./components/Dashboard";
import ApiDocs from "./components/ApiDocs";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import CropRec from "./components/CropRec"
import PrivacyPolicy from "./components/PrivacyPolicy";
import ImageUploadBox from "./components/ImageUploadBox";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState("signin"); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openAuthModal = (type) => {
    setAuthType(type);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    closeAuthModal();
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Navbar openAuthModal={openAuthModal} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Hero openAuthModal={openAuthModal} />} />

             {/* <Route element={<PrivateRoute />}>  */}
              <Route path="/Predict-Image" element={<ImageUploadBox />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/api-docs" element={<ApiDocs />} />
              <Route path="/croprec" element={<CropRec />} />
              <Route path="/payment/:plan" element={<Payment />} />
            {/* </Route> */}
            
            <Route
              path="/dashboard"
              element={
                isLoggedIn ? (
                  <Dashboard />
                ) : (
                  <div className="container mx-auto px-4 py-20 text-center">
                    <h2 className="text-2xl font-bold mb-4">
                      Please sign in to access your dashboard
                    </h2>
                    <button
                      onClick={() => openAuthModal("signin")}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                    >
                      Sign In
                    </button>
                  </div>
                )
              }
            />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </main>

        <Footer />

        {/* Toast Notifications */}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

        {isAuthModalOpen && (
          <AuthModal type={authType} onClose={closeAuthModal} onLogin={handleLogin} />
        )}
      </div>
    </Router>
  );
}

export default App;
 










// import { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
// import Pricing from "./components/Pricing";
// import Payment from "./components/Payment";
// import Dashboard from "./components/Dashboard";
// import ApiDocs from "./components/ApiDocs";
// import Footer from "./components/Footer";
// import AuthModal from "./components/AuthModal";
// import Contact from "./components/Contact";
// import PrivacyPolicy from "./components/PrivacyPolicy";
// import ImageUploadBox from "./components/ImageUploadBox";
// import PrivateRoute from "./components/PrivateRoute";

// function App() {
//   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
//   const [authType, setAuthType] = useState("signin"); // 'signin' or 'signup'
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const openAuthModal = (type) => {
//     setAuthType(type);
//     setIsAuthModalOpen(true);
//   };

//   const closeAuthModal = () => {
//     setIsAuthModalOpen(false);
//   };

//   const handleLogin = () => {
//     setIsLoggedIn(true);
//     closeAuthModal();
//   };

//   return (
//     <Router>
//       <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
//         <Navbar
//           openAuthModal={openAuthModal}
//           isLoggedIn={isLoggedIn}
//           setIsLoggedIn={setIsLoggedIn}
//         />

//         <main className="flex-grow">
//           <Routes>
//             <Route path="/" element={<Hero openAuthModal={openAuthModal} />} />

//             <Route element={<PrivateRoute />}>
//                   <Route path="/Predict-Image" element={<ImageUploadBox />} />
//                 </Route>
//                 <Route element={<PrivateRoute />}>
//                 <Route path="/pricing" element={<Pricing />} />
//                 </Route>
//                 <Route element={<PrivateRoute />}>
//                 <Route path="/api-docs" element={<ApiDocs />} />
//                 </Route>
//                 <Route element={<PrivateRoute />}>
//                 <Route path="/contact" element={<Contact />} />
//                 </Route>
//                 <Route element={<PrivateRoute />}>
//                 <Route path="/payment/:plan" element={<Payment />} />
//                 </Route>
            
            
           
           
            
//             <Route
//               path="/dashboard"
//               element={
//                 isLoggedIn ? (
//                   <Dashboard />
//                 ) : (
//                   <div className="container mx-auto px-4 py-20 text-center">
//                     <h2 className="text-2xl font-bold mb-4">
//                       Please sign in to access your dashboard
//                     </h2>
//                     <button
//                       onClick={() => openAuthModal("signin")}
//                       className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
//                     >
//                       Sign In
//                     </button>
//                   </div>
//                 )
//               }
//             />
//             <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//           </Routes>
//         </main>

//         <Footer />

//         {isAuthModalOpen && (
//           <AuthModal
//             type={authType}
//             onClose={closeAuthModal}
//             onLogin={handleLogin}
//           />
//         )}
//       </div>
//     </Router>
//   );
// }

// export default App;
