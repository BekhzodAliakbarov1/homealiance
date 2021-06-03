import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Order from '../admin-links/Order'
import style from './Main.module.css'
import MainPage from '../admin-links/MainPage'
import Admin from '../admin-links/Admin'
import { CurentAdmin } from '../../../actions'
import { connect } from 'react-redux'

function Main(props) {
    const [nameOfLink, setNameOfLink] = useState('')





    const clicked = linkName => {
        setNameOfLink(linkName)
    }
    const linkRender = (nameOfLink) => {
        switch (nameOfLink) {
            case 'Main':
                return (
                    <MainPage />
                )
            case 'Grants':
                return (
                    <Order />
                )
            case 'Admin':
                return (
                    <Admin />
                )
            default:
                return (
                    <MainPage />
                )
        }
    }


    return (
        <div className={style.main}>
            <Sidebar clicked={clicked} />
            <div className={style.content}>
                <div className={style.searcher}>
                    <h1>CELEBRO PRO</h1>
                    <div className={style.logOut}>
                        <button onClick={() => window.location.reload()} type="button">Log Out</button>
                    </div>
                </div>
                {linkRender(nameOfLink)}
            </div>
        </div>
    )
}


export default connect(null, { CurentAdmin })(Main)
