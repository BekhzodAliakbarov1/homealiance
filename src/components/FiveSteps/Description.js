import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Step from '../Steps/Step'
import style from './Description.module.css'
import { connect } from 'react-redux'
import { fetchDescription } from '../../actions'
import {useTranslation} from 'react-i18next'

const Description = (props) => {
    const {t}=useTranslation();
    const [description, setDescription] = useState('')

    return (
        <div className={style.main}>
            {
                props.serviceType.length === 0 && <Redirect push to="/services" />
            }
            <div className={style.container}>
                <h1>{t("description.h1")}</h1>
                <h3>{t("description.h3")}</h3>
                <Step count={2} />
                <div className={style.form}>
                    <h1>{t("description.form.h1")}</h1>
                    <div className={style.field}>
                        <label>{t("description.form.label")}</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder={t("description.form.textarea")}
                        ></textarea>
                        <div className={style.buttons}>
                            <Link to='/service/date' >
                            {t("description.form.skip")}
                            </Link>
                            <Link to='/service/date' onClick={() => props.fetchDescription(description)}>
                            {t("description.form.continue")}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        serviceType: state.serviceType,
    }
}


export default connect(mapStateToProps, { fetchDescription })(Description)
