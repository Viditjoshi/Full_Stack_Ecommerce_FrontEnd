import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import productDetailSlice from "./slices/productDetailSlice";
import authSlice from "./slices/loginUserSlice";
import UpdateProfileSlice from "./slices/UpdateProfile";
import CartSlice from "./slices/CartSlice";
import OrderSlice from "./slices/OrderSlice";
import MyOrderSlice from "./slices/MyOrderSlice";
import AddProdcutSlice from "./slices/AddProdcutSlice";
import DeleteProductSlice from "./slices/DeleteProductSlice";
import UpdateProductSlice from "./slices/UpdateProductSlice";
import UserInfo from "./slices/UserInfo";
const store = configureStore({
  reducer: {
    products: productsReducer,
    product: productDetailSlice,
    auth: authSlice,
    profile: UpdateProfileSlice,
    cart: CartSlice,
    newOrder: OrderSlice,
    myOrders: MyOrderSlice,
    // admin
    addProdcut: AddProdcutSlice,
    deleteProduct: DeleteProductSlice,
    UpdateProduct: UpdateProductSlice,
    UserListAdmin: UserInfo,
  },
});

export default store;
