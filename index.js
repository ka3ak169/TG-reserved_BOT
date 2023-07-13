const TelegramApi = require('node-telegram-bot-api');

const token = '6375519606:AAEGldTgOUnX5BpOkfF-iIUG_Vmyu31HpMY';

const bot = new TelegramApi(token, {polling: true});

const FirstOptions = {
  reply_markup: JSON.stringify({
      inline_keyboard: [
          [{text: 'Да', callback_data: 'first_yes'}],
          [{text: 'Нет', callback_data: 'first_no'}],
      ]
  })
}

const Options = {
  reply_markup: JSON.stringify({
      inline_keyboard: [
          [{text: 'Забронировать', callback_data: 'reserve'}],
      ]
  })
}

const start = () => {
  bot.setMyCommands([
    {command: '/start', description: 'Начальное приветствие'},
    {command: '/reserve', description: 'Забронить стол'}  
  ])  
  
  bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;
    if(text === '/start') {
      return bot.sendMessage(chatId, 'Здарова, еба! Чё надо? Хочешь забронировать стол?', FirstOptions)
    }
  
    if(text === '/reserve') {
      return bot.sendMessage(chatId, `Если вы хотите забронировать столик нажмите сюда`, Options);
    }
      return bot.sendMessage(chatId, `Неправильная команда`);
  })

  bot.on('callback_query', msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    const who = msg.message.chat.first_name;
  
    console.log(msg);
  
    if (data === 'first_yes') {
      return bot.sendMessage(chatId, `Если вы хотите забронировать столик нажмите сюда`, Options);
    } else if (data === 'first_no') {
      bot.sendMessage(chatId, `Ну иди нахуй тогда отсюда`);
      bot.sendMessage('182013175', `Этот педик не хочет бронировать: ${who}`);
      setTimeout(() => {
        bot.sendMessage(chatId, 'Может всё таки стоит забронировать?', FirstOptions);
      }, 2000);
    } else if (data === 'reserve') {
      bot.sendMessage(chatId, `Столик забронирован`);
      return bot.sendMessage('182013175', `Этот придурок забронил стол: ${who}`);
    }
  })
}

start()