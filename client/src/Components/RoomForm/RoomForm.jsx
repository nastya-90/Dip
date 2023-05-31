import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./RoomForm.module.css";
import Button from "../Button/Button";
import { createRoom } from "../../features/rooms/roomsSlice";

function RoomForm() {
    const [text, setText] = useState(null);
    const dispatch = useDispatch();

    const onSubmit = (event) => {
        event.preventDefault();

        dispatch(createRoom({ text }));
        setText("");
    };

    return (
        <section className={style.form}>
            <form onSubmit={onSubmit}>
                <div className={style.form_group}>
                    <label htmlFor="text">Enter room name:</label>
                    <input
                        type="text"
                        className={style.form_control}
                        id="text"
                        name="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className={style.form_group}>
                    <Button type="submit" class="block" text="Add room" />
                </div>
            </form>
        </section>
    );
}

export default RoomForm;
