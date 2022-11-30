<template>
  <footer class="footer text-center">
    <router-link to="/login" class="administrator">
      <i class="bi bi-person-fill me-1" />後台管理登入&ensp;
    </router-link>
    <p class="pt-2 mb-0">© 2022 by Chen Chien Yu</p>
  </footer>
</template>

<style>
.footer {
  background: #EBEBEB;
  color: #5A5B5B;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.administrator{
  text-decoration: none;
  color: #5A5B5B;
}
</style>
