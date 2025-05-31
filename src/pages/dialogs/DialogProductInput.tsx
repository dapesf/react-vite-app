// import { useEffect, useRef, useState } from "react"
// import { Text, Input, ButtonConfirm, Select } from '../../component/UIComponents';
// import { httpGet, httpPost } from "../../services/httpClient.js";
// import { useLoading } from "../../hooks/LoadingContext.js";
// import { DialogInfo } from "./DialogInfo.js";
// import { useDialog } from "../../hooks/DialogContext.js";
// import { Validator } from "../../common/validator.js";
// import { OriginService, UnitService } from "../../services/dataLiteral.js";
// import { FormCollection } from "../../common/common.js"

// export function DialogProductInput(props) {
//     let validator;
//     const productRef = useRef(null);
//     const nmPrRef = useRef(null);
//     const nmPrENRef = useRef(null);
//     const storeRef = useRef(null);
//     const dateStRef = useRef(null);
//     const dateEdRef = useRef(null);
//     const kinRef = useRef(null);
//     const typeRef = useRef(null);
//     const qtRef = useRef(null);
//     const ctRef = useRef(null);

//     const formRef = useRef(null);

//     const [origin, setOrigin] = useState([]);
//     const [unit, setUnit] = useState([]);

//     const { settingDialog, openDialog, closeDialog } = useDialog()
//     const { settingLoading } = useLoading();

//     const Register = async (e) => {
//         e.preventDefault();
//         settingLoading(true)
//         // createValidator();

//         // const valid = await validator.Excute();
//         // if (!valid) {
//         //     return Promise.resolve()
//         //         .finally(() => {
//         //             settingLoading(false);
//         //         })
//         // }

//         return httpPost("Product/PostProduct", FormCollection(formRef.current))
//             .then((res) => {
//                 settingDialog(<DialogInfo content={[res.data.messageRtr]} type={'info'} closeDialog={closeDialog} />);
//                 openDialog();
//             }).catch((err) => {
//                 settingDialog(<DialogInfo content={[err.response.data.messageRtr]} type={'alert'} closeDialog={closeDialog} />);
//                 openDialog();
//             }).finally(() => {
//                 settingLoading(false);
//             })
//     }

//     const LoadMaster = async () => {
//         settingLoading(true)
//         var [origin, unit] = await Promise.all([OriginService(), UnitService()])
//             .catch((err) => {
//                 settingLoading(false)
//             })

//         if (origin)
//             setOrigin(origin.data);
//         if (unit)
//             setUnit(unit.data);

//         settingLoading(false)
//     }

//     let validations = {
//         name:
//         {
//             methods: {
//                 isNull: true,
//             }
//             , name: "Tên thành viên"
//             , messages: {
//                 isNull: "Xin hãy nhập."
//             }
//         }
//     };

//     const createValidator = () => {
//         validator = new Validator(validations, {
//         });
//     };

//     const regexNumber = (e) => {
//         if (e.key.match("[0-9]") == null && e.key !== "Backspace" && e.key !== "Delete" && e.key !== "Tab") {
//             e.preventDefault();
//         }
//     }

//     useEffect(() => {
//         LoadMaster();
//         return () => {

//         }
//     }, [])

//     return (
//         <>
//             <div className='dialog-container'>
//                 <div className='dialog-product-modal'>
//                     <div className='dialog-header'>
//                         <Text text="Thêm hàng hóa"></Text>
//                     </div>
//                     <div className='dialog-content'>
//                         <div className="card">
//                             <div ref={formRef} className="card-body">
//                                 <div className="mb-1">
//                                     <Input type="tel" maxLength="10" elementRef={productRef} dataProp={"cd_product"} placeholder="Mã sản phẩm" className="form-control" />
//                                 </div>
//                                 <div className="mb-1">
//                                     <Input type="tel" elementRef={nmPrRef} dataProp={"nm_product"} placeholder="Tên sản phẩm" className="form-control" />
//                                 </div>
//                                 <div className="mb-1">
//                                     <Input type="tel" elementRef={nmPrENRef} dataProp={"nm_product_en"} placeholder="Tên sản phẩm tiếng anh" className="form-control" />
//                                 </div>
//                                 <div className="mb-1">
//                                     <Input type="tel" maxLength="10" elementRef={storeRef} dataProp={"cd_store"} placeholder="Mã cửa hàng" className="form-control" />
//                                 </div>
//                                 <div className="mb-1">
//                                     <Input type="tel" maxLength="10" elementRef={dateStRef} dataProp={"dt_start"} placeholder="Ngày giao kế hoạch" className="form-control" />
//                                 </div>
//                                 <div className="mb-1">
//                                     <Input type="tel" maxLength="10" elementRef={dateEdRef} dataProp={"dt_end"} placeholder="Ngày nhập thực tế" className="form-control" />
//                                 </div>
//                                 <div className="mb-1">
//                                     <Input type="tel" maxLength="10" elementRef={kinRef} dataProp={"kin_price"} onKeyDown={regexNumber} placeholder="Đơn giá" className="form-control" />
//                                 </div>
//                                 <div className="mb-1">
//                                     <Select option={unit} isBlank={true} keyOption={"kbn1"} valOption={"nm1"} elementRef={typeRef} dataProp={"type_unit"} placeholder="Loại" className="form-control" />
//                                 </div>
//                                 <div className="mb-1">
//                                     <Input type="tel" maxLength="10" elementRef={qtRef} dataProp={"qnt_in"} onKeyDown={regexNumber} placeholder="Số lượng" className="form-control" />
//                                 </div>
//                                 <div className="mb-1">
//                                     <Select option={origin} isBlank={true} keyOption={"kbn1"} valOption={"nm1"} elementRef={ctRef} dataProp={"cd_country"} placeholder="Xuất xứ" className="form-control" />
//                                 </div>
//                                 <div className="btnLogin">

//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className='dialog-footer'>
//                         <div className='dialog-footer-left'>
//                             <ButtonConfirm onClick={Register} className="btn btn-confirm" text="Xong" />
//                         </div>
//                         <div className='dialog-footer-right'>
//                             <ButtonConfirm onClick={props.closeDialog} className="btn btn-dark" text='Tắt' />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }