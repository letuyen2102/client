/*eslint-disable*/
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Title.module.css'


const Title: React.FC<{ children: React.ReactNode }> = (props) => {
    return (
        <div className={styles.titleBox}>
            <div className={`container-md ${styles.detailTitle}`}>
                {props.children}
            </div>
        </div>
    )
}

export default Title