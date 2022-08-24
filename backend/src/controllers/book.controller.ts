import express from "express"
import BookModel from '../model/book'

export class BookController{


    getAllBooks=(req: express.Request, res: express.Response)=>{
        BookModel.find({},(err, books)=>{
            if(err) console.log(err);
            else res.json(books);
        })
    }

    delete=(req: express.Request, res: express.Response)=>{
        let id=req.body.id;
        BookModel.deleteOne({'id':id},(err, resp)=>{
            if(err) console.log(err);
            else res.json({"message":"ok"});
        })
    }
    
    add=(req: express.Request,res:express.Response)=>{
        let book=new BookModel({
            id: req.body.id,
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            publisher: req.body.publisher,
            year: req.body.year,
            language: req.body.language,
            cover: req.body.cover,
            score:[0,0],
            reservations:[],
            count:1
        })
        book.save((err,resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message":"error"});
            }
            else res.json({"message":"ok"});
        });
    }

    
    add2=(req: express.Request,res:express.Response)=>{
        let book=new BookModel({
            id: req.body.id,
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            publisher: req.body.publisher,
            year: req.body.year,
            language: req.body.language,
            cover: req.body.cover,
            score:[0,0],
            count:1,
            reservations:[],
            username:req.body.username
        })
        book.save((err,resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message":"error"});
            }
            else res.json({"message":"ok"});
        });
    }

    getBook=(req: express.Request,res:express.Response)=>{
        let id=req.body.id;

        BookModel.findOne({'id':id},(err,book)=>{
            if(err) console.log(err);
            else res.json(book);
        })
    }
    
    getIt=(req: express.Request, res: express.Response)=>{
        let id=req.body.id;
        BookModel.updateOne({'id':id},{$inc:{'count':-1}},(err, resp)=>{
            if(err) console.log(err);
            else res.json({"message":"ok"});
        })
    }
    
    returnIt=(req: express.Request, res: express.Response)=>{
        let id=req.body.id;
        BookModel.updateOne({'id':id},{$inc:{'count':1}},(err, resp)=>{
            if(err) console.log(err);
            else res.json({"message":"ok"});
        })
    }
    
    update=(req: express.Request, res: express.Response)=>{
        let id=req.body.id;
        let title=req.body.title;
        let author=req.body.author;
        let genre=req.body.genre;
        let year=req.body.year;
        let publisher=req.body.publisher;
        let language=req.body.language;
        let cover=req.body.cover;
        let available=req.body.available;
        BookModel.updateOne({'id':id},{$set:{'title':title,'author':author,'genre':genre,'year':year,'publisher':publisher,'language':language,'cover':cover,'count':available}},(err, resp)=>{
            if(err) console.log(err);
            else res.json({"message":"ok"});
        })
    }

    reserve=(req: express.Request, res: express.Response)=>{
        let id=req.body.id;
        let username=req.body.username;
        BookModel.updateOne({'id':id},{$push:{'reservations':username}},(err, resp)=>{
            if(err) console.log(err);
            else res.json({"message":"ok"});
        })
    }
    
    updateId=(req: express.Request, res: express.Response)=>{
        let id=req.body.id;
        BookModel.updateOne({'id':id},{$set:{'id':-id}},(err, resp)=>{
            if(err) console.log(err);
            else res.json({"message":"ok"});
        })
    }
    
    updateRes=(req: express.Request, res: express.Response)=>{
        let id=req.body.id;
        let username=req.body.username;
        BookModel.updateOne({'id':id},{$pull:{'reservations':username}},(err, resp)=>{
            if(err) console.log(err);
            else res.json({"message":"ok"});
        })
    }

    
    updateScore=(req: express.Request, res: express.Response)=>{
        let id=req.body.id;
        let score=req.body.score;
        BookModel.updateOne({'id':id},{$set:{'score':score}},(err, resp)=>{
            if(err) console.log(err);
            else res.json({"message":"ok"});
        })
    }


}