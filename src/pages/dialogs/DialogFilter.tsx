import { ButtonConfirm, Input, Text, Select } from '../../component/UIComponents';
import './css/Dialog.css';

export function DialogFilter(props: any) {
    return (
        <div className='dialog-container'>
            <div className='dialog-modal'>
                <div className='dialog-header'>
                    <Text text={'Bộ lọc sản phẩm:'} /><br></br>
                </div>
                <div className='dialog-content'>
                    <div>
                        <Text text={'Giá(ngàn): Từ -> đến'} /><br></br>
                    </div>
                    <div className=''>
                        <Input type={'number'} id={'prince-from'} />
                        <Input type={'number'} id={'prince-to'} /><br></br>
                    </div>
                    <div>
                        <Text text={'Xuất xứ:'} /> <br></br>
                    </div>
                    <div className=''>
                        <Select option={['Nhật', 'Việt']} id={''} />
                    </div>
                    <div>
                        <Text text={'Loại:'} /> <br></br>
                    </div>
                    <div className=''>
                        <Select option={['Túi', 'Thùng']} id={''} />
                    </div>
                </div>
                <div className='dialog-footer'>
                    <div className='dialog-footer-left'></div>
                    <div className='dialog-footer-right'>
                        <ButtonConfirm text='Close' onClick={props.closeDialog} />
                    </div>
                </div>
            </div>
        </div>
    )
}