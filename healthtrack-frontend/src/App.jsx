import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Programs from "./pages/Programs";
import ClientDetails from "./components/ClientDetails"; // Import the new component
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";

// PrivateRoute protects pages
function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

// Layout to include Navbar on Private pages
function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="p-6">{children}</div>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* Public Routes */}
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private Routes with Navbar */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/clients" element={
            <PrivateRoute>
              <Layout>
                <Clients />
              </Layout>
            </PrivateRoute>
          } />
          {/* Add the new client details route here */}
          <Route path="/clients/:id" element={
            <PrivateRoute>
              <Layout>
                <ClientDetails />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/programs" element={
            <PrivateRoute>
              <Layout>
                <Programs />
              </Layout>
            </PrivateRoute>
          } />

          {/* Catch-all: redirect unknown paths to Landing */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;


// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Landing from "./pages/Landing";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import Clients from "./pages/Clients";
// import Programs from "./pages/Programs";
// import { AuthProvider, useAuth } from "./contexts/AuthContext";
// import Navbar from "./components/Navbar";

// // PrivateRoute protects pages
// function PrivateRoute({ children }) {
//   const { isAuthenticated } = useAuth();
//   return isAuthenticated ? children : <Navigate to="/login" />;
// }

// // Layout to include Navbar on Private pages
// function Layout({ children }) {
//   return (
//     <>
//       <Navbar />
//       <div className="p-6">{children}</div>
//     </>
//   );
// }

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>

//           {/* Public Routes */}
//           <Route path="/" element={<Landing />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* Private Routes with Navbar */}
//           <Route path="/dashboard" element={
//             <PrivateRoute>
//               <Layout>
//                 <Dashboard />
//               </Layout>
//             </PrivateRoute>
//           } />
//           <Route path="/clients" element={
//             <PrivateRoute>
//               <Layout>
//                 <Clients />
//               </Layout>
//             </PrivateRoute>
//           } />
//           <Route path="/programs" element={
//             <PrivateRoute>
//               <Layout>
//                 <Programs />
//               </Layout>
//             </PrivateRoute>
//           } />

//           {/* Catch-all: redirect unknown paths to Landing */}
//           <Route path="*" element={<Navigate to="/" />} />

//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;



// // // src/App.jsx
// // import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// // import Landing from "./pages/Landing";
// // import Login from "./pages/Login";
// // import Register from "./pages/Register";
// // import Dashboard from "./pages/Dashboard";
// // import Clients from "./pages/Clients";
// // import Programs from "./pages/Programs";
// // import { AuthProvider, useAuth } from "./contexts/AuthContext";
// // import Navbar from "./components/Navbar";

// // // Protect private pages
// // function PrivateRoute({ children }) {
// //   const { isAuthenticated } = useAuth();
// //   return isAuthenticated ? children : <Navigate to="/login" />;
// // }

// // function App() {
// //   return (
// //     <AuthProvider>
// //       <Router>
// //         <Routes>

// //           {/* Public Routes */}
// //           <Route path="/Landing" element={<Landing />} />
// //           <Route path="/login" element={<Login />} />
// //           <Route path="/register" element={<Register />} />

// //           {/* Private Routes */}
// //           <Route path="/dashboard" element={
// //             <PrivateRoute>
// //               <Dashboard />
// //             </PrivateRoute>
// //           } />
// //           <Route path="/clients" element={
// //             <PrivateRoute>
// //               <Clients />
// //             </PrivateRoute>
// //           } />
// //           <Route path="/programs" element={
// //             <PrivateRoute>
// //               <Programs />
// //             </PrivateRoute>
// //           } />

// //           {/* Catch-all redirect */}
// //           <Route path="*" element={<Navigate to="/" />} />

// //         </Routes>
// //       </Router>
// //     </AuthProvider>
// //   );
// // }

// // export default App;

