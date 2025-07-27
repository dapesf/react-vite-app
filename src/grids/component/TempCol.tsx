
import { memo } from "react";
import type { IGridColumn } from "../interface/IGrid";

const TempCol = memo(({ props }: { props: IGridColumn }) => {
	const style = {
		width: props.width,
		hidden: true,
	};
	console.log("render ReSizeCol");
	return (
		<th
			style={style}>
		</th >
	)
})

export default TempCol