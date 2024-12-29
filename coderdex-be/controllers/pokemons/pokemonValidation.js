const Joi = require('joi');

const pokemonTypes = [
    "bug", "dragon", "fairy", "fire", "ghost", 
    "ground", "normal", "psychic", "steel", "dark", 
    "electric", "fighting", "flyingText", "grass", "ice", 
    "poison", "rock", "water"
];

const createPokemonSchema = Joi.object({
    id: Joi.number().integer().positive().required().messages({
        'number.base': 'ID must be a number.',
        'number.positive': 'ID must be a positive number.',
        'any.required': 'ID is required.',
    }),
    name: Joi.string().required().messages({
        'any.required': 'Name is required.',
    }),
    types: Joi.array().items(
        Joi.string()
            .valid(...pokemonTypes)
            .messages({ 'any.only': 'Invalid Pokémon type.' })
    )
    .max(2)
    .required()
    .messages({
        'array.max': 'Pokémon can only have one or two types.',
        'any.required': 'Types are required.',
    }),
    url: Joi.string().uri().required().messages({
        'string.uri': 'URL must be a valid URI.',
        'any.required': 'URL is required.',
    }),
    description: Joi.string().optional(),
    height: Joi.number().positive().optional().messages({
        'number.base': 'Height must be a number.',
        'number.positive': 'Height must be a positive number.',
    }),
    weight: Joi.number().positive().optional().messages({
        'number.base': 'Weight must be a number.',
        'number.positive': 'Weight must be a positive number.',
    }),
    abilities: Joi.array().items(Joi.string()).optional(),
    category: Joi.string().optional(),
});

const updatePokemonSchema = Joi.object({
    name: Joi.string().optional(),
    types: Joi.array().items(
        Joi.string()
            .valid(...pokemonTypes)
            .messages({ 'any.only': 'Invalid Pokémon type.' })
    )
    .max(2)
    .optional()
    .messages({
        'array.max': 'Pokémon can only have one or two types.',
    }),
    url: Joi.string().uri().optional().messages({
        'string.uri': 'URL must be a valid URI.',
    }),
    description: Joi.string().optional(),
    height: Joi.number().positive().optional().messages({
        'number.base': 'Height must be a number.',
        'number.positive': 'Height must be a positive number.',
    }),
    weight: Joi.number().positive().optional().messages({
        'number.base': 'Weight must be a number.',
        'number.positive': 'Weight must be a positive number.',
    }),
    abilities: Joi.array().items(Joi.string()).optional(),
    category: Joi.string().optional(),
});


module.exports = { createPokemonSchema, updatePokemonSchema };