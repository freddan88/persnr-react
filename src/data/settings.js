export const personalNumberSettings = {
    sweden: {
        format: 'ÅÅMMDD-xxxx',
        regexPattern: '^[0-9]{6}-[0-9]{4}$',
        delimiter: '-',
    },
    norway: {
        format: 'DDMMÅÅ xxxxx',
        regexPattern: '^[0-9]{6} [0-9]{5}$',
        delimiter: ' ',
    },
    denmark: {
        format: 'DDMMÅÅ-xxxx',
        regexPattern: '^[0-9]{6}-[0-9]{4}$',
        delimiter: '-',
    },
    finland: {
        format: 'DDMMÅÅSxxxx',
        regexPattern: '^[0-9]{6}\\D[0-9]{3}.$',
        delimiter: false,
    }
}