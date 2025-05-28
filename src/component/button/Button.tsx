import './Button.css';

export function Button(props: any) {
    return (
        <button className='Button' disabled={props.isDisable} onClick={props.onclick}>Add</button>
    )
}

export function ButtonConfirm(props: any) {
    const _text = props.text ?? "";
    let _className = props.className ?? '';
    const _isDisable = props.isDisable ?? null;
    const _onclick = props.onClick ?? null;
    const _icon = props.children ?? null;
    const _ref = props.elementRef ?? null;

    _className = _className + 'btn btn-primary'

    return (
        <button
            className={_className}
            disabled={_isDisable}
            ref={_ref}
            onClick={_onclick}>
            {_icon ? _icon : _text}
        </button>
    )
}