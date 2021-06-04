import React, { useEffect, useReducer } from 'react'
import { editProduct } from '../../../actions'
import { connect } from 'react-redux'
import style from './GrantEdit.module.css'
import { Link } from 'react-router-dom'
import NotFound from '../main-parts/404'


const initialState = {
    orderConfirmed: "",
    workerSend: "",
    orderfinished: "",
    clicked: false
}
const reducer = (state, action) => {
    switch (action.type) {
        case 'WORKER':
            return {
                ...state, workerSend: action.payload
            }
        case 'FINISHED':
            return {
                ...state, orderfinished: action.payload
            }
        case 'CONFIRMED':
            return {
                ...state, orderConfirmed: action.payload
            }
        case 'CLEAR':
            return initialState
        case 'CLICKED':
            return {
                ...state, clicked: true
            }
        default:
            return state
    }
}


function OrderEdit(props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        dispatch({ type: 'WORKER', payload: props.item?.workerSend })
        dispatch({ type: 'FINISHED', payload: props.item?.orderfinished })
        dispatch({ type: 'CONFIRMED', payload: props.item?.orderConfirmed })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (!props.admin) {
        return (
            <NotFound />
        )
    }
    console.log(state);
    console.log(props.item.orderfinished);
    const submitHandler = (e) => {
        e.preventDefault()
        props.editProduct('orders', props.item.id, state)

        dispatch({ type: 'CLEAR' })
        dispatch({ type: 'CLICKED' })

    }
    return (
        <div className={style.main}>
            <div className={style.container}>
                <h1>New Admin</h1>
                <form
                    onSubmit={submitHandler}
                >
                    <h2>Confirmed</h2>
                    <select value={state.orderConfirmed} onChange={(e) => dispatch({ type: 'CONFIRMED', payload: e.target.value })}>
                        <option value="TRUE">YES</option>
                        <option value="FALSE">NO</option>
                    </select>
                    <h2>Worker sended</h2>
                    <select value={state.workerSend} onChange={(e) => dispatch({ type: 'WORKER', payload: e.target.value })}>
                        <option value="TRUE">YES</option>
                        <option value="FALSE">NO</option>
                    </select>
                    <h2>Finished</h2>
                    <select value={state.orderfinished} onChange={(e) => dispatch({ type: 'FINISHED', payload: e.target.value })}>
                        <option value="TRUE">YES</option>
                        <option value="FALSE">NO</option>
                    </select>



                    <button type="submit">Submit</button>
                </form>

            </div>
            {
                state.clicked && <div className={style.modal}>
                    <h1>Changed Successfully</h1>
                    <button><Link to='/admin'>Back</Link></button>
                </div>
            }
        </div >
    )
}
const mapStateToProps = state => {
    return {
        item: state.selected[0],
        admin: state.admin[0]
    }
}

export default connect(mapStateToProps, { editProduct })(OrderEdit)
