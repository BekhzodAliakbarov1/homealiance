import React, { Fragment, useState, useEffect } from 'react'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
// import { BiNews, BiMessageDots } from 'react-icons/bi'
import { BsBuilding } from 'react-icons/bs'
// import { IoPeople } from 'react-icons/io5'
import style from './Sidebar.module.css'
import { connect } from 'react-redux'

import image from '../../../assets/images/icon.png'


function Sidebar(props) {
    const [sidebarOpen, setSidebarOpen] = useState(window.self.innerWidth > 800 ? true : false)
    useEffect(() => {
        const interval = setInterval(() => {
            if (window.self.innerWidth > 800) {
                setSidebarOpen(true)
            }
        }, 1000);
        return () => {
            clearInterval(interval)
        }
    })
    const dayRender = () => {
        const a = new Date()
        if (a.getHours() >= 4 && a.getHours() <= 10) {
            return 'Good Morning'
        } else if (a.getHours() > 16 && a.getHours() < 10) {
            return 'Good Afternoon'
        } else {
            return 'Good Evening'
        }
    }


    return (
        <Fragment>
            <div className={sidebarOpen ? `${style.main} ${style.mainOpen}` : `${style.main} ${style.mainClose}`}  >
                <div className={style.container}>
                    <AiOutlineClose onClick={() => setSidebarOpen(false)} />
                    <h1 className={style.hello}>{dayRender()} <span>{props.admin?.username}{props.admin?.name}</span></h1>
                    <div className={style.image} style={{ backgroundImage: `url(${image})` }}>
                        <h4
                            onClick={() => {
                                window.self.innerWidth < 800 && setSidebarOpen(false)
                                props.clicked('Main')
                            }}
                        >

                        </h4>
                    </div>
                    <div className={style.links}>
                        {/* <div className={style.link}>
                            <BiNews />
                            <h4
                                onClick={() => {
                                    window.self.innerWidth < 800 && setSidebarOpen(false)
                                    props.clicked('News')
                                }}
                            >
                                News
                            </h4>
                        </div> */}
                        {/* <div className={style.link}>
                            <BiMessageDots />
                            <h4
                                onClick={() => {
                                    window.self.innerWidth < 800 && setSidebarOpen(false)
                                    props.clicked('Message')
                                }}
                            >
                                Messages
                            </h4>
                        </div> */}
                        {/* <div className={style.link}>
                            <IoPeople />
                            <h4
                                onClick={() => {
                                    window.self.innerWidth < 800 && setSidebarOpen(false)
                                    props.clicked('Students')
                                }}
                            >
                                Students
                            </h4>
                        </div> */}
                        <div className={style.link}>
                            <BsBuilding />
                            <h4
                                onClick={() => {
                                    window.self.innerWidth < 800 && setSidebarOpen(false)
                                    props.clicked('Grants')
                                }}
                            >
                                Orders
                            </h4>
                        </div>
                        {/* <div className={style.link}>
                            <BsBuilding />
                            <h4
                                onClick={() => {
                                    window.self.innerWidth < 800 && setSidebarOpen(false)
                                    props.clicked('Images')
                                }}
                            >
                                Images
                            </h4>
                        </div> */}
                        {/* <div className={style.link}>
                            <BsBuilding />
                            <h4
                                onClick={() => {
                                    window.self.innerWidth < 800 && setSidebarOpen(false)
                                    props.clicked('Vacancy')
                                }}
                            >
                                Vacancy
                            </h4>
                        </div> */}
                        <div className={style.link}>
                            <BsBuilding />
                            <h4
                                onClick={() => {
                                    window.self.innerWidth < 800 && setSidebarOpen(false)
                                    props.clicked('Admin')
                                }}
                            >
                                Admin
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className={!sidebarOpen ? `${style.visibleLink} ${style.visibleLinkOpen}` : `${style.visibleLink} ${style.visibleLinkClose}`}>
                <AiOutlineMenu onClick={() => setSidebarOpen(true)} />
            </div>
        </Fragment>
    )
}

const mapStateTProps = state => {
    return {
        admin: state.admin[0]
    }
}


export default connect(mapStateTProps, null)(Sidebar)
