import './Section.css';
import { Text } from '../UIComponents';

export default function Section(props: any) {
    const _name = props.name;
    const _quantity = props.quantity;
    const _unit = props.unit;
    const _key = props.keyItem;

    return (
        <div key={_key} className="section-container">
            <div className='section-name'>
                <Text text={_name} />
            </div>
            <div className='section-prince'>
                <Text text={_quantity} />
                {_unit ? "/" : ""}
                <Text text={_unit} />
            </div>
        </div>
    )
}
