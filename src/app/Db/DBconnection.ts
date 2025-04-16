
import mongoose from "mongoose";

export default async function ConnectToDb(){

// this is the normal express approach which won't work in nextjs,
// here we need to define something called as singleton
    try {
        
        await mongoose.connect(process.env.DB_URL as string);  // this expects a string, but argument may be undefined, in this case, we need to assure ts, that it's always a string, we can strict check it(!), or cast it as string 

        //mongo provides some inbuilt methods to track connection state
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("Db connected!");
        })
        
        connection.on("error", (err) => {
            console.error("Mongo Db connection error!" + err)
            process.exit(1);
        })
        

    } catch (error) {
        throw new Error(`Failed to connect to DB! : ERROR : ${error}`);
    }
}