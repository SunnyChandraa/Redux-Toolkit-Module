//  create entityadapter untuk mempermuah kita untuk memanipulasi statedalam format array object 
// juga untk menomarlisasi data sehingga memudahkan kita jika kita bermain dengan nested data
import {createSlice, createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit";
import axios from "axios";

// create asyncthunk bisa menambahkan 3 parameter secara default diakhir yaitu /pending, /fulfilled dan /rejected
export const getProduct = createAsyncThunk("product/getProducts", async() => {
    const response = await axios.get('http://localhost:5/products');
    return response.data;
});

export const saveProduct = createAsyncThunk("product/saveProduct", async({title, price}) => {
    const response = await axios.post('http://localhost:5/products', {
        title,
        price
    });
    return response.data;
});

export const deleteProduct = createAsyncThunk("product/deleteProduct", async(id) => {
    await axios.delete(`http://localhost:5/products/${id}`);
    return id;
});

export const updateProduct = createAsyncThunk("product/updateProduct", async({id, title, price}) => {
    const response = await axios.patch(`http://localhost:5/products/${id}`, {
        title,
        price
    });
    return response.data;
});

const productEntity = createEntityAdapter({
    selectId: (product) => product.id
});

const productSlice = createSlice({
    name: "product",
    initialState: productEntity.getInitialState(),
    extraReducers:{
        [getProduct.fulfilled]: (state, action) => {
            // update state
            productEntity.setAll(state, action.payload);
        },
        [saveProduct.fulfilled]: (state, action) => {
            productEntity.addOne(state, action.payload);
        },
        [deleteProduct.fulfilled]: (state, action) => {
            productEntity.removeOne(state, action.payload);
        },
        [updateProduct.fulfilled]: (state, action) => {
            productEntity.updateOne(state, {id:action.payload.id, updates: action.payload});
        }
    }
});

// product disini harus sama dengan yg ada di store.js
export const productSelector = productEntity.getSelectors(state => state.product);
export default productSlice.reducer;
