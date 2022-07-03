const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
};

const url = "https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById('card');
const btn = document.getElementById('generate-btn');

let getPokedata = () => {
  let id = Math.floor(Math.random() * 150 + 1);
  //console.log(id);
  let finalUrl = url + id;
  //console.log(finalUrl);

  fetch(finalUrl).then((Response) => Response.json()).then((data) => {
    // console.log(data);
    generateCard(data);
  });
}

let generateCard = (data) => {
  console.log(data);

  const imgSrc = data.sprites.other.dream_world.front_default;
  const name = data.name.toUpperCase();
  const statAttack = data.stats[1].base_stat;
  const statDefense = data.stats[2].base_stat;

  const themeColor = typeColor[data.types[0].type.name];

  card.innerHTML = `
    <div class="pokemon-img" id="pokemon-img"><img src="${imgSrc}" alt="Pokemon-img"></div>
    <div class="pokemon-name">${name}</div>
    <div class="types">
      
    </div>
    <div class="stats">
      <div>
        <h3>${statAttack}</h3>
        <p>Attack</p>
      </div>
      <div>
        <h3>${statDefense}</h3>
        <p>Defence</p>
      </div>
    </div>
    `;

    appendTypes(data.types);
    styleCard(themeColor);
};

let appendTypes = (types) => {
  types.forEach((item) => {
    let span = document.createElement("SPAN");
    span.textContent = item.type.name;
    document.querySelector(".types").appendChild(span);
  })
};

let styleCard = (color) => {
  card.style.background = `radial-gradient(circle at 50% 0%, ${color} 40%, #ffffff 60%)`;
  card.querySelectorAll(".types span").forEach(typeColor => typeColor.style.backgroundColor = color)
  //console.log(color);
}


btn.addEventListener("click", getPokedata);
window.addEventListener("load", getPokedata);