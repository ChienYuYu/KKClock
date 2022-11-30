<template>
  <form class="bg d-flex justify-content-center align-items-center" @submit.prevent="signIn">
    <div class="login col-10 col-md-6 col-lg-3 p-4">
      <h2 class="mb-3 text-center text-white">後台登入</h2>
      <div class="mb-3 d-flex justify-content-center">
        <label for="email" class="form-label col-12">
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="請輸入帳號"
            v-model="user.username"
          />
        </label>
      </div>
      <div class="mb-3 d-flex justify-content-center">
        <label for="password" class="form-label col-12">
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="請輸入密碼"
            v-model="user.password"
          />
        </label>
      </div>
      <div class="col-12 d-flex justify-content-end">
        <button type="submit" class="btn btn-warning">登入</button>
      </div>
    </div>
  </form>
</template>

<script>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

export default {
  setup() {
    const router = useRouter();
    const axios = inject('axios');
    const user = ref({
      user: {
        username: '',
        password: '',
      },
    });

    const signIn = () => {
      const api = `${process.env.VUE_APP_API}admin/signin`;
      axios.post(api, user.value)
        .then((res) => {
          if (res.data.success === true) {
            const { token, expired } = res.data;
            // 把token存到cookie裡↓
            document.cookie = `kkclock = ${token}; expires = ${new Date(expired)}`;
            router.push('/backstage/product_management');
          }
        })
        .catch(() => {
          Swal.fire({
            title: '似乎有些問題 請稍後再嘗試',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
          });
        });
    };

    return { user, signIn };
  },

};
</script>

<style>
.bg {
  background-image: url(@/assets/img/loginBG.jpg);
  height: 100vh;
  background-position: center;
  background-size: cover;
}
.login {
  backdrop-filter: blur(7px);
  border-radius: 15px;
  background: rgba(80, 80, 80, 0.4);
  border: 1px solid #bbb;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
}
</style>
