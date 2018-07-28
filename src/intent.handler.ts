// import { injectable, inject } from "inversify";
// import { SlackEvent } from "./attributes.type";


// @injectable()
// export class IntentHandler {

//     intents: Map<string, BaseIntent> = new Map();


//     constructor(
//     ) {

//         Object.keys(this).forEach(k => {
//             if (this[k] instanceof Usable) {
//                 console.log((<Usable>this[k]).callName)
//                 this.intents.set((<Usable>this[k]).callName, this[k])
//             }
//         })



//         // this.intents.set(this.startIntent.callName, this.startIntent)
//         // this.intents.set(this.isCoupleIntent.callName, this.isCoupleIntent)
//         // this.intents.set(this.isSsumIntent.callName, this.isSsumIntent)
//         // this.intents.set(this.ssumStart.callName, this.ssumStart)
//         // this.intents.set(this.howToMeetIntent.callName, this.howToMeetIntent)
//         // this.intents.set(this.loveMeIntent.callName, this.loveMeIntent)
//         // this.intents.set(this.howToMeetIntent.callName, this.loveMeIntent)
//     }















//     processIntentForRTM(event: SlackEvent) {
//         const session = clovaRequest.session;
//         const request = clovaRequest.request;
//         let clovaResponse: ClovaResponse
//         if (session.new && request.intent) {
//             clovaResponse = (<BaseIntent>this.intents.get("Start")).getResponse(request.intent)
//         } else {
//             if (session.sessionAttributes && session.sessionAttributes.next && request.intent) {
//                 if ((this.intents.has(session.sessionAttributes.next))) {
//                     clovaResponse = (<BaseIntent>this.intents.get(session.sessionAttributes.next)).getResponse(request.intent)
//                 } else {
//                     clovaResponse = this.defaultResponse;
//                 }
//             } else {
//                 clovaResponse = this.defaultResponse;
//             }
//         }
//         clovaResponse.version = clovaRequest.version;
//         return clovaResponse

//     }


// }





