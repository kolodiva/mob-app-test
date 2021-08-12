import {MongoClient} from 'mongodb';

const client = new MongoClient("mongodb://localhost:27017", { useUnifiedTopology: true });

export default client;
