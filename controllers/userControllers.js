const jwt = require('jsonwebtoken');
const userJwt = require('../model/userModel.js');

//Register the users details
const registerUser = async (req,res) => {
    try {
        const { username,email,phone,password } = req.body;
        //All fields are mandatory
        if( !username || !email || !phone ||!password ) {
            res.status(400).json({
                message: "All fields are mandatory"
            });
        }
        //Provide a valid email Id
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Please provide valid email Id."
            });
        }
        //Provide a unique emaill id 
        const alreadyRegistered = await userJwt.findOne({ email });
        if(alreadyRegistered) {
            res.status(500).json({
                message: "User Already register!!!"
            });
        } 
        //Password must be 8 to 16 characters long and contain at least one uppercase letter, one lowercase letter ,one digit, and one special character
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,16}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: "Password must be 8 to 16 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
            });
        } else {
            const newRegister = await userJwt.create({
                username,
                email,
                phone,
                password
            })
            res.status(201).json({
                message: "User registered successfully!",newRegister
            })
        } 

    } catch(error) {
        console.log(error)
        res.status(401).json({
            message: "An error occurred while inserting the data"
        })
    }
}


//Login to use the user deatails
const loginUser = async (req,res) => {
    try {
        const { email , password } = req.body;
        if( !email || !password ) {
            res.status(400).json({
                message: "Please enter your email and password!!!"
            });
        } 
        const user = await userJwt.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(400).json({
                message: "Email or password incorrect"
            });
        }
        let token = jwt.sign({
                    userId: user.id,
                    email: user.email },
            'esakkiammal', 
            { expiresIn: '5m' } 
        );
        res.status(200).json({ data:{
            userId: user.id,
            email: user.email,
            token:token
        } });
    } catch (error) {
        res.status(400).json({
            message: "An error occurred while fetching the email and password"
        })
    }
}

//after login show the user information
const validateToken = async(req,res) => {
    try {
        const token = await req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(400).json({
                message: "User is not authorized or token is missing"
            })
        } 
            const decodedToken = await jwt.verify(token,'esakkiammal');
            res.status(200).json({
                data:{userId:decodedToken.userId,email:decodedToken.email}
            });
        
    } catch (error) {
        res.status(401).json({
            message: "User not authorized!"
        })
    }
}


module.exports = { registerUser,loginUser,validateToken };