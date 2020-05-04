<template>
  <Content v-if="company">
    <h1 class="company-title">
      {{ company.username }}
      <button class="btn-primary back" @click="goToHome()">Back</button>
    </h1>
    <div class="monitoring-system" v-if="company.type === 'monitoring-system'">
      <div
        class="camera-station"
        v-for="station in company.stations"
        v-bind:key="station.id"
      >
        <h2 class="station-title">{{ station.name }}</h2>
        <div class="grid-row">
          <div
            class="camera"
            v-for="camera in station.cameras"
            v-bind:key="camera.id"
          >
            <CameraCard
              :id="camera.id"
              :stationId="station.id"
              :state="camera.state"
              @onClick="sendFeed"
            ></CameraCard>
            <div class="feed-response" v-if="camera.responseMessage">
              <div v-bind:class="{ 'false-alarm': !camera.state }">
                {{ camera.responseMessage }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="camera-stations" v-if="company.type === 'camera-station'">
      <div class="grid-row">
        <div
          class="camera"
          v-for="camera in company.cameras"
          v-bind:key="camera.id"
        >
          <CameraCard
            :id="camera.id"
            :state="camera.state"
            @onClick="sendFeed"
          ></CameraCard>
          <div class="feed-response" v-if="camera.responseMessage">
            <div v-bind:class="{ 'false-alarm': !camera.state }">
              {{ camera.responseMessage }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </Content>
</template>
<style src="./feed.scss" scoped lang="scss"></style>
