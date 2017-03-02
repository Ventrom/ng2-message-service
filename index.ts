export * from './services.module'

// all components that will be codegen'd need to be exported for AOT to work
export * from './services/chat.service'
export * from './services/message.service'
export * from './services/socket.service'
export * from './services/chat.interface'
