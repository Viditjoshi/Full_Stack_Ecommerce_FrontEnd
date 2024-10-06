import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

const ProtectedRoute = () => {
  const { isAuthanticated, loading } = useSelector(state => state.auth)
  const navigate = useNavigate();

  return (
    <Fragment>
      {
        !loading && (
          isAuthanticated ? (<Outlet />) : (navigate("/login"))

        )
      }

    </Fragment>
  )
}

export default ProtectedRoute
