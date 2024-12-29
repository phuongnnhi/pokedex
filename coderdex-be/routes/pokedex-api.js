const express = require('express')
const router = express.Router()
const { getAllPokemons } = require('../controllers/pokemons/getAllPokemons.controller')
const fs = require('fs'); // For file system operations
const { getPokemonById } = require('../controllers/pokemons/getAllPokemonsById.controller')
const { createNewPokemon } = require('../controllers/pokemons/createNewPokemon.controller')
const { updatePokemon } = require('../controllers/pokemons/updatePokemon.controller')
const { deletePokemon } = require('../controllers/pokemons/deletePokemon.controller')

// Validators
// - Joi Validator
// - Zod validator
// - Yup validtor
// - Express validator

// GET POST PUT DELETE /pokemons/
// GET POST PUT DELETE /users/
//Get all pokemon
// Get all Pokémon with pagination and filtering
router.get('/', getAllPokemons)

//Get pokemon by ID with the previous/next pokemon info
router.get('/:id', getPokemonById) 


//creating new pokemon
router.post('/', createNewPokemon)

//update pokemon
router.put('/:id', updatePokemon)

//delete a pokemon
router.delete('/:id', deletePokemon)

module.exports = router; 