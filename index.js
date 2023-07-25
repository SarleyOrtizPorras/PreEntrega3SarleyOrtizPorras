
//tercera entrega//
let carritoVisible = false;

//para que cargue todo//
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){

    // agregue funcionalidades a los botones//

    //funcionalidad de el boton sumar al carrito
    let botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(let i=0;i<botonesEliminarItem.length; i++){
        let button = botonesEliminarItem[i];
        button.addEventListener('click',eliminarItemCarrito);
    }

    //funcionalidad de el boton sumar al carrito//
    let botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(let i=0;i<botonesSumarCantidad.length; i++){
        let button = botonesSumarCantidad[i];
        button.addEventListener('click',sumarCantidad);
    }

     //funcionalidad de el buton restar al carrito//
    let botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(let i=0;i<botonesRestarCantidad.length; i++){
        let button = botonesRestarCantidad[i];
        button.addEventListener('click',restarCantidad);
    }

    //funcionalidad de el boton Agregar al carrito//
    let botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for(let i=0; i<botonesAgregarAlCarrito.length;i++){
        let button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    //comprar zapatos//
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked)
}

//se elimina todo//
function pagarClicked(){
    alert("Gracias por la compra");
    let carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild)
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}

//funcion del click//
function agregarAlCarritoClicked(event){
    let button = event.target;
    let item = button.parentElement;
    let titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    let precio = item.getElementsByClassName('precio-item')[0].innerText;
    let imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    agregarItemAlCarrito(titulo, precio, imagenSrc);

    hacerVisibleCarrito();
}

