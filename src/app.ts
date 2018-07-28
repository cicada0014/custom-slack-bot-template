

import { RTMClient, WebClient } from '@slack/client'
import * as fs from 'fs'
import { ApplicaionContainer } from './app.container';
import { SlackEvent } from './@types/attribute.type';
import * as request from 'request'
// process.env.TOKEN
// const token = process.env.TOKEN
// 환경변수로 넣거나  따로 json 파일을 이용합니다. {token :''} 만 들어있음 - 해당 토큰이 깃헙같은 오픈소스에에 노출되면 자동으로 크롤링해서 경고 해줌




class CustomSlackBot {

    appCatainer: ApplicaionContainer


    static bootstrap() {
        fs.readFile('.credential/slack-token.json', (err, data) => {
            const _token = JSON.parse(data.toString()).token
            if (_token) {
                console.log('Custom slack bot bootstrap success!!')
                return new CustomSlackBot(_token)
            }
        })


    }

    private rtm: RTMClient;
    private web: WebClient;
    private channel;
    private members = [
        'Joy',
    ]

    private inputRegexp = /^-/


    private invokeResponse = [
        `부르셨어요?`,
    ]
    private randomReponse = [
        `저는 인공지능이 아니에요`,
        `- 를 쓰고 명령어를 쳐보세요`,

    ]

    constructor(token) {
        this.appCatainer = new ApplicaionContainer();


        this.rtm = new RTMClient(token,
            { logLevel: 'debug' } as any
        )


        this.web = new WebClient(token)
        // this.rtm({ token: token })
        this.rtm.start({ token: token })
        this.web.rtm.connect({ token: token })
        try {
            this.init();
        } catch (e) {
            console.log(e)
        }


    }

    init() {
        this.web.channels.list()
            .then((res: any) => {
                let isProd: boolean = false
                if (process.env.NODE_ENV == 'prod')
                    isProd = true
                this.channel = res.channels.find(c => c.name == (isProd ? 'general' : 'product'));
                console.log(`이 봇은 ${isProd ? '배포' : '테스트'} 환경에서 시작`)


            });
        this.rtm.on('message', (event: SlackEvent) => {
            const message = event.text;
            if (this.inputRegexp.test(message)) {
                switch (message.substring(1, message.length)) {
                    case '도움':
                        this.rtm.send('message', {
                            channel: this.channel.id,
                            text:
                                `
                                    \n\`-소개\`: 봇이 자기 소개를 합니다.
                                `,
                            source_team: event.source_team,
                            thread_ts: event.ts
                        })

                        break;


                    case '멍멍이':
                        this.rtm.sendMessage(`
                        \n멍멍이 소환!
                        `, this.channel.id)
                        new Promise<string>((resolve) => {
                            request.get('https://dog.ceo/api/breeds/image/random', (err, response: any, body) => {
                                if (err) {
                                    console.log(err)
                                    return
                                }
                                const _body = JSON.parse(body)

                                resolve(_body.message)
                            })
                        })
                            .then(result => {
                                this.web.chat.postMessage({
                                    channel: this.channel.id,
                                    text: '멍!',
                                    username: '멍멍이의 요정',
                                    attachments: [
                                        {
                                            fallback: result,
                                            image_url: result,
                                        }
                                    ],
                                })
                            })
                            .catch(e => {
                                console.log(e)
                            })

                        break;
                    default:
                        this.rtm.sendMessage(this.randomReponse[Math.floor(Math.random() * this.randomReponse.length)], this.channel.id)
                            // Returns a promise that resolves when the message is sent
                            .then((msg) => console.log(`Message sent to channel ${this.channel.name} with ts:${msg.ts}`))
                            .catch(console.error);
                }

            }
        });
    }
}


CustomSlackBot.bootstrap()


