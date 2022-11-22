const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const { getAuth, signInWithEmailAndPassword } =  require("firebase/auth");
const {config, admin} = require('./config');

app = express()
const port = config.port

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/static', express.static(path.join(__dirname, 'public')))

app.set('view engine', 'pug')

app.get('/prueba', (req, res)=>{
  res.send('Hola mundo')
})

app.get('/signin', function (req, res) {
  res.render('sign', {title: 'Iniciar Sesion', btnText: 'Ingresar', formAction: '/signin', h1Text: 'Iniciar Sesión'});
})

app.post('/signin', function (req, res) {
  const auth = getAuth();

  signInWithEmailAndPassword( auth, req.body.email, req.body.password)
    .then(function (user) {
      res.redirect('/')
    })
    .catch(function (error) {
      console.log(error)
      res.redirect('/signin')
    })
})

app.get('/signup', (req, res)=>{
  res.render('sign', {title: 'Registrar Usuario', btnText: 'Registrar', formAction: '/signup', h1Text: 'Registrar Usuario'})
})

app.post('/signup', (req, res)=>{
  admin.auth().createUser({
    email: req.body.email.toLowerCase(),
    emailVerified: false,
    password: req.body.password,
    disabled: false
  })
  .then(async function (userRecord) {
    console.log('Successfully created new user:', userRecord.uid);
    res.redirect('/')
  })
  .catch(function (error) {
    console.log('Error creating new user:', error.message);
    res.redirect('/signin', {
      errMessage: error.message
    })
  })
})

app.get('/', function (req, res) {
  let user = getAuth().currentUser
  console.log(user)
  if(user != null){
    req.user = user
    res.render('index', { title: 'Hellow Analytics', message: 'Hello, enviado a una vista dinamica'});
  } else {
    res.redirect('/signin')
  }
})

app.listen(port, () => {
  console.log(`Hellow_Analytics escuchando el puerto: ${port}`)
})