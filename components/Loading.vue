<template>
  <div class="spinner-loading"></div>
</template>
<style>
.spinner-loading {
  width: 50px;
  height: 50px;
  border: 0.5rem solid #319f43;
  margin: 200px auto;
  animation: spinning 2.5s infinite;
}
@keyframes spinning {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
