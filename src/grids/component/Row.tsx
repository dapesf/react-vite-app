import { memo } from 'react';
import type { IGridColumn } from '../interface/IGrid'

const Row = memo(({ cols, data }: { cols: IGridColumn[], data: any }) => {
    console.log("render Row");
    return (
        <tr key={data["idv4"]} data-key={data["idv4"]}>
            {
                cols.map((col: IGridColumn, id: number) => {
                    let style = {
                        width: col.width,
                        hidden: col.hidden,
                    };

                    return (
                        <td
                            key={data["idv4"] + col.index}
                            style={style}
                            className={col.classNm}
                            data-index={col.index}>
                            {data[col.name]}
                        </td>
                    )
                })
            }
        </tr >
    )
})

export default Row