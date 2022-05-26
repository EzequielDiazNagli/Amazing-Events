// const fecha = data.eventos.filter(evento => evento.date < data.fechaActual).map(e => e.date)
// console.log(fecha)

var checkboxSelected = []
var textSearch = ""

function createdCheckbox() {
    var checkboxes = document.getElementById("checkboxes")
    var todasLasCategorias = data.eventos.map(evento => evento.category)
    // console.log(todasLasCategorias)
    const dataArray = new Set(todasLasCategorias);
    // console.log(dataArray)
    var categorias = [...dataArray]
    // console.log(categorias);

    var inputCheckbox = ""
    categorias.forEach(category => {
    inputCheckbox += `<label for=""><input type="checkbox" value="${category}">${category}</label>`
    })
    checkboxes.innerHTML = inputCheckbox
    var id = 1
    data.eventos.map(evento => evento.id = id++)
    // console.log(data.eventos)
}
createdCheckbox()

const eventosUpcoming = data.eventos.filter(e => data.fechaActual < e.date)
// console.log(eventosUpcoming)

var checkbox = document.querySelectorAll("input[type=checkbox]")
// console.log(checkbox)
checkbox.forEach(check => check.addEventListener("click", (event) => {
    var checked = event.target.checked
    if (checked) {
        checkboxSelected.push(event.target.value)
        filterArray()
    } else {
        checkboxSelected = checkboxSelected.filter(uncheck => uncheck !== event.target.value)
        filterArray()
    }
}))

var inputSearch = document.getElementById("search")
inputSearch.addEventListener("keyup", (event) =>{
    textSearch = event.target.value
    filterArray()
})

function filterArray() {
    let datos = []
    if (checkboxSelected.length > 0 && textSearch !== ""){
        checkboxSelected.map(category =>{
            datos.push(...eventosUpcoming.filter(evento => evento.name.toLowerCase().includes(textSearch.trim().toLowerCase()) && evento.category == category))})
    } else if (checkboxSelected.length > 0 && textSearch === ""){
        checkboxSelected.map(category => datos.push(...eventosUpcoming.filter(evento => evento.category == category)))
    } else if (checkboxSelected.length == 0 && textSearch !==""){
        datos.push(...eventosUpcoming.filter(evento => evento.name.toLowerCase().includes(textSearch.trim().toLowerCase())))
    } else {datos.push(...eventosUpcoming)}
    displayCards(datos)
    // console.log(datos)
}
filterArray()

function displayCards(datos) {
    var templateHtml = ""
    for (let i=0; i<datos.length; i++) {
        if (data.fechaActual < datos[i].date) {
            templateHtml += `
            <div class="col">
            <div class="card card-home">
                <img src="${datos[i].image}">
                <div class="card-body">
                    <h5 class="card-title">${datos[i].name}</h5>
                    <p class="card-text">${datos[i].description}</p>
                </div>
                <div class="card-footer">
                    <h6>Precio: ${datos[i].price}$</h6>
                    <a href="./details.html?id=${datos[i].id}" class="btn btn-primary">See more</a>
                </div>
            </div>
        </div>`
        }
    }    
    if(datos.length > 0) {
        document.querySelector("#cartas-up").innerHTML = templateHtml
    } else {
        document.querySelector("#cartas-up").innerHTML =
        `<div class="sinResultado">
            <h3>No results found. Please try again.</h3>
        </div>`
    }   
}

// // FUNCION CON FOREACH
// function displayCards() {
//     var templateHtml = ""
//     data.eventos.filter(evento => evento.date > data.fechaActual)
//     .forEach(evento => {
//             templateHtml += `
//                 <div class="col">
//                     <div class="card">
//                         <img src="${evento.image}">
//                         <div class="card-body">
//                             <h5 class="card-title">${evento.name}</h5>
//                             <p class="card-text">${evento.description}</p>
//                         </div>
//                         <div class="card-footer">
//                             <h6>Precio: ${evento.price}$</h6>
//                             <a href="details.html" class="btn btn-primary">Ver más</a>
//                         </div>
//                     </div>
//                 </div>`
//     })
//     document.querySelector("#cartas-up").innerHTML = templateHtml
// }

// displayCards()

// // FUNCION CON FOR
// function displayCards() {
//     var templateHtml = ""
//     for (let i=0; i<data.eventos.length; i++) {
//         if (data.fechaActual < data.eventos[i].date) {
//             templateHtml += `
//             <div class="col">
//             <div class="card">
//                 <img src="${data.eventos[i].image}">
//                 <div class="card-body">
//                     <h5 class="card-title">${data.eventos[i].name}</h5>
//                     <p class="card-text">${data.eventos[i].description}</p>
//                 </div>
//                 <div class="card-footer">
//                     <h6>Precio: ${data.eventos[i].price}</h6>
//                     <a href="details.html" class="btn btn-primary">Ver más</a>
//                 </div>
//             </div>
//         </div>`
//         }
//     }
//     document.querySelector("#cartas-up").innerHTML = templateHtml
// }

// displayCards()