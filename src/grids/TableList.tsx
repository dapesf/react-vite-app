import dummy from '../assets/dummy'
import type { IGridColumn } from './interface/IGrid'
import type { IChangeSet } from './interface/ITypeDataSet'
import { confListGrid } from '../grids/libs/ConfigGridList'
import { DataGrid } from './DataGrid'

export default function ListTable() {

	let data: object[] = dummy.slice(0, 20);

	const colModel: IGridColumn[] = [
		{ name: "name", label: "name", index: 0, width: "150px", key: 0, hidden: false }
		, { name: "language", label: "language", index: 1, width: "100px", key: 0, hidden: false }
		, { name: "id", label: "id", index: 2, width: "190px", key: 0, hidden: false, editCell: true }
		, { name: "bio", label: "bio", index: 3, width: "550px", key: 0, hidden: false, editCell: true }
		, { name: "version", label: "version", index: 4, width: "70px", key: 0, hidden: false, editCell: true, dataType: "NUMBER" }
		, { name: "", label: "", index: 5, width: "auto", key: 0, classNm: 'lst-col', hidden: true }
	]
	const ConfigTable = confListGrid({
		colModel: colModel
		, data: data
		, afterCell: (e: any, uuid: string, DataSet: IChangeSet) => { }
	});

	return (
		<DataGrid {...ConfigTable}></DataGrid>
	)
}