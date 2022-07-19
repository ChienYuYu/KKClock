<template>
  <!-- <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">後台管理</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
    data-bs-target="#navbarNav" aria-controls="navbarNav"
    aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  </div>
</nav> -->
  <div class="bg d-flex justify-content-center align-items-center">
    <div class="login col-10 col-md-6 col-lg-3 p-4">
      <h2 class="mb-3 text-center text-white">後台登入</h2>
      <div class="mb-3 d-flex justify-content-center">
        <label for="email" class="form-label col-12"
          >
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="請輸入email">
        </label>
      </div>
      <div class="mb-3 d-flex justify-content-center">
        <label for="password" class="form-label col-12"
          >
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="請輸入密碼">
        </label>
      </div>
      <div class="col-12 d-flex justify-content-end">
        <button type="submit" class="btn btn-warning">登入</button>
      </div>
    </div>
  </div>
</template>

<style>
.bg {
  background-image: url(../assets/loginBG.jpg);
  height: 100vh;
  background-position: center;
  background-size: cover;
}
.login{
  backdrop-filter: blur(7px);
  border-radius: 15px;
  background:rgba(80, 80, 80, .4);
  border: 1px solid #bbb;
  box-shadow: 0 0 20px rgba(0, 0, 0, .4);
}
</style>
