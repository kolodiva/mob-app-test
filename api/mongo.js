import {MongoClient} from 'mongodb';

// const client = new MongoClient("mongodb://localhost:27017", { useUnifiedTopology: true });
const client = new MongoClient(process.env.MONGO_SET, { useUnifiedTopology: true });

export default client;
