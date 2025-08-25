import { v4 as uuidv4 } from 'uuid';
import { useEffect, useRef, useState } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { InputTextCell, InputNumberCell } from '../component/UIComponents';
import type { IGridList, IGridColumn, IEventClickCell, IActionGridTool, IGirdActivity } from './interface/IGrid'
import type { IChangeSet } from './interface/ITypeDataSet'
import Col from './component/Col';
import TempCol from './component/TempCol';
import TempRow from './component/TempRow';
import Row from './component/Row';
import "./DataGrid.css";

const randUUID = () => {
    return parseFloat(Array.from({ length: 15 }, () => Math.floor(Math.random() * 10)).join(''));
};

const DataGrid = (props: IGridList) => {

    let curTrSelected: HTMLElement;
    const tableRef = useRef<HTMLTableElement>(null);
    const tHeadRef = useRef<HTMLTableSectionElement>(null);
    const tBodyRef = useRef<HTMLTableSectionElement>(null);
    const rowTempRef = useRef<HTMLTableRowElement>(null);
    const tableThRef = useRef<HTMLTableElement>(null);
    const tableDiv = useRef<HTMLDivElement>(null);

    const objCol: string[] = props.colModel.map((item) => item.name);

    const afterCell = props.afterCell;
    const addRow = props.addRow;
    const delRow = props.delRow;

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
         * #Create data line in DataSet with data-key
         * @dataKey: data-key 
         * @colName: property name of col
         * @value: new value to update
         */
        Create: (dataKey, object) => {
            let seft = DataSet;

            if (!dataKey) {
                alert("data key is NULL!")
                return;
            }

            if (seft.Data[dataKey]) {
                alert("data key is already exists!")
                return;
            }

            let obj: any = {}
            const original: any = Object.assign({}, object);
            const current: any = Object.assign({}, object);

            current["__EntityState"] = 4
            obj["original"] = original
            obj["current"] = current

            DataSet.Data[original.idv4 ?? 0] = obj;
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
                const original: any = Object.assign({}, dataRow);
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
        const tHead = tHeadRef.current;
        if (!tHead)
            return;
        const tds = tHead.querySelectorAll("th");
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
            else
                return;

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

    const GridActivity: IGirdActivity = {
        FindRow: () => {

        }
    }

    const GridActionTool: IActionGridTool = {
        DeleteRow: () => {
            const tbody = tBodyRef.current;
            if (!tbody) return;

            let trs = Array.from(tbody.children)
            if (trs.length == 0) return

            let callback: boolean = true;
            if (delRow && typeof (delRow) === "function")
                callback = delRow();

            if (!callback) return;

            let i: number = 0
            let id: any;
            let trNext: any = null;
            let trPrev: any = null;

            while (i <= trs.length) {
                if (!(trs[i].classList.contains("selected"))) {
                    i += 1;
                    continue;
                }

                id = trs[i].getAttribute("data-key");
                if (trs[i - 1]) trPrev = trs[i - 1]
                if (trs[i + 1]) trNext = trs[i + 1]
                break;
            }

            if (!id) return

            setData((data: any) => {
                if (trNext)
                    trNext.click();
                else if (trPrev)
                    trPrev.click();

                return data.filter((row: any) => row.idv4 !== id);
            });
        },
        AddRow: () => {
            let callback: any = {};
            let row: Record<string, any> = {};
            if (addRow && typeof (addRow) === "function")
                callback = addRow(row);

            if (!callback) return;

            //clone column name
            let fRow: any = {};
            objCol.forEach(element => {
                if (element.trim().length > 0) {
                    fRow[element] = "";
                }
            });

            //assgin row to fRow
            for (let key in callback) {
                if (fRow[key] != undefined) {
                    fRow[key] = callback[key]
                }
            }

            let id: any = uuidv4();
            fRow["idv4"] = id;
            fRow["key"] = randUUID();

            setData([...data, fRow]);
            DataSet.Create(id, fRow);
        }
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
                    <button onClick={(e: any) => { GridActionTool.AddRow() }}>Add row</button>
                    <button onClick={(e: any) => { GridActionTool.DeleteRow() }}>Delete row</button>
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
                        <thead ref={tHeadRef} className='col-resize'>
                            <tr >
                                {
                                    cols.map((item: IGridColumn, index: number) => (
                                        <TempCol
                                            key={(item.idv4 ?? "") + index}
                                            props={item} />
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody ref={tBodyRef}>
                            <tr data-key='temp-row' ref={rowTempRef}>
                                {
                                    cols.map((item: IGridColumn, index: number) => (
                                        <TempRow key={(item.idv4 ?? "") + index}
                                            props={item} />
                                    ))
                                }
                            </tr>
                            {
                                data.map((item: IGridColumn, index: number) => (
                                    <Row
                                        key={item.idv4}
                                        cols={cols}
                                        data={item} />
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}

export { DataGrid }