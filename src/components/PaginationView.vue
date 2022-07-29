<template>
  <nav>
  <ul class="pagination justify-content-center">
    <!-- 上一頁 ----------------->
    <li class="page-item"
    :class="{'disabled': pages.has_pre === false}">
      <a class="page-link link-dark" href="#"
      @click.prevent="$emit('pre-page', pages.current_page-1)">Prev</a></li>
    <!-- 頁碼 ------------------->
    <li class="page-item"
    :class="{'active': page === pages.current_page}"
    v-for="page in pages.total_pages" :key="page">
      <a class="page-link link-dark" href="#"
      @click.prevent="$emit('page-num', page)">{{page}}</a>
    </li>
    <!-- 下一頁 ---------------->
    <li class="page-item"
    :class="{'disabled': pages.has_next === false}">
      <a class="page-link link-dark" href="#"
      @click.prevent="$emit('next-page', pages.current_page+1)">Next</a></li>
  </ul>
</nav>
</template>

<script>
export default {
  props: ['pages'],
};
</script>
