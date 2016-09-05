'use strict';
var api = require('./apiMock');

var convoId = 0;
// mock for main bot object
class Bot {
    // in constructor we pass controller mock instance
    constructor(controller) {
        this.apiResponses = new api();
        this.botkit = {
            tasks: [],
            log: function(){}
        };
        var self = this;
        // this object will store bot answer for each user separately
        this.detailedAnswers = {
        // "userId": ["answer1","anwer2"]
        };
        // store all open convos
        this.convos = []
        // reference to controller object
        this.controller = controller;
        // bot patterns - migrated from origin botkit
        this.utterances = {
            yes: "yes",
            no: "no"
        }

        this.api = this.buildProxyAPI();

        console.log(this.api)

        this.callbacksHashByConvo = {};
    }

    getAPILogByNumber(i) {
        console.log('API CALLS =>', this.log)
        return this.log[i]
    }

    buildProxyAPI() {
        let o = {};
        this.log = []
        o['callAPI'] = (apiName, params, callback) => {
            if (apiName != 'chat.update')
                this.log.push(apiName);
            this.apiResponses.api['callAPI'](apiName, params, callback)
        }
        return o;
    }

    updateApiByKey(key, value) {
        this.apiResponses.updateData(key, value);
    }

    getApiByKey(key) {
        return this.apiResponses.getData(key);
    }

