const AbstractHandler = require('./AbstractHandler');

class GuildCreateHandler extends AbstractHandler {

  handle(packet) {
    const data = packet.d;
    const client = this.packetManager.client;

    const guild = client.store.get('guilds', data.id);

    if (guild) {
      if (!guild.available && !data.unavailable) {
        // a newly available guild
        guild.setup(data);
        this.packetManager.ws.checkIfReady();
      }
    } else {
      // a new guild
      client.store.newGuild(data);
    }
  }

}

module.exports = GuildCreateHandler;