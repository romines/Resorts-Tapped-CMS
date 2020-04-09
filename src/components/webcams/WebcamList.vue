<template>
  <div class="webcam-list">
    <h2 class="subtitle">Current Webcams</h2>

    <div v-if="webcams.length > 0" class="webcam-list">
      <div v-for="webcam in webcams" class="webcam-container">
        <section class="header" @click="showWebcamDetails(webcam)">
          <span class="id">{{webcam.id}}</span>
          <span class="webcam-name">{{ webcam.name }}</span>
          <span class="created-at">{{formatDate(webcam.createdAt, 'll')}}</span>
        </section>
        <section v-if="showWebcam(webcam.name)" class="body">
          <div class="webcam-details">
            <div class="detail name">
              <label>Name:</label><span class="created">{{ webcam.name }}</span>
            </div>
            <div class="detail short-name">
              <label>Short Name:</label><span class="created">{{ webcam.shortName }}</span>
            </div>
            <div class="detail static-url">
              <label>Static URL:</label><span class="created">{{ webcam.staticImageUrl }}</span>
            </div>
            <div class="detail streaming-url">
              <label>Streaming Url:</label><span class="created">{{ webcam.streamingUrl }}</span>
            </div>
            <div class="detail is-web">
              <label>Is Web?:</label><span class="created">{{ webcam.isWeb }}</span>
            </div>
            <div class="detail created">
              <label>Created At:</label><span class="created">{{formatDate(webcam.createdAt, 'lll')}}</span>
            </div>
            <div class="detail updated">
              <label>Last Updated:</label><span class="created">{{formatDate(webcam.updatedAt, 'lll')}}</span>
            </div>
          </div>
        </section>

      </div>

    </div>
    <div v-else class="no-webcams">
      No webcams to display. Add a new webcam using the button above.
    </div>

  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  components: {

  },
  data () {
    return {
      currentWebcamName:      {}
    }
  },
  computed: {
    ...mapGetters(['webcams'])
  },
  created () {

  },
  methods: {
    showWebcamDetails (webcam) {
      // Check if opening or closing...
      if (this.currentWebcamName == webcam.name) {
        this.currentWebcamName = null
        return
      } else {
        this.currentWebcamName = webcam.name
      }
    },
    showWebcam (name) {
      return this.currentWebcamName == name
    },
    formatDate (date, format) {
      return moment(date).local().format(format)
    }
  }
}
</script>

<style lang="scss" scoped>

.webcam-list {

  .webcam-container {
    border:                       1px solid #dfe0e2;
    border-radius:                0.25em;
    margin-bottom:                0.88em;

    .header {
      display:                    flex;
      align-items:                center;
      cursor:                     pointer;
      background:                 #dfe0e2;
      padding:                    0.88em;

      .webcam-name {
        margin-left:              3em;
        text-overflow:            ellipsis;
        overflow:                 hidden;
        white-space:              nowrap;
        max-width:                25em;
      }

      .created-at {
        margin-left:              auto;
      }
    }

    .body {

      padding:                    1.5em 2em;

      .webcam-details {

        .detail {

          display:                flex;

          > label {
            font-weight:          bold;
            width:                20%;
          }

          > span {
            width:                80%;
          }
        }
      }
    }
  }

  .no-webcams {
    font-style:                     italic;
    padding:                        1em;
  }
}

</style>