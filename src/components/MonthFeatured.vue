<template>
  <div class="row row-cols-1 row-cols-md-3 g-3">
    <div class="col">
      <router-link to="product_list/product/-N7o4O_-0lrDbAbqpVus">
        <div class="card text-white border-0 month_banner">
          <img src="../assets/img/pb01.jpg" class="card-img" alt="迷你時鐘" />
          <div class="card-img-overlay p-0">
            <p class="card-text bg-danger bg-opacity-75 d-inline h4 position-absolute bottom-0 p-2">
              購物去
              <i class="bi bi-caret-right-fill" />
              <i class="bi bi-caret-right-fill" />
            </p>
          </div>
        </div>
      </router-link>
    </div>
    <div class="col">
      <router-link to="product_list/product/-N7o1Z3lgnSsrV9jMXu3">
        <div class="card text-white border-0 month_banner">
          <img src="../assets/img/pb03.jpg" class="card-img" alt="羅馬數字時鐘" />
          <div class="card-img-overlay p-0">
            <p class="card-text bg-danger bg-opacity-75 d-inline h4 position-absolute bottom-0 p-2">
              購物去
              <i class="bi bi-caret-right-fill" />
              <i class="bi bi-caret-right-fill" />
            </p>
          </div>
        </div>
      </router-link>
    </div>
    <div class="col">
      <router-link to="product_list/product/-N7oAaExJAvb5F114Y0s">
        <div class="card text-white border-0 month_banner">
          <img src="../assets/img/pb02.jpg" class="card-img" alt="超大型鬧鐘" />
          <div class="card-img-overlay p-0">
            <p class="card-text bg-danger bg-opacity-75 d-inline h4 position-absolute bottom-0 p-2">
              購物去
              <i class="bi bi-caret-right-fill" />
              <i class="bi bi-caret-right-fill" />
            </p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.month_banner {
  transition: 0.4s;
  &:hover {
    transform: translateY(-3%);
    box-shadow: 0 0 8px #bbb;
  }
}
</style>
