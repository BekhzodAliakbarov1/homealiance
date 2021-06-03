import React, { Fragment, useState, useEffect } from 'react'
import style from './News.module.css'
import { fetchAdminsProducts, selectedAnyItem, ReadAdmin } from '../../../actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import LoaderComponent from '../main-parts/Loader'
import { notvisiblePassword } from '../admin-password/InvisiblePassword'
import { IoMdClose } from 'react-icons/io'
import { password as mainPassword } from '../admin-password/Password'

function Admin(props) {
    const [name, setName] = useState('')
    const [adminConfirm, setAdminConfirm] = useState(false)
    const [password, setPassword] = useState('')
    const [modalOpenCLick, setModalOpenCLick] = useState(false)
    const [error, setError] = useState(false)
    useEffect(() => {
        props.fetchAdminsProducts()
        setAdminConfirm(false)
        const timeOut = setInterval(() => {
            setError(false)
        }, 3000);
        return () => {
            clearInterval(timeOut)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const listRender = () => {
        if (name.length > 0) {
            return (
                props.admins
                    ? props.admins.map((admin, id) => admin.name.toLowerCase().includes(name.toLowerCase()) && (
                        <div key={admin.id} className={style.tableDetail}>
                            <h2>{id}</h2>
                            <h2>{admin.name.split('').length > 20 ? admin.name.slice(0, 20) : admin.name}</h2>
                            <h2 onClick={() => setModalOpenCLick(true)} style={{ cursor: 'pointer' }}>{!adminConfirm ? notvisiblePassword(admin.password) : (admin.password.split('').length > 30 ? admin.password.slice(0, 30) : admin.password)}</h2>
                            {/* <h2>{admin.date.split('').length > 30 ? admin.date.slice(0, 30) : admin.date}</h2> */}
                            <div className={style.twoButtons}>
                                {props.admin.adminsPermission === 'TRUE' && <Link to='/admin/delete/admin' onClick={() => props.selectedAnyItem(admin)}>Delete</Link>}
                                {props.admin.adminsPermission === 'TRUE' && <Link to='/admin/edit/admin' onClick={() => props.selectedAnyItem(admin)}> Edit</Link>}
                                {props.admin.adminsPermission === 'TRUE' && <Link to='/admin/read/admin' onClick={() => props.ReadAdmin(admin)}> Read</Link>}
                            </div>
                        </div>
                    ))
                    : <LoaderComponent />

            )
        } else {
            return (
                props.admins
                    ? props.admins.map((admin, index) => {
                        if (admin.id) {
                            return (
                                <div key={admin.id} className={style.tableDetail}>
                                    <h2>{index}</h2>
                                    <h2>{admin.name.split('').length > 20 ? admin.name.slice(0, 20) : admin.name}</h2>
                                    <h2 onClick={() => setModalOpenCLick(true)} style={{ cursor: 'pointer' }}>{!adminConfirm ? notvisiblePassword(admin.password) : (admin.password.split('').length > 30 ? admin.password.slice(0, 30) : admin.password)}</h2>

                                    <div className={style.twoButtons}>
                                        {props.admin.adminsPermission === 'TRUE' && <Link to='/admin/delete/admin' onClick={() => props.selectedAnyItem(admin)}>Delete</Link>}
                                        {props.admin.adminsPermission === 'TRUE' && <Link to='/admin/edit/admin' onClick={() => props.selectedAnyItem(admin)}> Edit</Link>}
                                        {props.admin.adminsPermission === 'TRUE' && <Link to='/admin/read/admin' onClick={() => props.ReadAdmin(admin)}> Read</Link>}
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <h1 style={{ position: 'absolute' }}>No Students yet</h1>
                            )
                        }
                    })
                    : <LoaderComponent />


            )
        }
    }

    const submitPassword = e => {
        e.preventDefault()
        if (password === mainPassword) {
            setError(false)
            setAdminConfirm(true)
            setModalOpenCLick(false)
            setPassword('')
        }
        else {
            setError(true)
            setAdminConfirm(false)
            setModalOpenCLick(true)
            setPassword('')
        }
    }


    const modalOpen = () => {
        return (
            <div className={style.modalMain}>
                <div className={style.modalContainer}>
                    <IoMdClose onClick={() => {
                        setModalOpenCLick(false)
                        setPassword('')
                    }} />
                    <form onSubmit={submitPassword}>
                        <h2>Enter super admin password!!!</h2>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit">Click</button>
                        <h5>{error && 'Something is Wrong '}</h5>
                    </form>
                </div>
            </div>
        )
    }


    return (
        <div className={style.main}>
            <div className={style.container}>
                <Fragment>
                    <h4>Admins Tabel</h4>
                    <div className={style.searcher}>
                        <h2>Admins</h2>
                        <div className={style.buttons}>
                            <input
                                type="text"
                                placeholder='Search by title'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {
                                props.admin.adminsPermission === 'TRUE' && <button
                                    type="button"
                                >
                                    <Link to='/admin/add/admin' onClick={() => props.selectedAnyItem('yesss')}>Add new admin</Link>
                                </button>
                            }
                        </div>
                    </div>
                    <div className={style.table}>
                        <h2>Id</h2>
                        <h2>Name</h2>
                        <h2>Password</h2>
                        <div className={style.twoButtons}>
                            <h2>Delete</h2>
                            <h2>Edit</h2>
                        </div>
                    </div>
                    {
                        listRender()
                    }
                </Fragment>

            </div>


            {modalOpenCLick && modalOpen()}
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        admins: state.productsAdmins[0],
        admin: state.admin[0]
    }
}
export default connect(mapStateToProps, { fetchAdminsProducts, selectedAnyItem, ReadAdmin })(Admin)


