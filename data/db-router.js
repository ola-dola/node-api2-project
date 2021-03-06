const express = require("express");

const DbHelpers = require("./db");

const router = express.Router();

//get all posts
router.get("/", (req, res) => {
  DbHelpers.find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

//Get posts by id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  DbHelpers.findById(id)
    .then(data => {
      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

//all comments for a post
router.get("/:id/comments", (req, res) => {
  const { id } = req.params;

  DbHelpers.findPostComments(id)
    .then(data => {
      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});

//add new post
router.post("/", (req, res) => {
	const post = req.body;

  if (!post.title || !post.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
  DbHelpers.insert(post)
    .then(data => {
			//Grabbing the newly created post to return.
      DbHelpers.findById(data.id).then(newPost => {
				res.status(201).json(...newPost);  //new post returned
			}).catch(error => console.log(error));

    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });
});
module.exports = router;
