const express = require('express')
const mongoose = require('mongoose');
const methodOverride=require('method-override');
const flash = require('connect-flash');
const session = require('express-session')
const MongoStore = require('connect-mongo');
var cors = require('cors')
//swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require("swagger-jsdoc");
require('dotenv').config()

//swagger options
const options = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      title: "My apis in swaager",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./swagger/*.js"],
};

//port
const app = express()
const port = process.env.PORT || 3000
//routes
const userRoute=require('./routes/userRoutes');
const productRoute=require('./routes/productRoutes');

//middleware
app.use(cors())
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
//template engine
app.set('view engine','ejs');
//global variable
global.userIN = null;
global.user= null;
//method override
app.use(methodOverride('_method',{
  methods:['POST','GET']
}))

//session
app.use(
  session({
    secret: 'my_keyboard_cat', // Buradaki texti değiştireceğiz.
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.db_name })//connect mongo session
  })
);
//mongoose
mongoose.connect(process.env.db_name, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(()=>{
  console.log("connected mongo")
});

//flash message
app.use(flash());
app.use((req, res, next)=> {
  res.locals.flashMessages = req.flash();
  next();
})
//routes middleware
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  user=req.session.user;
  next();
});
//swagger
const swaggerSpecs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
//routes
app.use('/user',userRoute);
app.use('/product',productRoute);
app.get('/', (req, res) => {
    res.render('index');
})

app.listen(port,()=>{
  console.log("connected 3000")
})
