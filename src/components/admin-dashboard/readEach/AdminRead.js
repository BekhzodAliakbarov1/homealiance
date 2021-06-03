import React from 'react'
import style from './Style.module.css'
import { connect } from 'react-redux'
import NotFound from '../main-parts/404';
import { Link } from 'react-router-dom';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'


function AdminRead(props) {

    if (!props.admin) {
        // window.localStorage.removeItem('admin')
        return (
            <NotFound />
        )
    }

    return (
        <div className={style.main}>
            <div className={style.container}>
                <h1>Admin Bo`yicha ma`lumotlar</h1>
                <div className={style.content}>
                    <h1>Main Informations</h1>
                    <h2><span>Name:</span> {props.information.name}</h2>
                    <h2><span>Password:</span> {props.information.password}</h2>
                    <div className={style.sections}>
                        <h1>Sections</h1>
                        <h2><span>Order:</span> {props.information.orderPermission === 'TRUE' ? <AiOutlineCheck style={{ fill: 'lime' }} /> : <AiOutlineClose style={{ fill: 'red' }} />}</h2>
                        <h2><span>Admin:</span> {props.information.adminsPermission === 'TRUE' ? <AiOutlineCheck style={{ fill: 'lime' }} /> : <AiOutlineClose style={{ fill: 'red' }} />}</h2>
                    </div>
                </div>
                <Link to='/admin'>Main Page</Link>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        information: state.read[0],
        admin: state.admin[0]
    }
}

export default connect(mapStateToProps, null)(AdminRead)
