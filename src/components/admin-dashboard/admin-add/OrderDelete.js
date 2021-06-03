import React from 'react'
import { Link } from 'react-router-dom'
import style from './GrantDelete.module.css'
import { deleteProduct } from '../../../actions'
import { connect } from 'react-redux'
import NotFound from '../main-parts/404'

function OrderDelete(props) {
    if (!props.admin) {
        return (
            <NotFound />
        )
    }
    const del = () => {
        props.deleteProduct('orders', props.item.id)
    }
    return (
        <div className={style.main}>
            <div className={style.container}>
                <h1>Do you want to delete?</h1>
                <div className={style.buttons}>
                    <Link to='/admin'>Back</Link>
                    <Link to='/admin' onClick={del}>Delete</Link>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        item: state.selected[0],
        admin: state.admin[0]
    }
}

export default connect(mapStateToProps, { deleteProduct })(OrderDelete)
