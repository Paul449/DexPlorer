
fetchData();

async function fetchData(){

    try{

        const pokemonName = document.getElementById('pokemonName').value.toLowerCase();

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if(!response.ok){
            throw new Error("Couldn't fetch resource")
        }

        const data = await response.json();
        const pokeSprite = data.sprites.front_default;
        const imgElement = document.getElementById("pokemonSprite");

        imgElement.src = pokeSprite;
        imgElement.style.display = 'block'
    }
    catch(error){
            console.error(error);
    }
}