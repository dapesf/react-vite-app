import { useEffect, useRef } from 'react';
import { Input, ButtonConfirm } from '../component/UIComponents.js';
import { httpPost } from '../services/httpClient.js';
import { useNavigate } from "react-router-dom"
import { useLoading } from '../hooks/LoadingContext.js';
import { DialogInfo } from './dialogs/DialogInfo.js';
import { useDialog } from '../hooks/DialogContext.js';
import { Validator } from '../common/validator.js';
import "./css/ChangePassword.css"

export function ChangePhone() {
    let validator;
    const nwPhoneRef = useRef(null);
    const pwRef = useRef(null);
    const formRef = useRef(null);
    const { settingDialog, openDialog, closeDialog } = useDialog()
    const { settingLoading } = useLoading();
    const navigate = useNavigate();
    let validations = {
        newPhone:
        {
            methods: {
                isNull: true,
            }
            , name: "Nhập số điện thoại mới"
            , messages: {
                isNull: "Xin hãy nhập."
            }
        },
        passWord:
        {
            methods: {
                isNull: true,
            }
            , name: "Nhập mật khẩu"
            , messages: {
                isNull: "Xin hãy nhập."
            }
        }
    };

    const cmdChangePhone = async (e) => {

        e.preventDefault();
        settingLoading(true)

        var form = {
            nwPhone: nwPhoneRef.current.value,
            password: pwRef.current.value
        }

        const valid = await validator.Excute();
        if (!valid) {
            return Promise.reject("validate fail")
                .catch(() => {
                    settingDialog(<DialogInfo content={validator.msgErrors} type={'alert'} closeDialog={closeDialog} />);
                    openDialog();
                })
                .finally(() => {
                    settingLoading(false);
                })
        }
        return httpPost("Authentication/ChangePhone", form)
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
        validations.newPhone.element = nwPhoneRef.current;
        validations.passWord.element = pwRef.current;
        validator = new Validator(validations, { newPhone: nwPhoneRef, passWord: pwRef });
    };

    useEffect(() => {
        createValidator();
        return () => { }
    })

    return (
        <>
            <div className="card">
                <div ref={formRef} className="card-body">
                    <div className="mb-3">
                        <Input type="number" elementRef={nwPhoneRef} dataProp={"nwPhone"} className="form-control" placeholder="Số điện thoại mới" />
                    </div>
                    <div className="mb-3">
                        <Input type="password" elementRef={pwRef} dataProp={"password"} className="form-control" placeholder="Mật khẩu" />
                    </div>
                    <div className="btnLogin">
                        <ButtonConfirm text={'Xác nhận'} onClick={cmdChangePhone} className="btn btn-confirm"></ButtonConfirm>
                    </div>
                </div>
            </div>



        </>
    )
}