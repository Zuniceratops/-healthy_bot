const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const config = require('/config');
const helper = require('/helper');


const messages = {
  male: 'this is male',
  female: 'this is female',
}


const token = '1095751086:AAHez9aJMFqbRywx7mJrHqVNMxSiRNTWCys';

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg, match) => {

  const chatId = msg.chat.id;

  if (msg.text === 'Женский') {
    bot.sendMessage(chatId, 'Женский', {
      reply_markup: {
        remove_keyboard: true,
        callback_data: 'female',
      }
    });
  } else if (msg.text === 'Мужской') {
        bot.sendMessage(chatId, 'Мужской', {
          reply_markup: {
            remove_keyboard: true,
            callback_data: 'male',
        }
      });
  } else {
    bot.sendMessage(chatId, 'Укажите свой пол', {
      reply_markup: {
          keyboard: [
              [{
                  text:'Женский',
                  callback_data: 'female'
                }],
              [{
                  text:'Мужской',
                  callback_data: 'male'
                }]
           ],
      }
    });
  }
});

bot.on('callback_query', query => {
  const { data, from } = query;
  console.log('query', query)
  bot.sendMessage(from.id, messages[data])

  one_time_keyboard = True
    

  if (data === 'female') {
    bot.sendMessage(from.id, 'You are female')
  }

  if (data === 'male') {
    bot.sendMessage(from.id, 'You are male')
  }
})
// {
//   text:'Женский',
//   callback_data: 'female'
// },

// {
//   text:'Мужской',
//   callback_data: 'male'
// },