import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Index from "./pages/Index";

import Header from "./Components/Header";

import { useState, useEffect } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <>
            <Router>
                <div className="container">
                    <h1>App</h1>
                    <Header />
                    <Routes>
                        {localStorage.getItem("user") && (
                            <Route path="/" excet element={<Home />} />
                        )}

                        <Route path="/" excet element={<Index />} />
                        <Route path="/login" excet element={<Login />} />
                        <Route path="/register" excet element={<Register />} />
                    </Routes>
                </div>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
