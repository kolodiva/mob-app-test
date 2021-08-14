import mongo from './mongo'

export async function getInfo() {
  await mongo.connect();
  return await mongo.db('sampleDB').collection('simpleTest').find({}).toArray();
}

export async function createNewQuiz({connectionid}) {

  //console.log(connectionid);

  await mongo.connect();

  //const res1 = await mongo.db('sampleDB').collection('history').find({}).toArray();
  const res1 = await mongo.db('sampleDB').collection('history').findOneAndUpdate(
    {connectionid: connectionid, completed: false},
    { '$setOnInsert': {completed: false, res: []}},
    {returnDocument: 'after', upsert: true}
  );

  return {rows: res1.value}
}
