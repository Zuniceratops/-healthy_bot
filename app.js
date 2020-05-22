const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const config = require('./config');
const helper = require('./helper');
const kb = require('./keyboard-buttons');
const keyboard = require('./keyboard')


helper.logStart()

// const messages = {
//   male: 'this is male',
//   female: 'this is female',
// }


const bot = new TelegramBot(config.TOKEN, {polling: true});

bot.on('message',msg => {
  console.log('Working',msg.from.first_name);

  switch (msg.text) {
    case kb.sex.female:
      break
    case kb.sex.male:
      break

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
