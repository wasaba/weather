const fastify = require("fastify")({ logger: true });
const path = require("path");
const fs = require("fs");
const weather = require("weather-js");
const { parse } = require("path");

fastify.register(require("fastify-formbody"));

fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "public"),
  prefix: "/public/",
});

fastify.get("/", (req, reply) => {
  reply.sendFile("index.html");
});

fastify.post("/donne", (req, reply) => {
  let resultat;
  const parsedJson = JSON.parse(req.body);
  weather.find({ search: parsedJson.place, degreeType: "C" }, (err, result) => {
    if (err) throw err;
    resultat = JSON.stringify(result, null, 2);
    reply.send(resultat);
  });
});

async function start() {
  try {
    await fastify.listen(3000);
  } catch (e) {
    throw new error(e);
  }
}

start();
