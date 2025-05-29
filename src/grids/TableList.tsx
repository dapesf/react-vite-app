import dummy from '../assets/dummy'
import { Text, Input } from '../component/UIComponents'
import { Fragment } from "react";
import type { ITableList, ITableListColumn } from './libs/ITableList'
import { TableListComponent } from './libs/table-list'

export default function ListTable(props: any) {

	let cols: string[] = []
	let data: object[] = dummy;

	for (const [key, value] of Object.entries(data[0])) {
		cols.push(key)
	}

	const ConfigColumn: ITableListColumn[] = [
		{ name: "name", label: "name", width: "150px", htmlTag: Text, key: 0, hidden: false }
		, { name: "language", label: "language", width: "100px", htmlTag: Text, key: 0, hidden: false }
		, { name: "id", label: "id", width: "190px", htmlTag: Text, key: 0, hidden: false }
		, { name: "bio", label: "bio", htmlTag: Text, key: 0, hidden: false }
		, { name: "version", label: "version", width: "100px", htmlTag: Text, key: 0, hidden: false }
	]

	const ConfigTable: ITableList = {
		colModel: ConfigColumn
		, data: data
	};

	return (
		<Fragment>
			<TableListComponent {...ConfigTable}></TableListComponent>
		</Fragment>
	)
}