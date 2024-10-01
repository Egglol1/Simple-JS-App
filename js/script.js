let pokemonRepository = (function() {
    let pokemonList = [
        {name: 'Bulbasaur', height: 0.7, weight: 6.9, types: ['Grass', 'Poison']},
        {name: 'Charmander', height: 0.6, weight: 8.5, types: ['Fire']},
        {name: 'Squirtle', height: 0.5, weight: 9.0, types: ['Water']}
    ];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
          });
        }).catch(function (e) {
          console.error(e);
        })
      }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

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
        button.addEventListener('click', function () {
            pokemonRepository.showDetails(pokemon);
        });
        listItem.appendChild(button);
        element.appendChild(listItem)
    }

    function showDetails(pokemon) {
        console.log(pokemon)
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

console.log(pokemonRepository.getAll());
pokemonRepository.add({name: 'Pikachu', height: 0.4, weight: 6.0, types: ['Electric']});
console.log(pokemonRepository.getAll());

let element = document.querySelector('.pokemon-list');

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(item) {
        pokemonRepository.addListItem(item)
    });
});