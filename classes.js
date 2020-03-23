
class User
{
    constructor(publicKey, ipAddress, privateKey, AlPort){
        this.publicKey = publicKey;
        this.privateKey = privateKey;
        this.ipAddress = ipAddress;
        this.AlPort = AlPort;
    }
}
class Friend
{
    constructor(nick, publicKey, ipAddress){
        this.ipAddress = ipAddress;
        this.publicKey = publicKey;
        this.nick = nick;
        this.messagesList = new Array();
    }
    addMessageToMessagesList(message){
        this.messagesList.add(message);
    }
}
class Message
{
    constructor(sender, recepient, message){
        this.message = message;
        this.recepient = recepient;
        this.sender = sender;
    }
}
//module.exports = {User, Friend, Message}