    // reply to user and store reply in array
    reply(message, text, cb) {
        console.log('bot reply =>', text)
        // check if this is first time then create anwers array
        if (!this.detailedAnswers[message.user])
            this.detailedAnswers[message.user] = []
        this.detailedAnswers[message.user].push(text)
        if (typeof cb === 'function') {
            cb({}, {})
        }
    }
    // start new conversation
    startConversation(message, callback) {
        // creat enew convo object
        this.convo = new Convo(this)
        // setup convo owner
        this.convo.user = message.user;
        this.convo.sourceMessage.user = message.user;
        this.convo.sourceMessage.channel = message.user;
        console.log('convo user => ', message.user)
        // store convo
        this.convos.push(this.convo)
        // invoke callback
        callback(null, this.convo)
    }
    //say mock - without logic
    say(data, callback) {
        if (!this.detailedAnswers[data.channel])
            this.detailedAnswers[data.channel] = []
        console.log('123321 =>', data)
        this.detailedAnswers[data.channel].push(data.text)
        if (typeof callback === 'function') {
            callback(null, {
                message: {}
            })
        }
    }



}
// mock for controller class
class Controller {
    // constructor taks slackUserId and userName
    constructor(userId, userName) {
        this.user_name = userName;
        this.user = userId
        // create bot object
        this.bot = new Bot(this);
        // store action which we wanna listen
        this.actions = [];
    }
    // allow multiple convos
    // need refactor return promise
    usersInput(userTypes, options) {

        var self = this;
        // return promise which will be rosolved when we need assertion
        return new Promise((resolve, reject) => {
            // get user who first type message to bot chat
            var whoStartConvoWithBotFirst = userTypes.filter((userType) => {
                return userType.first;
            })[0]
            if (!whoStartConvoWithBotFirst)
                throw "initiator missing"
                // save all typers who will take action in conversation
            self.allTypers = userTypes;
            // save main typer ( first typer )
            self.mainTyper = whoStartConvoWithBotFirst;
            // save options
            self.typeOptions = options || {};
            // add resolve to type options
            self.typeOptions.resolve = resolve;
            // get first message which need send to bot
            var msg = whoStartConvoWithBotFirst.messages.shift()
                // correct message format - message must be an object with property text: "Message Text"
            if (typeof(msg) == 'string')
                msg = {
                    text: msg,
                }
                // set message user
            msg.user = msg.user || whoStartConvoWithBotFirst.user
            // send first message
            self.initialUserMessage(msg, options)
        })
    }
    initialUserMessage(message, options) {
        var self = this;
        // find action which will handle this message
        var action = self.actions.filter((obj) => {
            // each action has pattern
            let p = obj.pattern;
            if (Array.isArray(obj.pattern))
                p = obj.pattern.join('|');

            if ((message.text || message).match(new RegExp(p, 'i'))){
                message.match = (message.text || message).match(new RegExp(p, 'i'))
            }
            return (message.text || message).match(new RegExp(p, 'i'));
        })[0]
        if (action) {
            console.log('message => ', message)
            // call action callback with bot and new message object
            action.callback(self.bot, {
                user: message.user || self.user,
                is_bot: self.is_bot || false,
                username: self.user_name,
                message: message.text,
                text: message.text,
                match: message.match,
                //for controller.on
                channel: message.channel || message.user || self.user
            })
            // if message need assertion resolve promise - this cause test assertion
            if (message.isAssertion)
                if (message.onEvent) {
                    setTimeout(() => {
                        console.log('message => ', {})
                        // simple resolve without params if we handle onEvent messages ( when user join to channel and join to team or leave channel )
                        self.typeOptions.resolve()
                    }, 200)
                } else {
                    setTimeout(() => {
                        let result;
                        if (self.bot.detailedAnswers[message.user]) {
                            result = self.bot.detailedAnswers[message.user][self.bot.detailedAnswers[message.user].length - 1];
                        }
                        // resolve with last message
                        self.typeOptions.resolve(result)
                    }, 200)
                }
        } else {
            // if we can`t find action - by default we`ll never came to this code because we have default bot response for all messages.
            throw 'Can`t find action for this user type'
        }
    }
    // mock for hears - when we subscribe for some actions
    hears(regex, type, callbacks) {
        // push to actions array and use in initialUserMessage
        this.actions.push({
            pattern: regex,
            type: type,
            callback: callbacks
        });
    }
    // alias for hears
    on(event, callback) {
        this.hears(event, 'direct_message', callback)
    }
}
// convo object
class Convo {
    // takes bot object in constructor
    constructor(bot) {
        this.id = convoId = convoId + 1;
        this.bot = bot;
        this.sourceMessage = {
            user: ''
        }

    }
    // main ask action which as user some question
    ask(message, callbacks) {
        var self = this;
        // save bot message in user bot`s answers
        if (!self.bot.detailedAnswers[self.user])
        // if answers not exists create answers array for current convo user
            self.bot.detailedAnswers[self.user] = []
            // push bot message to answers array
        self.bot.detailedAnswers[self.user].push(message)
        console.log('try find convo owner', self.bot.detailedAnswers)
        // find current typer by message.user
        var currentTyper = (self.bot.controller.allTypers || []).filter((typer) => {
            return typer.user == self.user;
        })[0]
        if (currentTyper) {
            // check if user has some message for answer to bot
            if (currentTyper.messages.length) {
                // get last message
                var messageNew = currentTyper.messages.shift()
                console.log('process worker message => ', messageNew)
                if (typeof(callbacks) == 'function' && (messageNew.text || messageNew.file)) {
                    // simple callback
                    callbacks({
                        text: messageNew.text,
                        channel: this.sourceMessage.user
                    }, self)
                } else if (Array.isArray(callbacks)) {
                    // find callback in callbacks array
                    var callback = callbacks.filter((c) => {
                        return (messageNew.text || '').toString().match(c.pattern)
                    })[0]
                    console.log("callbacks => ", callbacks)
                    // check that message has text - we can`t send empty messages
                    if (messageNew.text || messageNew.file)
                    // invoke callback
                        if (callback && callback.callback) {
                            if (messageNew.callbackTimeout) {
                                setTimeout(() => {
                                    callback.callback({
                                        text: messageNew.text,
                                        user: self.user
                                    }, self)
                                }, messageNew.callbackTimeout)
                            } else {
                                callback.callback({
                                    text: messageNew.text,
                                    user: self.user,
                                    file: messageNew.file
                                }, self)
                            }
                        } else {
                            // find default callback and invoke
                            var defaultCallback = callbacks.filter((c) => {
                                return c.default
                            })[0]
                            if (defaultCallback) {
                                if (messageNew.callbackTimeout) {
                                    setTimeout(() => {
                                        default_callback.callback({
                                            text: messageNew.text,
                                            user: self.user
                                        }, self)
                                    }, messageNew.callbackTimeout)
                                } else {
                                    defaultCallback.callback({
                                        text: messageNew.text,
                                        user: self.user
                                    }, self)
                                }
                            }
                        }

                }
                // need wait some time before resolve

                if (messageNew.timeout && messageNew.isAssertion) {
                    return setTimeout(() => {
                        console.log('make assertion timeout', self.user, messageNew)
                        self.bot.controller.typeOptions.resolve(self.bot.detailedAnswers[self.user][self.bot.detailedAnswers[self.user].length - 1 - (messageNew.deep || 0)])
                    }, messageNew.timeout)
                }
                if (messageNew.isAssertion && !messageNew.timeout) {
                    setTimeout(() => {
                        console.log('make assertion', self.user, messageNew)
                        console.log('make assertion', self.user)
                        console.log('make assertion', self.bot.detailedAnswers)
                        self.bot.controller.typeOptions.resolve(self.bot.detailedAnswers[self.user][self.bot.detailedAnswers[self.user].length - 1 - (messageNew.deep || 0)])
                    }, 200)
                }
            } else {
                // last message already typed
            }

        } else {
            // when can`t find typer by slack id
            console.log('FAIL!!!')
        }
    }
    // simple say mock we just store answer in array
    say(text) {
        var self = this;
        // check if answers array exists for user
        if (!self.bot.detailedAnswers[self.user])
            self.bot.detailedAnswers[self.user] = []
            // push anwser to array
        self.bot.detailedAnswers[self.user].push(text)
    }
    // mock for next no logic
    next() {

    }
    // mock for stop no logic
    stop() {

    }
    // mock for repeat no logic
    repeat() {

    }
    // mock for silentRepeat no logic
    silentRepeat() {

    }
}
module.exports = {
    bot: Bot,
    controller: Controller,
    convo: Convo
}