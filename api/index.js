import mongo from './mongo'

export async function getInfo() {
  await mongo.connect();
  return await mongo.db('sampleDB').collection('simpleTest').find({}).toArray();
}
