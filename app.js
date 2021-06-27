
//VARIABLES
const listaProductos = document.querySelector('#lista-productos');
let carritoCompras = [];

const contenedorCarrito = document.querySelector('#contenedorCarrito tbody');

const carrito = document.querySelector('#carrito');

const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

//CARGAR EVENTOS
cargarEventListeners();


function cargarEventListeners() {
    //Cuando agregas un curso 
    listaProductos.addEventListener('click',agregarComida);
    //Elimina curso del carrito
    carrito.addEventListener('click', eliminarCurso);
    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', ()=>{
        console.log('vaciar carrito')
        carritoCompras = [];
        limpiarCarrito();
    })

}

//FUNCION
function agregarComida(e) {
    e.preventDefault();

    if(e.target.classList.contains('boton'))  {
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerDatos(productoSeleccionado);  
    }
    
}

//Eliminar curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId= e.target.getAttribute('data-id');

        //Eliminar del arreglo de articulosCarrito por el data-id
        carritoCompras = carritoCompras.filter( curso => curso.id != cursoId);

        carritoHTML();
    }

}




function leerDatos(producto) {
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h4').textContent,
        precio: producto.querySelector('.precio .oferta').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //console.log(infoProducto);
    //Revisa si existe el elemento
    const existe = carritoCompras.some( producto => producto.id === infoProducto.id);
    //console.log(existe) true
    if(existe){
        //Actualizamos la cantidad
        const productos = carritoCompras.map( producto => {
            if(producto.id === infoProducto.id) {
                producto.cantidad++;
                return producto; //Retorna el bojeto actualizado
            } else {
                return producto; //Los objetos que no son los duplicados
            }
        });
        carritoCompras = [...productos];
    }else {
        //Agregamos el curso al carrito
        carritoCompras = [...carritoCompras,infoProducto];
        //console.log(infoProducto);
    }

   
    carritoHTML();

}

//Mostrar carrito en el HTML
function carritoHTML() {

    //Limpiar Carrito
    limpiarCarrito();
    //Recorre todo el array
    carritoCompras.forEach(producto=> {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${producto.imagen}" width="100"></td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id=${producto.id}> X </a>
            </td>
        `;
        //Agregar el HTML en el tbody
        contenedorCarrito.appendChild(row); 
    });          
}

function limpiarCarrito() {
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}