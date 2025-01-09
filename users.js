const express = require('express');
const { MongoClient , ObjectId } = require('mongodb');




const app = express();
const port = 3002;

// MongoDB connection details
const uri = "mongodb://127.0.0.1:27017"; 
const dbName = "insta";

// Middleware
app.use(express.json());

let db, users

// Connect to MongoDB and initialize collections
async function initializeDatabase() {
    try {
        const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        db = client.db(dbName);
        users = db.collection("users");

        // Start server after successful DB connection
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); // Exit if database connection fails
    }
}

// Initialize Database
initializeDatabase();

// Routes

// GET: List all students
app.get('/users/:userId', async (req, res) => {
    try {
     
        const allCourses = await users.find( ).toArray();
        res.status(200).json(allCourses);
    } catch (err) {
        res.status(500).send("Error fetching courses: " + err.message);
    }
});

// POST: Add a new student
app.post('/users', async (req, res) => {
    try {
        // console.log("Request object: ",req)
        // console.log("Request Body:",req.body)
        const newCourses = req.body;
        const result = await users.insertOne(newCourses);
        res.status(201).send(`Courses added with ID: ${result.insertedId}`);
    } catch (err) {
        res.status(500).send("Error adding student: " + err.message);
    }
});

// PUT: Update a student completely
app.put('/courses/:_id', async (req, res) => {
    try {
        console.log("Request Params: ",req.params)
        console.log("Request Body:",req.body)
        const _id = req.params._id;
        const updatedCourses = req.body;

        const result = await courses.replaceOne({ _id:new ObjectId(_id) }, updatedCourses);
        res.status(200).send(`${result.modifiedCount} document(s) updated`);
    } catch (err) {
        res.status(500).send("Error updating courses: " + err.message);
    }
});

// PATCH: Partially update a student
// app.patch('/users/:userId', async (req, res) => {
//     try {
//         console.log("Request Params: ",req.params)
//         console.log("Request Body:",req.body)
//         const userId = parseInt(req.params.userId);
//         const updates = req.body;
//         const result = await users.updateOne({ userId :new ObjectId(userId)  }, { $set: updates });
//         res.status(200).send(`${result.modifiedCount} document(s) updated`);
//     } catch (err) {
//         res.status(500).send("Error partially updating student: " + err.message);
//     }
// });



app.patch('/users/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!ObjectId.isValid(userId)) {
            return res.status(400).send("Invalid ObjectId format");
        }

        const updates = req.body;
        const result = await users.updateOne({ userId: new ObjectId(userId) }, { $set: updates });

        res.status(200).send(`${result.modifiedCount} document(s) updated`);
    } catch (err) {
        res.status(500).send("Error partially updating user: " + err.message);
    }
});

// DELETE: Remove a student
app.delete('/users/:_id', async (req, res) => {
    try {console.log(req.params.userId)
        const _id = req.params._id;
        const result = await users.deleteMany({ _id:new ObjectId(_id) });
        res.status(200).send(`${result.deletedCount} document(s) deleted`);
    } catch (err) {
        res.status(500).send("Error deleting course: " + err.message);
    }
});

















