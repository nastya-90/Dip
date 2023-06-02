import { useParams, useNavigate } from "react-router-dom";
import style from "./auth.module.css";
import { getRoom, reset } from "../features/rooms/roomsSlice";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function RoomInfo() {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { room, isLoading, isError, message } = useSelector(
        (state) => state.rooms
    );

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

    return <div>{room !== null && room.name}</div>;
}

export default RoomInfo;
