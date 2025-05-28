import { useEffect, useRef } from 'react';
import { Input, ButtonConfirm } from '../component/UIComponents';
import { httpPost } from '../services/httpClient';
import { useNavigate } from "react-router-dom"
import { useLoading } from '../hooks/LoadingContext';
import { DialogInfo } from './dialogs/DialogInfo';
import { useDialog } from '../hooks/DialogContext';
import { Validator } from '../common/validator.js';
import { FormCollection } from '../common/common.js';
import "./css/ChangePassword.css"

export function ChangePassword() {
    let validator;
    const odPwRef = useRef(null);
    const nwPwRef = useRef(null);
    const cfPwRef = useRef(null);
    const formRef = useRef(null);
    const { settingDialog, openDialog, closeDialog } = useDialog()
    const { settingLoading } = useLoading();
    const navigate = useNavigate();
    let validations = {
        oldPw:
        {
            methods: {
                isNull: true,
            }
            , name: "Mật khẩu cũ"
            , messages: {
                isNull: "Xin hãy nhập."
            }
        },
        newPw:
        {
            methods: {
                isNull: true,
            }
            , name: "Nhập mật khẩu mới"
            , messages: {
                isNull: "Xin hãy nhập."
            }
        },
        cfPw:
        {
            methods: {
                isNull: true,
                isCorrtect: () => {
                    const cfPw = cfPwRef.current.value,
                        nwPw = nwPwRef.current.value;

                    return (!(cfPw !== nwPw))
                }
            }
            , name: "Nhập mật khẩu mới"
            , messages: {
                isNull: "Xin hãy nhập.",
                isCorrtect: "Xác nhận mật khẩu không giống nhau."
            }
        }
    };

    const cmdChangePass = async (e) => {
        settingLoading(true)

        const valid = await validator.Excute();
        if (!valid) {
            return Promise.resolve("validate fail")
                .catch(() => {
                    settingDialog(<DialogInfo content={validator.msgErrors} type={'alert'} closeDialog={closeDialog} />);
                    openDialog();
                })
                .finally(() => {
                    settingLoading(false);
                })
        }
        return httpPost("Authentication/ChangePassword", FormCollection(formRef.current))
            .then((res) => {
                localStorage.removeItem('token')
                localStorage.removeItem('phone')
                settingLoading(false);
                navigate("/Login")
            })
            .catch((err) => {
                settingDialog(<DialogInfo content={[err.response.data.messageRtr]} type={'alert'} closeDialog={closeDialog} />);
                openDialog();
            }).finally(() => {
                settingLoading(false);
            })
    }

    const createValidator = () => {
        validations.oldPw.element = odPwRef.current;
        validations.newPw.element = nwPwRef.current;
        validations.cfPw.element = cfPwRef.current;
        validator = new Validator(validations, { oldPw: odPwRef, newPw: nwPwRef, cfPw: cfPwRef });
    };

    useEffect(() => {
        createValidator();
        return () => { }
    })

    return (
        <>
            <div className="card">
                <h4 className="headForm">Chỉnh sửa tài khoản</h4>
                <div ref={formRef} className="card-body">
                    <div className="mb-3">
                        <Input type="password" elementRef={odPwRef} dataProp={"oldPw"} className="form-control" placeholder="Mật khẩu cũ" />
                    </div>
                    <div className="mb-3">
                        <Input type="password" elementRef={nwPwRef} dataProp={"newPw"} className="form-control" placeholder="Mật khẩu mới" />
                    </div>
                    <div className="mb-3">
                        <Input type="password" elementRef={cfPwRef} className="form-control" placeholder="Nhập mật khẩu mới" />
                    </div>
                    <div className="btnLogin">
                        <ButtonConfirm text={'Xác nhận'} onClick={cmdChangePass} className="btn btn-confirm"></ButtonConfirm>
                    </div>
                </div>
            </div>
        </>
    )
}