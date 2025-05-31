import { Route, Routes } from 'react-router-dom';
//import { useDialog } from '../hooks/DialogContext';
//import { useLoading } from '../hooks/LoadingContext';
import { ProtectedRoute } from "../src/services/redirectdRoute"
import { LoginPage } from './pages/account/Login'
//import { SignUpPage } from "../src/pages/account/SignUp"
import { Page } from "../src/pages/Page"
// import { HeaderPage } from './HeaderPage';
// import { FooterPage } from './FooterPage';
// import { DialogRoute } from '../services/DialogRoute';
// import { Loading } from '../component/UIComponents';
// import style from "./css/App.module.css"
import style from "../src/pages/css/App.module.css"
import './App.css'

function App() {
  return (
    <>
      <div className={style["app"]}>
        <Routes>
          <Route path="/Login" element={<LoginPage />}></Route>
          {/* <Route path="/SignUpPage" exact element={<SignUpPage />}></Route> */}
          <Route
            path="*"
            element={
              <ProtectedRoute>
                {/* <HeaderPage title='Hỗ trợ tiệm tạm hóa' /> */}
                <Page />
                {/* <FooterPage /> */}
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      {/* {open ?
        <DialogRoute dialogObject={dialogObject} />
        : null}
      {loading ?
        <Loading />
        : null} */}
    </>
  )
}

export default App
