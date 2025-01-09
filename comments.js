const express = require('express');
const { MongoClient , ObjectId } = require('mongodb');

const app = express();
const port = 3002;


const uri = "mongodb://127.0.0.1:27017"; 
const dbName = "insta";


app.use(express.json());

let db, comments


async function initializeDatabase() {
    try {
        const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        db = client.db(dbName);
        comments = db.collection("comments");

        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); 
    }
}


initializeDatabase();




app.get('/posts/:postId/comments', async (req, res) => {
    try {
        const postId = req.params.postId; 

        console.log("Fetching comments for postId:", postId);

       
        const allComments = await comments.find({ postId: postId }).toArray();

        res.status(200).json(allComments);
    } catch (err) {
        console.error("Error fetching comments:", err);
        res.status(500).send("Error fetching comments: " + err.message);
    }
});




app.post('/comments', async (req, res) => {
    try {
        // console.log("Request object: ",req)
        // console.log("Request Body:",req.body)
        const newCourses = req.body;
        const result = await comments.insertOne(newCourses);
        res.status(201).send(`Courses added with ID: ${result.insertedId}`);
    } catch (err) {
        res.status(500).send("Error adding student: " + err.message);
    }
});


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






app.patch('/comments/:commentId/likes', async (req, res) => {
    try {
        const { commentId } = req.params;

       
        const result = await comments.updateOne(
            { commentId: commentId }, 
            { $inc: { likes: 1 } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).send("Comment not found");
        }

        res.status(200).send(`Likes incremented for commentId: ${commentId}`);
    } catch (err) {
        console.error("Error incrementing likes:", err);
        res.status(500).send("Error incrementing likes: " + err.message);
    }
});




app.delete('/comments/:commentId', async (req, res) => {
    try {
        const { commentId } = req.params;

        const result = await comments.deleteOne({ commentId: commentId });

       
        res.status(200).send(`Comment with commentId: ${commentId} deleted`);
    } catch (err) {
        console.error("Error deleting comment:", err);
        res.status(500).send("Error deleting comment: " + err.message);
    }
});