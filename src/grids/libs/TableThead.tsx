
import type { ITableListColumn } from "./IGrid";

export default function TableTh(props: ITableListColumn) {
    const ClassName = props.classNm ?? undefined
    const Label = props.label;
    const With = props.width;
    const Hidden = props.hidden;
    const Ref = props.elementRef ?? null;
    const Index = props.index;

    const Style = {
        width: With,
        hidden: Hidden,
    };

    return (
        <th
            style={Style}
            className={ClassName}
            data-index={Index}
            ref={Ref}>

            {Label}
        </th>
    )
}