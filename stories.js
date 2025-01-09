const express = require('express');
const { MongoClient , ObjectId } = require('mongodb');

const app = express();
const port = 3002;


const uri = "mongodb://127.0.0.1:27017"; 
const dbName = "insta";


app.use(express.json());

let db, stories


async function initializeDatabase() {
    try {
        const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        db = client.db(dbName);
        stories = db.collection("stories");

        
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
}


initializeDatabase();




app.get('/stories', async (req, res) => {
    try {
       
        const activeStories = await stories.find({ expiresAt: { $gte: new Date() } }).toArray();

        res.status(200).json(activeStories);
    } catch (err) {
        console.error("Error fetching stories:", err);
        res.status(500).send("Error fetching stories: " + err.message);
    }
});



app.post('/stories', async (req, res) => {
    try {
        const newStory = {
            storyId: req.body.storyId,
            userId: req.body.userId,
            imageUrl: req.body.imageUrl,
            caption: req.body.caption,
            views: 0,
            createdAt: new Date(),
            expiresAt: new Date(new Date().getTime() + 24 * 60 * 60 * 1000) // Expires in 24 hours
        };

       
        const result = await stories.insertOne(newStory);

        res.status(201).send(`Story added with ID: ${result.insertedId}`);
    } catch (err) {
        console.error("Error adding story:", err);
        res.status(500).send("Error adding story: " + err.message);
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




app.delete('/stories/:storyId', async (req, res) => {
    try {
        const storyId = req.params.storyId;

        const result = await stories.deleteOne({ storyId: storyId });

        res.status(200).send(`Story with ID: ${storyId} deleted successfully`);
    } catch (err) {
        console.error("Error deleting story:", err);
        res.status(500).send("Error deleting story: " + err.message);
    }
});