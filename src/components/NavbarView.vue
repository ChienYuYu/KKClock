<template>
 <nav class="navbar navbar-expand-lg navbar-light bg-light p-3 shadow-sm">
      <div class="container">
        <h1 class="m-0">
          <router-link to="/kkClock/home" class="navbar-brand p-0 d-block">
            <img src="../assets/img/fakeLogo05.png" alt="logo" height="40">
          </router-link>
          <!-- <router-link></router-link> -->
        </h1>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/kkClock/home" class="nav-link">首頁</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/kkClock/product_list" class="nav-link">產品</router-link>
            </li>
            <li class="nav-item">
              <!-- <a class="nav-link"> 購物車 <i class="bi bi-cart-fill"></i></a> -->
             <a class="nav-link" type="button"
             data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling"
            aria-controls="offcanvasScrolling">
            購物車<i class="bi bi-cart-fill ms-1"></i></a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- offcanvas--------------------------- -->
    <div class="offcanvas offcanvas-start" data-bs-scroll="true"
      data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling"
      aria-labelledby="offcanvasScrollingLabel" ref="myOffcanvas">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasScrollingLabel">購物車</h5>
        <button type="button" class="btn-close text-reset"
        data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <table class="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">品名</th>
              <th scope="col">數量</th>
              <th scope="col">單價</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                <button type="button" class="btn btn-danger btn-sm">
                <i class="bi bi-trash"></i> </button>
              </th>
              <td class="text-nowrap">時鐘</td>
              <td>
                <label class="input-group-text p-0 w-50" for="qty">
                  <input type="number" class="form-control" min="1" id="qty"/>
                </label>
              </td>
              <td>$499</td>
            </tr>
          </tbody>
        </table>
        <button type="button" class="btn btn-outline-myorange w-100 mb-3">前往結帳</button>
        <button type="button" class="btn btn-myorange text-white w-100">繼續購物</button>
      </div>
    </div>
 <!-- --------------------------- -->
</template>

<script>
import Offcanvas from 'bootstrap/js/dist/offcanvas';

export default {
  data() {
    return {
      bsOffcanvas: {},
    };
  },
  mounted() {
    this.bsOffcanvas = new Offcanvas(this.$refs.myOffcanvas);
  },
};
</script>
