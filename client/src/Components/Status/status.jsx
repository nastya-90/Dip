import React from "react";
import style from "./status.module.css";

function Status({ room }) {
    return (
        <li
            className={`${style.roomStatus} ${
                !room.reserve.status ? style.free : style.reserve
            }`}
        >
            <p>{room.number}</p>
        </li>
    );
}

export default Status;
