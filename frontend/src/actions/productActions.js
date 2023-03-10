import axios from 'axios';
import { updatePasswordRequest, updatePasswordSuccess } from '../slices/authSlice';
import {createReviewFail, createReviewRequest, createReviewSuccess, deleteProductFail, deleteProductRequest, deleteProductSuccess, deleteReviewFail, deleteReviewRequest, deleteReviewSuccess, newProductFail, newProductRequest, newProductSuccess, productFail, productRequest, productSuccess, reviewsFail, reviewsRequest, reviewsSuccess, updateProductFail, updateProductRequest, updateProductSuccess} from '../slices/productSlice';
import {adminProductsFail, adminProductsRequest, adminProductsSuccess, productsFail, productsRequest, productsSuccess} from '../slices/productsSlice';

export const getProducts = (keyword, price, category, currentPage) => async(dispatch)=>{
    try {
        dispatch(productsRequest())
        let link = `/api/v1/products?page=${currentPage}`;

        if(keyword){
            link += `&keyword=${keyword}`
        }
        if(price){
            link += `&price[gte]=${price[0]}&price[lte]=${price[1]} `
        }
        if(category){
            link += `&category=${category}`
        }
        const { data } = await axios.get(link);
        dispatch(productsSuccess(data))
    } catch (error) {
        //handle Error
        dispatch(productsFail(error.response.data.message))
    }
}


export const getProduct = id => async(dispatch)=>{
    try {
        dispatch(productRequest())
        const { data } = await axios.get(`/api/v1/product/${id}`);
        dispatch(productSuccess(data))
    } catch (error) {
        //handle Error
        dispatch(productFail(error.response.data.message))
    }
}


export const createReview = reviewData => async(dispatch)=>{
    try {
        dispatch(createReviewRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/v1/review`,reviewData,config);
        dispatch(createReviewSuccess(data))
    } catch (error) {
        //handle Error
        dispatch(createReviewFail(error.response.data.message))
    }
}

export const getAdminProducts = async(dispatch)=>{
    try {
        dispatch(adminProductsRequest())
        const {data} = await axios.get(`/api/v1/admin/products`)

        dispatch(adminProductsSuccess(data))
    } catch (error) {
        //handle Error
        dispatch(adminProductsFail(error.response.data.message))
    }
}

export const createNewProduct = productData => async(dispatch)=>{
    try {
        dispatch(newProductRequest())
        const {data} = await axios.post(`/api/v1/admin/products/new`, productData)

        dispatch(newProductSuccess(data))
    } catch (error) {
        //handle Error
        dispatch(newProductFail(error.response.data.message))
    }
}

export const deleteProduct = id => async(dispatch)=>{
    try {
        dispatch(deleteProductRequest())
       await axios.delete(`/api/v1/admin/product/${id}`)

        dispatch(deleteProductSuccess())
    } catch (error) {
        //handle Error
        dispatch(deleteProductFail(error.response.data.message))
    }
}

export const updateProduct = (id, productData) => async(dispatch)=>{
    try {
        dispatch(updateProductRequest())
        const {data} = await axios.put(`/api/v1/admin/product/${id}`, productData)

        dispatch(updateProductSuccess(data))
    } catch (error) {
        //handle Error
        dispatch(updateProductFail(error.response.data.message))
    }
}


export const getReviews = id => async(dispatch) => {
    try {
        dispatch(reviewsRequest())
      
        const { data } = await axios.get(`/api/v1/admin/reviews`, {params: {id}});
        dispatch(reviewsSuccess(data))
    } catch (error) {
        //handle Error
        dispatch(reviewsFail(error.response.data.message))
    }
}

export const deleteReview = (productId,id) => async(dispatch) => {
    try {
        dispatch(deleteReviewRequest())
      
        await axios.delete(`/api/v1/admin/review`, {params: {productId,id}});
        dispatch(deleteReviewSuccess())
    } catch (error) {
        //handle Error
        dispatch(deleteReviewFail(error.response.data.message))
    }
}
