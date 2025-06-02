import type { RefObject } from "react"

interface ITableList extends React.PropsWithChildren<{}> {
    colModel: ITableListColumn[],
    data?: any[],
    ref?: RefObject<HTMLTableElement | null>
}

interface ITableListColumn {
    name?: string,
    label?: string,
    width?: string,
    value?: any,
    key?: number,
    index?: number,
    isKey?: boolean,
    readonly?: boolean,
    hidden?: boolean,
    classNm?: string,
    elementRef?: any,
    editCell?: boolean,
    rowspan?: number,
    colspan?: number,
    ref?: React.Ref<HTMLTableCellElement>,
    children?: React.ReactNode,
}

export type { ITableList, ITableListColumn }
