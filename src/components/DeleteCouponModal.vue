<template>
<div class="modal" tabindex="-1" ref="modal">
  <div class="modal-dialog">
    <div class="modal-content border-0">
      <div class="modal-header bg-danger">
        <h5 class="modal-title text-white">刪除</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>刪除【{{ coupon.title }}】此優惠券?</p>
        <p class="text-danger">※ 刪除後無法復原!</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
        <button type="button" class="btn btn-danger text-white"
        @click="$emit('delete-coupon', coupon)">確認</button>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  props: ['coupon'],
  mixins: [modalMixin],
};
</script>
