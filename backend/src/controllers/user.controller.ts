import express from "express"
import UserModel from '../model/user'

export class UserController{
    login=(req: express.Request,res:express.Response)=>{
        let username=req.body.username;
        let password=req.body.password;

        UserModel.findOne({'username':username,'password':password},(err,user)=>{
            if(err) console.log(err);
            else res.json(user);
        })
    }

    findUsername=(req: express.Request,res:express.Response)=>{ 
        let user=new UserModel({
        username: req.body.username
    })
        
        UserModel.findOne({'username':user.username},(err,user)=>{
            if(err) console.log(err);
            else if(user!=null)
            {
                res.json({"message":"Username taken"});
            }
            else res.json({"message":"ok"});
        });
        
    }

    findMail=(req: express.Request,res:express.Response)=>{ 
        let user=new UserModel({
        mail: req.body.mail
    })
        
        UserModel.findOne({'mail':user.mail},(err,user)=>{
            if(err) console.log(err);
            else if(user!=null)
            {
                res.json({"message":"Email taken"});
            }
            else res.json({"message":"ok"});
        });
        
    }

    register=(req: express.Request,res:express.Response)=>{
        let user=new UserModel({
            username: req.body.username,
            password: req.body.password,
            fullname: req.body.fullname,
            address: req.body.address,
            phone: req.body.phone,
            mail: req.body.mail,
            photo: req.body.photo,
            type: req.body.type
        })
       
        user.save((err,user)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message":"error"});
            }
            else res.json({"message":"ok"});
        });
    }

    getAllUsers=(req: express.Request, res: express.Response)=>{
        UserModel.find({},(err, users)=>{
            if(err) console.log(err);
            else res.json(users);
        })
    }
    
    update=(req: express.Request, res: express.Response)=>{
        let username=req.body.username;
        let type=req.body.type;
        UserModel.updateOne({'username':username},{$set:{'type':type}},(err, resp)=>{
            if(err) console.log(err);
            else res.json({"message":"ok"});
        })
    }
    
    updateInfo=(req: express.Request, res: express.Response)=>{
        let oldusername=req.body.oldusername;
        let username=req.body.username;
        let fullname=req.body.fullname;
        let address=req.body.address;
        let phone=req.body.phone;
        let mail=req.body.mail;
        let photo=req.body.photo;
        UserModel.updateOne({'username':oldusername},{$set:{'username':username,'fullname':fullname,'address':address,'phone':phone,'mail':mail,'photo':photo}},(err, resp)=>{
            if(err) console.log(err);
            else res.json({"message":"ok"});
        })
    }

    
    delete=(req: express.Request, res: express.Response)=>{
        let username=req.body.username;
        UserModel.deleteOne({'username':username},(err, resp)=>{
            if(err) console.log(err);
            else res.json({"message":"ok"});
        })
    }
    
    changePass=(req: express.Request, res: express.Response)=>{
        let username=req.body.username;
        let password=req.body.password;
        UserModel.updateOne({'username':username},{$set:{'password':password}},(err, resp)=>{
            if(err) console.log(err);
            else res.json({"message":"ok"});
        })
    }
}