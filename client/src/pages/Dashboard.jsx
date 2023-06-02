import { useEffect } from "react";
import style from "./auth.module.css";
import { getRooms, reset } from "../features/rooms/roomsSlice";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import Room from "../Components/Room/Room";

function Dashboard() {
    const dispatch = useDispatch();
    const { rooms, isError, message, isLoading } = useSelector(
        (state) => state.rooms
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        dispatch(getRooms());

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

    return (
        <>
            <section className={style.heading}>
                <h1>Rooms dashboard</h1>
            </section>
            <section className={style.content}>
                {rooms.length > 0 ? (
                    <ul className={style.gridList}>
                        {rooms.map((room) => (
                            <Room key={room._id} room={room} />
                        ))}
                    </ul>
                ) : (
                    <h1>No rooms yet!</h1>
                )}
            </section>
        </>
    );
}

export default Dashboard;
