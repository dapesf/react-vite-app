import { ButtonConfirm, Text } from '../../component/UIComponents';
import './css/Dialog.css';

export function DialogConfirm(props: any) {
    return (
        <div className='dialog-container'>
            <div className='dialog-modal'>
                <div className='dialog-header'>
                    <Text text={props.tittle} />
                </div>
                <div className='dialog-content'>
                    <Text text={props.content} />
                </div>
                <div className='dialog-footer'>
                    <div className='dialog-footer-left'>
                        <ButtonConfirm text='Ok' onClick={props.closeDialog} />
                    </div>
                    <div className='dialog-footer-right'>
                        <ButtonConfirm text='Close' onClick={props.closeDialog} />
                    </div>
                </div>
            </div>
        </div>
    )
}