import dotenv from 'dotenv';
import { app } from "./app.js"
import { connectDB } from './config/connectDB.js';


dotenv.config({
    path:'./.env'
})

const PORT = process.env.PORT || 8000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on PORT ${PORT}`);  
        })
    })
.catch((error) => {
          console.log(`Failed to connect to the Database ${error}`);
            
        })