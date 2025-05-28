import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Text } from "../component/UIComponents"
import style from "./css/HeaderPage.module.css"

export function HeaderPage(props) {
    const[title, setTittle] = useState('')

    useEffect(()=>{
        setTittle(props.title ?? '');

        return () => {}
    }, [])

    return (
        <>
            <div className={style["header-page-container"]}>
                <Text text={title} style={style["header-page-object"]}></Text>
            </div>
        </>
    )
}