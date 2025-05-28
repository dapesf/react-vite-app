// import { useState, useEffect } from "react"
// import { ButtonConfirm, Input, Text } from "../component/UIComponents.js"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTrashCan, faListCheck } from '@fortawesome/free-solid-svg-icons'
// import { DialogConfirm } from './dialogs/DialogConfirm.js';
// import { useDialog } from '../hooks/DialogContext.js';
// import { AnnounceServiceGetAnnounce } from "../services/AnnounceService.js";
// import { useLoading } from '../hooks/LoadingContext.js';
// import "./css/Announce.css"

// const validations =
// {
//     method: {
//         isNumeric: true
//     },
//     name: "Phone",
//     message:{
//         numeric: "Is not numeric!"
//     }
// }

// export function Announce() {
//     const [ck, setCk] = useState(false);
//     const [data, setData] = useState([]);
//     const { settingLoading } = useLoading(false);
//     const { settingDialog, settingContent, content, openDialog, closeDialog } = useDialog();

//     const click = () => {
//         setCk(!ck);
//     }

//     const openDialogConfirm = () => {
//         settingContent("Bạn có muốn xóa không!");
//         settingDialog(<DialogConfirm content={content} closeDialog={closeDialog} />);
//         openDialog();
//     }

//     const loadData = async () => {
//         settingLoading(true);
//         await AnnounceServiceGetAnnounce()
//         .then((res) => {
//             setData(res.data);
//         }).catch((err) => {
//         }).finally(()=>{
//             settingLoading(false);
//         });
//     }

//     useEffect(() => {
//         //Validator(validations, {})
//         loadData();
//         return () => {
//             setData([]);
//         }
//     }, [])

//     return (
//         <>
//             <div className="annouce-action">
//                 <ButtonConfirm onClick={click}>
//                     <FontAwesomeIcon icon={faListCheck} size="2x" />
//                 </ButtonConfirm>
//                 <ButtonConfirm className="trash" onClick={openDialogConfirm}>
//                     <FontAwesomeIcon icon={faTrashCan} size="2x" />
//                 </ButtonConfirm>
//             </div>
//             <div className="annouce-container">
//                 {
//                     data.map((item, index) => {
//                         return (
//                             <div key={item.cd_announce}>
//                                 <div className="annouce-list">
//                                     {ck && (
//                                         <div className="annouce-check">
//                                             <Input type="checkbox" />
//                                         </div>
//                                     )}
//                                     <div className="annouce-content">
//                                         <Text text={item.nm_content} style={"annouce-text"} />
//                                         <br></br>
//                                         <Text text={item.dt_send} />
//                                         <hr />
//                                     </div>
//                                 </div>
//                             </div>
//                         );
//                     })
//                 }
//             </div>
//         </>
//     )
// }