import mongo from './mongo'

export async function getInfo() {
  await mongo.connect();
  const rows = await mongo.db('sampleDB').collection('cars').find({make: 'Honda'}).toArray();
  return rows;
}
