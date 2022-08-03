<template>
<LoadingPlugin :active="isLoading"></LoadingPlugin>
 <div class="container">
  <div class="my-4 d-flex justify-content-between">
    <h2>優惠券管理</h2>
    <button type="button" class="btn btn-dark text-warning"
    @click="openModal(true)">
    <i class="bi bi-bag-plus-fill me-2"></i>新增優惠券&ensp;</button>
  </div>
  <table class="table">
  <thead>
    <tr>
      <th scope="col">名稱</th>
      <th scope="col">優惠碼</th>
      <th scope="col">折扣百分比</th>
      <th scope="col">到期日</th>
      <th scope="col">是否啟用</th>
      <th scope="col">編輯/刪除</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in coupons" :key="item.id">
      <td scope="row">{{item.title}}</td>
      <td>{{item.code}}</td>
      <td>{{item.percent}}%</td>
      <!-- <td>{{new Date(item.due_date)}}</td> -->
      <td>{{new Date(item.due_date).toLocaleDateString()}}</td>
      <td>
        <span class="text-success" v-if="item.is_enabled === 1">啟用</span>
        <span class="text-danger" v-else>未啟用</span>
      </td>
      <td>
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-primary text-white"
          @click="openModal(false, item)">編輯</button>
          <button type="button" class="btn btn-danger text-white"
          @click="openDelModal(item)">刪除</button>
        </div>
      </td>
    </tr>
  </tbody>
</table>
 </div>
<!-- components-- -->
 <CouponModal ref="couponModal"
 :coupon="tempCoupon"
 @update-coupon="updateCoupon"></CouponModal>
 <!-- ------------------------ -->
 <DeleteCouponModal ref="delCouponModal"
 :coupon="tempCoupon"
 @delete-coupon="delCoupon"></DeleteCouponModal>
 <!-- ------------------------ -->
 <Pagination
 :pages="pagination"
 @pre-page="getCoupons"
 @page-num="getCoupons"
 @next-page="getCoupons"></Pagination>
 <!-- ------------------------ -->

</template>

<script>
import CouponModal from '../components/CouponModal.vue';
import DeleteCouponModal from '../components/DeleteCouponModal.vue';
import Pagination from '../components/PaginationView.vue';

export default {
  components: {
    CouponModal,
    DeleteCouponModal,
    Pagination,
  },
  inject: ['emitter'],
  data() {
    return {
      isLoading: false,
      coupons: [],
      tempCoupon: {},
      isNew: false,
      pagination: {},
    };
  },
  methods: {
    getCoupons(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;
      this.isLoading = true;
      this.axios.get(api).then((res) => {
        this.isLoading = false;
        console.log('getCoupons()', res);
        this.coupons = res.data.coupons;
        this.pagination = res.data.pagination;
      });
    },
    openModal(isNew, item) {
      this.$refs.couponModal.showModal();
      this.isNew = isNew;
      if (isNew === true) {
        this.tempCoupon = {
          is_enabled: 1, // 先預設 因為props過去會顯示未填
          due_date: new Date().getTime(),
        };
      } else {
        this.tempCoupon = { ...item };
      }
    },
    updateCoupon(item) {
      // this.tempCoupon = item;
      if (this.isNew) {
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
        this.axios.post(api, { data: item }).then((res) => {
          // console.log('updateCoupon()-新增', res);
          this.$refs.couponModal.hideModal();
          if (res.data.success) {
            this.getCoupons();
            this.emitter.emit('push-message', {
              style: 'mygreen',
              title: '新增成功',
            });
          } else {
            this.emitter.emit('push-message', {
              style: 'myred',
              title: '新增失敗',
              content: res.data.message.join('、'),
            });
          }
        });
      } else {
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`;
        this.axios.put(api, { data: item }).then((res) => {
          console.log('updateCoupon()-編輯', res);
          this.$refs.couponModal.hideModal();
          if (res.data.success) {
            this.getCoupons();
            this.emitter.emit('push-message', {
              style: 'mygreen',
              title: '更新成功',
            });
          } else {
            this.emitter.emit('push-message', {
              style: 'myred',
              title: '更新失敗',
              content: res.data.message.join('、'),
            });
          }
        });
      }
    },
    openDelModal(item) {
      this.$refs.delCouponModal.showModal();
      this.tempCoupon = { ...item };
    },
    delCoupon(item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`;
      this.axios.delete(api).then((res) => {
        console.log('delCoupon(item)', res);
        this.$refs.delCouponModal.hideModal();
        this.getCoupons();
        this.emitter.emit('push-message', {
          style: 'mygreen',
          title: '刪除成功',
        });
      });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
