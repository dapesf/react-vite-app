// import { useEffect, useRef } from 'react';
// import { ButtonConfirm, Input, Text } from '../../component/UIComponents';
// import { Validator } from '../../common/validator';
// import { httpGet } from '../../services/httpClient';
// import { useLoading } from '../../hooks/LoadingContext';
// import { DialogInfo } from './DialogInfo';
// import { useDialog } from '../../hooks/DialogContext';
// import { IVa}
// import './css/Dialog.css';

// export function DialogChgPw(props: any) {
//     let validator: ;
//     const phone = props.data.phone;
//     const pwRef = useRef(null);
//     const pwCfRef = useRef(null);
//     const { settingDialog, openDialog, closeDialog } = useDialog()
//     const { settingLoading } = useLoading();
//     let validations = {
//         password:
//         {
//             methods: {
//                 isNull: true,
//             }
//             , name: "Mật khẩu"
//             , messages: {
//                 isNull: "Xin hãy nhập."
//             }
//         },
//         passwordCf:
//         {
//             methods: {
//                 isNull: true,
//                 isCorrtect: () => {
//                     const cfPw = pwCfRef.current.value,
//                         Pw = pwRef.current.value;

//                     return (!(cfPw !== Pw))
//                 }
//             }
//             , name: "Xác nhận mật khẩu"
//             , messages: {
//                 isNull: "Xin hãy nhập.",
//                 isCorrtect: "Xác nhận mật khẩu không giống nhau."
//             }
//         }
//     };

//     const ForgotPw = async (e) => {
//         e.preventDefault();

//         settingLoading(true)

//         var form = {
//             phone: phone,
//             password: pwRef.current.value
//         }
//         const valid = await validator.Excute();
//         if (!valid) {
//             return Promise.reject("validate fail")
//                 .catch(() => {
//                     settingDialog(<DialogInfo content={validator.msgErrors} type={'alert'} closeDialog={closeDialog} />);
//                     openDialog();
//                 })
//                 .finally(() => {
//                     settingLoading(false);
//                 })
//         }
//         var isTrue = true,
//             msg = [];
//         var url = "Authentication/ForgotPw?phone=" + form.phone + "&password=" + form.password;
//         return httpGet(url)
//             .then((res) => {
//                 msg = res.data.messageRtr;
//             }).catch((err) => {
//                 isTrue = false;
//                 msg = err.response.data.messageRtr;
//             }).finally(() => {
//                 settingDialog(<DialogInfo content={[msg]} type={isTrue ? 'info' : 'alert'} closeDialog={closeDialog} />);
//                 settingLoading(false);
//                 openDialog();
//             })
//     }

//     const createValidator = () => {
//         validations.password.element = pwRef.current;
//         validations.passwordCf.element = pwCfRef.current;
//         validator = new Validator(validations, { password: pwRef, passwordCf: pwCfRef });
//     };

//     useEffect(() => {
//         createValidator();
//         return () => { }
//     })

//     return (
//         <div className='dialog-container'>
//             <div className='dialog-modal'>
//                 <div className='dialog-content'>
//                     <div className='dlg-sort-by'>
//                         <Text text={'Mật khẩu mới'} /> <br></br>
//                         <Input type={'password'} elementRef={pwRef} />
//                     </div>
//                     <div className='dlg-sort-by'>
//                         <Text text={'Xác nhận mật khẩu mới'} /><br></br>
//                         <Input type={'password'} elementRef={pwCfRef} />
//                     </div>
//                 </div>
//                 <div className='dialog-footer'>
//                     <div className='dialog-footer-left'>
//                         <ButtonConfirm text='Xác nhận' onClick={ForgotPw} />
//                     </div>
//                     <div className='dialog-footer-right'>
//                         <ButtonConfirm text='Close' onClick={props.closeDialog} />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }