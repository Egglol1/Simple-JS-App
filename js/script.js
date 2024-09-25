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

    return {
        add: add,
        getAll: getAll
    };
})();

console.log(pokemonRepository.getAll());
pokemonRepository.add({name: 'Pikachu', height: 0.4, weight: 6.0, types: ['Electric']});
console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function(item) {
    document.write(item.name + ' (Height:' + item.height + ") ")
    if (item.height >= 0.7) {
        document.write(' - Wow! That\'s Big! ')
    }
});