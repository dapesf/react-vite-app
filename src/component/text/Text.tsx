export default function Text(props: any) {
    const text = props.text ?? null;
    const clas = props.style ?? null;
    const _for = props.for ?? null;
    const _click = props.onClick ?? null;
    const _child = props.children ?? null;
    const _prop = props.dataProp ?? null;
    const _ref = props.elementRef ?? null;

    return (
        <label ref={_ref} data-prop={_prop} className={clas} htmlFor={_for} onClick={_click}>
            {text}
        </label>
    )
}