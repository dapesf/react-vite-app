import { useEffect, useRef, useState } from 'react';
import { isNumeric } from '../../common/common';
//import { InPutDataType } from '../../interface/ITypeDataInput'
import './InputTextCell.css';

const InputTextCell = (props: any) => {
	const _type = props.type ?? "text";
	const _dataType = props.dataType ?? "STRING";
	const _placeholder = props.placeholder ?? null;
	let _className = props.className ?? '';
	const _id = props.id ?? null;
	const _name = props.name ?? null;
	const _changeEvent = props.onChange ?? null;
	//const _keyDownEvent = props.onKeyDown ?? null;
	//const _keyUpEvent = props.onKeyUp ?? null;
	const _onBlur = props.onBlur ?? null;
	const _maxLength = props.maxLength ?? null;
	// const _ref = props.elementRef ?? null;
	const _prop = props.dataProp ?? null;

	let stopPrevent = false;
	const REGEX_NUMBER = /^-?\d{1,3}(,\d{3})*(\.\d+)?$/;
	const REGEX_NORMAL_KEY = /^[a-z0-9.]+$/i;

	_className = _className + 'input'

	const ref = useRef<HTMLInputElement>(null)
	const [value, setValue] = useState(props.value);

	const funcOnChange = (e: any) => {
		if (stopPrevent) {
			stopPrevent = !stopPrevent;
			return;
		}

		const newVal = e.target.value;
		setValue(newVal);
	};

	const funcOnKeyDown = (e: any) => {
		stopPrevent = false;

		const char = e.key;
		//const type = isNumeric(char) ? "NUMBER" : "STRING";
		// if (!REGEX_NORMAL_KEY.test(char) || (REGEX_NORMAL_KEY.test(char) && char.length > 1)) {
		// 	return;
		// }

		if (_dataType == "NUMBER" && !REGEX_NUMBER.test(char) && REGEX_NORMAL_KEY.test(char)) {
			stopPrevent = true;
		}
	};

	useEffect(() => {
		ref.current?.focus();
	}, []);

	return (
		<input
			type={_type}
			className={_className}
			id={_id}
			placeholder={_placeholder}
			value={value}
			ref={ref}
			maxLength={_maxLength}
			onKeyDown={funcOnKeyDown}
			// onKeyUp={_keyUpEvent}
			onBlur={_onBlur}
			data-prop={_prop}
			//onChange={{}}
			onChange={funcOnChange}>
		</input>
	)
}

export default InputTextCell