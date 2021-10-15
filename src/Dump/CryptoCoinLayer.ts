import MessageHandler from '../Handlers/MessageHandler'
import BaseCommand from '../lib/BaseCommand'
import WAClient from '../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../typings'
import axios from 'axios'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'crypto',
            aliases: ['cr', 'coins'],
            description: 'Get Crypto Prices\n*500 req/month* allowed',
            category: 'educative',
            dm: true,
            modsOnly: true,
            usage: `${client.config.prefix}crypto (Symbol) (Target)\nFor Example\ncrypto BTC INR\nIf you use ${client.config.prefix}crypto without parameters fetches all.`,
            baseXp: 100
        })
    }
    run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
        // check if key exists
        // if (!this.client.config.ckey) return void M.reply('No CryptoCurrency API Key Set')
        const term = joined.trim().split(' ')
        // send request to http://api.coinlayer.com/api/live using axios and set access_key = YOUR_ACCESS_KEY, target = INR
        const SymbolOption = [
            'ABC',
            'ACP',
            'ACT',
            'ACT*',
            'ADA',
            'ADCN',
            'ADL',
            'ADX',
            'ADZ',
            'AE',
            'AGI',
            'AIB',
            'AIDOC',
            'AION',
            'AIR',
            'ALT',
            'AMB',
            'AMM',
            'ANT',
            'APC',
            'APPC',
            'ARC',
            'ARCT',
            'ARDR',
            'ARK',
            'ARN',
            'ASAFE2',
            'AST',
            'ATB',
            'ATM',
            'AURS',
            'AVT',
            'BAR',
            'BASH',
            'BAT',
            'BAY',
            'BBP',
            'BCD',
            'BCH',
            'BCN',
            'BCPT',
            'BEE',
            'BIO',
            'BLC',
            'BLOCK',
            'BLU',
            'BLZ',
            'BMC',
            'BNB',
            'BNT',
            'BOST',
            'BQ',
            'BQX',
            'BRD',
            'BRIT',
            'BT1',
            'BT2',
            'BTC',
            'BTCA',
            'BTCS',
            'BTCZ',
            'BTG',
            'BTLC',
            'BTM',
            'BTM*',
            'BTQ',
            'BTS',
            'BTX',
            'BURST',
            'CALC',
            'CAS',
            'CAT',
            'CCRB',
            'CDT',
            'CESC',
            'CHAT',
            'CJ',
            'CL',
            'CLD',
            'CLOAK',
            'CMT*',
            'CND',
            'CNX',
            'CPC',
            'CRAVE',
            'CRC',
            'CRE',
            'CRW',
            'CTO',
            'CTR',
            'CVC',
            'DAS',
            'DASH',
            'DAT',
            'DATA',
            'DBC',
            'DBET',
            'DCN',
            'DCR',
            'DCT',
            'DEEP',
            'DENT',
            'DGB',
            'DGD',
            'DIM',
            'DIME',
            'DMD',
            'DNT',
            'DOGE',
            'DRGN',
            'DRZ',
            'DSH',
            'DTA',
            'EC',
            'EDG',
            'EDO',
            'EDR',
            'EKO',
            'ELA',
            'ELF',
            'EMC',
            'EMGO',
            'ENG',
            'ENJ',
            'EOS',
            'ERT',
            'ETC',
            'ETH',
            'ETN',
            'ETP',
            'ETT',
            'EVR',
            'EVX',
            'FCT',
            'FLP',
            'FOTA',
            'FRST',
            'FUEL',
            'FUN',
            'FUNC',
            'FUTC',
            'GAME',
            'GAS',
            'GBYTE',
            'GMX',
            'GNO',
            'GNT',
            'GNX',
            'GRC',
            'GRS',
            'GRWI',
            'GTC',
            'GTO',
            'GUP',
            'GVT',
            'GXS',
            'HAC',
            'HNC',
            'HSR',
            'HST',
            'HVN',
            'ICN',
            'ICOS',
            'ICX',
            'IGNIS',
            'ILC',
            'INK',
            'INS',
            'INSN',
            'INT',
            'IOP',
            'IOST',
            'ITC',
            'KCS',
            'KICK',
            'KIN',
            'KLC',
            'KMD',
            'KNC',
            'KRB',
            'LA',
            'LEND',
            'LEO',
            'LINDA',
            'LINK',
            'LOC',
            'LOG',
            'LRC',
            'LSK',
            'LTC',
            'LUN',
            'LUX',
            'MAID',
            'MANA',
            'MCAP',
            'MCO',
            'MDA',
            'MDS',
            'MIOTA',
            'MKR',
            'MLN',
            'MNX',
            'MOD',
            'MOIN',
            'MONA',
            'MTL',
            'MTN*',
            'MTX',
            'NAS',
            'NAV',
            'NBT',
            'NDC',
            'NEBL',
            'NEO',
            'NEU',
            'NEWB',
            'NGC',
            'NKC',
            'NLC2',
            'NMC',
            'NMR',
            'NULS',
            'NVC',
            'NXT',
            'OAX',
            'OBITS',
            'OC',
            'OCN',
            'ODN',
            'OK',
            'OMG',
            'OMNI',
            'ORE',
            'ORME',
            'OST',
            'OTN',
            'OTX',
            'OXY',
            'PART',
            'PAY',
            'PBT',
            'PCS',
            'PIVX',
            'PIZZA',
            'PLBT',
            'PLR',
            'POE',
            'POLY',
            'POSW',
            'POWR',
            'PPC',
            'PPT',
            'PPY',
            'PRC',
            'PRES',
            'PRG',
            'PRL',
            'PRO',
            'PURA',
            'PUT',
            'QASH',
            'QAU',
            'QSP',
            'QTUM',
            'QUN',
            'R',
            'RBIES',
            'RCN',
            'RDD',
            'RDN',
            'RDN*',
            'REBL',
            'REE',
            'REP',
            'REQ',
            'REV',
            'RGC',
            'RHOC',
            'RIYA',
            'RKC',
            'RLC',
            'RPX',
            'RUFF',
            'SALT',
            'SAN',
            'SBC',
            'SC',
            'SENT',
            'SHIFT',
            'SIB',
            'SMART',
            'SMLY',
            'SMT*',
            'SNC',
            'SNGLS',
            'SNM',
            'SNT',
            'SPK',
            'SRN',
            'STEEM',
            'STK',
            'STORJ',
            'STRAT',
            'STU',
            'STX',
            'SUB',
            'SUR',
            'SWFTC',
            'SYS',
            'TAAS',
            'TESLA',
            'THC',
            'THETA',
            'THS',
            'TIO',
            'TKN',
            'TKY',
            'TNB',
            'TNT',
            'TOA',
            'TRC',
            'TRIG',
            'TRST',
            'TRUMP',
            'TRX',
            'UBQ',
            'UNO',
            'UNRC',
            'UQC',
            'USDT',
            'UTK',
            'UTT',
            'VEE',
            'VEN',
            'VERI',
            'VIA',
            'VIB',
            'VIBE',
            'VOISE',
            'VOX',
            'VRS',
            'VTC',
            'VUC',
            'WABI',
            'WAVES',
            'WAX',
            'WC',
            'WGR',
            'WINGS',
            'WLK',
            'WOP',
            'WPR',
            'WRC',
            'WTC',
            'XAUR',
            'XBP',
            'XBY',
            'XCP',
            'XCXT',
            'XDN',
            'XEM',
            'XGB',
            'XHI',
            'XID',
            'XLM',
            'XMR',
            'XNC',
            'XRB',
            'XRP',
            'XTO',
            'XTZ',
            'XUC',
            'XVG',
            'XZC',
            'YEE',
            'YOC',
            'YOYOW',
            'ZBC',
            'ZCL',
            'ZEC',
            'ZEN',
            'ZIL',
            'ZNY',
            'ZRX',
            'ZSC',
            '611'
        ]
        const TargetOption = [
            'AED',
            'AFN',
            'ALL',
            'AMD',
            'ANG',
            'AOA',
            'ARS',
            'AUD',
            'AWG',
            'AZN',
            'BAM',
            'BBD',
            'BDT',
            'BGN',
            'BHD',
            'BIF',
            'BMD',
            'BND',
            'BOB',
            'BRL',
            'BSD',
            'BTN',
            'BWP',
            'BYR',
            'BZD',
            'CAD',
            'CDF',
            'CHF',
            'CLF',
            'CLP',
            'CNY',
            'COP',
            'CRC',
            'CUC',
            'CUP',
            'CVE',
            'CZK',
            'DJF',
            'DKK',
            'DOP',
            'DZD',
            'EGP',
            'ERN',
            'ETB',
            'FJD',
            'FKP',
            'GBP',
            'GEL',
            'GGP',
            'GHS',
            'GIP',
            'GMD',
            'GNF',
            'GTQ',
            'GYD',
            'HKD',
            'HNL',
            'HRK',
            'HTG',
            'HUF',
            'IDR',
            'ILS',
            'IMP',
            'INR',
            'IQD',
            'IRR',
            'ISK',
            'JEP',
            'JMD',
            'JOD',
            'JPY',
            'KES',
            'KGS',
            'KHR',
            'KMF',
            'KPW',
            'KRW',
            'KWD',
            'KYD',
            'KZT',
            'LAK',
            'LBP',
            'LKR',
            'LRD',
            'LSL',
            'LTL',
            'LVL',
            'LYD',
            'MAD',
            'MDL',
            'MGA',
            'MKD',
            'MMK',
            'MNT',
            'MOP',
            'MRO',
            'MUR',
            'MVR',
            'MWK',
            'MXN',
            'MYR',
            'MZN',
            'NAD',
            'NGN',
            'NIO',
            'NOK',
            'NPR',
            'NZD',
            'OMR',
            'PAB',
            'PEN',
            'PGK',
            'PHP',
            'PKR',
            'PLN',
            'PYG',
            'QAR',
            'RON',
            'RSD',
            'RUB',
            'RWF',
            'SAR',
            'SBD',
            'SCR',
            'SDG',
            'SEK',
            'SGD',
            'SHP',
            'SLL',
            'SOS',
            'SRD',
            'STD',
            'SVC',
            'SYP',
            'SZL',
            'THB',
            'TJS',
            'TMT',
            'TND',
            'TOP',
            'TRY',
            'TTD',
            'TWD',
            'TZS',
            'UAH',
            'UGX',
            'USD',
            'UYU',
            'UZS',
            'VEF',
            'VND',
            'VUV',
            'WST',
            'XAF',
            'XAG',
            'XAU',
            'XCD',
            'XDR',
            'XOF',
            'XPF',
            'YER',
            'ZAR',
            'ZMK',
            'ZMW',
            'ZWL'
        ]
        let text = ''
        let symbol = ''
        let target = ''
        symbol = SymbolOption.includes(term[0]) ? term[0] : ''
        symbol = SymbolOption.includes(term[1]) ? term[0] : ''
        target = TargetOption.includes(term[0]) ? term[0] : ''
        target = TargetOption.includes(term[1]) ? term[1] : ''
        await axios
            .get(
                `https://api.coinlayer.com/api/live?access_key=(this.client.config.ckey) &target=${target}&symbols=${symbol}`
            )
            .then(async (res) => {
                if (!res.data.success) {
                    text = `🟥 ERROR 🟥\n📍Code: ${res.data.error.code}\n📍Type: ${res.data.error.type}\n📍Info: ${res.data.error.info}`
                } else {
                    text = `🟩 Target: ${res.data.target}\n\n${res.data.rates.map((coin: string, index: number) => {
                        // eslint-disable-next-line @typescript-eslint/no-extra-semi
                        ;`🪙Coin: ${res.data.rates[index]}   📊Price: ${coin}\n`
                    })}`
                }
            })

        return void M.reply(text)
    }
}
