import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useRef } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { InputTextCell, InputNumberCell } from '../../component/UIComponents';
import type { ITableList, ITableListColumn } from './ITableList'
import type { ChangeSet } from './TypeOfDataSet'
import TableTh from './TableThead';
import TableTd from './TableTd';
import "./DataGrip.css";

const DataGrip = (props: ITableList) => {

    let curTrSelected: HTMLElement;
    const tableRef = useRef<HTMLTableElement>(null);
    const tableThRef = useRef<HTMLTableElement>(null);
    const tableDiv = useRef<HTMLDivElement>(null);
    const header: ITableListColumn[] = props.colModel;
    const data: any = props.data;
    const afterCell = props.afterCell;
    const DataSet: {
        Data: any
        , Find: (index: string | undefined) => object
    } = {
        Data: {}
        , Find: (index) => {
            let seft = DataSet;

            if (!index) {
                alert("DataSet find not with index parameter NULL!")
                return;
            }

            if (!seft.Data[index]) {
                alert("DataSet with index not exists!")
                return;
            }

            return seft.Data[index].current;
        }
    }

    header.push(
        { name: "", label: "", width: "auto", key: 0, classNm: 'lst-col', hidden: true }
    )

    const GripCreateHeader = (cols: ITableListColumn[]) => {
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

    const GripCreateList = (cols: object[], data: object[], Tag?: React.ElementType): any => {
        let idv4;
        return (
            data.map((dataRow: any, id: any) => {
                idv4 = uuidv4()
                let obj: any = {}
                const original: any = Object.assign({}, dataRow);
                const current: any = Object.assign({}, dataRow);

                current["__EntityState"] = 0

                obj["original"] = original
                obj["current"] = current
                DataSet.Data[idv4] = obj;

                return (
                    <tr key={id} data-key={idv4}>
                        {
                            cols.map((col: any, _id: any) => {
                                return (
                                    <TableTd
                                        key={_id}
                                        width={col.width}
                                        index={_id}
                                        classNm={col.classNm}
                                        // htmlTag={Tag}
                                        value={dataRow[col.name]}>
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
        uuid: string | undefined;
        elemTd: HTMLElement | undefined;
        elemProps: ITableListColumn | undefined;
        leaveCell: (e: any, root: Root, tdRoot: HTMLElement) => void;
        //afterLeaveCell: (e: any, uuid: string, dataSet: any) => void;
        createInput: (root: Root, tdRoot: HTMLElement, elemProps: ITableListColumn | undefined, value: string) => void;
        cellEdit: (elemProps: any) => void;
        getElement: (element: HTMLElement) => ITableListColumn | undefined;
        initEvent: () => void;
    } = {
        uuid: undefined,
        elemTd: undefined,
        elemProps: undefined,
        /**
         * leave cell event
         */
        leaveCell: (e: any, root: Root, tdRoot: HTMLElement) => {
            root.unmount();
            const newVal = e.target.value;
            const self = eventClickCell;
            tdRoot.innerText = newVal;
            if (afterCell && typeof (afterCell) === "function") {
                afterCell(e, self.uuid, DataSet);
            }
        },
        /**
         * create input corresponding data type
         */
        createInput: (root, tdRoot, elemProps, value) => {
            const self = eventClickCell;
            const dataType = elemProps?.dataType;
            switch (dataType) {
                case "NUMBER":
                    return (
                        <InputNumberCell
                            value={value}
                            onBlur={(e: any) => self.leaveCell(e, root, tdRoot)}
                        />
                    )
                default:
                    return (
                        <InputTextCell
                            value={value}
                            onBlur={(e: any) => self.leaveCell(e, root, tdRoot)}
                        />
                    )
            }
        },
        /**
         * when click cell, addpend input tag to modified value
         */
        cellEdit: (self: any) => {
            if (!self.elemProps) return;

            if (!self.elemProps.editCell) return;

            if (self.elemTd.querySelector("input")) return;

            const tdValue = self.elemTd.innerText;
            self.elemTd.innerHTML = "";
            const tdRoot = createRoot(self.elemTd);
            const input = self.createInput(tdRoot, self.elemTd, self.elemProps, tdValue);
            tdRoot.render(input);
        }
        /**
         * get properties of column
         */
        , getElement: (element) => {
            const self = eventClickCell;
            self.uuid = element.closest("tr")?.getAttribute("data-key") || undefined;
            const attrIndex = element.getAttribute("data-index") || null;
            const index: number = attrIndex ? parseInt(attrIndex) : -1;
            if (index < 0) return;
            const elemProps = header.at(index);
            return elemProps;
        }
        /**
         * initialize the modification event
         */
        , initEvent: () => {
            const self = eventClickCell;
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
                                {GripCreateHeader(header)}
                            </tr>
                        </thead>
                    </table>
                    <table ref={tableRef} className="dataTable">
                        <tbody>
                            {GripCreateList(header, data)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export { DataGrip }