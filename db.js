const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://Jeeves123:Jeeves123@cluster0.q76xt.mongodb.net/whatsappbot?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

const customResponseSchema = new mongoose.Schema({
  userMessage: String,
  response: String
});

const CustomResponse = mongoose.model('CustomResponse', customResponseSchema);

// Endpoint pour ajouter une nouvelle paire de message et de réponse
app.post('/api/custom-responses', async (req, res) => {
  const { userMessage, response } = req.body;
  const newResponse = new CustomResponse({ userMessage, response });
  await newResponse.save();
  res.status(201).send(newResponse);
});

app.listen(3000, () => {
  console.log('API server is running on port 3000');
});