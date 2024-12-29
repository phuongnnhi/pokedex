const { readPokemonData, updatePokemonData } = require('./pokemonHelpers');

const getPokemonById = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const allPokemonData = readPokemonData().data;

    if (isNaN(id) || id < 1 || id > allPokemonData.length) {
        return res.status(400).json({ error: 'Invalid Pokémon ID' });
    }

    const currentPokemon = allPokemonData.find((p) => p.id === id);
    const previousId = id === 1 ? allPokemonData.length : id - 1;
    const nextId = id === allPokemonData.length ? 1 : id + 1;

    const previousPokemon = allPokemonData.find((p) => p.id === previousId) || null;
    const nextPokemon = allPokemonData.find((p) => p.id === nextId) || null;

    await updatePokemonData(currentPokemon);
    await updatePokemonData(previousPokemon);
    await updatePokemonData(nextPokemon);

    return res.json({
        data: {
            pokemon: currentPokemon,
            previousPokemon,
            nextPokemon,
        },
    });
};

module.exports = { getPokemonById };