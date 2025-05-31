import './Input.css';

export default function Input(props: any) {
    const _type = props.type ?? "text";
    const _placeholder = props.placeholder ?? null;
    let _className = props.className ?? '';
    const _id = props.id ?? null;
    const _name = props.name ?? null;
    const _changeEvent = props.onChange ?? null;
    const _keyDownEvent = props.onKeyDown ?? null;
    const _keyUpEvent = props.onKeyUp ?? null;
    const _maxLength = props.maxLength ?? null;
    const _ref = props.elementRef ?? null;
    const _msgAlert = props.msgAlert ?? null;
    const _prop = props.dataProp ?? null;

    _className = _className + 'input'

    return (
        <div className="input-container">
            <input
                type={_type}
                className={_className}
                id={_id}
                placeholder={_placeholder}
                name={_name}
                value={props.value}
                ref={_ref}
                maxLength={_maxLength}
                onKeyDown={_keyDownEvent}
                onKeyUp={_keyUpEvent}
                data-prop={_prop}
                data-rule="required"
                onChange={_changeEvent}>
            </input>
            <div className="bubble">{_msgAlert}</div>
        </div>
    )
}