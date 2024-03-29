const express = require("express");
const { UserModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register", (req, res) => {
    const {email, password, name, gender} = req.body;
    try {
        bcrypt.hash(password, 6, async (err, hash) => {
            if(err){
                res.status(200).send({"msg": "Something went wrong while hashing"});
            }else{
                const user = new UserModel({email, password: hash, name, gender});
                await user.save();
                res.status(200).send({"msg": "New user has been created"})
            }
        })
    } catch (error) {
        res.status(400).send({"err": error});
    }
});

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password, user.password, (err, result) => {
                if(result){
                    const token = jwt.sign({userId: user._id, user: user.name}, "evaluation");
                    res.status(200).send({"msg": "Login successful", token: token});
                }else{
                    res.status(200).send({"msg": "Wrong Password"});
                }
            })
        }else{
            res.status(200).send({"msg": "No user found"});
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({"err": error});
    }
})

module.exports = {
    userRouter
}