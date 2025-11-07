const url = "https://striveschool-api.herokuapp.com/api/product/"
const key =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYWUyNGY0YmQ0NzAwMTU4NWIxZDgiLCJpYXQiOjE3NjI1MDQyMjgsImV4cCI6MTc2MzcxMzgyOH0.VeMbm7LhPMWsIIxG_K1RyhBfizA4xPQD50fq95q9_mI"

//// FUNZIONE PER GESTIRE GLI ERRORI
function showErrorModal(message, statusCode = null) {
  const modalBody = document.querySelector("#errorModal .modal-body")

  // Pulisco il contenuto precedente
  modalBody.textContent = ""

  // Creo un paragrafo per il messaggio
  const msg = document.createElement("p")
  msg.textContent = message
  modalBody.appendChild(msg)

  // se c'è lo statusCode aggiungo l'img del gatto
  if (statusCode) {
    const img = document.createElement("img")
    img.src = `https://http.cat/${statusCode}`
    img.alt = `Errore ${statusCode}`
    img.className = "img-fluid rounded mt-2"
    modalBody.appendChild(img)
  }

  // Mostra il modal
  const errorModal = new bootstrap.Modal(document.getElementById("errorModal"))
  errorModal.show()
}
////////////////////////7
const getData = function () {
  fetch(url, {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      Authorization: key,
    },
  })
    .then((res) => {
      if (!res.ok) {
        showErrorModal(`Errore HTTP: ${res.status}`, res.status)
        throw new Error(`Errore HTTP: ${res.status}`)
      }
      return res.json()
    })

    .then((data) => {
      const row = document.getElementById("products-row")

      data.forEach((product) => {
        // Colonna
        const col = document.createElement("div")
        col.className = "col justify-content-center" // Uso le classi di bootstrap

        // Card
        const card = document.createElement("div")
        card.className = "card h-100 mx-auto"
        card.style.width = "18rem"

        // Immagine
        const img = document.createElement("img")
        img.className = "card-img-top img-fixed"
        img.src = product.imageUrl
        img.alt = "game-cover"

        // Body della card
        const cardBody = document.createElement("div")
        cardBody.className = "card-body d-flex flex-column"

        // Titolo
        const title = document.createElement("h5")
        title.className = "card-title text-center flex-grow-1"
        title.innerText = product.name

        // Div dei pulsanti
        const buttonGroup = document.createElement("div")
        buttonGroup.className = "d-flex gap-3 mt-3 w-100"

        // Pulsante Dettaglio
        const button_detail = document.createElement("a")
        button_detail.className = "btn btn-info flex-fill text-light"
        button_detail.innerText = "Dettaglio"
        button_detail.href = `./dettaglio.html?id=${product._id}`

        // AppendChild per comporre la card
        cardBody.appendChild(title)

        buttonGroup.appendChild(button_detail)
        cardBody.appendChild(buttonGroup)
        card.appendChild(img)
        card.appendChild(cardBody)
        col.appendChild(card)
        row.appendChild(col)
      })
    })
    .catch((err) => {
      console.error("Errore nella request", err)
      showErrorModal(
        "Errore imprevisto. Controlla la connessione o riprova più tardi."
      )
    })
}

getData()
