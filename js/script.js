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
        button.addEventListener('click', function () {
            pokemonRepository.showDetails(pokemon);
        });
        listItem.appendChild(button);
        element.appendChild(listItem)
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
          showModal(pokemon.name, pokemon.height);
          let container = document.querySelector('.modal')
          let imageElement = document.createElement('img')
          imageElement.src = pokemon.imageUrl
          container.appendChild(imageElement);
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

function showModal(title, text) {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.innerHTML = '';
  
    let modal = document.createElement('div');
    modal.classList.add('modal');
  
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal)
  
    let titleElement = document.createElement('h1');
    titleElement.innerText = title;
  
    let contentElement = document.createElement('p');
    contentElement.innerText = text;
  
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);
  
    modalContainer.classList.add('is-visible');
  
    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
  }

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

console.log(pokemonRepository.getAll());

let element = document.querySelector('.pokemon-list');

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(item) {
        pokemonRepository.addListItem(item)
    });
});