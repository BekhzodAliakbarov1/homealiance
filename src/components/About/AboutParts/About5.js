import React from 'react'
import style from './About5.module.css'
import img from '../../../assets/images/ceo.jpg'
import {useTranslation} from 'react-i18next'

const About = () => {
    const {t}=useTranslation();
    return (
        <div className={style.main} >
            <div className={style.inMain}>
                <div className={style.img} style={{backgroundImage:`url(${img})`}} ></div>
                <div className={style.text}>
                    <h2>
                        {t("about5.h2")}
                    </h2>
                    <p>
                    {t("about5.p")}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About
