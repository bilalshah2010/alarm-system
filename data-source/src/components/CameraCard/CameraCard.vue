<template>
  <div class="card-wrapper">
    <div class="card">
      <h4 class="camera-title">CAMERA ID : {{ id }}</h4>
      <img src="../../assets/feed.gif" alt="" />
      <button class="btn-primary" @click="onButtonPressed()">
        SEND FEED
      </button>
    </div>
  </div>
</template>
<style src="./CameraCard.scss" scoped lang="scss"></style>
