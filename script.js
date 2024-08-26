const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonImage = document.getElementById("image");
const pokemonTypes = document.getElementById("types");
const pokemonHp = document.getElementById("hp");
const pokemonAttack = document.getElementById("attack");
const pokemonDefense = document.getElementById("defense");
const pokemonSpecialAttack = document.getElementById("special-attack");
const pokemonSpecialDefense = document.getElementById("special-defense");
const pokemonSpeed = document.getElementById("speed");

const pokemonsApi = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

const typeColors = {
  normal: "#BBBAAB",
  fire: "#FA5543",
  water: "#56AEFF",
  electric: "#FDE23A",
  grass: "#8BD650",
  ice: "#96F1FF",
  fighting: "#A85642",
  poison: "#A75B9F",
  ground: "#ECCA56",
  flying: "#78A3FF",
  psychic: "#F562B1",
  bug: "#C3D21F",
  rock: "#CDBC72",
  ghost: "#7874D5",
  dragon: "#8573FE",
  dark: "#8D6855",
  steel: "#C3C2DA",
  fairy: "#F9ADFF"
};


const fetchData = async () => {
  try {
    const searchInput = document.getElementById("search-input")
    .value
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
    const res = await fetch(`${pokemonsApi}${searchInput}`);
    const data = await res.json();
    showPokemon(data);
  }
  catch (err) {
    alert("Pokémon not found");
    clearData();
  }
};

searchButton.addEventListener("click", fetchData);
searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        fetchData();
    }
});

const showPokemon = (data) => {
  const { height, id, name, sprites, stats, types, weight } = data;
  const { front_default } = sprites;
  const statsContainer = document.getElementById("stats-container");
  const typesList = types.map(({ type: { name } }) => name.toUpperCase());
  const [
    { base_stat: hp },
    { base_stat: attack },
    { base_stat: defense },
    { base_stat: specialAttack },
    { base_stat: specialDefense },
    { base_stat: speed }
  ] = stats;

  pokemonName.textContent = name.toUpperCase();
  pokemonId.textContent = `#${id}`;
  pokemonWeight.textContent = `Weight: ${weight}`;
  pokemonHeight.textContent = `Height: ${height}`;
  pokemonImage.innerHTML = `<img src="${front_default}" id="sprite" />`;
  pokemonTypes.innerHTML = "";
  typesList.forEach(type => {
    const span = document.createElement("span");
    span.textContent = type;
    span.className = "type-span";
    span.style.backgroundColor = typeColors[type.toLowerCase()] || "gray";
    pokemonTypes.appendChild(span);
  });
  statsContainer.classList.remove("hidden");
  pokemonHp.textContent = hp;
  pokemonAttack.textContent = attack;
  pokemonDefense.textContent = defense;
  pokemonSpecialAttack.textContent = specialAttack;
  pokemonSpecialDefense.textContent = specialDefense;
  pokemonSpeed.textContent = speed;
};

const clearData = () => {
  document.getElementById("search-input").value = "";
  pokemonName.textContent = "";
  pokemonId.textContent = "";
  pokemonWeight.textContent = "";
  pokemonHeight.textContent = "";
  pokemonImage.innerHTML = "";
  pokemonTypes.innerHTML = "";
  pokemonHp.textContent = "";
  pokemonAttack.textContent = "";
  pokemonDefense.textContent = "";
  pokemonSpecialAttack.textContent = "";
  pokemonSpecialDefense.textContent = "";
  pokemonSpeed.textContent = "";

  const statsContainer = document.getElementById("stats-container");
  statsContainer.classList.add("hidden");
};