const mongoose=require("mongoose");

const dbConnection=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
    console.log('DB CONNECTED SUCCESSFULLY...');
    } catch (error) {
        console.log(error);
    }
}
module.exports=dbConnection;