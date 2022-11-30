<template>
  <div class="modal" tabindex="-1" ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">優惠券管理</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div class="modal-body">
          <div class="input-group mb-3">
            <span class="input-group-text">優惠券</span>
            <input
              type="text"
              class="form-control"
              placeholder="輸入優惠券名稱"
              aria-label="CouponName"
              v-model="tempCoupon.title"
            />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">優惠碼</span>
            <input
              type="text"
              class="form-control"
              placeholder="輸入優惠碼"
              aria-label="CouponCode"
              v-model="tempCoupon.code"
            />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">折扣</span>
            <input
              type="number"
              class="form-control"
              aria-label="Discount"
              min="0"
              v-model="tempCoupon.percent"
            />
            <span class="input-group-text">%</span>
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">到期日</span>
            <input type="date" class="form-control" aria-label="Date" v-model="due_date" />
          </div>
          <div class="form-check">
            <label class="form-check-label" for="enableCoupon">
              啟用
              <input
                class="form-check-input"
                type="checkbox"
                id="enableCoupon"
                :true-value="1"
                :false-value="0"
                v-model="tempCoupon.is_enabled"
              />
            </label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button
            type="button"
            class="btn btn-primary text-white"
            @click="$emit('update-coupon', tempCoupon)"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  props: ['coupon'],
  data() {
    return {
      modal: {},
      tempCoupon: {},
      due_date: '',
    };
  },
  mixins: [modalMixin],
  watch: {
    coupon() {
      this.tempCoupon = this.coupon;
      // 將時間格式改為 YYYY-MM-DD
      this.due_date = new Date().toISOString().split('T'); // ss
    },
    due_date() {
      // getTime()轉成毫秒賦予tempCoupon.due_date
      this.tempCoupon.due_date = new Date(this.due_date).getTime(); // ss
    },
  },
};
</script>
