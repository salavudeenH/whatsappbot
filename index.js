// const qrcode = require('qrcode-terminal');
// const { Client, LocalAuth,MessageMedia } = require('whatsapp-web.js');

// const client = new Client({
//     authStrategy: new LocalAuth()
// });

// client.on('qr', qr => {
//     qrcode.generate(qr, { small: true });
//     console.log('Scan the QR code to log in.');
// });

// client.on('ready', () => {
//     console.log('Client is ready!');
// });

// client.on('message', async message => { // Add 'async' here
//     if (message.body === 'sala') {
//         // message.reply('pong');
//         const media = await MessageMedia.fromUrl('https://www.referenseo.com/wp-content/uploads/2019/03/image-attractive-960x540.jpg');
//         client.sendMessage(message.from, media); // Sending the media after awaiting
//     }
// });

// client.initialize();

const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const mongoose = require('mongoose');

// Configurer la connexion à MongoDB
mongoose.connect("mongodb+srv://Jeeves123:Jeeves123@cluster0.q76xt.mongodb.net/whatsappbot?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const customResponseSchema = new mongoose.Schema({
  userMessage: String,
  response: String
});

const CustomResponse = mongoose.model('CustomResponse', customResponseSchema);

// Configurer et lancer le client WhatsApp
const client = new Client();

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');

  client.on('message', async message => {
    const customResponse = await CustomResponse.findOne({
      userMessage: message.body.toLowerCase()
    });

    if (customResponse) {
      client.sendMessage(message.from, customResponse.response);
    }
  });
});

client.initialize();
