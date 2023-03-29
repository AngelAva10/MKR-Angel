//Requiring all the necessary files and libraries
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const isAuthenticated = require('../usuario/middleware/usuario.auth');
const logger = require('../global/logger');
const ServiceError = require('../global/errorHandling/serviceError/ServiceError');
//Creating express router
const router = express.Router();
//Importing usuarioModel
const usuarioModel = require('../usuario/model/usuario');

//Creating register route
router.post("/register", async (req, res) => {

    try {
        const { name, email, password } = req.body;
        //Check emptyness of the incoming data
        if (!name || !email || !password) {
            return res.json({ message: 'Please enter all the details' })
        }

        //Check if the user already exist or not
        const userExist = await usuarioModel.findOne({ email: req.body.email });
        if (userExist) {
            return res.json({ message: 'User already exist with the given emailId' })
        }
        //Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword;
        const user = new usuarioModel(req.body);
        await user.save();
        const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        });
        if (res.status = 200 ) {
            return  res.cookie({ 'token': token }).json({ success: true, message: 'User registered successfully', data: user });
        };
    } catch (error) {
        console.log(error.message);
    }

})
//Creating login routes
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        //Check emptyness of the incoming data
        if (!email || !password) {
            return res.json({ message: 'Please enter all the details' })
        }
        //Check if the user already exist or not
        const userExist = await usuarioModel.findOne({email:req.body.email});
        if(!userExist){
            return res.json({message:'Wrong credentials'})
        }
        //Check password match
        const isPasswordMatched = await bcrypt.compare(password,userExist.password);
        if(!isPasswordMatched){
            return res.json({message:'Wrong credentials pass'});
        }
        const token = await jwt.sign({ id: userExist._id }, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        });
        if (res.status = 200 ) {
            return  res.cookie({"token":token}).json({success:true,message:'LoggedIn Successfully'});
        };
    } catch (error) {
        console.log(error.message);
        next(error);
    }

})

//Creating user routes to fetch users data
router.get('/user', isAuthenticated, async (req, res) => {
    try {
        const user = await usuarioModel.find();
        if (!user) {
            return res.json({ message: 'No user found' })
        }
        res.json({ user: user })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;