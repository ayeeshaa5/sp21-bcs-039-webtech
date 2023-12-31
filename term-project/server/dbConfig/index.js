import e from 'express';
import mongoose from 'mongoose';

const dbConnection = async ()=>{
    try{
        const connection = await mongoose.connect(process.env.MONGODB_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            //  useCreateIndex:true,
            //  useFindAndModify:false
        
        });
        console.log("DB Connected");

}
    catch(error){
        console.log("DB Error:"+error);
    }
};
export default dbConnection;