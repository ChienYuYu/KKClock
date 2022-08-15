<template>
  <div>
    <Toast v-for="(msg, key) in messages" :key="key" :msg="msg"></Toast>
  </div>
</template>

<script>
import Toast from '@/components/ToastSingle.vue';

export default {
  inject: ['emitter'],
  components: { Toast },
  data() {
    return {
      messages: [],
    };
  },
  mounted() {
    this.emitter.on('push-message', (message) => {
      const { style, title, content } = message;
      this.messages.push({ style, title, content });
    });
  },
};
</script>
