<template>
  <div class="page">
    <div class="container">
      <!-- Current Turn Row -->
      <div class="row">
        <div class="col-12"><span class="window-text">Turno</span></div>
        <div class="col-12"><span class="window-number">{{ currentTurn }}</span></div>
      </div>
      <!-- Open Operator Row -->
      <div class="row">
        <div class="col-12"><span class="window-text">Ventana</span></div>
        <div class="col-12"><span class="window-number">{{ openOperator }}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'displayGeneral',
  data: function () {
    return {
      currentTurn: 'Placeholder',
      openOperator: 'Placeholder'
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  background-color: #f18d2a;
  color: #ffffff;
  height: 100vh;
}

.window-number { font-size: 5rem; }
</style>

