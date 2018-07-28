export type SlackEvent = {
    type: string,
    channel: string,
    user: string,
    ts: string,
    text: string,
    source_team: string,
    team: string,
    thread_ts?: string
}