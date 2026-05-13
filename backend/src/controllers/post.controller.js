import { Post } from "../models/post.model.js";


const createPost = async (req, res) => {

    try {
        const { name, description, age } = req.body
        if (!name || !description || !age) {
            res.status(400).json({ message: "Please fill all the fields" })
        }
        const post = await Post.create({
            name,
            description,
            age
        })
        return res.status(201).json({ message: "Post created successfully", post })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export { createPost }


