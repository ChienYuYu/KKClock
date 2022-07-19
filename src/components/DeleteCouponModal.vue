<template>
 <div class="modal" tabindex="-1" ref="modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">確認刪除</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
        <button type="button" class="btn btn-danger text-white">確認</button>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  mixins: [modalMixin],
};
</script>
