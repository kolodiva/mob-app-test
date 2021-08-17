import mongo from './mongo'

function getDateTime() {

  var today = new Date();
  var date = today.getDate() + '-' + (today.getMonth()+1) + '-' + today.getFullYear();
  var time = (today.getHours() + 3) + ":" + today.getMinutes();
  var dateTime = date + ' ' + time;

    return dateTime;
}

export async function getInfo() {
  await mongo.connect();
  return await mongo.db('sampleDB').collection('simpleTest').find({}).toArray();
}

export async function getHistory({ connectionid }) {
  await mongo.connect();
  return await mongo.db('sampleDB').collection('history').find({connectionid: connectionid, completed: true}, {sort: {sort: -1} }).toArray();
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
    { '$set': {completed: false, res: test} },
    {upsert: true}
  );

  return {rows: res1.value}
}

export async function closeNewQuiz({connectionid, test, score}) {

  //console.log(connectionid);

  await mongo.connect();

  //const res1 = await mongo.db('sampleDB').collection('history').find({}).toArray();
  await mongo.db('sampleDB').collection('history').findOneAndUpdate(
    {connectionid: connectionid, completed: false},
    { '$set': {completed: true, res: test, score: score, data_test: getDateTime()}, '$inc':{sort: 1}},
    {returnDocument: 'after', upsert: true}
  );

}
