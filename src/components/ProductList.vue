<template>
<div>
<h1>Products ({{numberOfProducts}})</h1>
<Loading :loading="loading"></Loading>
<table class="table table-bordered table-hover">
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Quantity</th>
      <th>Cost</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr   v-for="product in products" @click="selectProduct(product)">
      <th>{{product.id}}</th>
      <td>{{product.name}}</td>
      <td>{{product.quantity}} {{product.unit}}</td>
      <td>{{product.cost | currency}}</td>
      <td>
        <button class="btn btn-danger" @click="deleteProduct(product)"> X</button>
        <a class="btn btn-primary" v-bind:href="'/product-update/' + product.id"> &#9998; </a>
      
      </td>
    </tr>
  </tbody>
</table>
<div>
<ul class="list-horizontal">
  <li><button class="btn btn-primary" @click="getPreviousPage()">Previous</button></li>
  <li><button class="btn btn-primary" @click="getNextPage()">Next</button></li>
</ul>


</div>

<div class="card text-center" v-if="selectedProduct">
  <div class="card-header">
    #{{selectedProduct.pk}} -- {{selectedProduct.sku}}
  </div>
  <div class="card-block">
    <h4 class="card-title">{{selectedProduct.name}}</h4>
    <p class="card-text">
    {{selectedProduct.description}}
    </p>
    <a class="btn btn-primary" v-bind:href="'/product-update/' + selectedProduct.id"> &#9998; </a>
    <button class="btn btn-danger" @click="deleteProduct(selectedProduct)"> X</button>

  </div>

</div>
</div>
</template>

<script>
/* eslint-disable */
import {APIService} from '../http/APIService';
import Loading from './Loading';
const API_URL = 'http://localhost:3000';
const apiService = new APIService();

//https://gist.github.com/niallo/3109252
function parse_link_header(header) {
    if (header.length === 0) {
        throw new Error("input must not be of zero length");
    }

    // Split parts by comma
    var parts = header.split(',');
    var links = {};
    // Parse each part into a named link
    for(var i=0; i<parts.length; i++) {
        var section = parts[i].split(';');
        if (section.length !== 2) {
            throw new Error("section could not be split on ';'");
        }
        var url = section[0].replace(/<(.*)>/, '$1').trim();
        var name = section[1].replace(/rel="(.*)"/, '$1').trim();
        links[name] = url;
    }
    return links;
}

export default {
  name: 'ProductList',
  components: {
    Loading
  },
  data() {
    return {
      selectedProduct:null,
      products: [],
      pages : [],
      numberOfProducts:0,
      loading: false,
      nextPageURL:'',
      previousPageURL:'',
      firstPageURL:'',
      nextPageURL:''
      
    };
  }, 
  methods: {
    getProducts(){

      this.loading = true;    
      apiService.getProducts().then((res) => {
        this.products = res.data;
        if(res.headers && res.headers.link)
        {
            const link = parse_link_header(res.headers.link);
            if(link.first) this.firstPageURL = link.first;
            if(link.next) this.nextPageURL = link.next;
            if(link.prev) this.previousPageURL = link.prev;
            if(link.last) this.lastPageURL = link.last;
            
        }
        //console.log(parse_link_header(res.headers.link));
        this.numberOfProducts = res.headers["x-total-count"];
        this.loading = false;
      });
    },
    getPage(link){
      this.loading = true;  
      apiService.getProductsByURL(link).then((res) => {
        this.products = res.data;
        if(res.headers && res.headers.link)
        {
            const link = parse_link_header(res.headers.link);
            if(link.first) this.firstPageURL = link.first;
            if(link.next) this.nextPageURL = link.next;
            if(link.prev) this.previousPageURL = link.prev;
            if(link.last) this.lastPageURL = link.last;
            
        }
        this.loading = false;
      });     
    },
    getNextPage(){
      this.loading = true;  
      apiService.getProductsByURL(this.nextPageURL).then((res) => {
        console.log(res);
        this.products = res.data;
        if(res.headers && res.headers.link)
        {
            const link = parse_link_header(res.headers.link);
            if(link.first) this.firstPageURL = link.first;
            if(link.next) this.nextPageURL = link.next;
            if(link.prev) this.previousPageURL = link.prev;
            if(link.last) this.lastPageURL = link.last;
            
        }
        this.loading = false;
      });      
      
    },
    getPreviousPage(){
      this.loading = true;  
      apiService.getProductsByURL(this.previousPageURL).then((res) => {
        this.products = res.data;
        if(res.headers && res.headers.link)
        {
            const link = parse_link_header(res.headers.link);
            if(link.first) this.firstPageURL = link.first;
            if(link.next) this.nextPageURL = link.next;
            if(link.prev) this.previousPageURL = link.prev;
            if(link.last) this.lastPageURL = link.last;
            
        }
        this.loading = false;
      });      
            
    },
    deleteProduct(product){
      console.log("deleting product: " + JSON.stringify(product))
      apiService.deleteProduct(product).then((r)=>{
        console.log(r);
        if(r.status === 204)
        {
          alert("Product deleted");
          this.$router.go()
          
        }
      })
    },
    selectProduct(product){
      this.selectedProduct = product;
    }
  },
  mounted() {
   
    this.getProducts();

  },
}
</script>
<style scoped>

</style>
