const express = require('express');
const hbs = require('hbs');
var app = express();
const fs = require('fs');

const port = process.env.PORT || 3030;
app.use(express.static(__dirname + '/assets'));

app.set('view engine','hbs');

hbs.registerPartials(__dirname+"/views/partials");

var now =  new Date().toString();


var message = (message)=>{
    return message;
}

var log = (req,res,next) =>{
    let log = now+" "+req.method+" "+req.url+'\n';
    console.log(log);
    fs.appendFile('logs.txt',log,(err)=>{
        if(err) {
            console.log(err);
        }
    });
    next();
};

var maintenance = (req,res,next)=>{
    res.render('maintenance.hbs',{
        today: now
    });
}

app.use(log);

app.use(maintenance);

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        day : new Date().getDate(),
        year : new Date().getFullYear(),
        message : message('Hello all internet users')
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        day : new Date().getDate(),
        year : new Date().getFullYear(),
        message : message('Hello all internet users')
    });
});



app.listen(port,()=>{
    console.log('Server is port in '+port );
});