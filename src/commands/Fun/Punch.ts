  
import { MessageType, Mimetype } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import request from '../../lib/request'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'punch',
            description: 'Punch someone',
            category: 'fun-2',
            usage: `${client.config.prefix}punch [tag/quote users]`
        })
    }
    run = async (M: ISimplifiedMessage): Promise<void> => {
        const user1 = M.sender.jid
        const user2 = M.mentioned[0]
        //  let username1 = user1.split('@')[0]
        //  let username2 = user2.split('@')[0]
        // let username1 = user1.replace('@s.whatsapp.net', '')
        // let username2 = user2.replace('@s.whatsapp.net', '')
        const n = [
            'https://c.tenor.com/VrWzG0RWmRQAAAAC/anime-punch.gif',
            'https://m.imgur.com/jznCcr2',
            'https://m.imgur.com/AmQvKOV',
            'https://c.tenor.com/44IcPjhMv5oAAAAd/punch-anime.gif'
            
        ]
        let punch = n[Math.floor(Math.random() * n.length)]
        return void this.client.sendMessage(M.from, { url: punch }, MessageType.video, {
            mimetype: Mimetype.gif,
            caption: `@${user1.split('@')[0]} punched @${user2.split('@')[0]}`,
            contextInfo: { mentionedJid: [user1, user2] }
        })
    }
}
