import { ButtonConfirm, Text } from '../../component/UIComponents';
import './css/Dialog.css';

export function DialogInfo(props: any) {

    const color = props.type == "alert" ? "dlg-alert" : "dlg-info";
    const classNm = "dialog-modal " + color;

    return (
        <div className='dialog-container'>
            <div className={classNm}>
                <div className='dialog-header'>
                    <Text text={props.tittle} />
                </div>
                <div className='dialog-content'>
                    {
                        props.content.map((m: any, k: any) => {
                            return <Text key={k} text={m} />
                        })
                    }

                </div>
                <div className='dialog-footer'>
                    <div className='dialog-footer-left'>

                    </div>
                    <div className='dialog-footer-right'>
                        <ButtonConfirm text='Close' onClick={props.closeDialog} />
                    </div>
                </div>
            </div>
        </div>
    )
}