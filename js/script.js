pokemonList = [
    {name: 'Bulbasaur', height: 0.7, weight: 6.9, types: ['Grass', 'Poison']},
    {name: 'Charmander', height: 0.6, weight: 8.5, types: ['Fire']},
    {name: 'Squirtle', height: 0.5, weight: 9.0, types: ['Water']}];

for (let i = 0; i < pokemonList.length; i++) {
    document.write(pokemonList[i].name + ' (Height:' + pokemonList[i].height + ") ")
    if (pokemonList[i].height >= 0.7) {
        document.write(' - Wow! That\'s Tall! ')
    }  
}