import { useEffect, useRef } from "react"
import { Text, Input, ButtonConfirm, Select } from "../component/UIComponents.js"
import { httpGet, httpPost } from "../services/httpClient.js"
import { useLoading } from "../hooks/LoadingContext.js"
import { DialogInfo } from "./dialogs/DialogInfo.js"
import { useDialog } from "../hooks/DialogContext.js"
import { Validator } from "../common/validator.js"
import { OriginService } from "../services/dataLiteral.js"
import { isUndefOrStrEmpty, DataBinding, FormCollection } from "../common/common.js"

export function ProductInput() {
    let validator;
    const productRef = useRef(null);
    const nmPrRef = useRef(null);
    const nmPrENRef = useRef(null);
    const storeRef = useRef(null);
    const dateStRef = useRef(null);
    const dateEdRef = useRef(null);
    const kinRef = useRef(null);
    const typeRef = useRef(null);
    const qtRef = useRef(null);
    const ctRef = useRef(null);

    const formRef = useRef(null);
    const { settingDialog, openDialog, closeDialog } = useDialog()
    const { settingLoading } = useLoading();

    const Register = async (e) => {
        e.preventDefault();
        settingLoading(true)
        createValidator();

        const valid = await validator.Excute();
        if (!valid) {
            return Promise.resolve()
                .finally(() => {
                    settingLoading(false);
                })
        }

        return httpPost("Authentication/PostUser", FormCollection(formRef.current))
            .then((res) => {
                settingDialog(<DialogInfo content={[res.data.messageRtr]} type={'info'} closeDialog={closeDialog} />);
                openDialog();
            }).catch((err) => {
                settingDialog(<DialogInfo content={[err.response.data.messageRtr]} type={'alert'} closeDialog={closeDialog} />);
                openDialog();
            }).finally(() => {
                settingLoading(false);
            })
    }

    const SearchUser = async () => {
        settingLoading(true)

        var url = "Authentication/GetSearchUser?phone=" + localStorage.getItem("phone")
        return httpGet(url)
            .then((res) => {
                DataBinding(res.data.dataRtn, formRef.current);
            }).catch((err) => {
                settingDialog(<DialogInfo content={[err.response.data.messageRtr]} type={'alert'} closeDialog={closeDialog} />);
                openDialog();
            }).finally(() => {
                settingLoading(false);
            })
    }

    let validations = {
        name:
        {
            methods: {
                isNull: true,
            }
            , name: "Tên thành viên"
            , messages: {
                isNull: "Xin hãy nhập."
            }
        }
    };

    const createValidator = () => {
        validator = new Validator(validations, {
        });
    };

    const regexNumber = (e) => {
        if (e.key.match("[0-9]") == null && e.key !== "Backspace" && e.key !== "Delete" && e.key !== "Tab") {
            e.preventDefault();
        }
    }

    useEffect(() => {
        //SearchUser();
        return () => {

        }
    }, [])

    return (
        <>
            <div className="login-container">
                <div className="card">
                    <h4 className="headForm">Chỉnh sửa tài khoản</h4>
                    <div ref={formRef} className="card-body">
                        <div className="mb-3">
                            <Input type="tel" maxLength="10" elementRef={productRef} dataProp={"cd_product"} placeholder="Mã sản phẩm" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <Input type="tel" elementRef={nmPrRef} dataProp={"nm_product"} placeholder="Tên sản phẩm" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <Input type="tel" elementRef={nmPrENRef} dataProp={"nm_product_en"} placeholder="Tên sản phẩm tiếng anh" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <Input type="tel" maxLength="10" elementRef={storeRef} dataProp={"cd_store"} placeholder="Mã cửa hàng" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <Input type="tel" maxLength="10" elementRef={dateStRef} dataProp={"dt_start"} placeholder="Ngày giao kế hoạch" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <Input type="tel" maxLength="10" elementRef={dateEdRef} dataProp={"dt_end"} placeholder="Ngày nhập thực tế" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <Input type="tel" maxLength="10" elementRef={kinRef} dataProp={"kin_price"} placeholder="Đơn giá" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <Input type="tel" maxLength="10" elementRef={typeRef} dataProp={"type_unit"} placeholder="Loại" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <Input type="tel" maxLength="10" elementRef={qtRef} dataProp={"qnt_in"} placeholder="Số lượng" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <Select elementRef={ctRef} dataProp={"cd_country"} placeholder="Xuất xứ" className="form-control" />
                        </div>
                        <div className="btnLogin">
                            <ButtonConfirm onClick={Register} className="btn btn-confirm" text="Xác nhận" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}