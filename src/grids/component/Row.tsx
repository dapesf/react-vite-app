import { memo } from 'react';
import type { IGridColumn } from '../interface/IGrid'

type RowProps = {
    cols: IGridColumn[];
    data: any;
    classNm: string | undefined;
    clickHighLightEvent: (id: string) => void;
};

const Row = memo(({ cols, data, classNm, clickHighLightEvent }: RowProps) => {
    console.log("render Row");
    return (
        <tr
            onClick={() => clickHighLightEvent(data["idv4"])}
            className={classNm ?? undefined}
            key={data["idv4"]}
            data-key={data["idv4"]}>
            {
                cols.map((col: IGridColumn, id: number) => {
                    let Cls = {};

                    return (
                        <td
                            key={data["idv4"] + col.index}
                            hidden={col.hidden}
                            style={Cls}
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