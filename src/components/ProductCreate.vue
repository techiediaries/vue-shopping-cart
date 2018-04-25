<template>

        <div id="container" class="container">
      
            <div class="row">
            
                <div class="col-sm-8 offset-sm-2">
                <div class="alert alert-warning" v-show="showCreateMessage"  >
                  <button type="button" class="close" @click="hideMessage()">X</button>
                  <strong>Product successfully created!</strong>
                </div>
                <div class="alert alert-warning" v-show="showUpdateMessage"  >
                  <button type="button" class="close" @click="hideMessage()">X</button>
                  <strong>Product successfully updated!</strong>
                </div>
                
                <div class="alert alert-warning" v-show="showError"  >
                  <button type="button" class="close" @click="hideMessage()">X</button>
                  <strong>Error!</strong>
                </div>                
                    <h1>Create a Product</h1>
                    <div class="info-form">
                      <form>
                        <div class="form-group">
                          <label for="name">Product Name</label>
                          <input v-model="product.name" type="text" class="form-control" id="name" aria-describedby="nameHelp" placeholder="Enter name">
                          <small id="nameHelp" class="form-text text-muted">Enter your product's name</small>

                          <label for="sellPrice">Product Cost</label>
                          <input v-model="product.cost" type="text" class="form-control" id="sellPrice" aria-describedby="sellPriceHelp" placeholder="Enter name">
                          <small id="sellPriceHelp" class="form-text text-muted">Enter your product's selling price</small>

                          <label for="quantity">Product Quantity</label>
                          <input v-model="product.quantity" type="text" class="form-control" id="quantity" aria-describedby="quantityHelp" placeholder="Enter quantity">
                          <small id="quantityHelp" class="form-text text-muted">Enter your product's quantity</small>

                        </div>
                      </form>
                       <button class="btn btn-primary" v-if="!this.product.id" @click="createProduct()" ><span v-if="!creating">Create</span><span v-if="creating">Creating... Please wait </span></button>
                       <button class="btn btn-primary" v-if="this.product.id" @click="updateProduct()" ><span v-if="!updating">Update</span><span v-if="updating">Updating... Please wait </span></button>
                       <button class="btn btn-primary"  @click="newProduct()" >New..</button>

                    </div>
                </div>
            </div>
        </div>

</template>

</template>

<script>
/* eslint-disable */
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}



import {APIService} from '../http/APIService';


const apiService = new APIService();

export default {
  name: 'ProductCreate',
  components: {
  },
  data() {
    return {
      showCreateMessage: false,
      showUpdateMessage: false,
      showError: false,
      product: {},
      products: '',
      creating: false,
      updating: false
    };
  }, 
  methods: {
    hideMessage(){
      this.showCreateMessage = false;
      this.showUpdateMessage = false;
      this.showError = false;
    },
    createProduct(){
      console.log('create product' + JSON.stringify(this.product));
      this.creating = true;
      apiService.createProduct(this.product).then((result)=>{
          console.log(result);
          // success 
          if(result.status === 201){
            this.product = result.data;
            this.showCreateMessage = true;
            
            
          }
            sleep(1000).then(() => {
               this.creating = false;
            })          
      },(error)=>{
        this.showError = true;
            sleep(1000).then(() => {
               this.creating = false;
            })
      });
    },
    updateProduct(){
      this.updating = true;
      console.log('update product' + JSON.stringify(this.product));
      apiService.updateProduct(this.product).then((result)=>{
          console.log(result);
          // success 
          if(result.status === 200){
            //this.product = {};
            this.showUpdateMessage = true;
            sleep(1000).then(() => {
               this.updating = false;
            })
            
          }
          
      },(error)=>{
        this.showError = true;
        sleep(1000).then(() => {
               this.updating = false;
        })        
      });
    },
    newProduct(){
      this.product = {};
    }
    
  },
  mounted() {
    
    if(this.$route.params.id){
      console.log(this.$route.params.id)
      apiService.getProduct(this.$route.params.id).then((res)=>{
        console.log(res.data)
        this.product = res.data;
      })
    }
  },
}
</script>
<style scoped>
.aform{
  margin-left:  auto;
  width: 60%;
}
</style>
