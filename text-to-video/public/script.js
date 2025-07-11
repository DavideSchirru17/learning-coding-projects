// FUNZIONE PRINCIPALE - Viene chiamata quando clicchi "Generate Video"
async function createTextToVideo() {
  // 1. PRENDE IL TESTO CHE HAI SCRITTO
  const textPrompt = document.getElementById("description").value.trim();
  // 2. PRENDE L'ELEMENTO DOVE MOSTRARE I RISULTATI
  const resultBox = document.getElementById("result-box");

  // 3. CONTROLLA SE HAI SCRITTO QUALCOSA
  if (!textPrompt) {
    resultBox.textContent = "Prompt cannot be empty of text";
    return; // Ferma la funzione se non hai scritto niente
  }

  // 4. MOSTRA MESSAGGIO DI CARICAMENTO
  resultBox.textContent = "Processing....";
  console.log("1 print text prompt:", textPrompt);

  try {
    // 5. INVIA LA RICHIESTA AL SERVER PER INIZIARE A CREARE IL VIDEO
    const response = await fetch("http://localhost:3000/api/text-to-video", {
      method: "POST", // Tipo di richiesta
      headers: {
        "Content-Type": "application/json", // Tipo di dati che inviamo
      },
      body: JSON.stringify({
        content: [
          {
            type: "text",
            // Il testo + parametri del video (dimensioni, durata, ecc.)
            text: `${textPrompt} --ratio 16:9 --resolution 720p --duration 5 camerafixed false`,
          },
        ],
      }),
    });

    // 6. CONTROLLA SE LA RICHIESTA È ANDATA BENE
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 7. CONVERTE LA RISPOSTA IN FORMATO JSON
    const data = await response.json();
    console.log("2. front ->Task submitted: receiving data", data);

    // 8. SE ABBIAMO RICEVUTO UN ID, INIZIA A CONTROLLARE LO STATO
    if (data.id) {
      resultBox.textContent = `Video generation started! Task ID: ${data.id}\nChecking status...`;

      // Chiama la funzione che controlla se il video è pronto
      await pollVideoStatus(data.id, resultBox);
    } else {
      resultBox.textContent = "Error: No task ID received";
    }
  } catch (error) {
    // 9. SE C'È UN ERRORE, LO MOSTRA
    console.error("Error:", error);
    resultBox.textContent = `Error: ${error.message}`;
  }
}

// FUNZIONE CHE CONTROLLA RIPETUTAMENTE SE IL VIDEO È PRONTO
async function pollVideoStatus(taskId, resultBox) {
  const maxAttempts = 30; // Massimo 30 tentativi (2.5 minuti)
  const pollInterval = 5000; // Aspetta 5 secondi tra ogni controllo
  let attempts = 0; // Conta quanti tentativi abbiamo fatto

  // FUNZIONE INTERNA CHE FA IL CONTROLLO
  const poll = async () => {
    attempts++; // Aumenta il contatore

    try {
      // CHIEDE AL SERVER: "Il video con questo ID è pronto?"
      const response = await fetch(
        `http://localhost:3000/api/check-video/${taskId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // CONVERTE LA RISPOSTA
      const result = await response.json();
      console.log("Poll result:", result);

      // CONTROLLA LO STATO DEL VIDEO
      if (result.status === "completed" && result.output) {
        // VIDEO PRONTO! Mostralo sulla pagina
        displayVideoResult(result, resultBox);
      } else if (result.status === "failed") {
        // ERRORE nella generazione
        resultBox.textContent = `Video generation failed: ${
          result.error || "Unknown error"
        }`;
      } else if (attempts >= maxAttempts) {
        // TROPPO TEMPO, ferma i tentativi
        resultBox.textContent = "Video generation timed out. Please try again.";
      } else {
        // ANCORA IN ELABORAZIONE, aspetta e riprova
        resultBox.textContent = `Generating video... (${attempts}/${maxAttempts})\nStatus: ${
          result.status || "processing"
        }`;
        setTimeout(poll, pollInterval); // Riprova tra 5 secondi
      }
    } catch (error) {
      console.error("Polling error:", error);
      resultBox.textContent = `Error checking status: ${error.message}`;
    }
  };

  // INIZIA I CONTROLLI
  poll();
}

// FUNZIONE CHE MOSTRA IL VIDEO QUANDO È PRONTO
function displayVideoResult(result, resultBox) {
  console.log("Video ready:", result);

  // PULISCE LA SCATOLA DEI RISULTATI
  resultBox.innerHTML = "";

  // CREA MESSAGGIO DI SUCCESSO
  const successMsg = document.createElement("p");
  successMsg.textContent = "Video generated successfully!";
  successMsg.style.color = "green";
  resultBox.appendChild(successMsg);

  // SE ABBIAMO UN URL DEL VIDEO, CREA L'ELEMENTO VIDEO
  if (result.output && result.output.length > 0) {
    const videoUrl = result.output[0].url || result.output[0];

    // CREA L'ELEMENTO VIDEO
    const video = document.createElement("video");
    video.src = videoUrl;
    video.controls = true; // Mostra i controlli (play, pause, ecc.)
    video.width = 400;
    video.style.marginTop = "10px";
    resultBox.appendChild(video);

    // CREA LINK PER SCARICARE IL VIDEO
    const downloadLink = document.createElement("a");
    downloadLink.href = videoUrl;
    downloadLink.download = "generated-video.mp4";
    downloadLink.textContent = "Download Video";
    downloadLink.style.display = "block";
    downloadLink.style.marginTop = "10px";
    downloadLink.style.color = "blue";
    resultBox.appendChild(downloadLink);
  } else {
    // SE NON ABBIAMO IL VIDEO, MOSTRA I DATI GREZZI
    const resultData = document.createElement("pre");
    resultData.textContent = JSON.stringify(result, null, 2);
    resultBox.appendChild(resultData);
  }
}
