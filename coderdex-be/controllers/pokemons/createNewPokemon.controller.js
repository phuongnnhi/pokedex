const { readPokemonData, writePokemonData} = require('./pokemonHelpers');
const { createPokemonSchema } = require('./pokemonValidation');

const pokemonTypes = [
    "bug", "dragon", "fairy", "fire", "ghost", 
    "ground", "normal", "psychic", "steel", "dark", 
    "electric", "fighting", "flyingText", "grass", "ice", 
    "poison", "rock", "water"
    ]

// Get all Pokémon with pagination and filtering
const createNewPokemon = async (req, res) => {
    const { error } = createPokemonSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const {id, name, types, url, description, height, weight, abilities, category} = req.body;
    const allPokemonData = readPokemonData().data;

    //Check if already exists
    const exists = allPokemonData.some((p) => p.id === id || p.name === name)
    if(exists) {
        return res.status(400).json({error: "The Pokemon already exists."});
    }

        // Fetch additional data 
        let additionalData = {};
        if (!description || !height || !weight || !abilities || !category) {
            additionalData = await fetchPokemonDetails(name.toLowerCase());
        }
    

    //Add new pokemon 
    const newPokemon = {
        id,
        name: name.toLowerCase(),
        types,
        url,
        description: description || additionalData.description,
        height: height || additionalData.height,
        weight: weight || additionalData.weight,
        abilities: abilities || additionalData.abilities,
        category: category || additionalData.category,
    };
    allPokemonData.push(newPokemon);
    writePokemonData(allPokemonData);
    return res.status(201).json(newPokemon)
}

module.exports = {createNewPokemon};