const express = require('express')
const app = express()
const path = require('path')
var bodyParser = require('body-parser')
const {song} = require('./mon')
const hbs = require('hbs');
const {admin} = require('./mon')
var port =process.env.PORT || 3000

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static(__dirname + '/src/'))
app.set('views',__dirname+'/src')
app.set('view engine', 'hbs');

app.listen(port, function () {
console.log('We are listening on port ' + port)
})

app.get('/add', (req, res,next) => {

        if(req.header('Cookie')!==undefined)
        {
            if(req.header('Cookie').split('=')[1]=="true")
            res.sendFile(__dirname+'/src/index2.html');
        }
        else
        res.redirect('/login');
    
});
app.post('/added',async(req, res) => {
const bdy = req.body;
if(req.header('Cookie')!==undefined)
{
    const Song = new song(bdy);
    await Song.save().then(()=>{
        res.send(Song.value);
    }).catch(e=>{
        console.log(e);
    })   
}

});


app.get('/', (req, res) => {
res.render('index');	
});

app.post('/song', function (req, res) {
var Sname = req.body;
song.findOne({value:Sname.value},(error,user)=>{
    if(error || user==null){
        res.send("Invalid Song")
    }
    else{
        res.send(user.path);
    }
})
})
app.get('/login',(req,res)=>{
    if(req.header('Cookie')===undefined){
        res.sendFile(__dirname+"/src/auth.html");
    }
    else if(req.header('Cookie').split('=')[1]=="true")
    {
        res.redirect('/');
    }
})
const auth = async function(req,res,next){
    try{
        const user = await admin.findOne({uname:req.body.username})
        if(user.password === req.body.password)
        {
            res.cookie('isAuth','true',{httpOnly:true});
            res.redirect('/add');
            next();
        }
        else if(user.password!==req.body.password)
        {
            res.redirect('/add');
            next();
        }
    }
    catch{
        res.redirect('/login');
        next();
    }
 
}
app.post('/authed',auth);