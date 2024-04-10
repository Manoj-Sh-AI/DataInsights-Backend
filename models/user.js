import mongoose from "mongoose";

const schema = new mongoose.Schema({
    Identification: {
        type: String,
        unique: true,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
        select: false,
    },
    Branch: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

export const User = mongoose.model("User", schema);