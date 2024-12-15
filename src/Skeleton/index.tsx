
import "./Skeleton.css";

const TableSkeleton = ({cols}:{cols:number}) => {

    

    return (
        <tr className="row"> 
        {Array.from({length: cols}).map((_, idx) => (
            <td key={idx} className="cell">
                <Skeleton height={'1rem'} width={'80%'}/>
            </td>
        ))}
        </tr>
    );


};



const Skeleton = ({height, width}:any) => {

    return <div className="skeleton" style={{
        height: `${height}`,
        width: `${width}`
    }}></div>
};

export default TableSkeleton;