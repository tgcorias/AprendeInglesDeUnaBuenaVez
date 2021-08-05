function selector_id (id){
    return document.getElementById(id);
}
selector_id("btn1").innerHTML = "Hola";


function traerDatos(rutaLocal){
    const xhttp = new XMLHttpRequest();
    let text = null;
    xhttp.open('GET', rutaLocal, true)
    xhttp.send();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            text = JSON.parse(xhttp.responseText);
            console.log(text);
            
        }
    }
}