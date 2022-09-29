<template>
  <div>
    <v-container v-if="!setting">
      <v-row class="text-center" justify="center" align-content="center">
        <v-col cols="12">
          <v-container>
            <v-btn fab dark small class="mx-2 drag" >
              <v-icon color="white">mdi-drag-variant</v-icon>
            </v-btn>
            <v-chip style="cursor: pointer" :color=color text-color="white" @click="onClick">
              <span v-if="!smoking">Smoooke!</span>
              <span v-if="smoking">{{getTimeLabel()}}</span>
              <v-icon right>
                {{icon}}
              </v-icon>
            </v-chip>
            <v-btn fab dark @click="setting = true" small class="mx-2">
              <v-icon color="white">mdi-dots-vertical</v-icon>
            </v-btn>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="setting">
      <v-row  @click="onClick" justify="center" align-content="center">
        <v-col cols="8">
          <v-container class="pr-0">
            <v-slider color="primary" background-color="pink" class="mt-1 pt-0" v-model="interval" :thumb-size="24" min="1800" max="18000" thumb-label="always" step="1800" ticks="always" tick-size="4">
              <template v-slot:thumb-label="{ value }">
                {{getHour(value)}}:{{getMinutes(value)}}
              </template>
            </v-slider>
          </v-container>
        </v-col>
        <v-col cols="4" class="pl-0">
          <v-container class="pl-0">
            <v-btn fab dark @click="closeSetting" small class="">
              <v-icon color="white">mdi-window-close</v-icon>
            </v-btn>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>

</template>

<script>

  export default {
    name: 'HomePage',
    data: () => ({
      color: "green",
      icon: "mdi-smoking",
      time: 0,
      time_label: "",
      setting: false,
      interval: 3,
      smoking: false,
      timerId: "",
    }),
    methods: {
      onCtrl() {

      },
      onClick() {
        if(this.canSmoke()) {
          this.icon = "mdi-smoking-off"
          this.color = "red"
          this.smoking = true
          this.startTimer()
        } else {
          this.stopTimer()
        }
      },
      canSmoke() {
        return (this.time == 0) && (this.smoking == false) && (this.setting == false)
      },
      getHour(value) {
        return Math.floor(value / 3600)
      },
      getMinutes(value) {
        let min =  Math.floor((value % 3600) / 60)
        if (min == 60) min = 0
        return min
      },
      startTimer() {
        this.timerId = setInterval(this.count, 1000)
      },
      stopTimer() {
        clearInterval(this.timerId)
        this.icon = "mdi-smoking"
        this.color = "green"
        this.time = 0
        this.smoking = false
      },
      count() {
          this.time += 1
          if (this.time == this.interval) {
            this.stopTimer()
            this.showNotification()
          }
      },
      getTimeLabel() {
        let remainingTime = this.interval - this.time
        let hour = this.getHour(remainingTime)
        let minutes = this.getMinutes(remainingTime)
        let second = remainingTime - (hour * 3600) - (minutes * 60)
        if(hour < 10) hour = "0" + hour
        if(minutes < 10) minutes = "0" + minutes
        if (second < 10) second = "0" + second
        return `${hour}:${minutes}:${second}`
      },
      showNotification() {
        new Notification("It's Time to Chill 🚬").show()
      },
      closeSetting() {
        this.setting = false
        window.dataapi.setInterval(this.interval);
      }
    },
    async created() {
      this.interval = await window.dataapi.getInterval();
    }
  }
</script>

<style>
.drag {
  cursor: grab;
  -webkit-app-region: drag;
}
</style>