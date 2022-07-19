<template>
<div class="container">
  <div class="col-12">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">品名</th>
          <th scope="col">數量</th>
          <th scope="col">單價</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-nowrap">時鐘sdfsfsfsdfsd</td>
          <td>
            <div class="col-md-3 col-lg-4">
              <div class="input-group input-group-sm mb-3">
                <!-- <span class="input-group-text">數量</span> -->
                <input type="number" class="form-control" aria-label="qty" min="1">
              </div>
            </div>
          </td>
          <td>$499</td>
           <td>
            <button type="button" class="btn btn-danger btn-sm">
            <i class="bi bi-trash"></i> </button>
          </td>
        </tr>
        <tr>
          <td class="border-0" colspan="">
          </td>
        </tr>
        <tr>
          <td colspan="4">
            <p class="text-success text-end px-5">總計 $1299</p>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="col-md-4">
      <div class="input-group mb-3">
        <button
          class="btn btn-outline-secondary"
          type="button">
          套用優惠碼
        </button>

        <input
          type="text"
          class="form-control"
          placeholder="請輸入優惠碼"
          aria-label="coupon"
          aria-describedby="button-coupon">
      </div>
    </div>

    <div class="col-12 col-md-10 col-lg-6 mx-auto border p-4 my-5">
      <form>
        <h2 class="mb-3">請填寫訂購資料 <span class="ms-3 h6 text-danger">*必填</span></h2>
        <div class="mb-3">
          <label for="email" class="form-label w-100">Email*
            <input
            type="email"
            class="form-control mt-2"
            id="email"
            aria-describedby="emailHelp"
            placeholder="請輸入Email">
          </label>
        </div>
        <div class="mb-3">
          <label for="name" class="form-label w-100">收件人姓名*
            <input
            type="text"
            class="form-control mt-2"
            id="name"
            aria-describedby="emailHelp"
            placeholder="請輸入收件人姓名">
          </label>
        </div>
        <div class="mb-3">
          <label for="phone" class="form-label w-100">收件人電話*
            <input
            type="tel"
            class="form-control mt-2"
            id="phone"
            aria-describedby="emailHelp"
            placeholder="請輸入收件人電話">
          </label>
        </div>
        <div class="mb-3">
          <label for="address" class="form-label w-100">收件人地址*
            <input
            type="text"
            class="form-control mt-2"
            id="address"
            aria-describedby="emailHelp"
            placeholder="請輸入收件人地址">
          </label>
        </div>
        <div class="mb-3">
          <label for="message" class="form-label w-100">
            留言
             <textarea
            name=""
            id="message"
            class="form-control mt-2"
          ></textarea>
          </label>
        </div>

        <button type="submit" class="btn btn-danger">送出訂單 & 付款去</button>
      </form>
    </div>
  </div>
</div>
</template>
