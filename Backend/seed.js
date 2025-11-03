// seed.js - Run this file ONCE to populate the database
const mongoose = require('mongoose');
require('dotenv').config(); // Ensure dotenv is available

// 1. Import your Problem model
const Problem = require('./models/Problem'); 

// 2. Define the exact data you want to insert
const seedProblems = [
    { 
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Rome"],
        answer: "Paris",
    },
    { 
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4",
    },
    { 
        question: "What is the boiling point of water?",
        options: ["0°C", "50°C", "100°C", "212°C"],
        answer: "100°C",
    },
];
const seedDB = async () => {
console.log("Connecting to MongoDB for seeding...");
await mongoose.connect(process.env.MONGOURL);
 console.log("Connected! Starting seed...");

 try {
 // Optional: Clear existing problems before seeding
 await Problem.deleteMany({}); 
 console.log("Existing problems deleted.");

// Insert the new data
 await Problem.insertMany(seedProblems);
 console.log("Database successfully seeded with mock problems!");

 } catch (err) {
 console.error("Error during seeding:", err);
 } finally {
 // Close the connection and exit
 mongoose.connection.close();
 console.log("MongoDB connection closed.");
 }
};

seedDB();