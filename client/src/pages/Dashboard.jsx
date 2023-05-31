import React from "react";
import style from "auth.module.css";
import RoomForm from "../Components/RoomForm/RoomForm";

function Dashboard() {
    return (
        <>
            <section className={style.heading}>
                <h1>Rooms dashboard</h1>
                <RoomForm />
            </section>
        </>
    );
}

export default Dashboard;
