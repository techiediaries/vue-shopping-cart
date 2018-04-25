/* eslint-disable */

import axios from 'axios';
const API_URL = 'http://localhost:3000';

import EventEmitter from 'eventemitter3'
import router from './../router'

export default class AuthService {
  authenticated = this.isAuthenticated()
  authNotifier = new EventEmitter()

  constructor () {
    this.login = this.login.bind(this)
    this.setSession = this.setSession.bind(this)
    this.logout = this.logout.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
  }



  login () {
    const url = `${API_URL}/auth/login`;
    return axios.post(url,{"email": "nilson@email.com","password":"nilson"}).then((r)=>{
      console.log(r);
      this.handleAuthentication(r);
    });

  }

  handleAuthentication (r) {

      if (r && r.data && r.data.accessToken) {

        console.log("token" + r.data);
        this.setSession(r.data)
        router.replace('/')
      } else{
        router.replace('/')
        console.log("Error!")
      }

  }

  setSession (authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('expires_at', expiresAt)
    this.authNotifier.emit('authChange', { authenticated: true })
  }

  logout () {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('expires_at')
    this.userProfile = null
    this.authNotifier.emit('authChange', false)
    // navigate to the home route
    router.replace('/')
  }

  isAuthenticated () {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }
  static getAuthToken(){
    return localStorage.getItem('access_token');
  }
  static authenticated(){
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt    
  }
  getUserProfile(cb){
    var accessToken =  localStorage.getItem('access_token')
    //if(accessToken) return this.auth0.client.userInfo(accessToken, cb);
    //else return null; 
  }
}
