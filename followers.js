
const express = require('express');
const { MongoClient , ObjectId } = require('mongodb');

const app = express();
const port = 3002;


const uri = "mongodb://127.0.0.1:27017"; 
const dbName = "insta";


app.use(express.json());

let db, followers


async function initializeDatabase() {
    try {
        const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        db = client.db(dbName);
        followers = db.collection("followers");


        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); 
    }
}

initializeDatabase();




app.get('/users/:userId/followers', async (req, res) => {
    try {
        const { userId } = req.params;

        
        const followersList = await followers.find({ followingId: userId }).toArray();

       

       
        res.status(200).json(followersList);
    } catch (err) {
        console.error("Error fetching followers:", err);
        res.status(500).send("Error fetching followers: " + err.message);
    }
});



app.post('/followers', async (req, res) => {
    try {
        const { followerId, followingId } = req.body;

       

       
        const result = await followers.insertOne({
            followerId,
            followingId,
            followedAt: new Date()
        });

        res.status(201).send(`User with followerId: ${followerId} is now following user with followingId: ${followingId}`);
    } catch (err) {
        console.error("Error following user:", err);
        res.status(500).send("Error following user: " + err.message);
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




app.delete('/followers/:followerId', async (req, res) => {
    try {
        const { followerId } = req.params;

        
        if (!followerId) {
            return res.status(400).send("followerId is required");
        }

        
        const result = await followers.deleteOne({ followerId });

       

        res.status(200).send(`User with followerId: ${followerId} has unfollowed successfully`);
    } catch (err) {
        console.error("Error unfollowing user:", err);
        res.status(500).send("Error unfollowing user: " + err.message);
    }
});