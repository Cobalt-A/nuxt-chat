import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'

export default function({store}) {
  Vue.use(new VueSocketIO({
    debug: false,
    connection: 'https://nuxt-chat-e4mggrab2-nikitosggyt-gmailcom.vercel.app',
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    }
  }))
}

