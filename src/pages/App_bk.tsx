// import { Route, Routes } from 'react-router-dom';
// import { useDialog } from '../hooks/DialogContext';
// import { useLoading } from '../hooks/LoadingContext';
// import { ProtectedRoute } from "../services/redirectdRoute"
// import { LoginPage } from './account/Login';
// import { SignUpPage } from './account/SignUp';
// import { Page } from './Page';
// import { HeaderPage } from './HeaderPage';
// import { FooterPage } from './FooterPage';
// import { DialogRoute } from '../services/DialogRoute';
// import { Loading } from '../component/UIComponents';
// import style from "./css/App.module.css"

// export default function App({ props }) {
//   const { open, dialogObject } = useDialog();
//   const { loading } = useLoading();

//   return (
//     <>
//       <div className={style["app"]}>
//         <Routes>
//           <Route path="/Login" exact element={<LoginPage />}></Route>
//           <Route path="/SignUpPage" exact element={<SignUpPage />}></Route>
//           <Route
//             path="*"
//             element={
//               <ProtectedRoute>
//                 <HeaderPage title='Hỗ trợ tiệm tạm hóa' />
//                 <Page />
//                 <FooterPage />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </div>
//       {open ?
//         <DialogRoute dialogObject={dialogObject} />
//         : null}
//       {loading ?
//         <Loading />
//         : null}
//     </>
//   );
// }
