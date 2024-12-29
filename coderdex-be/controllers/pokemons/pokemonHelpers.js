const fs = require('fs');
const path = require('path');

// Helper: Read Pokémon JSON file
const readPokemonData = () => {
    const filePath = path.join(__dirname, '../../data/pokemon.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData);
};

// Helper: Write to Pokémon JSON file
const writePokemonData = (data) => {
    const filePath = path.join(__dirname, '../../data/pokemon.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};


//expand database
async function fetchPokemonDetails(name) {
    try {
        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}/`);
        const speciesData = await speciesResponse.json();
        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
        const pokemonData = await pokemonResponse.json();

        const description = speciesData.flavor_text_entries.find((entry) => entry.language.name==='en');
        return {
            description: description
                ? description.flavor_text.replace(/\n|\f/g, ' ')
                : "No description available",
            height: `${pokemonData.height / 10} m`, // Convert decimeters to meters
            weight: `${pokemonData.weight / 10} kg`, // Convert hectograms to kilograms
            abilities: pokemonData.abilities.map((a) => a.ability.name),
            category: speciesData.genera.find((g) => g.language.name === 'en')?.genus || "Unknown",
        };
    } catch (error) {
        console.error(`Error fetching details for ${name}:`, error);
        return {
            description: "No description available",
            height: "Unknown",
            weight: "Unknown",
            abilities: ["Unknown"],
            category: "Unknown",
        };
    }
}

// Helper function to fetch and update Pokémon data
async function updatePokemonData(pokemon) {
    if (pokemon && !pokemon.description) {
        const additionalData = await fetchPokemonDetails(pokemon.name);
        pokemon.description = additionalData.description;
        pokemon.height = additionalData.height;
        pokemon.weight = additionalData.weight;
        pokemon.abilities = additionalData.abilities;
        pokemon.category = additionalData.category;
    }}

module.exports = {
    readPokemonData,
    writePokemonData,
    fetchPokemonDetails,
    updatePokemonData,
};