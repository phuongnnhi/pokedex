const { readPokemonData, writePokemonData} = require('./pokemonHelpers');
const POKEMONS_PER_PAGE = 10;

const deletePokemon = async (req, res) => {
    const {id} = req.params;
const allPokemonData = readPokemonData().data;

//find the index of the targeted pokemon
const index = allPokemonData.findIndex((p) => p.id === parseInt(id));
if(index===-1){
    return res.status(404).json({error: "Pokemon not found"})
}

//remove pokemon
const deletedPokemon = allPokemonData.splice(index,1);
writePokemonData(allPokemonData);
return res.status(200).json(deletedPokemon[0]);
}
module.exports = {deletePokemon}