const ganadorOctavos1 = JSON.parse(localStorage.getItem("ganadorOctavos1"));
const ganadorOctavos2= JSON.parse(localStorage.getItem("ganadorOctavos2"));
const ganadorOctavos3 = JSON.parse(localStorage.getItem("ganadorOctavos3"));
const ganadorOctavos4 = JSON.parse(localStorage.getItem("ganadorOctavos4"));
const ganadorOctavos5 = JSON.parse(localStorage.getItem("ganadorOctavos5"));
const ganadorOctavos6 = JSON.parse(localStorage.getItem("ganadorOctavos6"));
const ganadorOctavos7 = JSON.parse(localStorage.getItem("ganadorOctavos7"));
const ganadorOctavos8 = JSON.parse(localStorage.getItem("ganadorOctavos8"));
const footer=document.querySelector("footer")
let botonApretado=false
const botonCuartos=document.querySelector("#botonCuartos");
const botonResultadosCuartos=document.querySelector("#botonresultadocuartos")
const botonsiguiente=document.querySelector("#botonsiguiente")
const partidos=[[1,ganadorOctavos5,ganadorOctavos7],[2,ganadorOctavos1,ganadorOctavos3],[3,ganadorOctavos6,ganadorOctavos8],[4,ganadorOctavos2,ganadorOctavos4]];
const botonSalir=document.querySelector("#botonSalir")
botonSalir.addEventListener("click",()=>{
    window.location.href="../index.html"
})
function crearSeleccionesCuartos(array,numero){
    const seleccionesCuartos=document.getElementById("seleccionesCuartos");
    const seccionSeleccionesCuartos=document.createElement('section')
    seccionSeleccionesCuartos.innerHTML=
    `<div class="seleccionesprimeras d-flex">
    <div class="d-flex clasificadas">    
        <div class="bandera">
            <img class="bandera" src="${array[numero][1].bandera}" alt="">
        </div>
            <h5 class="seleccion">${array[numero][1].pais}</h5>
    </div>        
    </div>
    <p></p>
    <div class="d-flex clasificadas">    
    <div class="bandera">
        <img class="bandera" src="${array[numero][2].bandera}" alt="">
    </div>
        <h5 class="seleccion">${array[numero][2].pais}</h5>
</div>        
</div>
    `
    seleccionesCuartos.appendChild(seccionSeleccionesCuartos)}
if(localStorage.length>=24){
    for (const numero of [0,1,2,3]) {
        crearSeleccionesCuartos(partidos,numero)
        
    }}else{
        setTimeout(()=>{
            Swal.fire({
                icon: 'error',
                title: 'Espera la fechas!!',
                text: 'Todavia no clasificaste a nadie a Cuartos',
                background:"linear-gradient(#3d1723da,#050002dc)",
                color:"rgb(161, 165, 168)",
                iconColor:"e7077793",
                confirmButtonColor:"#e7077793",
                confirmButtonText:"Mala Suerte!",
                }).then((result)=>{
                    if(result.isConfirmed){
                        if((localStorage.length)==16){
                            window.location.href="../pages/octavos.html"
                        }else{window.location.href="../pages/grupos.html"}
                    }
                })
        },150)
    }


