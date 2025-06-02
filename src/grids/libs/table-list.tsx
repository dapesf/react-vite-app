import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useRef } from 'react';
import type { ITableList, ITableListColumn } from './ITableList'
import TableTh from './TableThead';
import TableTd from './TableTd';
import "./table-list.css";

const DataGrip = (props: ITableList) => {

    const tableRef = useRef<HTMLTableElement>(null);
    const tableThRef = useRef<HTMLTableElement>(null);
    const tableDiv = useRef<HTMLDivElement>(null);
    const header: ITableListColumn[] = props.colModel;
    const data: any = props.data;
    let curTrSelected: HTMLElement;

    header.push(
        { name: "", label: "", width: "auto", key: 0, classNm: 'lst-col', hidden: true }
    )

    const TableListHeader = (cols: ITableListColumn[]) => {
        return (
            cols.map((item: ITableListColumn, id: number) => {
                return (
                    <TableTh
                        key={id}
                        name={item.name}
                        label={item.label}
                        width={item.width}
                        index={id}
                        classNm={item.classNm}
                        hidden={item.hidden}>
                    </TableTh>
                )
            })
        )
    }

    const TableListBody = (cols: object[], data: object[], Tag?: React.ElementType): any => {
        return (
            data.map((row: any, id: any) => {
                return (
                    <tr key={id} data-key={uuidv4()}>
                        {
                            cols.map((col: any, _id: any) => {
                                return (
                                    <TableTd
                                        key={_id}
                                        width={col.width}
                                        index={_id}
                                        classNm={col.classNm}
                                        value={row[col.name]}>
                                    </TableTd>
                                )
                            })
                        }
                    </tr >
                )
            })
        )
    }

    const handleMouseDown = (e: MouseEvent, th: HTMLTableCellElement, tableHeight: any) => {

        const divTb = tableDiv.current;
        if (!divTb)
            return;

        const curGbox = document.createElement("div");
        curGbox.style.height = `${tableHeight}px`;
        curGbox.classList.add("curGbox");
        th.append(curGbox);

        const startX = e.pageX;
        const startWidth = th.offsetWidth;

        const handleMouseMove = (event: MouseEvent) => {
            const newWidth = startWidth + (event.pageX - startX);
            curGbox.style.left = `${newWidth}px`;
        };

        const removeEvent = () => {
            th.style.width = curGbox.style.left;
            const index: any = th.getAttribute("data-index") || -1;
            handleTableTdResize(index, th.style.width);
            divTb.removeEventListener("mousemove", handleMouseMove);
            divTb.removeEventListener("mouseup", removeEvent);
            th.removeChild(curGbox);
        };

        divTb.addEventListener("mousemove", handleMouseMove);
        divTb.addEventListener("mouseup", removeEvent);
    }

    const handleTableTdResize = (index: number, newWidth: string) => {
        const table = tableRef.current;
        if (!table)
            return;
        const tds = table.querySelectorAll("td");
        tds[index].style.width = newWidth;
    };

    const eventDragCol = () => {
        const tableHead = tableThRef.current;
        const tableZone = tableDiv.current;
        if (!tableHead || !tableZone) return;

        const tableHeight = tableZone.offsetHeight;

        tableHead.querySelectorAll("th").forEach((th) => {
            const resizer = document.createElement("div");
            resizer.classList.add("resizer");
            th.appendChild(resizer);
            resizer.addEventListener("mousedown", (e) => handleMouseDown(e, th as HTMLTableCellElement, tableHeight));
        });
    }

    const eventClickRow = () => {
        const table = tableRef.current;
        if (!table) return;

        table.addEventListener("click", (e) => {
            if (!e.target)
                return;

            if (!(e.target instanceof HTMLElement)) {
                return;
            }

            const tr = e.target.closest("tr");
            if (tr && !tr.classList.contains("tb-header")) {
                if (curTrSelected) {
                    curTrSelected.classList.remove("selected")
                }
                tr.classList.add("selected");
                curTrSelected = tr
            }
        });
    }

    const eventClickCell: {
        elemTd: HTMLElement | undefined;
        elemProps: ITableListColumn | undefined;
        cellEdit: (elemProps: any) => void;
        getElement: (element: HTMLElement) => ITableListColumn | undefined;
        initEvent: () => void;
    } = {
        elemTd: undefined,
        elemProps: undefined,
        cellEdit: (self: any) => {
            if (!self.elemProps) return;

            if (!self.elemProps.editCell) return;

            if (self.elemTd.querySelector("input")) return;

            const tdValue = self.elemTd.innerText;
            self.elemTd.innerHTML = "";

            const input = document.createElement("input");
            input.value = tdValue;
            input.type = "text";
            input.style.width = "100%";

            self.elemTd.appendChild(input);
            input.focus();

            const funcRollBackTd = () => {
                const curValue = input.value;
                self.elemTd.innerText = curValue;
                input.removeEventListener("blur", funcRollBackTd);
            }

            input.addEventListener("blur", funcRollBackTd);
        }
        , getElement: (element) => {
            const attrIndex = element.getAttribute("data-index") || null;
            const index: number = attrIndex ? parseInt(attrIndex) : -1;
            if (index < 0) return;
            const elemProps = header.at(index);
            return elemProps;
        }
        , initEvent: () => {
            var self = eventClickCell;
            const table = tableRef.current;
            if (!table) return;

            table.addEventListener("click", (e) => {
                if (!e.target) return;
                if (!(e.target instanceof HTMLElement)) return;
                if (e.target.tagName !== 'TD') return;
                const element = e.target;
                if (!element) return;

                self.elemTd = element;
                self.elemProps = self.getElement(element);
                self.cellEdit(self)

                return;
            });
        }
    }

    useEffect(() => {
        eventDragCol();
        eventClickRow();
        eventClickCell.initEvent();
    }, []);

    return (
        <div className='grip-div'>
            <div ref={tableDiv} className="tb-list">
                {/* <div className='tb-fixed'>
                <button>Add row</button>
                <button>Delete row</button>
                <button>Get row</button>
            </div> */}
                <div className="tb-container">
                    <table ref={tableThRef} className="tb-fixed">
                        <thead>
                            <tr>
                                {TableListHeader(header)}
                            </tr>
                        </thead>
                    </table>
                    <table ref={tableRef} className="dataTable">
                        <tbody>
                            {TableListBody(header, data)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export { DataGrip }