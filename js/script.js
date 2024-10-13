let pokemonRepository = (function() {
    let pokemonList = [];
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
        if ((typeof pokemon) === "object"); {
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
        button.classList.add('btn')
        button.classList.add('btn-primary')
        button.dataset.toggle = "modal";
        button.dataset.target = "#modal-container";
        button.addEventListener('click', function () {
            pokemonRepository.showDetails(pokemon);
        });
        listItem.appendChild(button);
        listItem.classList.add('.list-group-item')
        element.appendChild(listItem)
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
          let titleElement = document.querySelector('.modal-title');
          titleElement.innerText = pokemon.name;
          let contentElement = document.querySelector('.pokemon-text');
          contentElement.innerText = 'Height: ' + pokemon.height;
          let imgArea = document.querySelector('.modal');
          console.log(imgArea);
          let imageElement = document.querySelector('.pokemon-img');
          imageElement.src = pokemon.imageUrl;
        });
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

let element = document.querySelector('.pokemon-list');

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(item) {
        pokemonRepository.addListItem(item)
    });
});