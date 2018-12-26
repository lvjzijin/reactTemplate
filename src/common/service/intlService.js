import { addLocaleData } from 'react-intl';
import internalIntlService from './_intlService';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';

import _EN from '../../locales/en_US.json';
import _ZH from '../../locales/zh_CN.json';

addLocaleData([...en, ...zh]);

let EN = Object.assign({}, _EN),
    ZH = Object.assign({}, _ZH);

let _messages = {
    en: EN,
    zh: ZH
};
const setLocale = (locale) => {
    window.localStorage.setItem('locale', locale);
}
const getLocale = () => {
    return window.localStorage.getItem('locale') || 'zh';
}
const setMessages = (lang={}) => {
    _messages.en = Object.assign({}, EN, lang.en);
    _messages.zh = Object.assign({}, ZH, lang.zh);
}
const addMessages = (lang={}) => {
    Object.assign(EN, lang.en);
    Object.assign(ZH, lang.zh);
}
const getMessages = () => {
    return _messages;
}
const getLocaleMessages = () => {
    let locale = getLocale();
    return getMessages()[locale];
}

export default {
    setLocale,
    getLocale,
    setMessages,
    addMessages,
    getMessages,
    getLocaleMessages,
    formatMessage: (messageDescriptor={}, values={}) => {
        let messages = getLocaleMessages();
        for(let key in messageDescriptor) {
            if('id' === key) {
                messageDescriptor[key] = '' + messageDescriptor[key];
                if(messageDescriptor[key].length < 1) {
                    messageDescriptor[key] = 'NULL'
                }
            }
            messageDescriptor[key] = messageDescriptor[key].toUpperCase();
        }
        return internalIntlService.formatMessage(messages, messageDescriptor, values);
    },
    formatHTMLMessage: (messageDescriptor={}, values={}) => {
        let messages = getLocaleMessages();
        for(let key in messageDescriptor) {
            if('id' === key) {
                messageDescriptor[key] = '' + messageDescriptor[key];
                if(messageDescriptor[key].length < 1) {
                    messageDescriptor[key] = 'NULL'
                }
            }
            messageDescriptor[key] = messageDescriptor[key].toUpperCase();
        }
        return internalIntlService.formatHTMLMessage(messages, messageDescriptor, values);
    }
}