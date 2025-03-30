const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const {removeImg}=require("../utils/Img_Upload_Rem")

// Schema for storing last 5 analysis requests
const RequestSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },  // Cloudinary image URL
    fileName: { type: String, required: true },  // Image file name
    date: { type: Date, default: Date.now },     // Request timestamp
    result: { type: String, required: true }, // Analysis result
    confidence: { type: Number, required: true }, // Confidence percentage
});

const sch = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    api_key: {
        type: String,
        default: null
    },
    apiKeyActive: {
        type: Boolean,
        default: false
    },
    apiUsageCount: {
        type: Number,
        default: 0
    },
    totalRemaining: {
        type: Number,
        default: 5
    },
    lastRequestAt: {
        type: Date,
        default: null
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastRequests: {
        type: [RequestSchema],
        default: []
    }
});

// Hash password before saving (only for new users)
sch.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare password during login
sch.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Method to add a new request (stores only last 5 requests)
sch.methods.addRequest = async function (requestData,attempts) {
    this.apiUsageCount++;
    this.totalRemaining=attempts;

    if (this.lastRequests.length >= 5) {
        const arr=this.lastRequests.shift(); // Remove the oldest request
        await removeImg(arr.imageUrl)
    }
    this.lastRequests.push(requestData);
    this.lastRequestAt = new Date(); // Update last request time
    await this.save();
};

const model = mongoose.model("users", sch);

module.exports = model;
