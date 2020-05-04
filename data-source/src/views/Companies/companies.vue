<template>
  <Content>
    <div class="companies">
      <div class="company">
        <h2>Calipsa</h2>
        <p>
          Calipsa is a monitoring system which consists of two camera stations
          having two cameras each. They need a token for getting results. Please
          hit the button below to generate a token and continue.
        </p>
        <button class="btn-primary" @click="loginCalipsa()">
          Log In
        </button>
      </div>
      <div class="company">
        <h2>1 Branch Store</h2>
        <p>
          1 Branch Store is a camera station with four registered cameras. They
          are socket based and uses their basic credentials for getting results.
          Please hit the button below to start sending the feeds using socket.
        </p>
        <button
          class="btn-primary"
          v-bind:disabled="!isSocketConnected"
          @click="loginBranchStore()"
        >
          {{ isSocketConnected ? "Log In" : "Socket Disconnected" }}
        </button>
      </div>
    </div>
  </Content>
</template>
<style src="./companies.scss" scoped lang="scss"></style>
