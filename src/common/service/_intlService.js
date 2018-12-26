import memoizeIntlConstructor from 'intl-format-cache';
import IntlMessageFormat from 'intl-messageformat';
import invariant from 'invariant';

var formatters = {
    getMessageFormat  : memoizeIntlConstructor(IntlMessageFormat),
};

var _config = {
    locale: 'en',
    formats: {}
}

function formatMessage(messages, messageDescriptor={}, values={}) {
    var id = messageDescriptor.id;
    var defaultMessage = messageDescriptor.defaultMessage;
    var locale   = _config.locale;
    var formats  = _config.formats;

    // `id` is a required field of a Message Descriptor.

    invariant(id, '[React Intl] An `id` must be provided to format a message.');
    var message = messages && messages[id];
    var hasValues = Object.keys(values).length > 0;

    if (!hasValues) {
        return message || defaultMessage || id;
    }

    var formattedMessage = void 0;

    if (message) {
        try {
            var formatter = formatters.getMessageFormat(message, locale, formats);

            formattedMessage = formatter.format(values);
        } catch (e) {
            if (process.env.NODE_ENV !== 'production') {
                console.error('[React Intl] Error formatting message: "' + id + '" for locale: "' + locale + '"' + (defaultMessage ? ', using default message as fallback.' : '') + ('\n' + e));
            }
        }
    } else {
        if (process.env.NODE_ENV !== 'production') {
            // This prevents warnings from littering the console in development
            // when no `messages` are passed into the <IntlProvider> for the
            // default locale, and a default message is in the source.
            if (!defaultMessage) {

                console.error('[React Intl] Missing message: "' + id + '" for locale: "' + locale + '"' + (defaultMessage ? ', using default message as fallback.' : ''));
            }
        }
    }

    if (!formattedMessage && defaultMessage) {
        try {
            var _formatter = formatters.getMessageFormat(defaultMessage, locale);

            formattedMessage = _formatter.format(values);
        } catch (e) {
            if (process.env.NODE_ENV !== 'production') {
                console.error(`[React Intl] Error formatting the default message for: "${id}"\n${e}`);
            }
        }
    }

    if (!formattedMessage) {
        if (process.env.NODE_ENV !== 'production') {
            console.error(`[React Intl] Cannot format message: "${id}", using message ${message || defaultMessage ? 'source' : 'id'} as fallback.`);
        }
    }

    return formattedMessage || message || defaultMessage || id;
}

function formatHTMLMessage(messages, messageDescriptor={}, values={}) {
    // var id = messageDescriptor.id;
    // var defaultMessage = messageDescriptor.defaultMessage;
    // var rawValues = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
    var rawValues = values;

    // Process all the values before they are used when formatting the ICU
    // Message string. Since the formatted message might be injected via
    // `innerHTML`, all String-based values need to be HTML-escaped.
    var escapedValues = Object.keys(rawValues).reduce(function (escaped, name) {
        var value = rawValues[name];
        escaped[name] = typeof value === 'string' ? escape(value) : value;
        return escaped;
    }, {});

    return formatMessage(messages, messageDescriptor, escapedValues);
}

const _intl = {
    formatMessage: formatMessage,
    formatHTMLMessage: formatHTMLMessage
}

export default _intl
