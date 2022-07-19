<template>
  <section class="bg-light py-5">
    <div class="container">
      <h2 class="text-center d-md-none">產品項目</h2>
      <div class="row">
        <div class="col-lg-2 col-md-3 pt-md-5 pb-5 d-none d-md-block">
          <ul class="list-group">
            <li class="list-group-item active" aria-current="true">全部商品</li>
            <li class="list-group-item">特價商品</li>
            <li class="list-group-item">熱門商品</li>
            <li class="list-group-item">潮流</li>
            <li class="list-group-item">經典</li>
            <li class="list-group-item">炫彩</li>
            <li class="list-group-item">撞色系</li>
            <li class="list-group-item">其他</li>
          </ul>
        </div>
        <!-- ------手機板顯示↓------------------------- -->
        <div class="col-12 py-5 d-md-none">
          <select class="form-select" aria-label="Default select example">
            <option selected>全部商品</option>
            <option value="1">特價商品</option>
            <option value="2">熱門商品</option>
            <option value="3">潮流</option>
            <option value="3">經典</option>
            <option value="3">炫彩</option>
          </select>
        </div>
        <!-- ------------------------------- -->
        <div class="col-lg-10 col-md-9">
          <h3 class="">全部商品<hr></h3>
          <div class="row row-cols-lg-5 row-cols-md-3 row-cols-2 g-2">
            <!-- --------------------- -->
            <div class="col">
              <div class="card rounded-1 overflow-hidden border-0 shadow-sm">
                <router-link to="product_list/:id" class="text-decoration-none link-dark">
                  <img src="../assets/img/sample_product01.jpg" class="card-img-top" alt="clock">
                  <div class="card-body">
                    <h3 class="card-text fs-6">超級9號鐘 蒂芬尼藍</h3>
                    <div class="d-flex align-items-center justify-content-between mb-1">
                      <p class="text-secondary mb-0 ogPrice">原價NT$469</p>
                      <p class="text-danger mb-0">NT$399</p>
                    </div>
                    <!-- <button type="button" class="w-100 btn btn-outline-secondary py-0">
                      加入購物車</button> -->
                  </div>
                </router-link>
              </div>
            </div>
            <!-- --------------------- -->
            <div class="col">
              <div class="card rounded-1 overflow-hidden border-0 shadow-sm">
                <router-link to="product_list/:id" class="text-decoration-none link-dark">
                  <img src="../assets/img/sample_product01.jpg" class="card-img-top" alt="clock">
                  <div class="card-body">
                    <h3 class="card-text fs-6">超級9號鐘 蒂芬尼藍</h3>
                    <div class="d-flex align-items-center justify-content-between mb-1">
                      <p class="text-secondary mb-0 ogPrice">原價NT$469</p>
                      <p class="text-danger mb-0">NT$399</p>
                    </div>
                    <!-- <button type="button" class="w-100 btn btn-outline-secondary py-0">
                      加入購物車</button> -->
                  </div>
                </router-link>
              </div>
            </div>
            <!-- --------------------- -->
            <div class="col">
              <div class="card rounded-1 overflow-hidden border-0 shadow-sm">
                <router-link to="product_list/:id" class="text-decoration-none link-dark">
                  <img src="../assets/img/sample_product01.jpg" class="card-img-top" alt="clock">
                  <div class="card-body">
                    <h3 class="card-text fs-6">超級9號鐘 蒂芬尼藍</h3>
                    <div class="d-flex align-items-center justify-content-between mb-1">
                      <p class="text-secondary mb-0 ogPrice">原價NT$469</p>
                      <p class="text-danger mb-0">NT$399</p>
                    </div>
                    <!-- <button type="button" class="w-100 btn btn-outline-secondary py-0">
                      加入購物車</button> -->
                  </div>
                </router-link>
              </div>
            </div>
            <!-- --------------------- -->
            <div class="col">
              <div class="card rounded-1 overflow-hidden border-0 shadow-sm">
                <router-link to="product_list/:id" class="text-decoration-none link-dark">
                  <img src="../assets/img/sample_product01.jpg" class="card-img-top" alt="clock">
                  <div class="card-body">
                    <h3 class="card-text fs-6">超級9號鐘 蒂芬尼藍</h3>
                    <div class="d-flex align-items-center justify-content-between mb-1">
                      <p class="text-secondary mb-0 ogPrice">原價NT$469</p>
                      <p class="text-danger mb-0">NT$399</p>
                    </div>
                    <!-- <button type="button" class="w-100 btn btn-outline-secondary py-0">
                      加入購物車</button> -->
                  </div>
                </router-link>
              </div>
            </div>
            <!-- --------------------- -->
            <div class="col">
              <div class="card rounded-1 overflow-hidden border-0 shadow-sm">
                <router-link to="product_list/:id" class="text-decoration-none link-dark">
                  <img src="../assets/img/sample_product01.jpg" class="card-img-top" alt="clock">
                  <div class="card-body">
                    <h3 class="card-text fs-6">超級9號鐘 蒂芬尼藍</h3>
                    <div class="d-flex align-items-center justify-content-between mb-1">
                      <p class="text-secondary mb-0 ogPrice">原價NT$469</p>
                      <p class="text-danger mb-0">NT$399</p>
                    </div>
                    <!-- <button type="button" class="w-100 btn btn-outline-secondary py-0">
                      加入購物車</button> -->
                  </div>
                </router-link>
              </div>
            </div>
            <!-- --------------------- -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.ogPrice{
  font-size: 12px;
  text-decoration: line-through;
}
</style>
