const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const inputFile = path.join(__dirname, 'data/pokemon.csv');
const outputFile = path.join(__dirname, 'data/pokemon.json');
const imageDirectory = path.join(__dirname, '../coderdex-fe/public/images/pokemon');

const pokemon = [];
const validImages = new Set(
  fs.readdirSync(imageDirectory)
    .map((file) => {
      const match = file.match(/^(\d+)/); // Extract numeric prefix
      return match ? match[1] : null; // Return the number if matched, otherwise null
    })
    .filter((num, index, self) => num && self.indexOf(num) === index) // Keep only unique numbers
);

let idCounter = 1;

fs.createReadStream(inputFile)
  .pipe(csv())
  .on('data', (row) => {
    if (validImages.has(idCounter.toString())) {
      pokemon.push({
        id: idCounter,
        name: row['Name'].toLowerCase(), 
        types: [row['Type1'].toLowerCase(), row['Type2']?.toLowerCase()].filter(Boolean),
        url: `/images/pokemon/${idCounter}.png`,
      });
    }
    idCounter++;
  })
  .on('end', () => {
    const result = {
      data: pokemon,
      totalPokemons: pokemon.length,
    };
    fs.writeFileSync(outputFile, JSON.stringify(result, null, 2));
    console.log('Pokémon data transformation completed!');
    console.log(`Total valid Pokémon processed: ${pokemon.length}`);
  });

  