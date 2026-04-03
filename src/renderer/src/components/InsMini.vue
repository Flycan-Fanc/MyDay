<template>
  <div id="InsMini-container" ref="container">
    <span class="insCover">
      <img :src="displayCover" alt="" @error="handleCoverError" />
    </span>
    <span class="insTitle">{{ title }}</span>
    <span class="insDate">{{ date }}</span>
    <span id="ins-selector" ref="insSelector">
      <el-checkbox
        type="checkbox"
        v-model="selected"
        @click="changeSelectState($event)"
        size="large"
        style="position: absolute; right: 0; top: 0"
      />
    </span>
  </div>
</template>

<script>
import store from '../store/store'
import { imageUtils } from '../utils/dataUtils'
import PubSub from "pubsub-js";

export default {
  name: 'InsMini',
  props: {
    insId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      selected: false,
      useRemoteFallback: false,
    }
  },
  watch: {
    insCover() {
      this.useRemoteFallback = false
    },
    selected: {
      handler(val) {
        if (val) {
          this.$refs.container.classList.add('select')
        } else if ([...this.$refs.container.classList].includes('select')) {
          this.$refs.container.classList.remove('select')
        }
      }
    }
  },
  computed: {
    ins() {
      return store.state.insAbout.insData.filter(item => item.insId === this.insId)[0] || {}
    },
    date() {
      return this.ins?.insDate ? this.ins.insDate.split('-').join('.') : ''
    },
    title() {
      if (!this.ins?.insTitle) {
        return ''
      }
      return this.ins.insTitle.length <= 8 ? this.ins.insTitle : `${this.ins.insTitle.slice(0, 5)}...`
    },
    insCover() {
      return this.coverPicture ? imageUtils.getLocalImageUrl(this.coverPicture) : (this.ins?.insCover || '')
    },
    coverPicture() {
      return store.getters['pictureAbout/fetchInsCoverPicture'](this.insId)
    },
    remoteCover() {
      if (this.coverPicture?.pictureId) {
        return imageUtils.getImageUrl(this.coverPicture.pictureId)
      }

      return this.ins?.insCover || ''
    },
    defaultCover() {
      return new URL("../assets/background/plouzane-1758197.jpg", import.meta.url).href
    },
    displayCover() {
      if (this.useRemoteFallback) {
        return this.remoteCover || this.defaultCover
      }

      return this.insCover || this.remoteCover || this.defaultCover
    }
  },
  methods: {
    handleCoverError() {
      this.useRemoteFallback = true
    },
    changeSelectState(e) {
      this.$emit('changeSelectState', this.insId)
      PubSub.publish('changeInsSwitchState')
      e.stopPropagation()
    },
    select() {
      this.selected = true
    },
    unSelect() {
      this.selected = false
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
#InsMini-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 170px;
  height: 230px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 10px;
}
#InsMini-container:hover {
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  cursor: pointer;
}
#InsMini-container.select{
  background-color: rgb(254, 158, 77)
}
.insCover {
  flex: 2;
  width: 75%;
  margin-top: 15px;
  transition: margin-top 0.15s ease-in-out;
}
#InsMini-container:hover .insCover {
  margin-top: 40px;
}
.insCover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.insTitle {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 20px;
}
.insDate {
  flex: 1;
}
#ins-selector {
  position: absolute;
  width: 20px;
  height: 20px;
  right: 10px;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s,opacity 0.3s linear;
}
#ins-selector.visible {
  visibility: visible;
  opacity: 1;
}
#InsMini-container:hover #ins-selector {
  visibility: visible;
  opacity: 1;
}
</style>
