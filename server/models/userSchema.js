import mongoose from "mongoose";

const { Schema } = mongoose

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    jwttoken: String,
})

const User = mongoose.model('User', userSchema)

export default User