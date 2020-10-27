const app = Vue.createApp({
  data() {
    return {
      arr: [],
    };
  },
}).mount("#app");

document.getElementById("data").addEventListener("click", async () => {
  const location = document.getElementById("wea").value;

  const data = await fetch("/donne", {
    method: "POST",
    body: JSON.stringify({ place: location }),
  });

  const content = await data.json();

  console.log(content[0].forecast);
  app.arr = content[0].forecast;
});
