// INSTALLARE NODE.JS PRIMA DI INIZIARE

// 1. IMPORTAZIONE DELLE LIBRERIE NECESSARIE
const express = require("express"); // Framework per creare il server web
const axios = require("axios"); // Libreria per fare richieste HTTP
const cors = require("cors"); // Permette richieste da domini diversi
const path = require("path"); // Gestisce i percorsi dei file

// 2. CARICA LE VARIABILI AMBIENTE DAL FILE .env
require("dotenv").config();

// 3. CREAZIONE DEL SERVER EXPRESS
const app = express();
const PORT = 3000; // Porta su cui gira il server

// 4. CONFIGURAZIONE MIDDLEWARE (funzioni che processano le richieste)
app.use(cors()); // Abilita CORS per tutte le richieste
app.use(express.json()); // Permette di leggere JSON nelle richieste
app.use(express.static(path.join(__dirname, "../public"))); // Serve file statici dalla cartella public

// 5. ROTTA PRINCIPALE - Serve la pagina HTML quando vai su localhost:3000
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// 6. API PER CREARE IL VIDEO - Riceve il testo e avvia la generazione
app.post("/api/text-to-video", async (req, res) => {
  // URL dell'API di ARK per creare video
  const urlPost =
    "https://ark.ap-southeast.bytepluses.com/api/v3/contents/generations/tasks";

  // Controlla se il contenuto è stato inviato
  if (!req.body.content) {
    return res.status(400).json({ error: "Content is required" });
  }

  try {
    // Fa la richiesta all'API di ARK per iniziare la generazione del video
    const response = await axios.post(
      urlPost,
      {
        model: "seedance-1-0-lite-t2v-250428", // Modello AI per generare video
        content: req.body.content, // Il testo che hai scritto
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.ARK_API_KEY}`, // Chiave API per autenticarsi
          "Content-Type": "application/json",
        },
      }
    );

    // Restituisce la risposta (con l'ID del task) al frontend
    res.json(response.data);
  } catch (error) {
    // Se c'è un errore, lo stampa e restituisce errore 500
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate video" });
  }
});

// 7. API PER CONTROLLARE LO STATO DEL VIDEO - Controlla se il video è pronto
app.get("/api/check-video/:taskId", async (req, res) => {
  const { taskId } = req.params; // Prende l'ID del task dall'URL
  // URL per controllare lo stato del task
  const urlGet = `https://ark.ap-southeast.bytepluses.com/api/v3/contents/generations/tasks/${taskId}`;

  try {
    // Fa la richiesta per controllare lo stato
    const response = await axios.get(urlGet, {
      headers: {
        Authorization: `Bearer ${process.env.ARK_API_KEY}`, // Stesso token di autenticazione
        "Content-Type": "application/json",
      },
    });

    // Restituisce lo stato del video al frontend
    res.json(response.data);
  } catch (error) {
    // Se c'è un errore, lo stampa e restituisce errore 500
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Failed to check video status" });
  }
});

// 8. AVVIA IL SERVER sulla porta specificata
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
