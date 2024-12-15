export type TableColumn<T> = {
    key: keyof T;
    label: string;
    isSortable?: boolean;
};

export type TableProps<T> = {
    data: T[];
    columns: TableColumn<T>[];
    pageSize?: number;
    loading?: boolean
};

export type Project = {
    "s.no": number;
    "amt.pledged": number;
    blurb?: string;
    by?: string;
    country?: string;
    currency?: string;
    "end.time"?: string;
    location?: string;
    "percentage.funded": number;
    "num.backers"?: string;
    state?: string;
    title?: string;
    type?: string;
    url?: string;
};
