document.addEventListener('DOMContentLoaded', () => {

  /* ----------------- Squadre e giocatori ----------------- */
  const squadre = {
    "Ocean Warriors": {
      immagine: "OW.jpg",
      giocatori: [
        {nome: "Manuel Ardia", capitano: true},
        {nome: "Emanuele Materazzo"},
        {nome: "Cosimo Castagna"},
        {nome: "Pasquale Colangelo"},
        {nome: "Gianmarco Macellaro"}
      ]
    },
    "Red Phoenix": {
      immagine: "RP.jpg",
      giocatori: [
        {nome: "Temidayo Mabo", capitano: true},
        {nome: "Vito Nunziante"},
        {nome: "Crescenzo Gorrasi"},
        {nome: "Fiorentino Salzano"},
        {nome: "Gennaro Gaeta"}
      ]
    }
  };

  /* ----------------- Partite ----------------- */
  const partite = [
    {risultato:"8-6", squadraA:"Ocean Warriors", squadraB:"Red Phoenix", marcatori:[
      {nome:"Manuel Ardia", gol:3}, {nome:"Emanuele Materazzo", gol:3},
      {nome:"Cosimo Castagna", gol:2}, {nome:"Temidayo Mabo", gol:4},
      {nome:"Vito Nunziante", gol:1}
    ]},
    {risultato:"8-8", squadraA:"Ocean Warriors", squadraB:"Red Phoenix", marcatori:[
      {nome:"Manuel Ardia", gol:5}, {nome:"Cosimo Castagna", gol:2},
      {nome:"Emanuele Materazzo", gol:1}, {nome:"Temidayo Mabo", gol:6},
      {nome:"Vito Nunziante", gol:1}, {nome:"Pasquale Colangelo", gol:1}
    ]},
    {risultato:"10-4", squadraA:"Ocean Warriors", squadraB:"Red Phoenix", marcatori:[
      {nome:"Manuel Ardia", gol:4}, {nome:"Cosimo Castagna", gol:4},
      {nome:"Emanuele Materazzo", gol:2}, {nome:"Temidayo Mabo", gol:2},
      {nome:"Crescenzo Gorrasi", gol:2}
    ]},
    {risultato:"8-4", squadraA:"Ocean Warriors", squadraB:"Red Phoenix", marcatori:[
      {nome:"Manuel Ardia", gol:5}, {nome:"Cosimo Castagna", gol:2},
      {nome:"Autogol", gol:1}, {nome:"Temidayo Mabo", gol:3},
      {nome:"Crescenzo Gorrasi", gol:1}
    ]}
  ];

  /* ----------------- Popola Formazioni ----------------- */
  const squadra1Div = document.getElementById('squadra1');
  const squadra2Div = document.getElementById('squadra2');

  const createPlayerDiv = (player) => {
    const div = document.createElement('div');
    div.className = "giocatore";
    div.textContent = player.capitano ? `${player.nome} (C)` : player.nome;
    div.onclick = () => alert(`Profilo di ${player.nome}`);
    return div;
  };

  const bluImg = document.createElement('img');
  bluImg.src = squadre["Ocean Warriors"].immagine;
  squadra1Div.appendChild(bluImg);
  squadre["Ocean Warriors"].giocatori.forEach(p => squadra1Div.appendChild(createPlayerDiv(p)));

  const rossoImg = document.createElement('img');
  rossoImg.src = squadre["Red Phoenix"].immagine;
  squadra2Div.appendChild(rossoImg);
  squadre["Red Phoenix"].giocatori.forEach(p => squadra2Div.appendChild(createPlayerDiv(p)));

  /* ----------------- Classifica Marcatori ----------------- */
  const marcatoriObj = {};
  partite.forEach(p => {
    p.marcatori.forEach(m => {
      if(!marcatoriObj[m.nome]) marcatoriObj[m.nome] = 0;
      marcatoriObj[m.nome] += m.gol;
    });
  });

  const listaMarcatori = document.getElementById('lista-marcatori');
  const marcatoriOrdinati = Object.entries(marcatoriObj).sort((a,b)=>b[1]-a[1]);

  marcatoriOrdinati.forEach(([nome, gol], index) => {
    const li = document.createElement('li');
    if(index===0) li.classList.add('top1');
    else if(index===1) li.classList.add('top2');
    else if(index===2) li.classList.add('top3');

    li.innerHTML = `<span>${index+1}. ${nome}</span> <span>${gol} <span class="gol-icon"></span></span>`;
    listaMarcatori.appendChild(li);
  });

  /* ----------------- Calendario Partite a tendina ----------------- */
  const calendarioContainer = document.getElementById('calendario-partite');

  function creaGolDettaglio(marcatori, squadraBlu, squadraRossa){
    const container = document.createElement('div');
    container.className = 'gol-dettaglio';

    const blu = document.createElement('div'); blu.className='gol-colonna';
    const rosso = document.createElement('div'); rosso.className='gol-colonna';

    const titBlu = document.createElement('h4'); titBlu.textContent=squadraBlu;
    const titRosso = document.createElement('h4'); titRosso.textContent=squadraRossa;
    blu.appendChild(titBlu); rosso.appendChild(titRosso);

    marcatori.forEach(m=>{
      const div=document.createElement('div'); div.className='gol-giocatore';
      div.textContent=`${m.nome} — ${m.gol} gol`;
      if(squadre["Ocean Warriors"].giocatori.find(p=>p.nome===m.nome) || m.nome==="Autogol") blu.appendChild(div);
      else rosso.appendChild(div);
    });

    container.appendChild(rosso); container.appendChild(blu);
    return container;
  }

  partite.forEach((p,index)=>{
    const partitaDiv=document.createElement('div'); partitaDiv.className='partita';

    const titolo=document.createElement('div'); titolo.className='partita-titolo';
    titolo.innerHTML=`<span>Partita ${index+1}: ${p.squadraA} ${p.risultato} ${p.squadraB}</span> <span>▼</span>`;
    partitaDiv.appendChild(titolo);

    const dettaglioGol=creaGolDettaglio(p.marcatori,p.squadraA,p.squadraB);
    partitaDiv.appendChild(dettaglioGol);

    titolo.addEventListener('click',()=>{ 
      dettaglioGol.style.display = dettaglioGol.style.display==='flex'?'none':'flex';
    });

    calendarioContainer.appendChild(partitaDiv);
  });

});









