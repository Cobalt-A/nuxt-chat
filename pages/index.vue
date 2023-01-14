<template>
  <v-layout column justyfy-center align-center>
    <v-flex class="card-width" xs12 sm8>
      <v-card min-width="100%">

        <v-snackbar
          v-model="snackbar"
          top
          left
          :timeout="5000"
        >
          {{ systeamMessage }}
          <v-btn
            color="red"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </v-snackbar>

        <v-card-title><h1>Real time chat</h1></v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="name"
              :counter="16"
              :rules="nameRules"
              label="Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="room"
              :rules="roomRules"
              label="Enter the room"
              required
            ></v-text-field>

            <v-btn
              :disabled="!valid"
              color="primary"
              class="mr-4"
              @click="submit"
            >
              Sign in
            </v-btn>

          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>


<script>
import {mapMutations} from 'vuex'

export default {
  layout: 'empty',
  head: {
    title: 'Nuxt chat'
  },
  sockets: {
    connect() {
      console.log('client IO connected')
    }
  },
  data: () => ({
    valid: true,
    snackbar: false,
    name: '',
    systeamMessage: '',
    nameRules: [
      v => !!v || 'Enter your name',
      v => (v && v.length <= 16) || 'Name must not exceed 16 characters',
    ],
    room: '',
    roomRules: [
      v => !!v || 'Enter the room'
    ]
  }),
  mounted() {
    const {message} = this.$route.query
    if (message === 'noUser') {
      this.systeamMessage = 'Enter the data'
    } else if (message === 'leftChat') {
      this.systeamMessage = 'You left from chat'
    }
    this.snackbar = !!this.systeamMessage
  },
  methods: {
    ...mapMutations(['setUser']),
    submit () {
      if (this.$refs.form.validate()) {
        const user = {
          name: this.name,
          room: this.room
        }

        this.$socket.emit('userJoined', user, data => {
          if (typeof data === 'string') {
            console.error('data')
          } else {
            user.id = data.userId
            this.setUser(user)
            this.$router.push('/chat')
          }
        })

        this.setUser(user)
        this.$router.push('/chat')
      }
    }
  }
}
</script>

<style scoped>
.card-width {
  width: 400px
}
@media (max-width: 582px) {
  .card-width {
    width: 100% !important;
  }
}

</style>