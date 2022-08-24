import express from "express"
import BorrowModel from '../model/borrow'

export class BorrowController{
    
    getBorrowsUser=(req: express.Request,res:express.Response)=>{
        let username=req.body.username;

        BorrowModel.find({'user':username},(err,borrows)=>{
            if(err) console.log(err);
            else res.json(borrows);
        })
    }
    
    getBorrowsUserTake=(req: express.Request,res:express.Response)=>{
        let username=req.body.username;

        BorrowModel.find({'user':username,'dateBack':0},(err,borrows)=>{
            if(err) console.log(err);
            else res.json(borrows);
        })
    }
    
    
    getBorrowsBookTaken=(req: express.Request,res:express.Response)=>{
        let bookId=req.body.bookId;

        BorrowModel.find({'bookId':bookId,'dateBack':0},(err,borrows)=>{
            if(err) console.log(err);
            else res.json(borrows);
        })
    }
    
    
    return=(req: express.Request, res: express.Response)=>{
        let id=req.body.id;
        BorrowModel.updateOne({'id':id},{$set:{'dateBack':Date.now()}},(err, resp)=>{
            if(err) console.log(err);
            else res.json({"message":"ok"});
        })
    }
    
    extend=(req: express.Request, res: express.Response)=>{
        let id=req.body.id;
        BorrowModel.updateOne({'id':id,'extend':0},{$set:{'extend':1}},(err, resp)=>{
            if(err) res.json({"message":"error"});
            else res.json({"message":"ok"});
        })
    }
    
    takenow=(req: express.Request, res: express.Response)=>{
        let id=req.body.id;
        BorrowModel.updateOne({'id':id},{$set:{'dateTake':Date.now()}},(err, resp)=>{
            if(err) res.json({"message":"error"});
            else res.json({"message":"ok"});
        })
    }

    getAllBorrows=(req: express.Request, res: express.Response)=>{
        BorrowModel.find({},(err, users)=>{
            if(err) console.log(err);
            else res.json(users);
        })
    }
    
    add=(req: express.Request,res:express.Response)=>{
        let borrow=new BorrowModel({
            id: req.body.id,
            bookId: req.body.bookId,
            user: req.body.user,
            cover: req.body.cover,
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            extend: req.body.extend,
            dateTake: req.body.dateTake,
            dateBack:req.body.dateBack
        })
        borrow.save((err,resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message":"error"});
            }
            else res.json({"message":"ok"});
        });
    }

}