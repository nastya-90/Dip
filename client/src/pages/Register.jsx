import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/authSlice";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });

    const { name, email, password, password2 } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
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

    function handleInputChange(event) {
        event.preventDefault();

        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
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
            };

            dispatch(register(userData));
        }
    }

    // if(isLoading){
    //     return (

    //     )
    // }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Create an account</p>
            </section>
            <section className="form">
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-input"
                            id="name"
                            name="name"
                            value={name}
                            placeholder="Please enter a name"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="email"
                            className="form-input"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Please enter an email"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            className="form-input"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Please enter a password"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            className="form-input"
                            id="password2"
                            name="password2"
                            value={password2}
                            placeholder="Confirm a password"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <button type="submit">Register</button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default Register;
