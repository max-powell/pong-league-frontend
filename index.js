const playerContainer = document.querySelector("#player-container")
const allPlayersUrl = "http://localhost:3000/players"
const playerOne = document.getElementById("player-one")
const playerTwo = document.getElementById("player-two")
const selectionDivEl = document.querySelector('#selection-div')
const newPlayerForm = document.getElementById("new-player-form")
const newPlayerFormBtn = document.querySelector(".submit")


const state = {
    players: [],
    leftPlayer: null,
    rightPlayer: null,
    leftScore: 0,
    rightScore: 0
}



function getAllPlayers(){
    return fetch(allPlayersUrl)
    .then(resp => resp.json())
    .then(json => state.players = json)
}

function createPlayer(player){
  return fetch(allPlayersUrl, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(player)
  }).then(resp => resp.json())
}


function createGameStats(){
  fetch("http://localhost:3000/games", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({winner_id, loser_id})
    }).then(resp => resp.json())
  }

  newPlayerForm.addEventListener("submit", function(e) {
    e.preventDefault();
    createPlayer(formPlayer(event)).then(renderPlayer);
  });

  function formPlayer(event){
    const playerName = event.target.querySelector("#input-name").value;
    const playerImg = event.target.querySelector("#input-image").value;
    event.target.reset();
    return {
      name: playerName,
      image_url: playerImg
    };
  }


function renderPlayer(player){
    const playerCardEl = document.createElement('div')
    playerCardEl.classList.add('card')
    playerCardEl.innerHTML = `
    <img src= "${player.image_url}" class="player-avatar">
    <p>${player.name}<p>
    `
    playerContainer.appendChild(playerCardEl)

    playerCardEl.addEventListener('click', (e) =>{
        if (!state.leftPlayer) {
            state.leftPlayer = player
            fillSelectedPlayer(player, playerOne)
        } else {
            state.rightPlayer = player
            fillSelectedPlayer(player, playerTwo)
            setTimeout(startGame, 1000)
        }

    }, {once: true})
}

function renderPlayers(players){
  state.players.forEach(renderPlayer)
}

function fillSelectedPlayer(player, playerEl) {
  playerEl.innerHTML = `
  <img src= "${player.image_url}" class="player-avatar">
  <p>${player.name}<p>
  `
}

function startGame() {
    window.scrollTo(0,1050)
    startPlay()
}
 
function init(){
    getAllPlayers().then(renderPlayers)
}

init()