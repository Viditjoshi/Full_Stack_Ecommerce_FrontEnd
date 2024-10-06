import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Typography } from '@mui/material';
import Sidebar from '../Sidebar';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import toast from 'react-hot-toast';
import { DeleteUser, GetUsersDetails, resetUserState } from '../../../slices/UserInfo';

const GetAllUser = () => {
    const dispatch = useDispatch();
    const { loading, error, users, isdeleted } = useSelector((state) => state.UserListAdmin);

    const deleteOrderHandler = (id) => {
        dispatch(DeleteUser({ id }))
    }
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        if (isdeleted) {
            toast.success("User deleted successfully");
            dispatch(resetUserState());
        }
        dispatch(GetUsersDetails());
    }, [dispatch, isdeleted, error]);

    const columns = [
        { field: 'id', headerName: 'User ID', minWidth: 300, flex: 1 },
        {
            field: 'Name',
            headerName: 'Name',
            minWidth: 150,
            flex: 0.5,
        },
        {
            field: 'Email',
            headerName: 'Email',
            minWidth: 150,
            flex: 0.3,
        },
        {
            field: 'Role',
            headerName: 'Role',
            minWidth: 270,
            flex: 0.5,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 150,
            flex: 0.3,
            sortable: false,
            renderCell: (params) => (
                <Fragment>
                    <Link to={`/admin/users/${params.row.id}`}>
                        <EditIcon />
                    </Link>
                    <Button onClick={() => deleteOrderHandler(params.row.id)}>
                        <DeleteIcon className='text-black' />
                    </Button>
                </Fragment>
            ),
        },
    ];

    const rows = users?.map((user) => ({
        id: user._id,
        Role: user.role,
        Email: user.email,
        Name: user.name,
    })) || [];
    return (
        <div className="flex flex-col md:flex-row w-full h-full">
            <div className="w-full md:w-[15%] bg-gray-800">
                <Sidebar />
            </div>
            <div className="w-full md:w-[85%] bg-slate-100 p-4 md:p-6 flex-1">
                <Typography variant="h4" component="h1" gutterBottom>
                    User List
                </Typography>
                {loading ? (
                    <Typography>Loading...</Typography>
                ) : (
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        disableSelectionOnClick
                        className="myOrdersTable shadow-md bg-white animate-slideUp"
                        autoHeight
                    />
                )}
            </div>
        </div>
    )
}

export default GetAllUser
