import { MongoClient } from "@sunsniffer/mongodb-connector";

const connectDB = async () => {
  try {
    const mongoURI: string = 'mongodb://localhost:27017/modules'
    const mongoClient = new MongoClient({ uri: mongoURI });
    await mongoClient.connect();
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;