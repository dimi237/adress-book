const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const Adress = require('./models/adress');
mongoose.connect('mongodb+srv://user_1:Html2021@cluster0.5kys6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true,
      useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());



app.post('/api/adress', (req, res, next) => {
  console.log(req.body);
   const adress = new Adress({
    ...req.body
  });

  adress.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
});

app.get('/api/adress/:id', (req, res, next) => {

    console.log(req.body);
  Adress.findOne({ _id: req.params.id })
    .then(adress => res.status(200).json(adress))
    .catch(error => res.status(404).json({ error }));
});

app.put('/api/adress/:id', (req, res, next) => {

    console.log(req.body);
    console.log(req.params.id);
  Adress.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});

app.delete('/api/adress/:id', (req, res, next) => {
  Adress.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/adress', (req, res, next) => {
  Adress.find()
    .then(adresss => res.status(200).json(adresss))
    .catch(error => res.status(400).json({ error }));
});


module.exports = app;