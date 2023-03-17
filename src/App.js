import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Base from "./components/Base";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Services from "./pages/Services";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import UserDashboard from "./pages/user-routes/UserDashboard";
import PrivateRoute from "./components/PrivateRoute";
import ProfileInfo from "./pages/user-routes/ProfileInfo";
import AvailableJobs from "./pages/user-routes/AvailableJobs"
import AddJob from "./pages/user-routes/recruiter/AddJob";
import MyJobs from "./pages/user-routes/recruiter/MyJobs";
import AppliedJobs from "./pages/user-routes/candidate/AppliedJobs";
import AppliedCandidates from "./pages/user-routes/recruiter/AppliedCandidates";
import UpdateJob from "./pages/user-routes/recruiter/UpdateJob";
import UpdateProfile from "./pages/user-routes/UpdateProfile";
import MyResume from './pages/user-routes/MyResume'
import { Worker } from "@react-pdf-viewer/core";
import CandidateResumeViewer from "./pages/user-routes/recruiter/CandidateResumeViewer";

function App() {
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
    <BrowserRouter>
       <ToastContainer />
       <Routes>
         <Route path="/" element={<Home />}/>
         <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<Signup />} />
         <Route path="/about" element={<About />} />
         <Route path="/services" element={<Services />} />

         <Route path="/user" element={<PrivateRoute />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="profile-info" element={<ProfileInfo />} />
          <Route path="available-jobs" element={<AvailableJobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="my-jobs" element={<MyJobs />} />
          <Route path="my-applications" element={<AppliedJobs />} />
          <Route path="applied-candidates" element={<AppliedCandidates />} />
          <Route path="update-job/:jobId" element={<UpdateJob />} />
          <Route path="update-profile/:userId" element={<UpdateProfile />} />
          <Route path="my-resume" element={<MyResume />} />
          <Route path="candidate-resume/:candidateId" element={<CandidateResumeViewer />} />
         </Route>
        
       </Routes>
    </BrowserRouter>
    </Worker>
  );
}

export default App;
