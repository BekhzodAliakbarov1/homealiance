import React from 'react'
import style from './Information.module.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Step from '../Steps/Step'
import { fetchTypeOfService } from '../../actions'
import {useTranslation} from 'react-i18next'


const Information = (props) => {
    const {t,i18n}=useTranslation();
    console.log(props.datas)
    return (
        <div className={style.main}>
            <div className={style.container}>
                <h1>{t("information.h1")}</h1>
                <h3>{t("information.h3")}</h3>

                <Step count={1} />
                <div className={style.form}>
                    <h1>{t("information.form.h1")}</h1>
                    <div className={style.cards}>
                        {
                            props.datas.length > 0
                                ? (
                                        i18n.language === 'ru'?
                                        props.datas[1].map(data => {
                                            return (
                                                <Link onClick={() => props.fetchTypeOfService(data.type)} to='/service/description' className={style.card} key={data.id}>
                                                    <img src={data.img} alt="maishiy texnika" />
                                                    <h3>{data.data}</h3>
                                                </Link>
                                            )
                                        })
                                        :
                                        props.datas[0].map(data => {
                                        return (
                                            <Link onClick={() => props.fetchTypeOfService(data.type)} to='/service/description' className={style.card} key={data.id}>
                                                <img src={data.img} alt="maishiy texnika" />
                                                <h3>{data.data}</h3>
                                            </Link>
                                        )
                                        })
                                    )
                                : <div className={style.noService}>
                                    <h2>{t("information.form.noServicesh2")}</h2>
                                    <Link to='/services'>{t("information.form.back")}</Link>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        datas: state.selectedData
    }
}

export default connect(mapStateToProps, { fetchTypeOfService })(Information)
