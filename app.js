const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');
const axios = require('axios');
const config = require('./config');
const helper = require('./helper');
const kb = require('./keyboard-buttons');
const keyboard = require('./keyboard');


helper.logStart()

mongoose.connect(config.DB_URL, {
  useMongoClient: true
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err))


const bot = new TelegramBot(config.TOKEN, {polling: true});

bot.on('message',msg => {
  console.log('Working',msg.from.first_name);

  const chatId = helper.getChatId(msg);

  switch (msg.text) {
    case kb.sex.female:
      bot.sendMessage(chatId, `Сколько часов вы спите?`, {
        reply_markup: {keyboard: keyboard.sleep}
      })
      break
    case kb.sex.male:
      bot.sendMessage(chatId, `Сколько часов вы спите?`, {
        reply_markup: {keyboard: keyboard.sleep}
        })
      break
    case kb.back:
      bot.sendMessage(chatId, `К предыдущему вопросу`, {
        reply_markup: {keyboard: keyboard.back}
        })

  }
})
bot.onText(/\/start/, (msg, match) => {
  const chatId = msg.chat.id;

  const text = `Здравствуйте, ${msg.from.first_name}\nУкажите свой пол`
  bot.sendMessage(helper.getChatId(msg), text, {
    reply_markup: {
      keyboard: keyboard.sex,
    }
  })
})


//   if (msg.text === 'Женский') {
//     bot.sendMessage(chatId, 'Женский', {
//       reply_markup: {
//         remove_keyboard: true,
//         callback_data: 'female',
//       }
//     });
//   } else if (msg.text === 'Мужской') {
//         bot.sendMessage(chatId, 'Мужской', {
//           reply_markup: {
//             remove_keyboard: true,
//             callback_data: 'male',
//         }
//       });
//   // } else {
//   //   bot.sendMessage(chatId, 'Укажите свой пол', {
//   //     reply_markup: {
//   //         keyboard: [
//   //             [{
//   //                 text:'Женский',
//   //                 callback_data: 'female'
//   //               }],
//   //             [{
//   //                 text:'Мужской',
//   //                 callback_data: 'male'
//   //               }]
//   //          ],
//   //     }
//     // });
//   }
// });

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
//   callback_data: 'male'
// },
