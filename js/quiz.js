function readText(ruta_local) {
    var texto = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", ruta_local, false);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
      texto = xmlhttp.responseText;
    }
    return texto;
  }
  
window.onload = function() {
    const base_preguntas = readText("../js/base-preguntas.json");
     interprete_bp = JSON.parse(base_preguntas);
    escogerPreguntaAleatoria();
  }
  
  let pregunta;
  let posibles_respuestas;
  btn_correspondiente = [
    select_id("btn1"), select_id("btn2"),
    select_id("btn3"), select_id("btn4")
  ]
  npreguntas = [];
  
  let preguntas_hechas = 0;
  let preguntas_correctas = 0;
  
  function escogerPreguntaAleatoria() {
    let n = Math.floor(Math.random() * interprete_bp.length);
    // n = 0
  
    while (npreguntas.includes(n)) {
      n++
      if (n >= interprete_bp.length) {
        n = 0
      };
      if (npreguntas.length == interprete_bp.length) {
        npreguntas = []
      };
    }
    npreguntas.push(n);
    preguntas_hechas++;
    
    escogerPregunta(n);
  }
  
  function escogerPregunta(n) {
    pregunta = interprete_bp[n];
    select_id("pregunta").innerHTML = pregunta.Pregunta;
    select_id("numero").innerHTML = n;
    let pc = preguntas_correctas;
    if(preguntas_hechas>1){
      select_id("puntaje").innerHTML = pc + "/" + (preguntas_hechas-1);
    }else{
       select_id("puntaje").innerHTML = "";
    }

    desordenarRespuestas(pregunta);
  
    if (pregunta.imagen) {
      select_id("imagen").setAttribute("src", pregunta.imagen);
      style("imagen").height = "200px";
      style("imagen").width = "100%";
    } else {
      style("imagen").height = "0px";
      style("imagen").width = "0px"
      setTimeout(() => {;
              select_id("imagen").setAttribute("src", "")
      }, 500);
    }
  }
  
  function desordenarRespuestas(pregunta) {

    posibles_respuestas = [
      pregunta.RtaCorrecta,
      pregunta.Incorrecta1,
      pregunta.Incorrecta2,
      pregunta.Incorrecta3
    ]
    posibles_respuestas.sort(() => Math.random() - 0.5);
  
    select_id("btn1").innerHTML = posibles_respuestas[0];
    select_id("btn2").innerHTML = posibles_respuestas[1];
    select_id("btn3").innerHTML = posibles_respuestas[2];
    select_id("btn4").innerHTML = posibles_respuestas[3];
  }
  
  let suspender_botones = false;
  
  function oprimir_btn(i) {
    if (suspender_botones) {
      return
    }
    suspender_botones = true
    if (posibles_respuestas[i] == pregunta.respuesta) {
      preguntas_correctas++
      btn_correspondiente[i].style.background = "lightgreen"
    } else {
      btn_correspondiente[i].style.background = "pink"
    }
    for (let j = 0; j < 4; j++) {
      if (posibles_respuestas[j] == pregunta.respuesta) {
        btn_correspondiente[j].style.background = "lightgreen"
        break
      }
    }
    setTimeout(() => {
      reiniciar()
      suspender_botones = false;
    }, 3000);
  }
  
  // let p = prompt("numero")
  
  function reiniciar() {
    for (const btn of btn_correspondiente) {
      btn.style.background = "white";
    }
    escogerPreguntaAleatoria();
  }
  
  function select_id(id) {
    return document.getElementById(id);
  }
  
  function style(id) {
    return select_id(id).style;
  }
  
  