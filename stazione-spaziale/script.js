// api al click del botton
// fetching apis
// time
// latitude
// longitude
// message

// funzioen al click fetcha

async function getData() {
  console.log("ciao");

  //url
  const url = "http://api.open-notify.org/iss-now.json";
  // await // try and catch error
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    // transform json
    const json = await response.json();
    const time = json.timestamp;
    const message = json.message;
    const longitude = json.iss_position.longitude;
    const latitude = json.iss_position.latitude;

    // ! test fetching data
    console.log(json);
    console.log("time:", time);
    console.log("message:", message);
    console.log("long:", longitude);
    console.log("lat:", latitude);

    // change timestamp

    // inner html 1. time , 2. latitude 3. longitude 4. message
    document.getElementById("time").innerHTML = time;
    document.getElementById("latitude").innerHTML = latitude;
    document.getElementById("longitude").innerHTML = longitude;
    document.getElementById("message").innerHTML = message;
  } catch (error) {
    console.error(`"the server couldn't fulfill a request" ${error.message}`);
  }

  // ! conclusion PRINT VALUES INTO THE CARD
}
