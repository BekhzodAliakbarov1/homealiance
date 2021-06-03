import React from 'react'
import style from './Services.module.css';
import { dataUZ } from './ServiceList'
import { dataRU } from './ServiceList'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { selectedForm } from '../../actions'
import Step from '../Steps/Step';
import {useTranslation} from 'react-i18next'

function Services(props) {
    const {t, i18n}=useTranslation();

    return (
        <div className={style.main}>
            <div className={style.container}>
                <h1>{t("services.h1")}</h1>
                <h2>{t("services.h2")}</h2>
                <Step count={0} />
                <div className={style.services}>
                    {   i18n.language === "ru" ?
                        dataRU.map(item => {
                            return (
                                <Link key={item.id} to={`/services${item.link}`} onClick={() => props.selectedForm(item)}>
                                    <div className={style.icon} >
                                        <div className={style.logo} style={{ backgroundImage: `url(${item.img})` }}>

                                        </div>
                                    </div>
                                    {item.text}
                                </Link>
                            )
                        })
                        :
                        dataUZ.map(item => {
                            return (
                                <Link key={item.id} to={`/services${item.link}`} onClick={() => props.selectedForm(item)}>
                                    <div className={style.icon} >
                                        <div className={style.logo} style={{ backgroundImage: `url(${item.img})` }}>

                                        </div>
                                    </div>
                                    {item.text}
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default connect(null, { selectedForm })(Services)
