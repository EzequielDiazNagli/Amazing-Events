function getData() {
    var idEvento = 1
    data.eventos.map(evento => evento.id = idEvento++)
    var id =location.search.split("?id=").filter(Number)
    var selectedId = Number(id[0])
    var evento = data.eventos.find((evento) => {
        return evento.id == selectedId
    } )

    var templateHtml = ""
    templateHtml += `
        <div class="card details-card">
            <div class="row g-0 details-card-a">
                <div class="col-md-6">
                    <img src="${evento.image}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-6">
                    <div class="card-body">
                        <h4 class="card-title">${evento.name}</h4>
                        <p class="card-text">${evento.category}</p>
                        <p class="card-text">${evento.description}</p>
                        <p class="card-text">Place: ${evento.place}</p>
                    </div>
                    <div class="card-footer">
                        <h6 class="card-text">${evento.date}</h6>
                        <h6>Precio: ${evento.price}$</h6>
                    </div>
                </div>
            </div>
        </div>`
    document.querySelector("#cartas").innerHTML = templateHtml
}

getData()

/* <p class="card-text">Capacity: ${evento.capacity}</p> 
<p class="card-text">${evento.assistance == undefined ? `<span>Estimate:</span> ${evento.estimate}` : `<span>Assistance: </span> ${evento.assistance}` }</p> */

/* <div class="card details-card">
    <div class="row g-0 details-card-a">
        <div class="col-md-6">
            <img src="../Images/Cine.jpg" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-6">
            <div class="card-body">
                <h5 class="card-title">Título</h5>
                <p class="card-text">Título descriptivo</p>
                <p class="card-text">Título descriptivo</p>
                <p class="card-text">Título descriptivo</p>
            </div>
        </div>
    </div>
</div> */