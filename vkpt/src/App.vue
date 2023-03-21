<template>
  <div class="chat" ref="chatWindow">
    <div
      class="chat__item"
      :class="{ chat__item_me: message.role === 'user' }"
      v-for="(message, index) in messages"
      :key="index">
      <div v-if="message.role !== 'user'" class="chat__item-avatar">
        <img src="../public/chatgpt.png" alt="chath-gpt-avatar" />
      </div>
      <div
        style="
          white-space: pre-wrap;
          font-family: 'Consolas', 'Courier', monospace;
        "
        class="chat__item-text"
        :class="{ 'chat__item-text_me': message.role === 'user' }">
        {{ message.content }}
      </div>
    </div>
    <div v-if="!canSendAnswer" class="loader-container">
      <div class="loader">
        <span class="loader-dot"></span>
        <span class="loader-dot"></span>
        <span class="loader-dot"></span>
      </div>
      <div class="loader-text">
        <p>Печатает...</p>
      </div>
    </div>
    <div class="chat__input">
      <input
        type="text"
        v-model.trim="messageInput"
        @keydown.enter="sendMessage" />
      <button @click="sendMessage" :disabled="!canSendAnswer">Send</button>
    </div>
  </div>
</template>

<script>
import AppChat from './components/AppChat.vue'
import AppSidebar from './components/AppSidebar.vue'
import { setAnswer } from './api'
export default {
  components: { AppSidebar, AppChat },

  data() {
    return {
      chats: [],
      messages: [],
      messageInput: '',
      canSendAnswer: true,
    }
  },
  watch: {
    messages: {
      handler(val) {
        // window.scrollTo(0, document.body.scrollHeight)
      },
      deep: true,
    },
  },
  methods: {
    async sendMessage() {
      if (!this.canSendAnswer || this.messageInput === '') return
      this.canSendAnswer = false
      this.messages.push({ role: 'user', content: this.messageInput })
      this.$nextTick(() => window.scrollTo(0, document.body.scrollHeight))
      const copy = this.messageInput
      this.messageInput = ''
      const res = await setAnswer(this.messages)
      this.canSendAnswer = true
      this.messages.push({ role: 'assistant', content: res })
    },
  },
}
</script>

<style>
.loader-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 50px;
}

.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.loader-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 10px;
  background-color: #000;
  opacity: 0.2;
  animation: loader-animation 1.2s infinite ease-in-out;
}

.loader-dot:nth-child(2) {
  animation-delay: -0.4s;
}

.loader-dot:nth-child(3) {
  animation-delay: -0.8s;
}

.loader-text {
  text-align: center;
  font-size: 16px;
}

@keyframes loader-animation {
  0% {
    transform: scale(0);
    opacity: 0.7;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
}
.chat {
  margin-bottom: 70px;
  padding: 15px;
}

.chat__item {
  display: flex;
  justify-content: start;
  margin: 10px 0;
}
.chat__item_me {
  display: flex;
  justify-content: flex-end;
}
.chat__item_me .chat__item-avatar {
  order: 2;
  margin-left: 10px;
}
.avatar-other,
.chat__item-avatar {
  margin-right: 10px;
  width: 50px;
  height: 50px;
  object-fit: cover;
}
.chat__item-text {
  text-align: start;
}
.chat__item-text_me {
  text-align: end;
}
.avatar-other img,
.chat__item-avatar img {
  border-radius: 50%;
  width: 100%;
}

.chat__item-text {
  padding: 10px;
  border-radius: 10px;
  background-color: #e6e6e6;
  max-width: 70%;
  color: black;
}

.chat__item-text_me {
  align-self: flex-end;
  background-color: #007bff;
  color: white;
}

.chat__input {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 10px;
  margin-top: auto;
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  background: #242424;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

input[type='text'] {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
}

button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}
button[disabled] {
  background: gray;
  cursor: auto;
}
</style>
