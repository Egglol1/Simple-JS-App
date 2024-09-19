let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, weight: 6.9, types: ['Grass', 'Poison']},
    {name: 'Charmander', height: 0.6, weight: 8.5, types: ['Fire']},
    {name: 'Squirtle', height: 0.5, weight: 9.0, types: ['Water']}
];

function printArrayDetails(list){
    for (let i = 0; i < list.length; i++) {
        document.write(list[i].name + ' (Height:' + list[i].height + ") ")
        if (list[i].height >= 0.7) {
            document.write(' - Wow! That\'s Tall! ')
        }  
    }
}

printArrayDetails(pokemonList);