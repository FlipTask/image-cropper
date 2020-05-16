import React from "react";

const TableLoader = ({rows = 1, columns=1}) => {
    const loaderRows = new Array(parseInt(rows)).fill(0);
    const loaderColumns = new Array(parseInt(columns)).fill(0);
    return (
        <tbody>
            {
                loaderRows.map((row,i) => {
                    return (
                        <tr key={i} className="row-item">
                            {
                                loaderColumns.map((col,j) => {
                                    return <td key={j} className="row-item__td">
                                        <span className={`w80 td-animated animate`}/>
                                    </td>
                                })
                            }
                        </tr>
                    )
                })
            }
            <tr></tr>
        </tbody>
    )
}

export default TableLoader;