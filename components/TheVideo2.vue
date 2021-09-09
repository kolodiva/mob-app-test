<template>
  <v-card class="my-4 py-4" shaped width="90%">
    <v-card-text style="font-size: 1.2rem" class="">
      Видео-урок проведение ИФА
    </v-card-text>

    <div v-video-player:myVideoPlayer="playerOptions" playsinline: true
    class="video-player-box" />
  </v-card>
</template>

<script>
// const consola = require('consola')
export default {
  data() {
    return {
      playerOptions: {
        fluid: true,
        muted: true,
        language: "ru",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: "video/mp4",
            src: "/VID-20210905-WA0009.mp4",
          },
        ],
        // poster: "/static/images/author.jpg",
      },
    };
  },
};
</script>
