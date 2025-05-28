export default function Select(props: any) {
    const _className = props.className ?? null;
    const _id = props.id ?? null;
    const _changeEvent = props.onChange ?? null;
    const _ref = props.elementRef ?? null;
    const _placeholder = props.placeholder ?? null;
    const _blankAble = props.isBlank ?? false;
    const _dataProp = props.dataProp ?? null;
    const _keyOption = props.keyOption ?? null;
    const _valOption = props.valOption ?? null;
    let _option = props.option ?? [];

    if (_blankAble) {
        _option.unshift({ [_keyOption]: "", [_valOption]: "" });
    }

    return (
        <div>
            <span>{_placeholder}</span>
            <select
                className={_className}
                id={_id}
                ref={_ref}
                data-prop={_dataProp}
                onChange={_changeEvent}>
                {
                    _option.map((item, id) => {
                        return <option key={id} value={item[_keyOption]}>{item[_valOption]}</option>
                    })
                }
            </select>
        </div >
    )
}