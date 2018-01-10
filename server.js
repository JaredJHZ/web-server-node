const express = require('express');
const hbs = require('hbs');
var app = express();
const fs = require('fs');
const helpers = require('./helpers');
const port = process.env.PORT || 3030;


var now =  new Date().toString();

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

var message = (message)=>{
    return message;
}

app.set('view engine','hbs');

app.use(express.static(__dirname+"/views/assets/"));

hbs.registerPartials(__dirname+"/views/partials");

hbs.registerHelper('list', function(context, options) {
    var ret = "<ul>";
  
    for(var i=0, j=context.length; i<j; i++) {
      ret = ret + "<li>" + options.fn(context[i]) + "</li>";
    }
  
    return ret + "</ul>";
  });

app.use(express.static(__dirname + '/assets'));

app.use(log);


/* Use when the maintenance is working
app.use(maintenance);
*/

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

app.get('/projects',(req,res)=>{
    res.render('proyects.hbs',{
        year: new Date().getFullYear,
        title: 'Projects',
        projects: [{
            name:'notes',
            link:'/notes'
        },{
            name:'weather',
            link:'/weather'
        },
        {
            name:'web-server',
            link:'/web-server'
        }],
    });
});



app.listen(port,()=>{
    console.log('Server is port in '+port );
});