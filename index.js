const axios = require('axios');
require('dotenv').config()
const cache = new Map()
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
//URL da requisição 
//axios.defaults.baseURL = 'https://economia.awesomeapi.com.br';

function pToFixed(num, fixed) {
    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
}
setInterval(async() => {
        try {
            let normalDollar = await axios.get('https://economia.awesomeapi.com.br/last/USD-BRL,USD-BRLT');
            let dolarTurismo = await axios.get('https://www.remessaonline.com.br/api/current-quotation/USD/TUR')
                //     sendMsg2 = 0;
            let { data: { USDBRL, USDBRLT } } = normalDollar;
            let { data: { value } } = dolarTurismo
            //                    body: `Cotação do dolar normal no momento: R$${parseFloat(USDBRL.high).toFixed(2)} Cotação do Dolar Turismo: R$${parseFloat(USDBRLT.high).toFixed(2)}`,

            console.log(cache.get(1))

            if (cache.get(1) != USDBRL.high || cache.get(2) != value) {
                client.messages
                    .create({
                        from: 'whatsapp:+14155238886',
                        body: `Cotação do dolar normal no momento: R$${pToFixed(USDBRL.high, 2)} Cotação do Dolar Turismo: R$${value.toFixed(2)}`,
                        to: 'whatsapp:+556285749529'
                    })
                    .then(message => {
                        if (message.status === 'queued') console.log(message.sid)
                    }).done()
                client.messages
                    .create({
                        from: 'whatsapp:+14155238886',
                        body: `Cotação do dolar normal no momento: R$${pToFixed(USDBRL.high, 2)} Cotação do Dolar Turismo: R$${value.toFixed(2)}`,
                        to: 'whatsapp:+556286295808'
                    })
                    .then(message => {
                        if (message.status === 'queued') console.log(message.sid)
                    }).done()

                cache.set(1, USDBRL.high)
                cache.set(2, value)

            }

            console.log(cache)
        } catch (error) {
            console.warn(`error: `, error)
        }

    }, 18000000) // 900000






console.log('esta rodando')