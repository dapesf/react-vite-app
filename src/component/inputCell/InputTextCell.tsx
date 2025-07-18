import { useEffect, useRef, useState } from 'react';
import { isNumeric } from '../../common/common';
//import { InPutDataType } from '../../interface/ITypeDataInput'
import './InputCell.css';

const InputTextCell = (props: any) => {
	//const _type = props.type ?? "text";
	//const _dataType = props.dataType ?? "STRING";
	const _placeholder = props.placeholder ?? null;
	let _className = props.className ?? '';
	const _id = props.id ?? null;
	const _name = props.name ?? null;
	const _changeEvent = props.onChange ?? null;
	const _keyDownEvent = props.onKeyDown ?? null;
	//const _keyUpEvent = props.onKeyUp ?? null;
	const _onBlur = props.onBlur ?? null;
	const _maxLength = props.maxLength ?? null;
	// const _ref = props.elementRef ?? null;
	const _prop = props.dataProp ?? null;

	_className = _className + 'input'

	const ref = useRef<HTMLInputElement>(null)
	const [value, setValue] = useState(props.value);

	const funcOnChange = (e: any) => {
		const newVal = e.target.value;
		setValue(newVal);
	};

	useEffect(() => {
		ref.current?.focus();
	}, []);

	return (
		<input
			type='text'
			className={_className}
			id={_id}
			placeholder={_placeholder}
			value={value}
			ref={ref}
			maxLength={_maxLength}
			onKeyDown={_keyDownEvent}
			// onKeyUp={_keyUpEvent}
			onBlur={_onBlur}
			data-prop={_prop}
			//onChange={{}}
			onChange={funcOnChange}>
		</input>
	)
}

export default InputTextCell