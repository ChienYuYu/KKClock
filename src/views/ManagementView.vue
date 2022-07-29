<template>
 <div class="d-flex">
  <aside class="sidebar vh-100  border-end  bg-dark d-flex flex-column position-fixed">
      <h2 class="px-5 py-4 text-white">後臺管理</h2>
      <ul class="list-group list-unstyled text-center">
        <li class="">
            <router-link to="/backstage/product_management"
            class="menuItem text-decoration-none d-block p-4">
            <i class="bi bi-basket-fill me-2"></i>產品管理&emsp;
            </router-link>
        </li>
        <li>
            <router-link to="/backstage/order_management"
            class="menuItem text-decoration-none d-block p-4">
               <i class="bi bi-list-ul me-2"></i>訂單管理&emsp;
            </router-link>
        </li>
        <li>
            <router-link to="/backstage/coupon_management"
            class="menuItem text-decoration-none d-block p-4">
            <i class="bi bi-ticket me-2"></i>優惠券管理&emsp;
            </router-link>
        </li>
         <li>
            <router-link to="/kkClock/home"
            target="_blank"
            class="menuItem text-decoration-none d-block p-4">
            <i class="bi bi-card-image me-2"></i>開啟前台&emsp;
            </router-link>
        </li>
        <!-- <li class="">
          <a href="#" class="menuItem text-decoration-none d-block p-4">登出</a>
        </li> -->
      </ul>
      <a href="#"
      class="mt-auto menuItem text-decoration-none d-block text-center border-top p-4"
      @click.prevent="logout()">
        <i class="bi bi-box-arrow-left me-2"></i>登出&emsp;</a>

  </aside>

  <main class="main bg-light">
    <router-view/>
  </main>
 </div>
</template>

<script>
export default {
  methods: {
    logout() {
      const api = `${process.env.VUE_APP_API}logout`;
      this.axios.post(api).then((res) => {
        console.log('logout()', res);
        this.$router.push('/login');
      });
    },
  },
  created() {
    // 從cookie取出token↓
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)kkclock\s*=\s*([^;]*).*$)|^.*$/, '$1');
    // console.log('token:', token);
    // axios全域設定，之後發送api自動夾帶token在header裡
    this.axios.defaults.headers.common.Authorization = token;
    const api = `${process.env.VUE_APP_API}api/user/check`;
    this.axios.post(api).then((res) => {
      if (!res.data.success) {
        this.$router.push('/login');
      }
    });
  },
};
</script>

<style lang="scss">
.sidebar{
  width: 230px;
    .menuItem{
    color: #fff;
    background:transparent;
    transition: .3s;
    &:hover{
      color: #444;
      // background: #FCC046;
      background: #eee;
    }
  }
}
.main{
  width: calc(100% - 230px);
  margin-left: 230px;
}
.router-link-exact-active{
  background:#fa0 !important;
  color: #111 !important;
}
</style>
