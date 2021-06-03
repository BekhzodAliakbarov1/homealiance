import React, { useState, Fragment } from 'react'
import Login from './admin-parts/Login'
import Main from './main-parts/Main'
import { connect } from 'react-redux'

function MainAdmin(props) {
    const [logedInSuccess, setLogedInSuccess] = useState(false)

    const login = (clicked) => {
        setLogedInSuccess(clicked)
    }

    const loggedBefore = () => {
        if (props.admin.length > 0 && props.admin[0] !== null) {
            return (
                <Main />
            )
        } else {
            return (
                <Fragment>
                    {
                        !logedInSuccess ? <Login login={login} /> : <Main />
                    }
                </Fragment>
            )
        }
    }
    return (
        <Fragment>
            {
                loggedBefore()
            }
        </Fragment>
    )

}
const mapStateToProps = state => {
    return {
        admin: state.admin
    }
}

export default connect(mapStateToProps, null)(MainAdmin)
