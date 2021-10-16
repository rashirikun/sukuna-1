import { MessageType, Mimetype } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import request from '../../lib/request'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'scare',
            description: 'Scare someone',
            category: 'fun-2',
            usage: `${client.config.prefix}scare [tag/quote users]`
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
            'https://c.tenor.com/WcxwXmB-YiIAAAAM/anime-pillow.gif',
            'https://c.tenor.com/RhyxCbENd6YAAAAM/umaru-chan-scared.gif',
            'https://c.tenor.com/r1G0K33FM8IAAAAM/anime-scared.gif',
            'https://c.tenor.com/J0pSGU_uzTAAAAAM/scared-anime.gif'
        ]
        let scare = n[Math.floor(Math.random() * n.length)]
        return void this.client.sendMessage(M.from, { url: scare }, MessageType.video, {
            mimetype: Mimetype.gif,
            caption: `@${user2.split('@')[0]} got scared of @${user1.split('@')[0]}`,
            contextInfo: { mentionedJid: [user2, user1] }
        })
    }
}
