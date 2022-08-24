import express from "express"
import DaysModel from '../model/days'

export class DaysController{


    get=(req: express.Request, res: express.Response)=>{
        DaysModel.findOne({},(err, books)=>{
            if(err) console.log(err);
            else res.json(books);
        })
    }

    update=(req: express.Request, res: express.Response)=>{
        let days=req.body.days;
        DaysModel.updateOne({'id':1},{$set:{'days':days}},(err, resp)=>{
            if(err) console.log(err);
            else res.json({"message":"ok"});
        })
    }
}