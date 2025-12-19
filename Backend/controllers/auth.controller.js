const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



module.exports.register = async (req, res) =>{
    const {name, email, password} = req.body;

    try {
        if (!name || !email || !password){
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

            let user = await User.findOne({email});

            if(user){
                return res.status(400).json({
                    message: 'User already exists'
                });
            }

            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);

            user = await User.create({
                name,
                email,
                password: hashedPassword
            });

            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
                expiresIn: '1d'
            });

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                maxAge: 24 * 60 * 60 * 1000
            });

            res.status(201).json({
                message:'User registered successfully',
                user:{
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }

            });

    } catch (error) {
        res.status(500).json({
            message:'Something went wrong',
            error
        });
        
    }
};


module.exports.login = async (req, res) => {
    const {email , password } = req.body

    try {
        if (!email || !password){
            return res.status(400).json({
                message: 'All fields are required'
            });
        };

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                message: 'User does not exist'
            });
        };
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        };

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(200).json({
            message:'User logged in successfully',
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }

        });
        
        
    } catch (error) {
        res.status(500).json({
            message:'Something went wrong',
            error
        });
        
    }
};

module.exports.logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({
            message: 'User logged out successfully'
        });
        
    } catch (error) {
        res.status(500).json({
            message:'Something went wrong',
            error
        });
        
    }
};

module.exports.profile = async (req, res) => {
        res.status(200).json({
        user: req.user,
    })
};