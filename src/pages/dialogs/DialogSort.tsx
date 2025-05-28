import { ButtonConfirm, Input, Text } from '../../component/UIComponents';
import './css/Dialog.css';

export function DialogSort(props: any) {
    return (
        <div className='dialog-container'>
            <div className='dialog-modal'>
                <div>
                    <Text text={'Sắp xếp theo:'} for={'pr-nm'} /> <br></br>
                </div>
                <div className='dialog-content'>
                    <div className='dlg-sort-by'>
                        <Input type={'radio'} id={'pr-nm'} name={'fav'} />
                        <Text text={'Tên sản phẩm'} for={'pr-nm'} /> <br></br>
                    </div>
                    <div className='dlg-sort-by'>
                        <Input type={'radio'} id={'exp'} name={'fav'} />
                        <Text text={'Hạn sử dụng'} for={'exp'} /><br></br>
                    </div>
                    <div className='dlg-sort-by'>
                        <Input type={'radio'} id={'top-sales'} name={'fav'} />
                        <Text text={'Bán chạy'} for={'top-sales'} /><br></br>
                    </div>
                    <div>
                        <Text text={'Hướng:'} for={'pr-nm'} /> <br></br>
                    </div>
                    <div className='dlg-sort-by'>
                        <Input type={'radio'} id={'asc'} name={'type-sort'} />
                        <Text text={'Tăng'} for={'asc'} /> <br></br>
                    </div>
                    <div className='dlg-sort-by'>
                        <Input type={'radio'} id={'desc'} name={'type-sort'} />
                        <Text text={'Giảm dần'} for={'desc'} /><br></br>
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