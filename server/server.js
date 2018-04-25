const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')
var cors = require('cors');

const server = jsonServer.create()
const router = jsonServer.router('./server/database.json')
const userdb = JSON.parse(fs.readFileSync('./server/users.json', 'UTF-8'))


server.use(jsonServer.defaults());
//server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())


const SECRET_KEY = '123456789'

const expiresIn = 60 * 60 ;

server.use(cors());


// Create a token from a payload 
function createToken(payload){
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

// Verify the token 
function verifyToken(token){
  return  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err)
}

// Check if the user exists in database
function isAuthenticated({email, password}){
  return userdb.users.findIndex(user => user.email === email && user.password === password) !== -1
}


server.post('/auth/login', (req, res) => {
  const {email, password} = req.body
  if (isAuthenticated({email, password}) === false) {
    const status = 401
    const message = 'Incorrect email or password'
    res.status(status).json({status, message})
    return
  }
  const access_token = createToken({email, password})
  
  var authResult = {
      accessToken: access_token,
      expiresIn: expiresIn  
  }
  
  res.status(200).json(authResult);
  //res.redirect('/callback');

})

server.use(/^(?!\/auth).*$/,  (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401
    const message = 'Error in authorization format'
    res.status(status).json({status, message})
    return
  }
  try {
     verifyToken(req.headers.authorization.split(' ')[1])
     next()
  } catch (err) {
    const status = 401
    const message = 'Error access_token is revoked'
    res.status(status).json({status, message})
  }
})

server.use(router)

server.listen(3000, () => {
  console.log('The API server is running At http://localhost:3000')
})
