const express = require('express');
const app = express();
const path = require('path');
const morgon = require('morgan');
const bodyparser = require('body-parser');
const bodyParser = require('body-parser');
const e = require('express');

require('./db/conn');
const port = process.env.PORT || 3000;

const static_path = (path.join(__dirname,("../public")));
const partials_path = (path.join(__dirname,("../templates/partials")));
const tempate_path = (path.join(__dirname,("../templates/views")));


app.use(morgon('tiny'));

// mongoDB connection
 

// 'body parser'
app.use(bodyParser.urlencoded({extended:true}));


app.use('/',require('./routes/router'));
app.use(express.static(static_path));
app.set("view engine","ejs");
app.set("views",tempate_path);






app.listen(port,()=>{
    console.log(`Running on port ${port}`);
})