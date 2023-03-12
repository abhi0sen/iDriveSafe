// let url = "https://newsapi.org/v2/everything?q=tesla&from=2023-02-05&sortBy=publishedAt&apiKey=92e9fbc9a44542ecbc7ca81c91d27453"

// fetch(url)
//   .then(response => response.json())
//   .then(data => {
//     let articles = data.articles
//     let cardContainer = document.getElementById("cardContainer")
//     cardContainer.innerHTML = ""

//     for (let i = 1; i < 50; i++) {
//       let article = articles[i]
//       let card = createCard(article.title, article.description, article.url, article.urlToImage)
//       cardContainer.appendChild(card)
//     }
//   })
//   .catch(error => console.error(error))

// function createCard(title, description, url, imageUrl) {
//   let card = document.createElement("div")
//   card.classList.add("card", "mb-3")

//   if (imageUrl) {
//     let image = document.createElement("img")
//     image.classList.add("card-img-top")
//     image.src = imageUrl
//     card.appendChild(image)
//   }

//   let cardBody = document.createElement("div")
//   cardBody.classList.add("card-body")
//   card.appendChild(cardBody)

//   let cardTitle = document.createElement("h5")
//   cardTitle.classList.add("card-title")
//   cardTitle.textContent = title
//   cardBody.appendChild(cardTitle)

//   if (description) {
//     let cardText = document.createElement("p")
//     cardText.classList.add("card-text")
//     cardText.textContent = description
//     cardBody.appendChild(cardText)
//   }

//   let cardLink = document.createElement("a")
//   cardLink.classList.add("btn", "btn-primary")
//   cardLink.href = url
//   cardLink.target = "_blank"
//   cardLink.textContent = "Read More"
//   cardBody.appendChild(cardLink)

//   return card
// }

let url = "https://newsapi.org/v2/everything?q=tesla&from=2023-02-12&sortBy=publishedAt&apiKey=356e24970cd84ebf95aa3db8c50c8e56"

fetch(url)
  .then(response => response.json())
  .then(data => {
    let articles = data.articles
    let cardContainer = document.getElementById("cardContainer")
    cardContainer.innerHTML = ""

    for (let i = 1; i < 50; i++) {
      let article = articles[i]
      let card = createCard(article.title, article.description, article.url, article.urlToImage)
      cardContainer.appendChild(card)
    }

    const searchInput = document.getElementById("search");

    searchInput.addEventListener("input", (event) => {
      const searchTerm = event.target.value.toLowerCase();
      const filteredArticles = articles.filter((article) => {
        return (
          article.title.toLowerCase().includes(searchTerm) ||
          article.description.toLowerCase().includes(searchTerm) ||
          article.source.name.toLowerCase().includes(searchTerm)
        );
      });
      cardContainer.innerHTML = "";
      for (let i = 0; i < filteredArticles.length; i++) {
        let article = filteredArticles[i];
        let card = createCard(article.title, article.description, article.url, article.urlToImage)
        cardContainer.appendChild(card);
      }
    });

  })
  .catch(error => console.error(error))

function createCard(title, description, url, imageUrl) {
  let card = document.createElement("div")
  card.classList.add("card", "mb-3")

  if (imageUrl) {
    let image = document.createElement("img")
    image.classList.add("card-img-top")
    image.src = imageUrl
    card.appendChild(image)
  }

  let cardBody = document.createElement("div")
  cardBody.classList.add("card-body")
  card.appendChild(cardBody)

  let cardTitle = document.createElement("h5")
  cardTitle.classList.add("card-title")
  cardTitle.textContent = title
  cardBody.appendChild(cardTitle)

  if (description) {
    let cardText = document.createElement("p")
    cardText.classList.add("card-text")
    cardText.textContent = description
    cardBody.appendChild(cardText)
  }

  let cardLink = document.createElement("a")
  cardLink.classList.add("btn", "btn-primary")
  cardLink.href = url
  cardLink.target = "_blank"
  cardLink.textContent = "Read More"
  cardBody.appendChild(cardLink)

  return card
}
