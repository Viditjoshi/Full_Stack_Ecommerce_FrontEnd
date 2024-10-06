import React from 'react';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';


const Sidebar = () => {
    return (
        <div className="w-full h-full bg-white text-black">
            {/* Dashboard Link */}
            <Link to="/admin/dashboard" className="flex items-centerb bg-black text-white p-3 hover:text-gray-400">
                <DashboardIcon className="mr-2" /> Dashboard
            </Link>
            <div className='pl-3 pr-3 pt-2'>
                {/* Products Tree View */}
                <SimpleTreeView
                    slots={{
                        expandIcon: ImportExportIcon,
                        collapseIcon: ExpandMoreIcon,
                    }}
                >
                    <TreeItem nodeId="1" label="Products">
                        <Link to="/admin/product" className="flex items-center ml-2 mt-2 p-2  hover:text-gray-400">
                            <AddIcon className="mr-2" /> Add Product
                        </Link>
                        <Link to="/admin/products" className="flex items-center ml-2 mt-2 p-2 hover:text-gray-400">
                            <ListAltIcon className="mr-2" /> Product List
                        </Link>
                    </TreeItem>
                </SimpleTreeView>

                {/* Orders Link */}
                <Link to="/admin/orders" className="flex items-center mb-4 mt-4 p-2  hover:text-gray-400">
                    <ListAltIcon className="mr-2" /> Orders
                </Link>

                {/* Users Link */}
                <Link to="/admin/users" className="flex items-center mb-4 p-2 hover:text-gray-400">
                    <PeopleIcon className="mr-2" /> Users
                </Link>



            </div>

        </div>
    );
}

export default Sidebar;
