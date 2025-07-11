// I create an async function to call the API
async function callAPi() {
  // 1. Get the HTML element with id="api"
  const idTagApi = document.getElementById("api");

  // 2. Set the API URL that gives me a joke
  const url = "https://icanhazdadjoke.com/slack";

  // 3. Ask the server for data (fetch the joke)
  const response = await fetch(url);

  // 4. Read the response and convert it from JSON text to a real JavaScript object
  const data = await response.json();

  // 5. Look inside the object and get the joke text
  console.log(data.attachments[0].text);

  // 6. Save the joke text in a variable
  const text = data.attachments[0].text;

  // 7. Show the joke in the HTML element
  idTagApi.innerHTML = text;
}

// 8. Call the function to start everything
callAPi();
