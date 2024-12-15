import { useEffect, useState } from "react";
import "./Table.css";
import { Project, TableColumn } from "../types";
import DataTable from "./DataTable";

const Table = () => {
    const [data, setData] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    async function fetchData() {
        setIsLoading(true);
        const json = await fetch("https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json");
        const res = await json.json();
        setIsLoading(false);
        setData(res);
    }

    const columns: TableColumn<Project>[] = [
        {
            key: "s.no",
            label: "S.No",
            isSortable: true,
        },
        {
            key: "percentage.funded",
            label: "Percentage funded",
            isSortable: false,
        },
        {
            key: "amt.pledged",
            label: "Amount pledged",
            isSortable: true,
        },
    ];

    useEffect(() => {
        fetchData();
    }, []);

    return <DataTable data={data} columns={columns} pageSize={5} loading={isLoading}/>;
};

export default Table;
