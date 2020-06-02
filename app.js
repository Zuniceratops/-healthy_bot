const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');
const axios = require('axios');
const config = require('./config');
const helper = require('./helper');
const kb = require('./keyboard-buttons');
const keyboard = require('./keyboard');
const messages = require('./messages');


helper.logStart();

function sendInformationByQuery(chatId, query) {
  const message = messages.information[query];
  bot.sendMessage(chatId, message);
}

// mongoose.connect(config.DB_URL, {
//   useMongoClient: true
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.log(err))

// require('./model/information')

// const Inform = mongoose.model('information')

// database.information.forEach(f => new Inform(f).save());

// ПОКА НЕНУЖНО
// bot.on('message', msg => {
//   console.log('Working', msg.from.first_name);

// const chatId = helper.getChatId(msg);

// ======================================================


const bot = new TelegramBot(config.TOKEN, { polling: true });

bot.onText(/\/start/, (msg, match) => {
  const chatId = msg.chat.id;

  const text = `Здравствуйте, ${msg.from.first_name}\nУкажите свой пол`;

  bot.sendMessage(helper.getChatId(msg), text, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Женский', callback_data: 'sex' }],
        [{ text: 'Мужской', callback_data: 'sex' }]
      ]
    }
  })
});


bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  console.log(query);

  switch (query.data) {
    case 'sex':
      bot.sendMessage(chatId, `Сколько часов вы спите?`, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Меньше 7 часов', callback_data: 'sleep' }],
            [{ text: 'Не меньше 8 часов', callback_data: 'sleep' }],
            [{ text: '9 часов и более', callback_data: 'sleep' }],
          ]
        }
      })
      break

    case 'sleep':
      bot.sendMessage(chatId, `Сколько вы выпиваете воды за день?`, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Меньше чем 2 литра', callback_data: 'water' }],
            [{ text: 'Не меньше чем 2 литра', callback_data: 'water' }],
            [{ text: 'Больше чем 3 литра', callback_data: 'water' }],
          ]
        }
      })
      break
  }


  bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id; 
      
      switch (msg.text) {
        case 'sleepShort':
          sendInformationByQuery(chatId, "sleepShort")
        // case kb.sleep.long:
        //   sendInformationByQuery(chatId, "recommendShortSleep")

        //   break
        case kb.sleep.normal:
          sendInformationByQuery(chatId, "sleepNormal")
          break
        case kb.sleep.long:
          sendInformationByQuery(chatId, "sleepLong")
          break
        // case kb.sleep:
        //   bot.sendMessage(chatId, `Сколько вы выпиваете воды за день?`, {
        //     reply_markup: { keyboard: keyboard.water }
        //   })
        //   break
        // case kb.water.little:
        //   sendInformationByQuery(chatId, "waterLittle")
        //   break
        // case kb.water.normal:
        //   sendInformationByQuery(chatId, "waterNormal")
        //   break
        // case kb.water.much:
        //   sendInformationByQuery(chatId, "waterMuch")
        //   break
        // default:
        //   sendInformationByQuery(chatId, "waterMuch");
      }
    });

    // switch (msg.text) {
    //   case kb.water.little:
    //     bot.sendMessage(chatId, `Сколько вы выпиваете воды за день?`, {
    //       reply_markup: {keyboard: keyboard.water}
    //     })
    //     break
    //   case kb.water.little:
    //     sendInformationByQuery(chatId, "waterLittle")
    //     break
    //   case kb.water.normal:
    //     sendInformationByQuery(chatId, "waterNormal")
    //     break
    //   case kb.water.much: 
    //   sendInformationByQuery(chatId, "waterMuch")
    //     break
    // }
  });

  //==========================================================
// });

  // if (msg.text === 'Женский') {
  //   bot.sendMessage(chatId, 'Женский', {
  //     reply_markup: {
  //       remove_keyboard: true,
  //       callback_data: 'female',
  //     }
  //   });
  // } else if (msg.text === 'Мужской') {
  //       bot.sendMessage(chatId, 'Мужской', {
  //         reply_markup: {
  //           remove_keyboard: true,
  //           callback_data: 'male',
  //       }
  //     });
  // }

// bot.on('callback_query', query => {
//   const { data, from } = query;
//   console.log('query', query)
//   bot.sendMessage(from.id, messages[data])

//   one_time_keyboard = True


//   if (data === 'female') {
//     bot.sendMessage(from.id, 'You are female')
//   }

//   if (data === 'male') {
//     bot.sendMessage(from.id, 'You are male')
//   }
// })
// {
//   text:'Женский',
//   callback_data: 'female'
// },

// {
//   text:'Мужской',
//   callback_data: 'male'}


