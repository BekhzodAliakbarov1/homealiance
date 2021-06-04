import React, { Fragment, useState, useEffect } from 'react'
import style from './News.module.css'
import { fetchOrderProducts, selectedAnyItem, ReadOrder } from '../../../actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import LoaderComponent from '../main-parts/Loader'


function Order(props) {
    const [name, setName] = useState('')

    useEffect(() => {
        props.fetchOrderProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    const listRender = () => {
        if (name.length > 0) {
            return (
                props.orders
                    ? props.orders.map((order, id) => order.serviceType.toLowerCase().includes(name.toLowerCase()) && (
                        <div key={order.id} className={style.tableDetail}>
                            <h2>{id}</h2>

                            <Fragment key={order.id}>
                                <h2>{order.serviceType}</h2>
                                <h2>{order.number}</h2>
                                <h2>{order.date}</h2>
                            </Fragment>

                            <div className={style.twoButtons}>
                                {props.admin.orderPermission === 'TRUE' && <Link to='/admin/delete/orders' onClick={() => props.selectedAnyItem(order)}>Delete</Link>}
                                {props.admin.orderPermission === 'TRUE' && <Link to='/admin/read/orders' onClick={() => props.ReadOrder(order)}> Read</Link>}
                                {props.admin.orderPermission === 'TRUE' && <Link to='/admin/edit/orders' onClick={() => props.selectedAnyItem(order)}> Edit</Link>}

                            </div>
                        </div>
                    ))
                    : <LoaderComponent />

            )
        } else {
            return (
                props.orders
                    ? props.orders.map((order, id) => {
                        if (order.id) {
                            return (
                                < div key={order.id} className={style.tableDetail} >
                                    <h2>{id}</h2>
                                    <Fragment key={order.id}>
                                        <h2>{order.serviceType}</h2>
                                        <h2>{order.number}</h2>
                                        <h2>{order.date}</h2>
                                    </Fragment>
                                    <div className={style.twoButtons}>
                                        {props.admin.orderPermission === 'TRUE' && <Link to='/admin/delete/orders' onClick={() => props.selectedAnyItem(order)}>Delete</Link>}
                                        {props.admin.orderPermission === 'TRUE' && <Link to='/admin/read/orders' onClick={() => props.ReadOrder(order)}> Read</Link>}
                                        {props.admin.orderPermission === 'TRUE' && <Link to='/admin/edit/orders' onClick={() => props.selectedAnyItem(order)}> Edit</Link>}
                                    </div>
                                </div >
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



    return (
        <div className={style.main}>
            <div className={style.container}>
                <Fragment>
                    <h4>Orders Tabel</h4>
                    <div className={style.searcher}>
                        <h2>Orders</h2>
                        <div className={style.buttons}>
                            <input
                                type="text"
                                placeholder='Search by title'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {/* {props.admin.orderPermission === 'TRUE' && <button
                                type="button"
                            >
                                <Link to='/admin/add/orders' onClick={() => props.selectedAnyItem('yesss')}>Add new order</Link>
                            </button>} */}
                        </div>
                    </div>
                    <div className={style.table}>
                        <h2>Id</h2>
                        <h2>Service Type</h2>
                        <h2>Number</h2>
                        <h2>Date</h2>
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
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        orders: state.order[0],
        admin: state.admin[0]
    }
}
export default connect(mapStateToProps, { fetchOrderProducts, selectedAnyItem, ReadOrder })(Order)


