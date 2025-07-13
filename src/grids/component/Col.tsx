
import { memo } from "react";
import type { IGridColumn } from "../interface/IGrid";

const Col = memo(({ props }: { props: IGridColumn }) => {
    const style = {
        width: props.width,
        hidden: props.hidden,
    };
    console.log("render Col");
    return (
        <th
            style={style}
            className={props.classNm}
            data-index={props.index}>

            {props.name}
        </th >
    )
})

export default Col