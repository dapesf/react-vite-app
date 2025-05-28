import { useContext, createContext, useState } from 'react';

const LoadingContext = createContext({});

const useLoading = () => {
    return useContext(LoadingContext);
}

const LoadingProvider = ({ children }: any) => {
    const [loading, setLoading] = useState(false);

    const settingLoading = (isLoad: any) => { setLoading(isLoad) };

    return (
        <LoadingContext.Provider value={{ loading, settingLoading }}>
            {children}
        </LoadingContext.Provider>
    )

}

export { LoadingProvider, useLoading }