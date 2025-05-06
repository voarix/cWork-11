import "./App.css";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Register from "./features/users/Register";
import NavBar from "./components/NavBar/NavBar.tsx";
import Login from "./features/users/Login.tsx";
import Items from "./features/items/Items.tsx";
import ItemFullView from "./features/items/ItemFullView.tsx";
import { selectUser } from "./features/users/usersSlice.ts";
import { useAppSelector } from "./app/hooks.ts";
import ProtectedRoute from "./components/UI/ProtectedRoute.tsx";
import NewItem from "./features/items/NewItem.tsx";

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <ToastContainer autoClose={700} />
      <header>
        <NavBar />
      </header>
      <main className="mx-auto max-w-7xl px-2">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/items" element={<Items />} />
          <Route path="/" element={<Items />} />
          <Route path="/items/:category_id" element={<Items />} />
          <Route path="/:category_id" element={<Items />} />
          <Route path="/items/full-view/:id" element={<ItemFullView />} />
          <Route
            path="items/new-item"
            element={
              <ProtectedRoute isAllowed={!!user}>
                <NewItem />
              </ProtectedRoute>
            }
          />{" "}
          <Route path="*" element={<h1>Not found page</h1>} />
        </Routes>
      </main>
    </>
  );
};

export default App;
