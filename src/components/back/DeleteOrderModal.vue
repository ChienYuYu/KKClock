<template>
  <div class="modal" tabindex="-1" ref="modal">
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title">刪除訂單</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div class="modal-body">
          <p>姓名: {{ order.user.name }}</p>
          <p>Email: {{ order.user.email }}</p>
          <p class="text-danger">※ 刪除後無法復原!</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button
            type="button"
            class="btn btn-danger text-white"
            @click="$emit('delete-order', order)"
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
  props: ['order'],
  mixins: [modalMixin],
};
</script>
