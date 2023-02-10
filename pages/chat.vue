<template>
  <div class="c-wrap">
    <div class="c-chat" ref="block">
      <message
        v-for="mes in messages"
        :key="mes.text"
        :name="mes.name"
        :text="mes.text"
        :owner="mes.id === user.id"
      />
    </div>
    <div class="c-form">
      <chat-form />
    </div>
  </div>
</template>


<script>
import {mapState} from 'vuex'
import message from '@/components/message'
import chatForm from '@/components/chatForm'

export default {
  layout: 'chat',
  data: () => ({
    counter: 0
  }),
  middleware: ['chat'],
  components: {message, chatForm},
  head() {
    return {
      title: `Комната ${this.user.room}`
    }
  },
  computed: mapState(['user', 'messages']),
  watch: {
    messages() {
      setTimeout (() => {
        this.$refs.block.scrollTop = this.$refs.block.scrollHeight
      })
    }
  }
}
</script>


<style scoped>
.c-wrap {
  height: 100%;
  position: relative;
  overflow: hidden;
  padding-top: 1rem;
}
.c-form {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  height: 80px;
  background-color: #212121;
}
.c-chat {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 80px;
  padding: 1rem;
  overflow-y: auto;
}
</style>
