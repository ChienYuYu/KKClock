<template>
    <div class="row justify-content-center my-5">
      <form class="col-md-6">
        <table class="table align-middle">
          <thead>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr >
              <td>時鐘</td>
              <td>1</td>
              <td>$499</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-danger text-end">總計$499</td>
              <td class="text-end"></td>
            </tr>
          </tfoot>
        </table>

        <table class="table">
          <tbody>
            <tr>
              <th width="100">Email</th>
              <td></td>
            </tr>
            <tr>
              <th>姓名</th>
              <td></td>
            </tr>
            <tr>
              <th>收件人電話</th>
              <td></td>
            </tr>
            <tr>
              <th>收件人地址</th>
              <td></td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span>尚未付款</span>
                <span class="text-success">付款完成</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-end">
          <button class="btn btn-danger">確認付款去</button>
          <!-- <button class="btn btn-secondary disabled">付款已完成</button> -->
        </div>
      </form>
    </div>
</template>
