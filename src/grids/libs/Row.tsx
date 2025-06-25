import { memo } from 'react';
import type { IGridColumn } from './IGrid'

const Row = memo(({ cols, data }: { cols: IGridColumn[], data: any }) => {
    return (
        <tr key={data["idv4"]} data-key={data["idv4"]}>
            {
                cols.map((col: IGridColumn, id: number) => {
                    console.log("re render Row");
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