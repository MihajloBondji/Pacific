const express=require('express');
const cors=require('cors');
const app=express();
const port=3000;
const multer=require('multer');
var photoName;
const storage=multer.diskStorage({
    destination:'../assets/profilePhotos/',
    filename:function(req,file,cb){
        photoName=Date.now()+'.'+file.mimetype.split('/')[1];
        cb(null,photoName);
    }
})

const upload=multer({storage:storage})

const storage2=multer.diskStorage({
    destination:'../assets/books/',
    filename:function(req,file,cb){
        photoName=Date.now()+'.'+file.mimetype.split('/')[1];
        cb(null,photoName);
    }
})

const upload2=multer({storage:storage2})

app.use(cors());

app.post('/books',upload2.single('file'),(req,res)=>{
    res.json({"photo":photoName});
})

app.post('/',upload.single('file'),(req,res)=>{
    res.json({"photo":photoName});
})

app.listen(port,()=>console.log(`listening on port ${port}`))