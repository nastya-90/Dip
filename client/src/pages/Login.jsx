import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Button from "../Components/Button/Button";
import style from "./auth.module.css";
import useInput from "../Hooks/useInput";

function Login() {
    const data = useInput({
        email: "",
        password: "",
    });

    const { email, password } = data.formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            window.location = "/";
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    function handleFormSubmit(event) {
        event.preventDefault();

        const userData = {
            email,
            password,
        };

        dispatch(login(userData));
    }

    return (
        <>
            <section className={style.heading}>
                <h1>
                    <FaUser /> Login
                </h1>
                <p>Login into account</p>
            </section>
            <section className="form">
                <form onSubmit={handleFormSubmit}>
                    <div className={style.form_group}>
                        <input
                            type="email"
                            className={style.form_control}
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Please enter an email"
                            onChange={data.handleInputChange}
                        />
                    </div>

                    <div className={style.form_group}>
                        <input
                            type="password"
                            className={style.form_control}
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Please enter a password"
                            onChange={data.handleInputChange}
                        />
                    </div>

                    <div className={style.form_group}>
                        <Button type="submit" class="block" text="Login" />
                    </div>
                </form>
            </section>
        </>
    );
}

export default Login;
