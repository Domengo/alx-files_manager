import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost'
const client = new MongoClient(url);

client.connect();
