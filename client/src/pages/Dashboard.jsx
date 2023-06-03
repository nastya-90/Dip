import { useEffect } from "react";
import style from "./auth.module.css";
import { getRooms, reset } from "../features/rooms/roomsSlice";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import Room from "../Components/Room/Room";
import { useState } from "react";
import Pagination from "../Components/Pagination/paginate";

function Dashboard() {
    const dispatch = useDispatch();
    const { rooms, isError, message, isLoading } = useSelector(
        (state) => state.rooms
    );

    const [currentPage, setCurrentPage] = useState(1);
    const [elementPerPage, setElementPerPage] = useState(6);

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

    const getCurrentData = () => {
        return rooms.slice(
            currentPage * elementPerPage - elementPerPage,
            currentPage * elementPerPage
        );
    };

    const paginateData = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <section className={style.heading}>
                <h1>Rooms dashboard</h1>
            </section>
            <section className={style.content}>
                {rooms.length > 0 ? (
                    <div>
                        <ul className={style.gridList}>
                            {getCurrentData().map((room) => (
                                <Room key={room._id} room={room} />
                            ))}
                        </ul>
                        <Pagination
                            tableRowsPerPage={elementPerPage}
                            totalData={rooms.length}
                            paginateData={paginateData}
                        />
                    </div>
                ) : (
                    <h1>No rooms yet!</h1>
                )}
            </section>
        </>
    );
}

export default Dashboard;
