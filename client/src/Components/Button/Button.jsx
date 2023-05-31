import React from "react";
// import { Connect } from "react-redux";
import style from "./Button.module.css";

const Button = (props) => {
    return (
        <button
            type={props.type}
            className={`${style.btn} ${
                style[props.class.length > 0 ? `btn_${props.class}` : ""]
            }`}
            onClick={props.onClick}
        >
            {props.icon}
            {props.text}
        </button>
    );
};

export default Button;
