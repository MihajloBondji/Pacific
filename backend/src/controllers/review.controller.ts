import express from "express"
import ReviewModel from '../model/review'

export class ReviewController{
   
    add=(req: express.Request,res:express.Response)=>{
        let review=new ReviewModel({
            id: req.body.id,
            bookId: req.body.bookId,
            score: req.body.score,
            text: req.body.text,
            user: req.body.user,
            date: req.body.date
        })
        review.save((err,resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message":"error"});
            }
            else res.json({"message":"ok"});
        });
    }

    
    update=(req: express.Request, res: express.Response)=>{
        let id= req.body.id;
        let bookId= req.body.bookId;
        let score= req.body.score;
        let text= req.body.text;
        let user= req.body.user;
        let date= req.body.date;
        ReviewModel.updateOne({'id':id},{$set:{'bookId':bookId,'score':score,'text':text,'date':date}},(err, resp)=>{
            if(err) console.log(err);
            else res.json({"message":"ok"});
        })
    }
    
    getReviewsBook=(req: express.Request,res:express.Response)=>{
        let bookId=req.body.bookId;

        ReviewModel.find({'bookId':bookId},(err,reviews)=>{
            if(err) console.log(err);
            else res.json(reviews);
        })
    }

}