import React from "react";
import style from "./paginate.module.css";

export default function Pagination({
    tableRowsPerPage,
    totalData,
    paginateData,
}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalData / tableRowsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={style.pagination}>
            <ul>
                {pageNumbers.map((page, index) => (
                    <li key={index} onClick={() => paginateData(page)}>
                        {page}
                    </li>
                ))}
            </ul>
        </div>
    );
}
