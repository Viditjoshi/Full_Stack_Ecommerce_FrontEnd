import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

const AdminProtectedRoute = ({ component: Component, ...rest }) => {
    const { isAuthanticated, loading, user } = useSelector(state => state.auth)
    const navigate = useNavigate();

    return (
        <Fragment>
            {
                !loading && (
                    isAuthanticated ? user && user.role === "admin" ? (<Outlet />) : (navigate("/login")) : (navigate("/login"))
                )
            }

        </Fragment>
    )
}

export default AdminProtectedRoute
