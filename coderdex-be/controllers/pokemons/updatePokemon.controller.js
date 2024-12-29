const { readPokemonData, writePokemonData} = require('./pokemonHelpers');
const { updatePokemonSchema } = require('./pokemonValidation');

const updatePokemon = async (req, res) => {
const {id} = req.params;
const { error } = updatePokemonSchema.validate(req.body);
if (error) {
    return res.status(400).json({ error: error.details[0].message });
}
const {name, types, url, description, height, weight, abilities, category} = req.body;
const allPokemonData = readPokemonData().data;

//find the pokemon by Id
const pokemon = allPokemonData.find((p) => p.id === parseInt(id));
if (!pokemon) {
    return res.status(404).json({error: "Pokemon not found"});
}

Object.assign(pokemon, req.body);

// if(name) pokemon.name = name.toLowerCase();
// if(types) pokemon.types = types;
// if(url) pokemon.url = url;
// if (description) pokemon.description = description;
// if (height) pokemon.height = height;
// if (weight) pokemon.weight = weight;
// if (abilities) pokemon.abilities = abilities;
// if (category) pokemon.category = category;

writePokemonData(allPokemonData);

return res.status(200).json(pokemon)

}

module.exports = {updatePokemon}