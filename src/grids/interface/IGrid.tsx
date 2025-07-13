import type { RefObject } from "react"
import { type Root } from 'react-dom/client';

interface IGridList extends React.PropsWithChildren<{}> {
    colModel: IGridColumn[],
    data: any[],
    ref?: RefObject<HTMLTableElement | null>,
    afterCell?: any
}

interface IGridColumn {
    idv4?: string,
    name: string,
    label?: string,
    width?: string,
    dataType?: string,
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
    htmlTag?: any,
    ref?: React.Ref<HTMLTableCellElement>,
    children?: React.ReactNode,
}

interface IEventClickCell {
    uuid: string | undefined;
    elemTd: HTMLElement | undefined;
    elemProp: string | undefined;
    elemProps: IGridColumn | undefined;
    leaveCell: (e: any, root: Root, tdRoot: HTMLElement) => void;
    createInput: (root: Root, tdRoot: HTMLElement, elemProps: IGridColumn | undefined, value: string) => void;
    cellEdit: (elemProps: any) => void;
    getElement: (element: HTMLElement) => IGridColumn | undefined;
    initEvent: () => void;
}

interface IActionGridTool {
    DeleteRow: (dataKey: string | undefined) => void;
}

export type { IGridList, IGridColumn, IEventClickCell, IActionGridTool }
