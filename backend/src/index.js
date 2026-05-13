import dotenv from 'dotenv';
import connectiondb from './config/database.js';
import app from './app.js';



dotenv.config({
    path:'./.env'
});


 
const startServer = async () => {
    try {
        await connectiondb();
        app.on('error', (error) => {
            console.error(`Server error: ${error.message}`);
            throw error; 
        });
        app.listen(process.env.PORT ||8000, () => {
            console.log(`Server is running on port ${process.env.PORT || 8000}`);
        });
    } catch (error) {
        console.error(`Server error: ${error.message}`);
    }
}

startServer();