import { v4 as uuidv4 } from 'uuid';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { InputTextCell, InputNumberCell } from '../component/UIComponents';
import type { IGridList, IGridColumn, IEventClickCell, IActionGridTool } from './interface/IGrid'
import type { IChangeSet } from './interface/ITypeDataSet'
import Col from './component/Col';
import Row from './component/Row';
import "./DataGrid.css";

const DataGrid = (props: IGridList) => {

    let curTrSelected: HTMLElement;
    const tableRef = useRef<HTMLTableElement>(null);
    const tableThRef = useRef<HTMLTableElement>(null);
    const tableDiv = useRef<HTMLDivElement>(null);
    const afterCell = props.afterCell;

    const [data, setData] = useState<any>(props.data);
    const [cols, setCols] = useState<IGridColumn[]>(props.colModel);

    const DataSet: IChangeSet = {
        Data: {}
        /**
         * #Find data line in DataSet with data-key
         * @dataKey: data-key to seeking
         */
        , Find: (dataKey) => {
            let seft = DataSet;

            if (!dataKey) {
                alert("DataSet find not with index parameter NULL!")
                return;
            }

            if (!seft.Data[dataKey]) {
                alert("DataSet with index not exists!")
                return;
            }

            return seft.Data[dataKey].current;
        },
        /**
         * #Update data line in DataSet with data-key
         * @dataKey: data-key 
         * @colName: property name of col
         * @value: new value to update
         */
        Update: (dataKey, colName, value) => {
            let seft = DataSet;

            if (!dataKey) {
                alert("DataSet find not with index parameter NULL!")
                return;
            }

            if (!seft.Data[dataKey]) {
                alert("DataSet with index not exists!")
                return;
            }

            let obj: any;
            obj = seft.Find(dataKey);
            if (colName && obj[colName]) {
                obj[colName] = value
                obj["__EntityState"] = 16
            }
        },
        /**
         * #Delete data line in DataSet with data-key
         * @index: data-key to remove
         */
        Delete: (dataKey) => {
            let seft = DataSet;

            if (!dataKey) {
                alert("DataSet find not with index parameter NULL!")
                return;
            }

            if (!seft.Data[dataKey]) {
                alert("DataSet with index not exists!")
                return;
            }

            delete DataSet.Data[dataKey];
        },
        Initialization: () => {
            console.log("DataSet Initialization")
            data.map((dataRow: any, id: any) => {
                let obj: any = {}
                const original: IGridColumn = Object.assign({}, dataRow);
                const current: any = Object.assign({}, dataRow);

                current["__EntityState"] = 0

                obj["original"] = original
                obj["current"] = current

                DataSet.Data[original.idv4 ?? 0] = obj;
            });
        }
    }

    DataSet.Initialization();

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

    const eventClickCell: IEventClickCell = {
        uuid: undefined,
        elemTd: undefined,
        elemProp: undefined,
        elemProps: undefined,
        /**
         * leave cell event
         */
        leaveCell: (e: any, root: Root, tdRoot: HTMLElement) => {
            root.unmount();
            const newVal = e.target.value;
            const self = eventClickCell;
            tdRoot.innerText = newVal;
            if (self.uuid)
                DataSet.Update(self.uuid, self.elemProps?.name, newVal);

            if (afterCell && typeof (afterCell) === "function")
                afterCell(e, self.uuid, DataSet);
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
            const elemProps = cols.at(index);
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
                console.log("initEvent DataGrip Run")
                return;
            });
        }
    }

    const actionGridTool: IActionGridTool = {
        DeleteRow: (dataKey) => {
            const table = tableRef.current;
            if (!table)
                return;

            const tr = table.getElementsByClassName("selected")
            if (!tr)
                return
            let id: any;
            for (let i = 0; i <= 0; i++) {
                const el = tr[i];
                id = el.getAttribute("data-key");
                if (id) break;
            }

            //const list = data.filter((row: any) => row.idv4 !== id)
            const list = data.filter((row: any) => row.idv4 !== id)
            setData(list);
        }
    }

    const DeleteRow = () => {
        const table = tableRef.current;
        if (!table) return;

        const tr = table.getElementsByClassName("selected")
        if (!tr) return

        let id: any;
        const el = tr[0];
        id = el.getAttribute("data-key");
        if (!id) return

        const index = data.findIndex((item: any) => item.idv4 === id);
        const nextTr = data[index + 1].idv4

        setData((data: any) => {
            return data.filter((row: any) => row.idv4 !== id);
        });
        console.log("DeleteRow run!")
        console.log(nextTr)
    }

    useEffect(() => {
        //setRow(uuid)
        eventDragCol();
        eventClickRow();
        eventClickCell.initEvent();
        console.log("useEffect DataGrip Run")
    }, []);

    return (
        <div className='grip-div'>
            <div ref={tableDiv} className="tb-list">
                <div className='tb-fixed'>
                    <button>Add row</button>
                    <button onClick={(e: any) => { DeleteRow() }}>Delete row</button>
                    <button>Get row</button>
                </div>
                <div className="tb-container">
                    <table ref={tableThRef} className="tb-fixed">
                        <thead>
                            <tr>
                                {
                                    cols.map((item: IGridColumn, index: number) => (
                                        <Col key={(item.idv4 ?? "") + index}
                                            props={item} />
                                    ))
                                }
                            </tr>
                        </thead>
                    </table>
                    <table ref={tableRef} className="dataTable">
                        <tbody>
                            {
                                data.map((item: IGridColumn, index: number) => (
                                    <Row key={item.idv4}
                                        cols={cols}
                                        data={item} />
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export { DataGrid }