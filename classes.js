class User
{
    publicKey;
    ipAddress;
    privateKey;
    AlPort;
    constructor(publicKey, ipAddress, privateKey){
        this.publicKey = publicKey;
        this.privateKey = privateKey;
        this.ipAddress = ipAddress;
    }
}
class Friend
{
    nick;
    publicKey;
    ipAddress;
    messagesList = [];
    constructor(nick, publicKey, ipAddress){
        this.ipAddress = ipAddress;
        this.publicKey = publicKey;
        this.nick = nick;
    }
}
class Message
{
    sender;
    recepient;
    message;
    constructor(sender, recepient, message){
        this.message = message;
        this.recepient = recepient;
        this.sender = sender;
    }
}
