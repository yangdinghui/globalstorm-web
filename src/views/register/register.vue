<template>
  <div class="container">
    <!-- <div class="demo-image"> -->
    <!-- <div class="block" v-for="fit in fits" :key="fit">
      <span class="demonstration">{{ fit }}</span>
      <el-image style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image>
    </div>-->
    <div style="width:600px;height:100%; background-color:gray; margin: 0 auto;">
      <div class="player">
        <video-player
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
          @play="onPlayerPlay($event)"
          @pause="onPlayerPause($event)"
        ></video-player>
      </div>
    </div>
  </div>
</template>

<script>
import { videoPlayer } from "vue-video-player";
export default {
  props: {
    // 视频资源 url=路径 mime=类型 cover=海报
    videoData: {
      type: [Object, Array],
      required: false,
      default: () => {}
    },
    // 是否自动播放
    autoplay: {
      type: Boolean,
      required: false,
      default: false
    },
    // 是否静音
    muted: {
      type: Boolean,
      required: false,
      default: false
    },
    // 窗口比例
    aspectRatio: {
      type: String,
      required: false,
      default: "16:9"
    }
  },
  components: {
    videoPlayer
  },
  data() {
    return {
      fits: [], //"fill", "contain", "cover", "none", "scale-down"
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4",
            src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" //你的视频地址（必填）
          }
        ],
        poster: "poster.jpg", //你的封面地址https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      }
    };
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  methods: {
    onPlayerPlay(player) {
      // alert("play");
    },
    onPlayerPause(player) {
      // alert("pause");
    }
  }
};
</script>

<style type="text/css" scoped>
.container {
  background-color: #efefef;
  min-height: 100%;
}
.video-js .vjs-big-play-button {
  /*
      播放按钮换成圆形
     */
  height: 2em;
  width: 2em;
  line-height: 2em;
  border-radius: 1em;
}
</style>