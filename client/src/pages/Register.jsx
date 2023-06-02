import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import Button from "../Components/Button/Button";

import style from "./auth.module.css";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
        check: false,
    });

    const { name, email, password, password2, check } = formData;

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

    async function handleInputChange(event) {
        await setFormData((prev) => ({
            ...prev,
            [event.target.name]:
                event.target.name === "check"
                    ? event.target.checked
                    : event.target.value,
        }));
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        if (password !== password2) {
            toast.error("Passwords do not confirm");
        } else {
            const userData = {
                name,
                email,
                password,
                check,
            };

            dispatch(register(userData));
        }
    }

    return (
        <>
            <section className={style.heading}>
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Create an account</p>
            </section>
            <section className={style.form}>
                <form onSubmit={handleFormSubmit}>
                    <div className={style.form_group}>
                        <input
                            type="text"
                            className={style.form_control}
                            id="name"
                            name="name"
                            value={name}
                            placeholder="Please enter a name"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className={style.form_group}>
                        <input
                            type="email"
                            className={style.form_control}
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Please enter an email"
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className={style.form_group}>
                        <input
                            type="password"
                            className={style.form_control}
                            id="password2"
                            name="password2"
                            value={password2}
                            placeholder="Confirm a password"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className={style.form_group}>
                        <input
                            type="checkbox"
                            style={{
                                display: "inline-block",
                                width: "fit-content",
                            }}
                            id="check"
                            name="check"
                            checked={check}
                            onChange={handleInputChange}
                        />
                        <label
                            htmlFor="check"
                            style={{
                                display: "inline-block",
                                paddingLeft: 15,
                            }}
                        >
                            Is admin account?
                        </label>
                    </div>

                    <div className={style.form_group}>
                        <Button type="submit" class="block" text="Register" />
                    </div>
                </form>
            </section>
        </>
    );
}

export default Register;
