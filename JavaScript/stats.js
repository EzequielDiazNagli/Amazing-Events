let divTablaGeneral = document.getElementById("tablaGeneral")
let divUpcomingStats = document.getElementById("upcomingStats")
let divPastStats = document.getElementById("pastStats")
let data
let eventos = []
// console.log(eventos)
let eventosPasadosArray = []
let eventosFuturosArray = []
let fechaActual = ""

async function getDatafromAPI() {
    await fetch("https://amazing-events.herokuapp.com/api/events")
        .then(response => response.json())
        .then(json => data = json);

    eventos = data.events
    // console.log(eventos)
    fechaActual = data.currentDate
    // console.log(fechaActual)

    eventosPasadosArray = eventosPasados(eventos);
    eventosFuturosArray = eventosFuturos(eventos);

    let eventoConMayorAudiencia = audienciaCapacidad(eventosPasadosArray)[0]
    let eventoConMenorAudiencia = audienciaCapacidad(eventosPasadosArray)[1]
    let eventoConMayorCapacidad = audienciaCapacidad(eventos)[2]

    let categoriasFuturas = [];
    categoriasFuturas = filtroCategorias(eventosFuturosArray);
    
    let categoriasPasadas = [];
    categoriasPasadas = filtroCategorias(eventosPasadosArray);
    
    let upcomingStats = calculoDeStats(categoriasFuturas, eventosFuturosArray);

    let pastStats = calculoDeStats(categoriasPasadas, eventosPasadosArray);

    function audienciaCapacidad(array) {
        let mayorAudiencia = 0;
        let menorAudiencia = 100000000;
        let mayorCapacidad = 0;
        let audienciaEvento = 0;
        let eventoRetornar = [mayorAudiencia, menorAudiencia, mayorCapacidad]
        for (elemento of array) {
            audienciaEvento = Number(elemento.assistance) / Number(elemento.capacity)
            if (audienciaEvento > mayorAudiencia) {
                mayorAudiencia = audienciaEvento;
                eventoRetornar[0] = elemento.name;
            } else if (audienciaEvento < menorAudiencia) {
                menorAudiencia = audienciaEvento;
                eventoRetornar[1] = elemento.name;
            }
            if (Number(elemento.capacity) > mayorCapacidad) {
                mayorCapacidad = Number(elemento.capacity);
                eventoRetornar[2] = elemento.name;
            }
        }
        return eventoRetornar
    }

    function filtroCategorias(array) {
        let categoriasFiltradas = array.map(elemento => elemento.category);
        return [...new Set(categoriasFiltradas)];
    }

    function calculoDeStats(arrayCategorias, arrayEventos) {
        let categoriesStats = [];
        let revenueCategoria = 0;
        let attendanceCategoria = 0;
        let elementosEnCategoria = 0;

        for (categoria of arrayCategorias) {
            revenueCategoria = 0;
            attendanceCategoria = 0;
            elementosEnCategoria = 0;
            for (elemento of arrayEventos) {
                if (elemento.category == categoria) {
                    if (elemento.date > fechaActual) {
                        revenueCategoria += Number(elemento.price) * Number(elemento.estimate);
                        attendanceCategoria += Number(elemento.estimate) / Number(elemento.capacity) * 100;
                        elementosEnCategoria++;
                    } else {
                        revenueCategoria += Number(elemento.price) * Number(elemento.assistance);
                        attendanceCategoria += Number(elemento.assistance) / Number(elemento.capacity) * 100;
                        elementosEnCategoria++;
                    }
                }
            }
            categoriesStats.push(
                {
                    category: categoria,
                    revenue: revenueCategoria / elementosEnCategoria,
                    attendance: attendanceCategoria / elementosEnCategoria
                }
            )
        }
        return categoriesStats;
    }

    function eventosFuturos(array) {
        let arrayFuturo = [];
        for (elemento of array) {
            if (elemento.date > fechaActual) {
                arrayFuturo.push(elemento);
            }
        }
        return arrayFuturo;
    }

    function eventosPasados(array) {
        let arrayPasado = [];
        for (elemento of array) {
            if (elemento.date < fechaActual) {
                arrayPasado.push(elemento);
            }
        }
        return arrayPasado;
    }

    tablaGeneral()
    function tablaGeneral() {
        let fila = document.createElement('tr')
        fila.innerHTML = `    
                <td class="text-center">${eventoConMayorAudiencia} </td>
                <td class="text-center">${eventoConMenorAudiencia} </td>
                <td class="text-center">${eventoConMayorCapacidad} </td>
                `
        divTablaGeneral.appendChild(fila);
    }

    tabla2y3(upcomingStats, pastStats)
    function tabla2y3(arrayFuturo, arrayPasado) {
        for (elemento of arrayFuturo) {
            divUpcomingStats.appendChild(crearFila(elemento));
        }
        for (elemento of arrayPasado) {
            divPastStats.appendChild(crearFila(elemento));
        }
    }

    function crearFila(elemento){
        let fila = document.createElement('tr')
        fila.innerHTML = `    
                <td>${elemento.category} </td>
                <td class="text-center">$${elemento.revenue.toFixed(2)} </td>
                <td class="text-center">%${elemento.attendance.toFixed(2)} </td>
                `
        return fila;
    }
}
getDatafromAPI();