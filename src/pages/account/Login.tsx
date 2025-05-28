import { useRef } from "react"
import { Text, Input, ButtonConfirm } from "../../component/UIComponents"
import { isUndefOrStrEmpty } from "../../common/common"
import { useNavigate, Link } from "react-router-dom"
import { httpPost } from "../../services/httpClient"
import { useLoading } from "../../hooks/LoadingContext"
import { DialogInfo } from "../dialogs/DialogInfo.js"
import { useDialog } from "../../hooks/DialogContext.js"
import { Validator } from "../../common/validator.js"
//import { DialogChgPw } from "../dialogs/DialogChgPw"
import type { Context } from "../../interface/IValidate.js"
import "./Login.css"

export function LoginPage() {
    let validator: Validator;
    const navigate = useNavigate();
    const userRef = useRef<HTMLInputElement>(null);
    const passWordRef = useRef<HTMLInputElement>(null);
    const { settingDialog, openDialog, closeDialog }: any = useDialog()
    const { settingLoading }: any = useLoading();
    let validations: Context = {
        phone:
        {
            methods: {
                isNumeric: true,
                isNull: true
            }
            , name: "Số điện thoại"
            , messages: {
                isNumeric: "Chỉ nhập số.",
                isNull: "Xin hãy nhập."
            }
        },
        password:
        {
            methods: {
                isNull: true,
            }
            , name: "Mật khẩu"
            , messages: {
                isNull: "Xin hãy nhập."
            }
        }
    };

    const Login = async (e: any) => {
        e.preventDefault();
        settingLoading(true)
        createValidator();
        const form = {
            cd_phone_number: userRef.current?.value,
            password: passWordRef.current?.value
        }

        const valid = await validator.Excute();
        if (!valid) {
            return Promise.resolve()
                .finally(() => {
                    settingLoading(false);
                })
        }
        return httpPost("Authentication/Login", form)
            .then((res: any) => {
                var data = res.data.dataRtn;
                if (!isUndefOrStrEmpty(data.token))
                    localStorage.setItem('token', data.token);
                if (!isUndefOrStrEmpty(data.phone))
                    localStorage.setItem('phone', data.phone);
                navigate('/HomePage');
            }).catch((err) => {
                settingDialog(<DialogInfo content={[err.response.data.messageRtr]} type={'alert'} closeDialog={closeDialog} />);
                openDialog();
            }).finally(() => {
                settingLoading(false);
            })
    }

    const ForgotPw = async (e: any) => {
        e.preventDefault();
        settingLoading(true)
        createValidator();

        const valid = await validator.FilterElement("password").Excute();
        settingLoading(false)
        if (!valid) {
            return Promise.resolve();
        }

        // settingDialog(<DialogChgPw closeDialog={closeDialog} data={{ phone: userRef.current?.value }} />);
        // openDialog();
    }

    const regexNumber = (e: any) => {
        if (e.key.match("[0-9]") == null && e.key !== "Backspace" && e.key !== "Delete" && e.key !== "Tab") {
            e.preventDefault();
        }
    }

    const createValidator = () => {
        validations.phone.element = userRef.current || null;
        validations.password.element = passWordRef.current || null;
        validator = new Validator(validations);
    };

    return (
        <>
            <div className="login-container">
                <div className="card">
                    <h4 className="headForm">Hỗ trợ <br></br>Tiệm tạp hóa</h4>
                    <div className="card-body">
                        <form>
                            <div className="mb-3">
                                <Input type="tel" maxLength="10" elementRef={userRef} onKeyDown={regexNumber} placeholder="Số điện thoại" className="form-control" ></Input>
                            </div>
                            <div className="mb-3">
                                <Input type="text" id="txtPassword" elementRef={passWordRef} placeholder="Mật khẩu" className="form-control" />
                            </div>
                            <div className="mb-3" style={{ textAlign: "right" }}>
                                <a href="#" className="forgotPw" onClick={ForgotPw}><Text text="Quên mật khẩu" /></a>
                            </div>
                            <div className="btnLogin">
                                <ButtonConfirm onClick={Login} className="btn btn-confirm" text="Đăng nhập" />
                            </div>
                        </form>
                    </div>

                    <div className="card-body">
                        <div className="mb-3">
                            <Text text="Bạn chưa có tài khoản?" />
                        </div>
                        <div className="mb-3">
                            <Link to="/SignUpPage">
                                <Text text={"Đăng kí"} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}