

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { Outlet } from "react-router-dom";
import ScrollTop from "./components/ScrollTop";



const App = () => {
  return (
    <>
      <ToastContainer />
      <div className="container-fluid mx-0 p-0 gap-0">
        <ScrollTop />

        <Outlet />


      </div>
    </>
  );
};

export default App;
