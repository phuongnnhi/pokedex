const { readPokemonData, writePokemonData, updatePokemonData } = require('./pokemonHelpers');
const POKEMONS_PER_PAGE = 10;

// Get all Pokémon with pagination and filtering
const getAllPokemons = async (req, res) => {
    const { page = 1, limit = POKEMONS_PER_PAGE, search, type } = req.query;
    const allPokemonData = readPokemonData();
    let filteredData = allPokemonData.data;

    if (search) {
        filteredData = filteredData.filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) || 
            p.id.toString() === search
        );
    }

    if (type) {
        filteredData = filteredData.filter((p) => p.types.includes(type.toLowerCase()));
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    let dataUpdated = false;
    for (const currentPokemon of paginatedData) {
        if (!currentPokemon.description) {
            await updatePokemonData(currentPokemon);
            dataUpdated = true;
        }
    }

    if (dataUpdated) {
        writePokemonData(allPokemonData);
    }

    return res.status(200).json({
        success: true,
        data: paginatedData,
        currentPage: parseInt(page, 10),
        totalPages: Math.ceil(filteredData.length / limit),
        totalResults: filteredData.length,
    });
};
module.exports = {getAllPokemons}