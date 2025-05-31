import { Route, Routes } from 'react-router-dom';
import style from "./css/Page.module.css"
// import { ProductList } from './ProductList.js';
import { HomePage } from "../pages/HomePage"
import { SideBar } from "../pages/SideBar"
// import { Settings } from './Settings.js';
import { UserMaster } from '../pages/master/UserMaster';
// import { ChangePassword } from './ChangePassword.js';
// import { ChangePhone } from './ChangePhone.js';
// import { EditAccount } from './EditAccount.js';
// import { ProductInput } from './ProductInput.js';

import 'bootstrap/dist/css/bootstrap.min.css';

export function Page() {

    return (
        <>
            <SideBar></SideBar>
            <div className={style["page-container"]}>
                <Routes>
                    <Route path="/a" element={<HomePage />} />
                </Routes>
                <Routes>
                    <Route path="/" element={<UserMaster />} />
                </Routes>
                {/*<Routes>
                    <Route path="/ProductList" element={<ProductList />} />
                </Routes>
                <Routes>
                    <Route path="/Settings" element={<Settings />} />
                </Routes>
                <Routes>
                    <Route path="/ChangePassword" element={<ChangePassword />} />
                </Routes>
                <Routes>
                    <Route path="/ChangePhone" element={<ChangePhone />} />
                </Routes>
                <Routes>
                    <Route path="/EditAccount" element={<EditAccount />} />
                </Routes>
                <Routes>
                    <Route path="/ProductInput" element={<ProductInput />} />
                </Routes> */}
            </div>

        </>
    )
}