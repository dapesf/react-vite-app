import { useContext, createContext, useState } from 'react';

const DialogContext = createContext({});

const useDialog = () => {
    return useContext(DialogContext);
}

const chooseDialog = (children: any) => {

    if (children == null || children == undefined) {
        return null;
    }

    return { children }
}

const DialogProvider = ({ children }: any) => {

    const [dialogObject, setDialogObject] = useState({});

    const [open, setOpen] = useState(false);

    const [content, setContent] = useState('');

    const [tittle, setTittle] = useState('');

    const settingDialog = (dlg: any) => { setDialogObject(dlg) };

    const openDialog = () => { setOpen(true) };

    const closeDialog = () => { setOpen(false) }

    const settingContent = (varriable: any) => { setContent(varriable) }

    const settingTittle = (varriable: any) => { setTittle(varriable) }

    return (
        <DialogContext.Provider value={{
            dialogObject
            , settingDialog
            , content
            , settingContent
            , tittle
            , settingTittle
            , open
            , openDialog
            , closeDialog
        }}>
            {children}
        </DialogContext.Provider>
    )

}

export { useDialog, chooseDialog, DialogProvider }