import { useEffect, useState } from 'react';
import { Text, Card, Section, ButtonConfirm } from '../component/UIComponents';
import { useDialog } from '../hooks/DialogContext.js';
import { DialogSort } from './dialogs/DialogSort.js';
import { DialogFilter } from './dialogs/DialogFilter.js';
import { DialogProductInput } from './dialogs/DialogProductInput.js';
import { DialogInfo } from './dialogs/DialogInfo.js';
import { httpGet } from '../services/httpClient.js';
import { useLoading } from '../hooks/LoadingContext.js';
import { DataBinding } from '../common/common.js';
import "./css/ProductList.css";

export function ProductList() {

    const [products, setProducts] = useState([]);

    const { settingLoading } = useLoading();
    const { settingDialog, openDialog, closeDialog } = useDialog();

    const openDialogSort = async () => {
        settingDialog(<DialogSort closeDialog={closeDialog} />);
        openDialog();
    }

    const openDialogFilter = async () => {
        settingDialog(<DialogFilter closeDialog={closeDialog} />);
        openDialog();
    }

    const openDialogProductInput = async () => {
        settingDialog(<DialogProductInput closeDialog={closeDialog} />);
        openDialog();
    }

    const LoadProduct = async () => {
        settingLoading(true);
        return httpGet("Product/GetAllProduct")
            .then((res) => {
                setProducts(res.data.dataRtn);
            }).catch((err) => {
                settingDialog(<DialogInfo content={[err.response.data.messageRtr]} type={'alert'} closeDialog={closeDialog} />);
                openDialog();
            }).finally(() => {
                settingLoading(false);
            })
    };

    useEffect(() => {
        LoadProduct();
        return () => {

        }
    }, [])

    return (
        <>
            <div className='product-list-header'>
                <div>
                    <Text style='icon icon-sort' onClick={openDialogSort} />
                </div>
                <div className='product-type'>
                    <Text style='icon icon-more' onClick={openDialogProductInput} />
                </div>
                <div>
                    <Text style='icon icon-filter' onClick={openDialogFilter} />
                </div>
            </div>
            {
                products.map(product => {
                    return (
                        <div key={product.cd_product} className='product-list-content'>
                            <Section keyItem={product.cd_product} name={product.nm_product} quantity={product.kin_price} unit={product.unit} />
                        </div>
                    )
                })
            }
        </>
    )
}