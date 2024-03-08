
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

document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;
    // Check if the user has a preference for dark mode
    if (localStorage.getItem(‘darkMode’) === "enabled") {
        enableDarkMode();
    }
    darkModeToggle.addEventListener("click", () => {
        if (body.classList.contains(‘dark-mode’)) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });
    function enableDarkMode() {
        body.classList.add(‘dark-mode’);
        localStorage.setItem(‘darkMode’, ‘enabled’);
    }
    function disableDarkMode() {
        body.classList.remove(‘dark-mode’);
        localStorage.setItem("darkMode", null);
    }
});