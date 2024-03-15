import WppTwilio from 'twilio';

function enviarMensagem(body){
    const accountSid = `AC7d0c9e29eb13c6987bc346affc1763d9`;
    const authToken = `fff56f453826c282422aaa867dc73135`;
    const cliente = WppTwilio(accountSid,authToken)

   return cliente.messages.create({
        body: body,
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+5511951691289'
    });
}

 export {
    enviarMensagem
}