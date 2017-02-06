export interface SocketConfig {
    HOST: string
    PORT: number
    MULTICAST_PORT: number
    broadcast: boolean
    multicastTTL: number
}

export interface SocketCallback {
    name: string
    fn: (...args: any[]) => void
}

export interface Group {
    _id: string
    senders: Sender[]
}

export interface Sender {
    _id: string
    name?: string
}

export interface Message {
    type: string
    value?: string
    sender?: string
    target: string
    all?: boolean
}
