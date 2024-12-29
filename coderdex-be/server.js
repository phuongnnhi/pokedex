require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path'); 



const PORT = process.env.PORT || 3000; // Use default port if not specified in .env



// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()); // Enable cross-origin resource sharing
app.use(express.json()); // Parse incoming JSON requests
const pokedexRoutes = require('./routes/pokedex-api')
app.use('/pokemons', pokedexRoutes);

app.use('/images', express.static('images', express.static(path.join(__dirname, '../coderdex-fe/public/images')))); // Serve static images
// Catch-all route for React front-end (if React app is served)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});