// const consola = require('consola')

export default async function ({ $auth, route, redirect, store }) {
  // const userEmail = store.getUserInfoEmail;

  // console.log("userEmail", store.getters["nomenklator/getUserInfoEmail"]);
  const tmp = await store.getters["quiz/getQuiz"];

  if (tmp.length === 0) {
    redirect("/");
  }
}
