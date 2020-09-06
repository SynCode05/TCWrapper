const EventEmitter = require('events');
const axios = require('axios');

class TCWRAPPER extends EventEmitter {
    /**
     * @param {Object} // Client Object.
     * @param {String} // TopCord API Token.
     */

    constructor(client, token, guildCount, shardCount) {
        this.token = token;
        this.client = client;

        let config = {
            method: 'post',
            url: 'https://topcord.xyz/api/bot/stats/' + this.client.user.id,
            headers: {},
            data: {}
        };

        if(!this.client) throw new Error('[TCWrapper] Essential parameter missing. --> Error');

        if(this.token) {
            config.headers.Authorization = this.token;
        } else {
            console.warn('[TCWrapper] No token proved. --> Warning');
        };

        if(!guildCount) guildCount = this.client.guilds.cache.size || this.client.guilds.size;

        if(!shardCount) {
            config.data = JSON.stringify({ guilds: guildCount });
        } else {
            config.data = JSON.stringify({ guilds: guildCount, shards: shardCount });
        };

        axios(config)
        .then(res => {
            body = res.data;
            return body;
        })
    }
}

module.exports = TCWRAPPER