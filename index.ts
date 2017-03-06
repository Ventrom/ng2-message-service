export * from './services.module'

// all components that will be codegen'd need to be exported for AOT to work
export * from './src/chat.service'
export * from './src/message.service'
export * from './src/socket.service'
export * from './src/message.interface'
