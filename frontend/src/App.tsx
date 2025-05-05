import "./App.css";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Register from "./features/users/Register";
import NavBar from "./components/NavBar/NavBar.tsx";
import Login from "./features/users/Login.tsx";
import Items from "./features/items/Items.tsx";

const App = () => {
  return (
    <>
      <ToastContainer autoClose={700} />
      <header>
        <NavBar />
      </header>
      <main className="mx-auto max-w-7xl">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Items />} />
          <Route path="*" element={<h1>Not found page</h1>} />
        </Routes>
      </main>
    </>
  );
};

export default App;
