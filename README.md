# instagram-assignment
 https://documenter.getpostman.com/view/39216531/2sAYQUptnm

file:///C:/Users/HP/AppData/Local/Microsoft/Windows/INetCache/IE/O8L7AVX0/DocScanner%20Jan%209,%202025%206-03%20PM[1].pdf

Instagram-Inspired API
This is an Instagram-inspired API built using Node.js, Express, and MongoDB. It mimics various core functionalities of an Instagram-like platform, allowing users to manage profiles, posts, comments, followers, likes, and stories. The API includes endpoints to interact with Users, Posts, Comments, Likes, Followers, and Stories collections in MongoDB.

Features
User Management

Create, fetch, update, and delete user profiles.
Users can have a bio, profile picture, followers, following, and posts.
Post Management

Create, fetch, update, and delete posts (images, captions, and tags).
Posts can be archived and associated with likes and comments.
Comment Management

Fetch all comments on a post.
Add, update, and delete comments on posts.
Track the number of likes on each comment.
Follower Management

Fetch followers of a user.
Follow and unfollow users.
Story Management

Fetch active stories.
Add and delete stories.
Stories are temporary and expire after a certain period.
API Endpoints
1. User Management
GET /users: Fetch all users.
GET /users/:userId: Fetch user details by ID.
POST /users: Register a new user.
PATCH /users/:userId: Update user bio or profile picture.
DELETE /users/:userId: Delete a user account.
2. Post Management
GET /posts: Fetch all posts.
GET /posts/:postId: Fetch details of a specific post.
POST /posts: Create a new post.
PATCH /posts/:postId/caption: Update the caption of a post.
DELETE /posts/:postId: Delete a post.
3. Comment Management
GET /posts/:postId/comments: Fetch all comments on a post.
POST /comments: Add a comment to a post.
PATCH /comments/:commentId/likes: Increment likes on a comment.
DELETE /comments/:commentId: Delete a comment.
4. Follower Management
GET /users/:userId/followers: Fetch followers of a user.
POST /followers: Follow a user.
DELETE /followers/:followerId: Unfollow a user.
5. Story Management
GET /stories: Fetch all active stories.
POST /stories: Add a new story.
DELETE /stories/:storyId: Remove a story.