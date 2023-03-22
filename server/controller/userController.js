import User from "../models/userSchema.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validPasswordPattern } from "../utils/index.js";


// Register a user

const registerUser = async (req, res) => {

    const { name, email, password } = req.body

    console.log(req.body)
    const saltRounds = 10

    try {

        

        // Check if user already exists
        const user = await User.find({ email: email })

        if (user.length > 0) {
            return res.status(409).json({ message: "User already exists" })
        }

        // Validate password pattern
        console.log("Valide password", validPasswordPattern(password))
        if (!validPasswordPattern(password)) {
            throw Error("Password length has to be greater than 6")
        }

        // hash password
        const salt = bcrypt.genSaltSync(saltRounds)
        const hashedPassword = bcrypt.hashSync(password, salt)

        // asign jwt token

        const jwttoken = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: "1 day" })

        const response = await new User({ name, email, password: hashedPassword, jwttoken }).save()
        console.log(response)
        res.status(201).json({ email, jwttoken })


    } catch (error) {

        console.error(error);
        res.status(409).json({ message: error.message });
    }

}

// Log in a user

const loginUser = async (req, res) => {

    const { email, password } = req.body

    try {

        const user = await User.find({ email: email })
        console.log("Logged in user: ", user)

        if (user.length == 0) {
            throw Error("Sorry, user does not exist!")
        }

        const matchPassword = await bcrypt.compare(password, user[0].password)
        console.log(matchPassword)

        if (!matchPassword) {
            throw Error("Sorry, incorrect password!")
        }

        // Assign jwt token
        const jwttoken = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: "1 day" });
        const updateUserWithToken = await User.findOneAndUpdate({ email: email }, jwttoken, { new: true });
        console.log(updateUserWithToken)
        res.status(200).json({ email, jwttoken });

    } catch (error) {
        res.status(401).json({ message: error.message })
        console.error(error);
    }
}

// Log out user

const signOutUser = async (req, res) => {

    const { email } = req.body;
    console.log(email)
    try {

        const response = await User.findOneAndUpdate({ email: email }, { token: "" }, { new: true });
        console.log(response)
        res.status(200).json(response);

    } catch (error) {
        console.error(error);
    }
}

const routeGuard = async (req, res) => {

    const { authorization } = req.headers
    const { email } = req.body
    console.log(req.headers)
    console.log(authorization)
    console.log(req.body)

    console.log(authorization !== 'undefined')

    if (authorization === 'undefined') {
        return res.status(401).json({ error: 'Authorization token needed' })
    }

    const token = authorization.split(' ')[1]

    try {

        const response = await jwt.verify(token, process.env.JWT_SECRET)
        const userData = await User.find({email})
        console.log("user data: ", userData)
        res.status(200).json(userData)


    } catch (error) {
        console.error(error)
        res.status(401).json({ error: 'Request is not authorized!' })
    }
}

export { registerUser, loginUser, signOutUser, routeGuard }