import mongo from './mongo'

export async function getInfo() {
  await mongo.connect();
  return await mongo.db('sampleDB').collection('simpleTest').find({}).toArray();
}

export async function getInfoCurQuiz({connectionid}) {
  await mongo.connect();
  return await mongo.db('sampleDB').collection('history').find({connectionid: connectionid, completed: false}).toArray();
}

export async function createNewQuiz({connectionid, test}) {

  //console.log(connectionid);

  await mongo.connect();

  //const res1 = await mongo.db('sampleDB').collection('history').find({}).toArray();
  const res1 = await mongo.db('sampleDB').collection('history').findOneAndUpdate(
    {connectionid: connectionid, completed: false},
    { '$set': {completed: false, res: test}},
    {returnDocument: 'after', upsert: true}
  );

  return {rows: res1.value}
}

export async function closeNewQuiz({connectionid, test}) {

  //console.log(connectionid);

  await mongo.connect();

  //const res1 = await mongo.db('sampleDB').collection('history').find({}).toArray();
  await mongo.db('sampleDB').collection('history').findOneAndUpdate(
    {connectionid: connectionid, completed: false},
    { '$set': {completed: true, res: test}},
    {returnDocument: 'after', upsert: true}
  );

}
