

const express = require('express');
const { MongoClient , ObjectId } = require('mongodb');

const app = express();
const port = 3002;


const uri = "mongodb://127.0.0.1:27017"; 
const dbName = "insta";


app.use(express.json());

let db, users


async function initializeDatabase() {
    try {
        const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        db = client.db(dbName);
        posts = db.collection("posts");

        
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
}


initializeDatabase();

app.get('/posts', async (req, res) => {
    try {
     
        const allCourses = await posts.find( ).toArray();
        res.status(200).json(allCourses);
    } catch (err) {
        res.status(500).send("Error fetching courses: " + err.message);
    }
});


app.post('/posts', async (req, res) => {
    try {
        // console.log("Request object: ",req)
        // console.log("Request Body:",req.body)
        const newCourses = req.body;
        const result = await posts.insertOne(newCourses);
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







app.patch('/posts/:postId/caption', async (req, res) => {
    try {
        const postId = req.params.postId; 
        const { caption } = req.body;    

        
        if (!caption) {
            return res.status(400).send("Caption is required");
        }

     
        const result = await posts.updateOne(
            { postId: postId },            
            { $set: { caption: caption } } 
        );

        if (result.matchedCount === 0) {
            return res.status(404).send("Post not found");
        }

        res.status(200).send("Caption updated successfully");
    } catch (err) {
        console.error("Error updating caption:", err);
        res.status(500).send("Error updating caption: " + err.message);
    }
});




app.delete('/posts/:postId', async (req, res) => {
    try {
        const postId = req.params.postId; 

        console.log("Received postId to delete:", postId);

       
        const result = await posts.deleteOne({ postId: postId });

       

        res.status(200).send("Post deleted successfully");
    } catch (err) {
        console.error("Error deleting post:", err);
        res.status(500).send("Error deleting post: " + err.message);
    }
});