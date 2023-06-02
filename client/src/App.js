import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminPage from "./pages/Admin";
import RoomInfo from "./pages/RoomInfo";

import Header from "./Components/Header/Header";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    console.log();
    return (
        <>
            <Router>
                <div className="container">
                    <Header />
                    <Routes>
                        <Route path="/" exact element={<Dashboard />} />
                        <Route path="/login" exact element={<Login />} />
                        <Route path="/register" exact element={<Register />} />

                        {localStorage.getItem("user") !== null &&
                            JSON.parse(localStorage.getItem("user")).token && (
                                <Route
                                    path="/room/:id"
                                    exact
                                    element={<RoomInfo />}
                                />
                            )}

                        {localStorage.getItem("user") !== null &&
                        JSON.parse(localStorage.getItem("user")).admin !==
                            undefined ? (
                            <Route
                                path="/admin"
                                exact
                                element={<AdminPage />}
                            />
                        ) : (
                            <Route
                                path="/admin"
                                exact
                                element={<Navigate replace to="/" />}
                            />
                        )}
                    </Routes>
                </div>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
