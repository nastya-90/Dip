import { useParams, useNavigate } from "react-router-dom";
import style from "./auth.module.css";
import { getRoom, reset } from "../features/rooms/roomsSlice";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Button from "../Components/Button/Button";
import { useState } from "react";
import axios from "axios";

function RoomInfo() {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { room, isLoading, isError, message } = useSelector(
        (state) => state.rooms
    );

    const { user } = useSelector((state) => state.auth);

    // const [reserve, setReserve] = useState(undefined);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        dispatch(getRoom(params.id));

        return () => {
            dispatch(reset());
        };
    }, []);

    if (isLoading) {
        return (
            <div className={style.loadingContainer}>
                <div className={style.loading}></div>
            </div>
        );
    }

    const handleReserve = async (event) => {
        try {
            const config = {
                params: {
                    userId: user._id,
                    roomsId: params.id,
                },
            };

            console.log(config);

            const { data: res } = await axios.post(
                "http://localhost:8080/api/rooms/reserve",
                config
            );

            dispatch(getRoom(params.id));

            return () => {
                dispatch(reset());
            };
        } catch (error) {
            console.log(error);
        }
    };

    const handleUnreserve = async (event) => {
        try {
            const config = {
                params: {
                    userId: user._id,
                    roomsId: params.id,
                },
            };

            console.log(config);

            const { data: res } = await axios.post(
                "http://localhost:8080/api/rooms/unreserve",
                config
            );

            dispatch(getRoom(params.id));

            return () => {
                dispatch(reset());
            };
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {room !== null ? (
                <div>
                    <Button
                        type="button"
                        class="reverse"
                        text="Назад"
                        onClick={() => navigate(-1)}
                    />
                    <h1>Room info page</h1>
                    <p className={style.info_title}>
                        Номер
                        <span className={style.bold_text}>
                            {" '"}
                            {room.name}
                            {"' "}
                        </span>
                        оборудован всем необходимым для комфортного размещения
                        как для работы, так и для отдыха.
                    </p>
                    <div className={style.info_container}>
                        <img
                            src={`http://localhost:8080/${room.photo}`}
                            width="630"
                            height="400"
                            alt="product"
                            className={style.info_image}
                        />
                        <div className={style.info_content}>
                            <p>
                                <span className={style.bold_text}>
                                    Площадь:
                                </span>{" "}
                                {room.info.area}
                            </p>
                            <p>
                                <span className={style.bold_text}>
                                    Размещение:
                                </span>{" "}
                                {room.info.beds}
                            </p>
                            <p>
                                <span className={style.bold_text}>
                                    Вместимость:
                                </span>{" "}
                                до {room.info.guests} гостей
                            </p>
                            <p>
                                <span className={style.bold_text}>
                                    Оснащение:
                                </span>{" "}
                                {room.info.addition}
                            </p>

                            {room.reserve.status ? (
                                <Button
                                    type="button"
                                    class="block"
                                    text="Снять бронь"
                                    onClick={handleUnreserve}
                                />
                            ) : (
                                <Button
                                    type="button"
                                    class="block"
                                    text="Забронировать"
                                    onClick={handleReserve}
                                />
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <h1>Invalid room page</h1>
            )}
        </>
    );
}

export default RoomInfo;
