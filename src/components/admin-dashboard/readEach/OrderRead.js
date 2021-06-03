import React, { Fragment } from 'react'
import style from './Order.module.css'
import { connect } from 'react-redux'
import NotFound from '../main-parts/404';
import { Link } from 'react-router-dom';
import {
    FullscreenControl,
    GeolocationControl,
    Map,
    Placemark,
    YMaps,
    ZoomControl,
} from "react-yandex-maps";

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
                <h1>Buyurtma  Bo`yicha ma`lumotlar</h1>
                <div className={style.grantInformation}>
                    {
                        props.information ?
                            <Fragment>
                                <h1><span>Ism/Familya:  </span>{props.information.name}</h1>
                                <h1><span>Service turi:</span> {props.information.serviceType}</h1>
                                <h1><span>Telefon nomer:</span> {props.information.number}</h1>
                                <h1><span>Sanasi:</span> {props.information.date}</h1>
                                <h1><span>Vaqti:</span> {props.information.time}</h1>
                                <h1><span>Addres:</span> {props.information.AdressDistrict}, {props.information.AdressStreet}</h1>
                                <h1><span>Qisqacha ma`lumot:</span> {props.information.description}</h1>

                                {
                                    props.information.lat && props.information.lang ? <YMaps style={{ width: '500px', height: '75vh' }} >
                                        <Map defaultState={{ center: [props.information.lat, props.information.lang], zoom: 5 }} style={{ marginTop: '10px', width: "100%", height: '75vh' }}>
                                            <Placemark geometry={[props.information.lat, props.information.lang]} />
                                            <FullscreenControl options={{ float: "left" }} />
                                            <GeolocationControl options={{ float: "right" }} />
                                            <ZoomControl options={{ float: "left" }} />
                                        </Map>
                                    </YMaps>
                                        : <h1>User donot give permission or user sent only address</h1>
                                }
                            </Fragment> :
                            <Fragment>
                                <h1>Something Went Wrong</h1>
                            </Fragment>
                    }
                </div>
                <Link className={style.btn} to='/admin'>Main Page</Link>
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
