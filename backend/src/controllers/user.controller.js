
import { User } from "../models/user.model.js";


const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // basic validation of the data

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        // check if the user already exists

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            })
        }


        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false
        })


        return res.status(201).json({
            message: "User created successfully",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        })


    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })

    }

}

const loginUser = async (req, res) => {
    try {

        // check if user exists 
        const email = req.body.email?.toString();
        const password = req.body.password?.toString();

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            })
        }

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        // campare password
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Invalid password"
            })
        }

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        })


    } catch (error) {
        res.status(500).json({
            message: "Internal server error (login)",
            error: error.message
        })
    }

}

const logoutUser = async (req, res) => {

    try {
        const { email } = req.body;

        const user = await User.findOne({
            email
        });

        if (!user) return res.status(404).json({
            message: "User not found"
        })

        res.status(200).json({
            message: "Logout seccessful"
        })


    } catch (error) {

        res.status(500).json({
            message: "Internal Server error", error
        })
    }
}


export { registerUser, loginUser, logoutUser }