import React, { useReducer } from 'react'
import style from './GrantAdd.module.css'
import { addProduct } from '../../../actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import NotFound from '../main-parts/404'

const initialState = {
    name: '',
    password: '',
    password_confirm: '',
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
        case 'PASSWORD_CONFIRM':
            return {
                ...state, password_confirm: action.payload
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




function ImageAdd(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    console.log(props);
    if (!props.admin) {
        // window.localStorage.removeItem('admin')
        return (
            <NotFound />
        )
    }
    const submitHandler = (e) => {
        e.preventDefault()
        if (state.title !== '' && state.paragraph !== '' && state.date !== '') {
            props.addProduct('admins', state)
        }
        dispatch({ type: 'CLEAR' })
        dispatch({ type: 'CLICKED' })

    }
    // const addLocal = () => {
    //     window.localStorage.setItem('admin', '12211221')
    // }
    return (
        <div className={style.main}>
            <div className={style.container}>
                <h1>News Admin</h1>
                <form
                    onSubmit={submitHandler}
                >
                    <div className={style.block}>
                        <h2>Username</h2>
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
                        <h2>Password confirm</h2>
                        <input
                            required
                            value={state.password_confirm}
                            type="password"
                            onChange={e => dispatch({ type: 'PASSWORD_CONFIRM', payload: e.target.value })}
                        />

                    </div>
                    <button type="submit">Submit</button>
                </form>

            </div>
            {
                state.clicked && <div className={style.modal}>
                    <h1>Added Successfully</h1>
                    {/* <button><Link to='/admin' onClick={addLocal}>Back</Link></button> */}
                    <button><Link to='/admin'>Back</Link></button>
                </div>
            }
        </div>
    )
}
const mapStateToProps = state => {
    return {
        item: state.selected[0],
        admin: state.admin[0]
    }
}

export default connect(mapStateToProps, { addProduct })(ImageAdd)