//aparece el carrito//
function hacerVisibleCarrito(){
    carritoVisible = true;
    let carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    let items =document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

//agrega al carrito//
function agregarItemAlCarrito(titulo, precio, imagenSrc){
    let item = document.createElement('div');
    item.classList.add = ('item');
    let itemsCarrito = document.getElementsByClassName('carrito-items')[0];
    let nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(let i=0;i < nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText==titulo){
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }

    let itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    //Boton de Eliminar//
     item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    //Boton de restar//
    let botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click',restarCantidad);

    //Boton de sumar//
    let botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click',sumarCantidad);

    //Actualizamos total//
    actualizarTotalCarrito();
}
//Suma el numero de zapatos//
function sumarCantidad(event){
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    let cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}

//resta el numero de zapatos//
function restarCantidad(event){
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    let cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

//Elimina los zapatos del carrito//
function eliminarItemCarrito(event){
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //Actualizamos el total del carrito//
    actualizarTotalCarrito();
    //oculta carrito//
    ocultarCarrito();
}

function ocultarCarrito(){
    let carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount==0){
        let carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;
    
        let items =document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}

//Actualizacion del carrito//
function actualizarTotalCarrito(){
    
    let carritoContenedor = document.getElementsByClassName('carrito')[0];
    let carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    let total = 0;
    for(let i=0; i< carritoItems.length;i++){
        let item = carritoItems[i];
        let precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        let precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
        let cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        console.log(precio);
        let cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
    }
    total = Math.round(total * 100)/100;

    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$'+total.toLocaleString("es") + ",00";

}

//LocalStorage//
obtener_localstorage();
//guardar_localstorage();

function obtener_localstorage(){

    if( localStorage.getItem( "zapatos1") ){
        let zapatos1 = localStorage.getItem( "zapatos1" );
        let nike1 = JSON.parse(localStorage.getItem( "nike1" ) );
        console.log(zapatos1);
        console.log(nike1);
    }else{
        console.log("No hay entradas en el local storage");
    }
    if( localStorage.getItem( "zapatos2") ){
        let zapatos1 = localStorage.getItem( "zapatos2" );
        let nike1 = JSON.parse(localStorage.getItem( "nike2" ) );
        console.log(zapatos2);
        console.log(nike2);
    }else{
        console.log("No hay entradas en el local storage");
    }
    if( localStorage.getItem( "zapatos3") ){
        let zapatos1 = localStorage.getItem( "zapatos3" );
        let nike1 = JSON.parse(localStorage.getItem( "nike3" ) );
        console.log(zapatos3);
        console.log(nike3);
    }else{
        console.log("No hay entradas en el local storage");
    }
    if( localStorage.getItem( "zapatos4") ){
        let zapatos1 = localStorage.getItem( "zapatos4" );
        let nike1 = JSON.parse(localStorage.getItem( "nike4" ) );
        console.log(zapatos4);
        console.log(nike4);
    }else{
        console.log("No hay entradas en el local storage");
    }
    if( localStorage.getItem( "zapatos5") ){
        let zapatos1 = localStorage.getItem( "zapatos5" );
        let nike1 = JSON.parse(localStorage.getItem( "nike5" ) );
        console.log(zapatos5);
        console.log(nike5);
    }else{
        console.log("No hay entradas en el local storage");
    }
    if( localStorage.getItem( "zapatos6") ){
        let zapatos1 = localStorage.getItem( "zapatos6" );
        let nike1 = JSON.parse(localStorage.getItem( "nike6" ) );
        console.log(zapatos6);
        console.log(nike6);
    }else{
        console.log("No hay entradas en el local storage");
    }
    if( localStorage.getItem( "zapatos7") ){
        let zapatos1 = localStorage.getItem( "zapatos7" );
        let nike1 = JSON.parse(localStorage.getItem( "nike7" ) );
        console.log(zapatos7);
        console.log(nike7);
    }else{
        console.log("No hay entradas en el local storage");
    }
    if( localStorage.getItem( "zapatos8") ){
        let zapatos1 = localStorage.getItem( "zapatos8" );
        let nike1 = JSON.parse(localStorage.getItem( "nike8" ) );
        console.log(zapatos8);
        console.log(nike8);
    }else{
        console.log("No hay entradas en el local storage");
    }
    if( localStorage.getItem( "zapatos9") ){
        let zapatos1 = localStorage.getItem( "zapatos9" );
        let nike1 = JSON.parse(localStorage.getItem( "nike9" ) );
        console.log(zapatos9);
        console.log(nike9);
    }else{
        console.log("No hay entradas en el local storage");
    }
}


function guardar_localstorage(){

let nike1 = {
talla: "41"
    };
    let zapatos1 = "zapatos1";

    localStorage.setItem( "zapatos1", zapatos1 ) ;
    localStorage.setItem( "zapatos1", JSON.stringify(nike1) );

let nike2 = {
talla: "30"
    };
    let zapatos2 = "zapatos2";

    localStorage.setItem( "zapatos2", zapatos2 ) ;
    localStorage.setItem( "zapatos2", JSON.stringify(nike2) );

let nike3 = {
talla: "35"
    };
    let zapatos3 = "zapatos3";

    localStorage.setItem( "zapatos3", zapatos3 ) ;
    localStorage.setItem( "zapatos3", JSON.stringify(nike3) );

let nike4 = {
talla: "38"
    };
    let zapatos4 = "zapatos4";

    localStorage.setItem( "zapatos4", zapatos4 ) ;
    localStorage.setItem( "zapatos4", JSON.stringify(nike4) );

let nike5 = {
talla: "39"
};
let zapatos5 = "zapatos5";

localStorage.setItem( "zapatos5", zapatos5 ) ;
localStorage.setItem( "zapatos5", JSON.stringify(nike5) );

let nike6 = {
talla: "40"
};
let zapatos6 = "zapatos6";

localStorage.setItem( "zapatos6", zapatos6 ) ;
localStorage.setItem( "zapatos6", JSON.stringify(nike6) );

let nike7 = {
talla: "42"
};
let zapatos7 = "zapatos7";

localStorage.setItem( "zapatos7", zapatos7 ) ;
localStorage.setItem( "zapatos7", JSON.stringify(nike7) );

let nike8 = {
talla: "36"
};
let zapatos8 = "zapatos8";

localStorage.setItem( "zapatos8", zapatos8 ) ;
localStorage.setItem( "zapatos8", JSON.stringify(nike8) );

let nike9 = {
talla: "31"
};
let zapatos9 = "zapatos9";

localStorage.setItem( "zapatos9", zapatos9 ) ;
localStorage.setItem( "zapatos9", JSON.stringify(nike9) );

}








