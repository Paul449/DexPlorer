const inputElement = document.getElementById('pokemonName');

fetchData();

autoComplete();

document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const html = document.querySelector('html');
    // Check if the user has a preference for dark mode
    if (localStorage.getItem("darkMode") === "enabled") {
        enableDarkMode();
    }
    darkModeToggle.addEventListener("click", () => {
        if (html.classList.contains("dark-mode")) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });
    function enableDarkMode() {
      html.classList.add("dark-mode");
        localStorage.setItem("darkMode", "enabled");
    }
    function disableDarkMode() {
      html.classList.remove("dark-mode");
        localStorage.removeItem("darkMode");
    }
});

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
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1025`);
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
        const charizardGif = document.getElementById('charizardGif');
        const hp = document.getElementById('hp');
        const attack = document.getElementById('att');
        const spAttack = document.getElementById('spAtt');
        const def = document.getElementById('def');
        const spDef = document.getElementById('spDef');
        const speed = document.getElementById('speed');

        const pokemonName = inputElement.value.toLowerCase();

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if(!response.ok){
            throw new Error(`Couldn't fetch resource ${speciesResponse.status}`)
        }

        const data = await response.json();
        
        const UpperName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
console.log("species url", data.species.url)
        const speciesResponse = await fetch(data.species.url);
        if(!speciesResponse.ok){
            throw new Error('Could not fetch resource')
        }
        const speciesData = await speciesResponse.json();
        console.log(speciesData);

        const getSummary = speciesData.flavor_text_entries.find(entry => entry.language.name == 'en').flavor_text;


        const pokeSprite = data.sprites.front_default;
        const typing = data.types.map(type => type.type.name);
        const findDexNum = data.id;
        const findHp = data.stats.find(stat => stat.stat.name === 'hp').base_stat;
        const findAtt = data.stats.find(stat => stat.stat.name === 'attack').base_stat;
        const findSpAtt = data.stats.find(stat => stat.stat.name === 'special-attack').base_stat;
        const findDef = data.stats.find(stat => stat.stat.name === 'defense').base_stat;
        const findSpDef = data.stats.find(stat => stat.stat.name === 'special-defense').base_stat;
        const findSpeed = data.stats.find(stat => stat.stat.name === 'speed').base_stat;

        dexNum.innerHTML = findDexNum;
        PokeName.innerHTML = UpperName;
        card.style.display = 'block'
        imgElement.style.display = 'block';
        typeElement.style.display = 'block';
        imgElement.src = pokeSprite;
        typeElement.innerHTML = `Type: ${typing.join('-')}`;

        if(card.style.display = 'block'){
            charizardGif.style.display = 'none'
        }

        const modal = document.getElementById('modal');
        const modalButton = document.getElementById('card');
        const span = document.querySelector('.close')
    
        const modalName = document.getElementById('modalName');
        const modalSprite = document.getElementById('modalSprite');
        const summary = document.getElementById('summary');
        summary.innerHTML = getSummary;

    
        modalButton.onclick = function(){
            modal.style.display = 'block'
        }
    
        span.onclick = function(){
            modal.style.display = 'none'
        }
        window.onclick = function(){
            if(!event.target == modal){
                modal.style.display = 'none'
            }
        }
    
        modalName.innerHTML = UpperName;
        modalSprite.src = pokeSprite;
        summary.innerHTML = getSummary;
        hp.innerHTML = `HP: ${findHp}`
        attack.innerHTML = `Attack: ${findAtt}`
        spAttack.innerHTML = `Special-Attack: ${findSpAtt}`
        def.innerHTML = `Defense: ${findDef}`
        spDef.innerHTML = `Special-Defense: ${findSpDef}`
        speed.innerHTML =  `Speed: ${findSpeed}`


        suggestPokemon(pokemonName)

        await getCard()

    }
    catch(error){
            console.error(error);
    }
    function suggestPokemon(suggestions){
        suggestions.innerHTML = '';
    }

    

}

const cardKey = 'da45f8a4-58cf-4abf-91a5-bf928841e49f';

async function getCard() {
    try {
      const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
      const url = `https://api.pokemontcg.io/v2/cards?p=name:${pokemonName}`;
      const cardImg = document.getElementById('pokeCard');
      const cardMessage = document.getElementById('cardMessage'); // for displaying message
  
      const request = new Request(url, {
        headers: {
          'X-Api-Key': cardKey
        }
      });
  
      const response = await fetch(request);
      if (!response.ok) {
        throw new Error(`Status Error: '${response.status}'`);
      }
  
      const data = await response.json();
      console.log(data)
  
      // Check if any results are found
      if (!data.data || data.data.length === 0) {
        console.error('No cards found for this Pokemon');
        cardImg.src = ''; // Clear any existing image
        cardMessage.textContent = 'No official trading card available.';
        cardMessage.style.display = 'block'; // Display the message container
        return; // Exit the function if no results
      }
  
      // Iterate through results to find matching Pokemon
      let foundCard;
      for (const card of data.data) {
        if (card.name.toLowerCase() === pokemonName) {
          foundCard = card;
          break; // Exit the loop if matching card is found
        }
      }
  
      if (foundCard) {
        // Check if images property exists before accessing imageUrl
        if (foundCard.images) {
          cardImg.style.display = 'block'; 
          const imageUrl = foundCard.images.small;
          cardImg.src = imageUrl;
          cardMessage.style.display = 'none'; // Hide the message if card is found
        } else {
          console.error('Card image unavailable for this Pokemon');
          cardImg.src = ''; // Clear any existing image
          cardMessage.textContent = 'Card image unavailable.';
          cardMessage.style.display = 'block'; // Display the message
        }
      } else {
        console.error('Card not found for this Pokemon');
        cardImg.src = ''; // Clear any existing image
        cardMessage.textContent = 'No official trading card available.';
        cardMessage.style.display = 'block'; // Display the message
      }
  
      console.log('Card Image URL:', imageUrl); // Only log if image found
    } catch (error) {
      console.error('Error fetching card image:', error);
    }
  }
  