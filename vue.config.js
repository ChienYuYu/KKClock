const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  // publicPath: '/kkClock/dist/',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/kkclock/'
    : '/',
});
