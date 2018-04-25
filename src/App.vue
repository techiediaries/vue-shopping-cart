<template>
<div>
    <nav class="navbar navbar-expand-md bg-light fixed-top " style="	box-shadow: 5px 3px 10px rgba(0,0,0,0.1);">
      <a class="navbar-brand" href="#"> Vue Shopping Cart </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav mr-auto">

          <li class="nav-item">
          <a  class="btn btn-light" href="/">Home</a>
          </li>
          <li class="nav-item">
          <a  class="btn btn-light" href="/product-list">Products</a>
          </li>
          <li class="nav-item">
          <a class="btn btn-light" href="/product-create">Create</a>
          </li>
          
        </ul>
          <button
            class="btn btn-primary btn-margin"
            v-if="!authenticated"
            @click="login()">
              Log In
          </button>

          <button
            class="btn btn-primary btn-margin"
            v-if="authenticated"
            @click="logout()">
              Log Out
          </button>

      </div>
    </nav>

    <div class="container">
      <router-view 
        :auth="auth" 
        :authenticated="authenticated">
      </router-view>
    </div>

</div>  
</template>

<script>
/* eslint-disable */

import AuthService from './auth/AuthService'

const auth = new AuthService()

const { login, logout, authenticated, authNotifier } = auth

export default {
  name: 'app',
  data () {
    authNotifier.on('authChange', authState => {
      this.authenticated = authState.authenticated
    })
    return {
      auth,
      authenticated
    }
  },
  methods: {
    login,
    logout
  }
}
</script>

<style>
@import './assets/bootstrap.min.css';

body {
  min-height: 75rem;
  padding-top: 4.5rem;
  	font-family: "Open Sans", sans-serif; 
}
.nav-item{
  padding:1px;
  margin-left: 5px;
}
</style>
