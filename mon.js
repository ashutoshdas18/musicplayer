const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ashu:Iamashu18@cluster0.2zqqb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useUnifiedTopology: true,
    useNewUrlParser: true 
    }
  )

const song = mongoose.model('songs',{
   value:{
        type:String
    },
    path:{
        type: String
    }
})

const admin = mongoose.model('ads',{
    uname:{
        type:String
    },
    password:{
        type:String
    }
})
module.exports = {song,admin}


