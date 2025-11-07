const params = new URLSearchParams(location.search)
const id = params.get("id")

const url = "https://striveschool-api.herokuapp.com/api/product/"
const key =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYWUyNGY0YmQ0NzAwMTU4NWIxZDgiLCJpYXQiOjE3NjI1MDQyMjgsImV4cCI6MTc2MzcxMzgyOH0.VeMbm7LhPMWsIIxG_K1RyhBfizA4xPQD50fq95q9_mI"

fetch(url + id, {
  headers: {
    "Content-Type": "application/json",
    Authorization: key,
  },
})
  .then((res) => res.json())
  .then((product) => {
    const container = document.getElementById("product-detail")

    const col = document.createElement("div")
    col.className = "col justify-content-center"

    // Card
    const card = document.createElement("div")
    card.className = "card h-100 mx-auto"
    card.style.width = "18rem"

    // Immagine
    const img = document.createElement("img")
    img.className = "card-img-top img-fixed w-100"
    img.src = product.imageUrl
    img.alt = product.name

    const cardBody = document.createElement("div")
    cardBody.className = "card-body d-flex flex-column"

    // Nome
    const title = document.createElement("h5")
    title.className = "card-title"
    title.innerText = product.name

    // Descrizione
    const description = document.createElement("p")
    description.className = "card-text"
    description.innerText = product.description

    // Brand
    const brand = document.createElement("p")
    brand.className = "card-text"
    brand.innerHTML = `<strong>Brand:</strong> ${product.brand}`

    // Prezzo
    const price = document.createElement("p")
    price.className = "card-text"
    price.innerText = product.price + "€"

    // Pulsanti
    const buttonGroup = document.createElement("div")
    buttonGroup.className = "d-flex gap-3 mt-3 w-100"

    // Pulsante ELIMINA
    const button_remove = document.createElement("button")
    button_remove.className = "btn btn-danger flex-fill"
    button_remove.innerText = "Elimina"
    button_remove.addEventListener("click", () => {
      fetch(`${url}${product._id}`, {
        method: "DELETE",
        headers: {
          Authorization: key,
        },
      })
        .then((res) => {
          if (res.ok) {
            alert(
              "Prodotto eliminato con successo, verrai reindirizzato alla home"
            )
            window.location.href = "./index.html"
            col.remove()
          } else {
            throw new Error("Errore nella cancellazione del prodotto")
          }
        })
        .catch((err) => {
          console.log("Errore", err)
        })
    })

    // PULSANTE MODIFICA (che mi porta alla pagina back-office per la modifica del prodotto)
    const button_edit = document.createElement("a")
    button_edit.className = "btn btn-warning flex-fill"
    button_edit.innerText = "Modifica"
    button_edit.href = `./back-office.html?id=${product._id}`

    buttonGroup.appendChild(button_edit)
    buttonGroup.appendChild(button_remove)

    cardBody.appendChild(title)
    cardBody.appendChild(description)
    cardBody.appendChild(brand)
    cardBody.appendChild(price)
    cardBody.appendChild(buttonGroup)
    card.appendChild(img)
    card.appendChild(cardBody)
    col.appendChild(card)
    container.appendChild(col)
  })

  .catch((err) => {
    console.log("Errore nel caricamento del prodotto", err)
  })
