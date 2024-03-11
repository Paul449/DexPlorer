const inputElement = document.getElementById('pokemonName');


fetchData();

autoComplete();


function autoComplete(){
    const suggestions = document.getElementById('suggestions');

    inputElement.addEventListener('input', async function(){
        try {
            const inputValue = inputElement.value.toLowerCase();
            const pokemonNames = await fetchNames(inputValue);
            displaySuggestions(pokemonNames);
        }
        catch (error) {
            console.error(error);
        }
    })

    document.addEventListener('keydown', function(event){
        if(event.keyCode === 13){
            fetchData();
        }
    })
}

async function fetchNames(inputValue){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
    const data = await response.json();

    return data.results
        .map(pokemon => pokemon.name)
        .filter(name => name.startsWith(inputValue));

}

function displaySuggestions(suggestionsArray) {
    const suggestions = document.getElementById('suggestions');

    suggestions.innerHTML = '';

    suggestionsArray.forEach(name => {
        const suggestionItem = document.createElement('button');
        suggestionItem.textContent = name;
        suggestionItem.className = 'suggestion-button'; // Add the class

        suggestionItem.addEventListener('click', () => {
            inputElement.value = name;
            suggestions.innerHTML = '';
            fetchData(); // Call fetchData when a suggestion is clicked
        });

        suggestions.appendChild(suggestionItem);
    });

    suggestions.style.display = 'block';
}

async function fetchData(){

    try{

        const inputElement = document.getElementById('pokemonName');
        const imgElement = document.getElementById("pokemonSprite");
        const typeElement = document.getElementById("type");
        const PokeName = document.getElementById('name');
        const card = document.getElementById('card');
        const dexNum = document.getElementById('dexNum');


        const pokemonName = inputElement.value.toLowerCase();

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if(!response.ok){
            throw new Error("Couldn't fetch resource")
        }

        const data = await response.json();

        // fetches pokemon image
        const pokeSprite = data.sprites.front_default;
        const typing = data.types.map(type => type.type.name);
        findDexNum = data.id;

        dexNum.innerHTML = findDexNum;
        PokeName.innerHTML = pokemonName;
        card.style.display = 'block'
        imgElement.style.display = 'block';
        typeElement.style.display = 'block';
        imgElement.src = pokeSprite;
        typeElement.src = typing;
        typeElement.innerHTML = `Type: ${typing.join('-')}`;

        suggestPokemon(pokemonName)

    }
    catch(error){
            console.error(error);
    }
    function suggestPokemon(suggestions){
        suggestions.innerHTML = '';
    }
}
