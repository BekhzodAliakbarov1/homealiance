import React, { Fragment } from 'react'
import style from './Style.module.css'
import { connect } from 'react-redux'
import NotFound from '../main-parts/404';
import { Link } from 'react-router-dom';


function OrderRead(props) {
    console.log(props.information);
    if (!props.admin) {
        // window.localStorage.removeItem('admin')
        return (
            <NotFound />
        )
    }

    return (
        <div className={style.main}>
            <div className={style.container}>
                <h1>Kvota  Bo`yicha ma`lumotlar</h1>
                <div className={style.grantInformation}>
                    {
                        props.information ?
                            <Fragment>
                                <h1>{props.information.name}</h1>
                                <h1>{props.information.serviceType}</h1>
                                <h1>{props.information.number}</h1>
                                <h1>{props.information.date}</h1>
                                <h1>{props.information.time}</h1>
                            </Fragment> :
                            <Fragment>
                                <h1>Something Went Wrong</h1>
                            </Fragment>
                    }
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

export default connect(mapStateToProps, null)(OrderRead)
