
import { memo } from "react";
import type { IGridColumn } from "../interface/IGrid";

const FakeCol = memo(({ props }: { props: IGridColumn }) => {
	const style = {
		width: props.width,
		hidden: true,
	};
	console.log("render FakeCol");
	return (
		<th
			style={style}>
		</th >
	)
})

export default FakeCol