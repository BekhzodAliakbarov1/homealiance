import React, { useEffect, useReducer } from 'react'
import { editProduct } from '../../../actions'
import { connect } from 'react-redux'
import style from './GrantEdit.module.css'
import { Link } from 'react-router-dom'
import NotFound from '../main-parts/404'


const initialState = {
    name: '',
    password: '',
    adminsPermission: "",
    orderPermission: "",
    clicked: false
}
const reducer = (state, action) => {
    switch (action.type) {
        case 'NAME':
            return {
                ...state, name: action.payload
            }
        case 'PASSWORD':
            return {
                ...state, password: action.payload
            }

        case 'ADMIN':
            return {
                ...state, adminsPermission: action.payload
            }
        case 'ORDER':
            return {
                ...state, orderPermission: action.payload
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


function AdminEdit(props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    console.log(props.admin)
    useEffect(() => {
        dispatch({ type: 'NAME', payload: props.item?.name })
        dispatch({ type: 'PASSWORD', payload: props.item?.password })
        dispatch({ type: 'ADMIN', payload: props.item?.adminsPermission })
        dispatch({ type: 'ORDER', payload: props.item?.orderPermission })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (!props.admin) {
        return (
            <NotFound />
        )
    }
    const submitHandler = (e) => {
        e.preventDefault()
        props.editProduct('admins', props.item.id, state)

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
                    <h2>Name</h2>
                    <input
                        required
                        value={state.name}
                        type="text"
                        onChange={e => dispatch({ type: 'NAME', payload: e.target.value })}
                    />
                    <h2>Password</h2>
                    <input
                        required
                        value={state.password}
                        type="password"
                        onChange={e => dispatch({ type: 'PASSWORD', payload: e.target.value })}
                    />
                    <h2>Admin Permission</h2>
                    <select value={state.adminsPermission} onChange={(e) => dispatch({ type: 'ADMIN', payload: e.target.value })}>
                        <option value="TRUE">YES</option>
                        <option value="FALSE">NO</option>
                    </select>
                    <h2>Order Permission</h2>
                    <select value={state.orderPermission} onChange={(e) => dispatch({ type: 'ORDER', payload: e.target.value })}>
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

export default connect(mapStateToProps, { editProduct })(AdminEdit)
