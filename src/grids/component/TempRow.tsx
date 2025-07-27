
import { memo } from "react";
import type { IGridColumn } from "../interface/IGrid";

const TempRow = memo(({ props }: { props: IGridColumn }) => {
	console.log("render TempRow");
	return (
		<td
			hidden={true}
			id="temp-row"
			className={props.classNm}
			data-index={props.index}>
		</td>
	)
})

export default TempRow