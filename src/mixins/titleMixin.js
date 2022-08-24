export default {
  beforeCreate() {
    document.title = this.$route.meta.title;
  },
};
