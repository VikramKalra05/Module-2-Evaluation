const express = require("express");
const { PostModel } = require("../models/postModel");
const { auth } = require("../middleware/auth.middleware");

const postRouter = express.Router();

postRouter.post("/add", auth, async (req, res) => {
    try {
        const post = new PostModel(req.body);
        await post.save();
        res.status(200).send({"msg": "post has been saved", "success": true});
    } catch (error) {
        res.status(400).send({"error": error});
    }
})

postRouter.get("/", auth, async (req, res) => {
    const {device, device1, device2} = req.query;
    try {
        if(device){
            const posts = await PostModel.find({userId: req.body.userId, device});
        }
        const posts = await PostModel.find({userId: req.body.userId});
        res.status(200).send({"posts": posts});
    } catch (error) {
        res.status(400).send({"error": error});
    }
});

postRouter.patch("/update/:postId", auth, async (req, res) => {
    const {title, device, body} = req.body;
    const {postId} = req.params
    try {
        const post = await PostModel.findOne({_id: postId});
        if(post.userID === req.body.userID){
            await PostModel.findByIdAndUpdate({_id: postId}, {title, body, device});
            res.status(200).send({"msg": `post with id ${postId} has been updated`, "success": true});
        }else{
            res.status(200).send({"msg": `No post found with id ${postId} for user ${req.body.user}`});
        }
    } catch (error) {
        res.status(400).send({"error": error});
    }
});

postRouter.delete("/delete/:postId", auth, async (req, res) => {
    const {postId} = req.params
    try {
        const post = await PostModel.findOne({_id: postId});
        if(post.userId === req.body.userId){
            await PostModel.findByIdAndDelete({_id: postId});
            res.status(200).send({"msg": `Post with id ${postId} has been deleted`, "success": true});
        }else{
            res.status(200).send({"msg": `No post found with id ${postId} for user ${req.body.user}`});
        }
    } catch (error) {
        res.status(400).send({"error": error});
    }
})

module.exports = {
    postRouter
}