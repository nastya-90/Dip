import { useEffect } from "react";
import Status from "../Components/Status/status";
import { useSelector, useDispatch } from "react-redux";
import { getAdminRooms, reset } from "../features/rooms/roomsSlice";
import { toast } from "react-toastify";
import style from "./auth.module.css";

function AdminPage() {
    const dispatch = useDispatch();

    const { allRooms, isError, message, isLoading } = useSelector(
        (state) => state.rooms
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        dispatch(getAdminRooms());

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
                <h1>Admin dashboard</h1>
            </section>
            <section className={style.content}>
                {allRooms.length > 0 ? (
                    <ul className={style.gridListAdmin}>
                        {allRooms.map((room) => (
                            <Status key={room._id} room={room} />
                        ))}
                    </ul>
                ) : (
                    <h1>No rooms yet!</h1>
                )}
            </section>
        </>
    );
}

export default AdminPage;
