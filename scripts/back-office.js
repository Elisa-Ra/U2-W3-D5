const url = "https://striveschool-api.herokuapp.com/api/product/"
const key =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYWUyNGY0YmQ0NzAwMTU4NWIxZDgiLCJpYXQiOjE3NjI1MDQyMjgsImV4cCI6MTc2MzcxMzgyOH0.VeMbm7LhPMWsIIxG_K1RyhBfizA4xPQD50fq95q9_mI"

const search_url = location.search
const allTheParameters = new URLSearchParams(search_url)
// se sono in modifica, l'id esiste
// se sono in creazione l'id non esiste
const id = allTheParameters.get("id")

if (id) {
  //se ID non è null
  fetch(url + "/" + id)
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.status)
      }
    })
    .then((productDetails) => {
      //  ripopolo il form
      document.getElementById("name").value = productDetails.name // il nome del prodotto
      document.getElementById("description").value = productDetails.description // la descrizione
      document.getElementById("brand").value = productDetails.brand // il brand
      document.getElementById("image").value = productDetails.imageUrl // l'immagine del prodotto
      document.getElementById("price").value = productDetails.price // il prezzo
    })
    .catch((err) => {
      console.log("errore nel ripopolamento del form", err)
    })
}
// ///////////////////
// Modello Prodotti
// - name (string)
// - description (string)
// - brand (string)
// - imageUrl (string)
// - price (number)
class Product {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name
    this.description = _description
    this.brand = _brand
    this.imageUrl = _imageUrl
    this.price = parseFloat(_price)
  }
}

// Prendo il form
const form = document.getElementById("product-form")
form.addEventListener("submit", (e) => {
  e.preventDefault()
  //   recupero i campi input
  const nameInput = document.getElementById("name") // input del nome
  const descriptionInput = document.getElementById("description") //  input descrizione
  const brandInput = document.getElementById("brand") //  input brand
  const imageInput = document.getElementById("image") // input image / copertina
  const priceInput = document.getElementById("price") //  input prezzo
  // recupero i valori dei campi input
  const name = nameInput.value // valore del campo nome
  const description = descriptionInput.value // valore del campo descrizione
  const brand = brandInput.value // valore del campo brand
  const image = imageInput.value // valore del campo image
  const price = priceInput.value // valore del campo prezzo

  // Controllo che i campi required siano compilati
  if (!name || !description || !brand || !image || !price) {
    alert("Devi compilare tutti i campi!")
    return
  }

  //   creo il prodotto con i campi required
  const newProduct = new Product(name, description, brand, image, price)
  console.log("NEWPRODUCT", newProduct)

  // se l'id è presente nell'URL devo fare una PUT, non devo fare una POST!

  let method

  if (id) {
    method = "PUT"
  } else {
    method = "POST"
  }

  let finalUrl

  if (id) {
    finalUrl = url + "/" + id // INDIRIZZO SPECIFICO
  } else {
    finalUrl = url // INDIRIZZO GENERICO
  }

  fetch(finalUrl, {
    method: method, // creo una nuova risorsa
    // method: id ? 'PUT' : 'POST', // creo una nuova risorsa
    body: JSON.stringify(newProduct), // devo mandare newProduct in formato JSON!
    headers: {
      "Content-Type": "application/json",
      Authorization: key,
    },
  })
    .then((res) => {
      if (res.ok) {
        // se è andato tutto bene faccio aprire il modal con il costruttore di bootstrap
        const modal = new bootstrap.Modal(
          document.getElementById("successModal")
        )
        modal.show()

        // svuotiamo il form
        form.reset()
        // reindirizzo alla home dopo 3 secondi
        setTimeout(() => {
          window.location.href = "./index.html"
        }, 3000)
      } else {
        // se c'è qualche errore
        throw new Error(`Errore nella risposta del server: ${res.status}`)
      }
    })
    .catch((err) => {
      console.log("PROBLEMA NEL SALVATAGGIO DEL PRODOTTO", err)
    })
})
