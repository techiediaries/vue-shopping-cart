<template>
    <div class="container" style="padding-top: 2.5rem;">
    <div class="card-columns" >
              
                <div class="card bg-light card-elegant" v-for="product in products">

                    <img class="card-img-top"  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/t-shirt.png" alt="Card image top">



                    <div class="card-body">
                        <h3 class="card-title" style="margin:0px;">{{product.name}}</h3>
                        <h4 class="card-subtitle" style="margin:0px;">{{product.cost | currency}}
                        Stock:{{product.quantity}}
                        </h4>
                        <!--<p class="card-text">Add this product to your cart</p>-->
                        <a href="#" class="card-link">Add to Cart</a>
                    </div>

                </div>
                <div class="card card-body bg-light card-elegant">
                   <a href="#" class="card-link">Load More..</a>


                </div>                

              

    </div>         
  </div>

</template>

<script>
/* eslint-disable */
import {APIService} from '../http/APIService';

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
    name: 'home',
    props: ['auth', 'authenticated'],
    data(){

        return {
          access_token: localStorage.getItem('access_token'),
          id_token: localStorage.getItem('id_token'),
          profile: {},
          products: [],
          loading: false,
          numberOfProducts:0
        }
    },    
    methods:{
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
    }
    },

  mounted(){
    this.getProducts();
  }
  }
</script>

<style>
.card-elegant {
  background-color: #FAFAFA;
  box-shadow:0 2px 4px rgba(0,0,0,.25);
  border: none;
}
.card-elegant .card-block {
  padding: 2rem 0 2.5rem 0;
  text-align: center;
}

.card-elegant .card-title {
  font-weight: normal;
  letter-spacing: .20rem;
  margin: 2.9rem 0;
  font-size: 1.2rem;
  color: #8B9185;
}

.card-elegant .card-title small {
  color: #999;
  display: inline-block;
  font-size: .85rem;
  font-weight: 300;
  margin-bottom: 1.5rem;
}

.card-elegant .card-text {
  border-bottom: .15rem solid #C7C7C5;
  color: #AAA7A0;
  font-size: .8rem;
  padding-bottom: 2.5rem;
  margin: 0 auto 2.4rem;
  max-width: 9.375rem;
}

.card-elegant .btn-link {
  color: #8B9185;
  font-size: .8rem;
  letter-spacing: .34rem;
  text-decoration: none;
}

.card-elegant .btn-link:hover,
.card-elegant .btn-link:focus {
  color: #666;
}
.card {
	background: #fff;
	box-shadow: 5px 3px 10px rgba(0,0,0,0.1);
	img {
		width: 100%;
	}
}
</style>