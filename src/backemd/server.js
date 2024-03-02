const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;


mongoose.connect("mongodb+srv://meh:1234567890@cluster0.yrajah2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{ useNewUrlParser: true,
useUnifiedTopology: true }).then(()=> console.log('connexion a mgdb reussie')).catch(()=>console.log("echoué"))

const datashema = new mongoose.Schema({
    topText: String,
    bottomText: String,
    imageUrl :String,
})

const Meme = mongoose.model("Meme",datashema)
app.use(bodyParser.json())
app.post('/memes', async (req, res) => {
    try {
      const { imageUrl, topText, bottomText } = req.body;
      const meme = new Meme({ imageUrl, topText, bottomText });
      await meme.save();
      res.status(201).json(meme);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
app.get('/memes/:id', async (req, res) => {
    try {
      const meme = await Meme.findById(req.params.id);
      res.json(meme);
    } catch (error) {
      res.status(404).json({ error: 'Meme n’existe pas' });
    }
  });
  app.listen(PORT, () => {
  console.log(`le port marche ${PORT}`)
});