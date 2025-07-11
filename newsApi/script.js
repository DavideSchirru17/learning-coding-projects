// ATTENZIONE: Questo metodo espone la chiave API nel codice frontend
// Usa solo per API keys pubbliche o di test

const API_KEY = "ca95f8da30eb4018aa45dde952f198cf";

// 1 funzione per fetchare apis dal server
async function apikey() {
  // fetch api + apikey
  const url = `https://newsapi.org/v2/everything?q=keyword&apiKey=${API_KEY}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("problems of connection to the server");
    }

    const data = await response.json();
    console.log("datas", data);
    // 2. fetcho i dati e gli articoli 99
    const articles = data.articles;
    console.log("articles: ", articles);

    // 3 accedo all elemento container
    const newscard = document.querySelector(".news-card");
    console.log("newscard", newscard);

    // 99  numero massimo di articoli presenti all interno
    const maxNumArticles = articles.length;
    console.log("max article numbers", maxNumArticles);

    // 4. creo index random da 0 a 99 incluso
    const randomIndex = Math.floor(Math.random() * maxNumArticles);
    console.log("otteniamo sempre un numero random diverso", randomIndex);

    // 5. scelgo un articolo alla volta con indice random
    const articoloRandom = articles[randomIndex];
    console.log(articoloRandom);

    //!  innerHTML dentor gli elmenti - gli passo accedo a author di randomIndex ex 99
    document.querySelector(".author").innerHTML = `<strong>Author:</strong> ${
      articoloRandom.author || "N/A"
    }`;
    document.querySelector(".content").innerHTML = `<strong>Content:</strong> ${
      articoloRandom.content || "N/A"
    }`;
    document.querySelector(
      ".description"
    ).innerHTML = `<strong>Description:</strong> ${
      articoloRandom.description || "N/A"
    }`;
    document.querySelector(
      ".publishedAt"
    ).innerHTML = `<strong>Published:</strong> ${
      articoloRandom.publishedAt || "N/A"
    }`;
    document.querySelector(".title").innerHTML = `<strong>Title:</strong> ${
      articoloRandom.title || "N/A"
    }`;
    document.querySelector(
      ".url"
    ).innerHTML = `<strong>URL:</strong> <a href="${articoloRandom.url}" target="_blank">Read the article</a>`;
  } catch (error) {
    console.error(error.message);
  }
}

// CREAZIOEN DELLA CARTA CON LE RELATIVE CLASSI
function creationCard() {
  //CREO
  // inserisco dei dati che verranno sovrascritti una volta chiamata lafunzione apikey()
  const card = document.createElement("div");
  card.className = "news-card";
  const author = document.createElement("p");
  author.className = "author";
  author.innerHTML = `<strong>Author:</strong> Author Name`;

  const content = document.createElement("p");
  content.className = "content";
  content.innerHTML = `<strong>Content:</strong> Content news `;

  const description = document.createElement("p");
  description.className = "description";
  description.innerHTML = `<strong>description:</strong> description of the news`;

  const publishedAt = document.createElement("p");
  publishedAt.className = "publishedAt";
  publishedAt.innerHTML = `<strong>publishedAt:</strong> publishedAt`;

  const title = document.createElement("p");
  title.className = "title";
  title.innerHTML = `<strong>title:</strong> title of the article`;

  const url = document.createElement("p");
  url.className = "url";
  url.innerHTML = `<strong>URL:</strong> <a href="#" target="_blank">https://esempio.com</a>`;
  // appendo a card
  card.appendChild(author);
  card.appendChild(content);
  card.appendChild(description);
  card.appendChild(publishedAt);
  card.appendChild(title);
  card.appendChild(url);

  // appendo al div father
  const centerSection = document.querySelector(".center");
  centerSection.appendChild(card);
}
creationCard();
apikey();
