import "./App.css";
import { ToastContainer } from "react-toastify";
import {Route, Routes} from "react-router-dom";
import Register from "./features/users/Register";

const App = () => {

  return (
    <>
      <ToastContainer/>
      <main>
        <Routes>

        <Route path="/register" element={<Register/>}/>
        </Routes>
      </main>
    </>
  );
};

export default App;
