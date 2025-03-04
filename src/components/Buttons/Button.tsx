import React from "react"
import { PropsType } from "./types/ButtonTypes"
import { Button } from "antd";
import styles from './style.module.css';


export const CastomButton: React.FC<PropsType> = ({ handleFunc, children }) => {
    return (
        <Button
            className={styles.button}
            onClick={handleFunc}
            htmlType="button"
            size="large"
        >
            {children}
        </Button>
    )
}