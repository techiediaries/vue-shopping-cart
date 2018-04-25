<template>
                <div class="card bg-light card-elegant">

                    <img class="card-img-top"  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/t-shirt.png" alt="Card image top">



                    <div class="card-body">
                        <h3 class="card-title" style="margin:0px;">{{product.name}}</h3>
                        <h4 class="card-subtitle" style="margin:0px;">{{product.cost | currency}}
                        - Quantity: {{product.quantity}}
                        </h4>
                        <!--<p class="card-text">Add this product to your cart</p>-->
                        <a href="#" class="card-link">Add to Cart</a>
                    </div>

                </div>
</template>

<script>
export default {
  name: 'Product',
  props: {
    product: {}
  },
  components: { }
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