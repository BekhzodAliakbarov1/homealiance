import React, { useEffect, useReducer } from 'react'
import style from './Contact.module.css'
// import { IoMdArrowBack } from 'react-icons/io'
import Step from '../Steps/Step'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUserInformation } from '../../actions'
import {useTranslation} from 'react-i18next'



const initialState = {
    firstName: '',
    number: '',
    email: '',
}
const reducer = (state = [], action) => {
    switch (action.type) {
        case "FIRSTNAME":
            return {
                ...state, firstName: action.payload
            };
        case "PHONENUMBER":
            return {
                ...state, number: action.payload
            };
        case "EMAIL":
            return {
                ...state, email: action.payload
            };
        default:
            return state;
    }
}
const Contact = props => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const {t}=useTranslation();
    useEffect(() => {
        props.information && dispatch({ type: 'FIRSTNAME', payload: props.information.firstName })
        props.information && dispatch({ type: 'PHONENUMBER', payload: props.information.number })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={style.main} >
            {
                props.serviceType.length === 0 && <Redirect push to="/services" />
            }
            <div className={style.container}>
                <h1>Book a service</h1>
                <h3>Pick a service to schedule your appointment</h3>
                <Step count={4} />
                <form >
                    <div className={style.header}>
                        <h2>
                            {t("contact.form.h2")}
                        </h2>
                    </div>
                        <h3 >
                            {t("contact.form.h3")}
                        </h3>
                    <div className={style.name}>
                        <div>
                            <label >{t("contact.form.input1l")}</label>
                            <input
                                type='text'
                                placeholder={t("contact.form.input1pl")}
                                value={state.firstName}
                                required
                                onChange={(e) => dispatch({ type: 'FIRSTNAME', payload: e.target.value })} />
                        </div>
                        <div>
                            <label >
                                {t("contact.form.input2l")}
                            </label>
                            <input
                                type='tel'
                                placeholder={t("contact.form.input2pl")}
                                value={state.number}
                                required
                                onChange={(e) => dispatch({ type: 'PHONENUMBER', payload: e.target.value })} />
                        </div>
                    </div>
                    <label >
                        {t("contact.form.input3l")}
                    </label>
                    <input
                        type='email'
                        placeholder={t("contact.form.input3pl")}
                        value={state.email}
                        onChange={(e) => dispatch({ type: 'EMAIL', payload: e.target.value })} />
                    {
                        state.number?.length >= 9 && state.firstName && <Link onClick={() => props.fetchUserInformation(state)} to='/service/location'>
                            Continue
                    </Link>
                    }
                </form>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        serviceType: state.serviceType,
        information: state.userInformation
    }
}

export default connect(mapStateToProps, { fetchUserInformation })(Contact)
