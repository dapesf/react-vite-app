
import { v4 as uuidv4 } from 'uuid';
import type { IGridList, IGridColumn } from '../interface/IGrid'

const randUUID = () => {
	return parseFloat(Array.from({ length: 15 }, () => Math.floor(Math.random() * 10)).join(''));
};

const confListGrid = (gird: IGridList) => {
	console.log("confListGrid run!")
	gird.data.forEach((element: IGridColumn) => {
		element.key = randUUID();
		element.idv4 = uuidv4()
	});

	return gird;
};

export { confListGrid }