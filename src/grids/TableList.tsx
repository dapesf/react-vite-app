import dummy from '../assets/dummy'
import type { ITableList, ITableListColumn } from './libs/ITableList'
import { DataGrip } from './libs/DataGrip'

export default function ListTable(props: any) {

	let cols: string[] = []
	let data: object[] = dummy;

	for (const [key, value] of Object.entries(data[0])) {
		cols.push(key)
	}

	const ConfigColumn: ITableListColumn[] = [
		{ name: "name", label: "name", width: "150px", key: 0, hidden: false }
		, { name: "language", label: "language", width: "100px", key: 0, hidden: false }
		, { name: "id", label: "id", width: "190px", key: 0, hidden: false, editCell: true }
		, { name: "bio", label: "bio", width: "550px", key: 0, hidden: false, editCell: true }
		, { name: "version", label: "version", width: "70px", key: 0, hidden: false, editCell: true, dataType: "NUMBER" }
	]

	const ConfigTable: ITableList = {
		colModel: ConfigColumn
		, data: data
		, afterCell: () => {
			console.log('afterCell')
		}
	};

	return (
		<DataGrip {...ConfigTable}></DataGrip>
	)
}