import type { ITableListColumn } from './ITableList'

export default function TableTd(props: ITableListColumn) {
    const ClassName = props.classNm ?? undefined
    const Ref = props.elementRef ?? null;
    const Value = props.value ?? "";
    const With = props.width;
    const Hidden = props.hidden;
    const Index = props.index;

    //const TagHtml = props.htmlTag ?? (() => <></>)

    const Style = {
        width: With,
        hidden: Hidden,
    };

    return (
        <td
            style={Style}
            className={ClassName}
            data-index={Index}
            ref={Ref}>
            {/* {
                <TagHtml
                    text={Value}
                />
            } */}
            {Value}
        </td>
    )
}