function crearPartidoCuartos(local, visita, npartido){

    function cargarEstadio(numero,posicion,posicion2){
        fetch("../data/cuartos.json")
        .then(respuesta=>respuesta.json())
        .then(data=>{
               const estadio =data.find((el)=>el.npartido===numero)
    posicion.innerHTML=estadio.estadio   
    posicion2.innerHTML=estadio.fecha});
}
    const seccionCuartos=document.getElementById('seccionCuartos');
    const partido14final=document.createElement('section');
    partido14final.innerHTML=
    `<div class="alineacionCuartos">
        <div class="contenedorCuartos">
            <div class="partidoCuartos">
                <div class="fechaHora">
                    <h5 class="fecha${npartido}"></h5>
                </div>
                <div class="estadio">
                    <h5 class="estadio${npartido}"></h5>
                </div>
                <div class="partido d-flex">
                    <h6 class="equipoL">${local.pais}</h6>
                    <img class="bandera" src="${local.bandera}" alt="bandera${local.pais}" />
                    <input type="number" id="golesL${npartido}" size="1"/>
                    <p class="guion">-</p>
                    <input id="golesV${npartido}" type="number" size="1" />
                    <img class="bandera" src="${visita.bandera}" alt="bandera${visita.pais}" />
                    <h6 class="equipoV">${visita.pais}</h6>
                </div>
                <div class="ganador d-flex">
                    <p>Ganador:</p>
                    <p id="ganador${npartido}" class="mx-3"></p>
                </div>
            </div>
        </div>
    </div>`
    seccionCuartos.appendChild(partido14final);
    botonResultadosCuartos.classList.remove("display-none")
    const estadio=document.querySelector(`.estadio${npartido}`);
    const fecha=document.querySelector(`.fecha${npartido}`)
    cargarEstadio(npartido,estadio,fecha)
    botonApretado=true

}

botonCuartos.addEventListener("click", ()=>{
    footer.classList.remove("footerIndex")
    if(botonApretado==true){
        Swal.fire({
            icon: 'error',
            title: 'ALTO!!',
            text: "error?",
            background:"linear-gradient(#3d1723da,#050002dc)",
            color:"rgb(161, 165, 168)",
            iconColor:"e7077793",
            confirmButtonColor:"#e7077793",
            confirmButtonText:"Mala suerte!",
            })
    }else{
    for(let partido of [1,2,3,4]){
        crearPartidoCuartos(partidos[partido-1][1],partidos[partido-1][2],partido)
    }
};})
botonResultadosCuartos.addEventListener("click", ()=>{
    for(let numero of [1,2,3,4]){
        let golesL=document.querySelector(`#golesL${numero}`);
        let golesV=document.querySelector(`#golesV${numero}`);
        let ganador=document.querySelector(`#ganador${numero}`)
        if(golesL.value==""||golesV.value==""){
            Swal.fire({
                icon: 'error',
                title: 'error!!',
                text: 'Te olvidaste los goles',
                background:"linear-gradient(#3d1723da,#050002dc)",
                color:"rgb(161, 165, 168)",
                iconColor:"e7077793",
                confirmButtonColor:"#e7077793",
                confirmButtonText:"Mala Suerte!"
                });
                break;
        }else if(golesL.value==golesV.value){
            Swal.fire({
                icon: 'info',
                title:partidos[numero-1][1].pais +' y '+ partidos[numero-1][2].pais+' A penales???',
                text: innerHTML='El resultado de los penales!',
                background:"linear-gradient(#3d1723da,#050002dc)",
                confirmButtonColor:"#e7077793",
                iconColor:"e7077793",
                color:"rgb(161, 165, 168)",

                });
                break;
        }else if
        (golesL.value>golesV.value){
            ganador.innerHTML=`<img class="bandera" src="${partidos[numero-1][1].bandera}" alt="" />`+partidos[numero-1][1].pais;
            const ganadorCuartos=JSON.stringify(partidos[numero-1][1]);
            localStorage.setItem(`ganadorCuartos${numero}`,ganadorCuartos);
            botonsiguiente.classList.remove("display-none")
        }else{
            ganador.innerHTML=`<img class="bandera" src="${partidos[numero-1][2].bandera}" alt="" />`+partidos[numero-1][2].pais;
            const ganadorCuartos=JSON.stringify(partidos[numero-1][2]);
            localStorage.setItem(`ganadorCuartos${numero}`,ganadorCuartos);
            botonsiguiente.classList.remove("display-none")
        }}})
botonsiguiente.addEventListener("click",()=>{
    setTimeout(()=>{
        window.location.href="../pages/semi.html"
    },500)
})
