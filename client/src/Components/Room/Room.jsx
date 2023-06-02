import React from "react";
import style from "./Room.module.css";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

function Room({ room }) {
    return (
        <div className={style.room}>
            <img
                src={`http://localhost:8080/${room.photo}`}
                className={style.image}
                alt="room"
            />
            <h2 className={style.title}>{room.name}</h2>
            <div className={style.card_footer}>
                <Link to={`/room/${room._id}`}>
                    <Button type="button" class="reverse" text="Подробнее" />
                </Link>
                <p className={style.price}>{room.price}₽</p>
            </div>
        </div>
    );
}

export default Room;

// http://localhost:8080/assets/standart_109.jpg
