/* eslint-disable */
import axios from 'axios';
import AuthService from './auth.js';
const API_URL = 'http://localhost:3000';



export class APIService{
    constructor(){
      
    }
    getProducts() {
        const url = `${API_URL}/products?_page=1&_limit=10`;
        return axios.get(url, { headers: { Authorization: `Bearer ${AuthService.getAuthToken()}` }});
    }
    getProductsByURL(link){
        const url = `${link}`;
        return axios.get(url, { headers: { Authorization: `Bearer ${AuthService.getAuthToken()}` }});
        
    }
    getProduct(id) {
        const url = `${API_URL}/products/${id}`;
        return axios.get(url, { headers: { Authorization: `Bearer ${AuthService.getAuthToken()}` }});
    }    
    deleteProduct(product){
        const url = `${API_URL}/products/${product.id}`;
        return axios.delete(url, { headers: { Authorization: `Bearer ${AuthService.getAuthToken()}` }});

    }
    createProduct(product){
        const url = `${API_URL}/products/`;
        const headers = {Authorization: `Bearer ${AuthService.getAuthToken()}`};
        return axios.post(url,product,{headers: headers});
    }
    updateProduct(product){
        const url = `${API_URL}/products/${product.id}`;
        const headers = {Authorization: `Bearer ${AuthService.getAuthToken()}`};
        return axios.put(url,product,{headers: headers});
    }    
} 