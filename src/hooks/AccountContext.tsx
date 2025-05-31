import { useContext, createContext, useState } from 'react';

const AccountContext = createContext({});

const useAccount = (children: any) => {
    return useContext(AccountContext);
}

const AccountProvider = ({ children }: any) => {
    const [token, setSettoken] = useState(false);
    const settingToken = (token: any) => { setSettoken(token) };

    return (
        <AccountContext.Provider value={{ token, settingToken }}>
            {children}
        </AccountContext.Provider>
    )

}

export { useAccount, AccountProvider }