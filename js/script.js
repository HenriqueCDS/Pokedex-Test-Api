
const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const pokemonForm = document.querySelector('.form');
const pokemonInput = document.querySelector('.input_seach');

const prev = document.querySelector('.btn-prev');
const next = document.querySelector('.btn-next');


let search = 1;
const fetchPokemon = async (pokemon) => {
    console.log(pokemon);
    const ApiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (ApiResponse.status == 200) {
        const data = await ApiResponse.json();
        return data;
    }

}
const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = "LOADING......";

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        search = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        pokemonInput.value = '';

    } else {
        pokemonImage.src = 'https://i.kym-cdn.com/photos/images/original/001/043/243/419.gif';
        pokemonName.innerHTML = "Not found ;-;";
        pokemonNumber.innerHTML = "";

    }
}

pokemonForm.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(pokemonInput.value.toLowerCase());

});

prev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        search -= 1;
      renderPokemon(search);
    }
  });

next.addEventListener('click', () => {
    search += 1;
    renderPokemon(search);
});
renderPokemon(search);
