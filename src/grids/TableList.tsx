import { v4 as uuidv4 } from 'uuid';
import dummy from '../assets/dummy'
import type { IGridList, IGridColumn } from './libs/IGrid'
import type { IChangeSet } from './libs/TypeOfDataSet'
import { DataGrid } from './libs/DataGrid'

export default function ListTable(props: any) {

	let cols: string[] = []
	let data: object[] = dummy;

	for (const [key, value] of Object.entries(data[0])) {
		cols.push(key)
	}

	const ConfigColumn: IGridColumn[] = [
		{ name: "name", label: "name", index: 0, width: "150px", key: 0, hidden: false }
		, { name: "language", label: "language", index: 1, width: "100px", key: 0, hidden: false }
		, { name: "id", label: "id", index: 2, width: "190px", key: 0, hidden: false, editCell: true }
		, { name: "bio", label: "bio", index: 3, width: "550px", key: 0, hidden: false, editCell: true }
		, { name: "version", label: "version", index: 4, width: "70px", key: 0, hidden: false, editCell: true, dataType: "NUMBER" }
		, { name: "", label: "", index: 5, width: "auto", key: 0, classNm: 'lst-col', hidden: true }
	]

	const numericUUID = () => {
		return parseFloat(Array.from({ length: 15 }, () => Math.floor(Math.random() * 10)).join(''));
	};

	props.data.forEach((element: IGridColumn) => {
		element.key = numericUUID();
		element.idv4 = uuidv4()
	});

	const ConfigTable: IGridList = {
		colModel: ConfigColumn
		, data: data
		, afterCell: (e: any, uuid: string, DataSet: IChangeSet) => {

		}
	};

	return (
		<DataGrid {...ConfigTable}></DataGrid>
	)
}