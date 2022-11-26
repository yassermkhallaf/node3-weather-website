console.log("Client side Javascript file is loaded!");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

messageOne.textContent = "Form JaveScript";
//Fech in a browser based API Not nodeJs
fetch("https://puzzle.mead.io/puzzle")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
  });

//ForeCast Challanage

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
messageOne.textContent = "Loading...";
messageTwo.textContent = "";
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  fetch(`http://localhost:3000/weather?address=${location}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
        console.log(data.location);
        console.log(data.forecast);
      }
    });
});
