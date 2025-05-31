// import { useRef } from "react"
// import { Input, ButtonConfirm } from "../../component/UIComponents.js"
// import { useNavigate, Link } from "react-router-dom"
// import { httpPost } from "../../services/httpClient.js"
// import { useLoading } from "../../hooks/LoadingContext.js"
// import { DialogInfo } from "../dialogs/DialogInfo.js"
// import { useDialog } from "../../hooks/DialogContext.js"
// import { Validator } from "../../common/validator.js"

// export function SignUpPage() {
//     let validator;
//     const phoneRef = useRef(null);
//     const nameRef = useRef(null);
//     const storeRef = useRef(null);
//     const pwRef = useRef(null);
//     const mailRef = useRef(null);
//     const btnRef = useRef(null);
//     const { settingDialog, openDialog, closeDialog } = useDialog()
//     const { settingLoading } = useLoading();

//     const Register = async(e) => {
//         e.preventDefault();

//         settingLoading(true)
//         createValidator();
//         var form = {
//             cd_phone_number: phoneRef.current.value,
//             cd_store: storeRef.current.value,
//             cd_password: pwRef.current.value,
//             name: nameRef.current.value,
//             password: pwRef.current.value,
//             Email: mailRef.current.value,
//         }

//         const valid = await validator.Excute();
//         if (!valid) {
//             return Promise.resolve()
//                 .finally(() => {
//                     settingLoading(false);
//                 })
//         }
//         //return Promise.resolve(true)
//         return httpPost("Authentication/Register", form)
//             .then((res) => {
//                 btnRef.current.hidden = true;
//                 settingDialog(<DialogInfo content={[res.data.messageRtr]} type={'info'} closeDialog={closeDialog} />);
//                 openDialog();
//             }).catch((err) => {
//                 settingDialog(<DialogInfo content={[err.response.data.messageRtr]} type={'alert'} closeDialog={closeDialog} />);
//                 openDialog();
//             }).finally(() => {
//                 settingLoading(false);
//             })
//     }

//     let validations = {
//         phone:
//         {
//             methods: {
//                 isNumeric: true,
//                 isNull: true,
//                 maxLength: 10
//             }
//             , name: "Số điện thoại"
//             , messages: {
//                 isNumeric: "Chỉ nhập số.",
//                 isNull: "Xin hãy nhập.",
//                 maxLength: "Nhập vượt số kí tự cho phép."
//             }
//         },
//         name:
//         {
//             methods: {
//                 isNull: true,
//             }
//             , name: "Tên thành viên"
//             , messages: {
//                 isNull: "Xin hãy nhập."
//             }
//         },
//         store:
//         {
//             methods: {
//                 isNull: true,
//             }
//             , name: "Tên cửa hàng"
//             , messages: {
//                 isNull: "Xin hãy nhập."
//             }
//         },
//         password:
//         {
//             methods: {
//                 isNull: true,
//             }
//             , name: "Tên thành viên"
//             , messages: {
//                 isNull: "Xin hãy nhập."
//             }
//         },
//         mail:
//         {
//             methods: {
//                 isNull: true,
//                 isMail: true
//             }
//             , name: "Email"
//             , messages: {
//                 isNull: "Xin hãy nhập.",
//                 isMail: "Email không hợp lệ."
//             }
//         }
//     };

//     const createValidator = () => {
//         validations.phone.element = phoneRef.current;
//         validations.name.element = nameRef.current;
//         validations.store.element = storeRef.current;
//         validations.password.element = pwRef.current;
//         validations.mail.element = mailRef.current;
//         validator = new Validator(validations, {
//             phone: phoneRef
//             , name: nameRef
//             , store: storeRef
//             , password: pwRef
//             , mail: mailRef
//         });
//     };

//     const regexNumber = (e) => {
//         if (e.key.match("[0-9]") == null && e.key !== "Backspace" && e.key !== "Delete" && e.key !== "Tab") {
//             e.preventDefault();
//         }
//     }

//     return (
//         <>
//             <div className="login-container">
//                 <div className="card">
//                     <Link to="/LoginPage">
//                         <h5>Quay lại</h5>
//                     </Link>
//                     <h4 className="headForm">Đăng ký thành viên</h4>
//                     <div className="card-body">
//                         <form>
//                             <div className="mb-3">
//                                 <Input type="tel" maxLength="10" elementRef={phoneRef} onKeyDown={regexNumber} placeholder="Số điện thoại" className="form-control" />
//                             </div>
//                             <div className="mb-3">
//                                 <Input type="tel" maxLength="10" elementRef={nameRef} placeholder="Tên" className="form-control" />
//                             </div>
//                             <div className="mb-3">
//                                 <Input type="tel" maxLength="10" elementRef={storeRef} placeholder="Cửa hàng" className="form-control" />
//                             </div>
//                             <div className="mb-3">
//                                 <Input type="text" id="txtPassword" elementRef={pwRef} placeholder="Mật khẩu" className="form-control" />
//                             </div>
//                             <div className="mb-3">
//                                 <Input type="tel" elementRef={mailRef} placeholder="Email" className="form-control" />
//                             </div>
//                             <div className="btnLogin">
//                                 <ButtonConfirm onClick={Register} elementRef={btnRef} className="btn btn-confirm" text="Đăng ký" />
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }