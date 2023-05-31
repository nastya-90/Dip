import React from "react";
// import style from "./Header.module.css";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import Button from "../Button/Button";

export default function Header() {
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    function onLogout(event) {
        dispatch(logout());
        dispatch(reset());
        window.location = "/";
    }

    // Страница с доступными номерами
    // Страница отдельного номера с возможностью забронировать
    // Страница с забронированными номерами пользователя и возможностью удалить бронь
    // Страница администратора со статусом всех номеров
    // Страницы входа/регистрации

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">Hotel</Link>
            </div>

            <ul>
                <li>
                    <Link>All rooms</Link>
                </li>

                <li>
                    <Link>My rooms</Link>
                </li>

                <li>
                    <Link></Link>
                </li>
            </ul>

            <ul>
                {user ? (
                    <>
                        <li>
                            <Button
                                type="button"
                                class="reverse"
                                onClick={onLogout}
                                text="Logout"
                                icon={<FaSignOutAlt />}
                            />
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">
                                <FaSignInAlt /> Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/register">
                                <FaUser /> Register
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </header>
    );
}
