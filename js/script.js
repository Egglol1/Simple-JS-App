let pokemonRepository = (function() {
    let pokemonList = [
        {name: 'Bulbasaur', height: 0.7, weight: 6.9, types: ['Grass', 'Poison']},
        {name: 'Charmander', height: 0.6, weight: 8.5, types: ['Fire']},
        {name: 'Squirtle', height: 0.5, weight: 9.0, types: ['Water']}
    ];

    function add(pokemon) {
        if (((typeof pokemon) === "object") && (Object.keys(pokemon) == ['name', 'height', 'weight', 'types'])); {
            pokemonList.push(pokemon);
        }
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let listItem = document.createElement('li')
        let button = document.createElement('button')
        button.innerText = pokemon.name
        button.classList.add('.button')
        listItem.appendChild(button);
        element.appendChild(listItem)
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };
})();

console.log(pokemonRepository.getAll());
pokemonRepository.add({name: 'Pikachu', height: 0.4, weight: 6.0, types: ['Electric']});
console.log(pokemonRepository.getAll());

let element = document.querySelector('.pokemon-list');

pokemonRepository.getAll().forEach(function(item) {
    pokemonRepository.addListItem(item)
});