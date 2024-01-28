"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_music_musiclib = require("./musiclib.js");
const _sfc_main = {
  data() {
    return {
      albumList: [
        "全部专辑",
        "腐草为萤",
        "蚍蜉渡海",
        "琉璃",
        "银临EP(2012)",
        "风花雪月EP",
        "离地十公分EP",
        "单曲",
        "其他歌手&OST"
      ],
      typeList: [
        "全部类型",
        "SOLO",
        "双人原唱",
        "多人原创",
        "翻唱",
        "纯音乐",
        "为他人创作"
      ],
      platformList: [
        "全部平台",
        "腾讯系",
        "网易",
        "跨平台"
      ],
      languageList: [
        "全部语种",
        "国语",
        "英语"
      ],
      albumIsSelected: [
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ],
      typeIsSelected: [
        true,
        false,
        false,
        false,
        false,
        false,
        false
      ],
      platformIsSelected: [
        true,
        false,
        false
      ],
      languageIsSelected: [
        true,
        false,
        false
      ],
      res: {},
      displayList: pages_music_musiclib.musictable.data,
      isInfo: -1,
      playList: pages_music_musiclib.musictable.data,
      curIndex: 0,
      orderIndex: 0,
      orderList: [
        "../../assets/cycle.png",
        "../../assets/only.png",
        "../../assets/rand.png"
      ],
      isList: false,
      albumText: [
        "全部专辑",
        "腐草为萤",
        "蚍蜉渡海",
        "琉璃",
        "银临（2012）EP",
        "风花雪月EP",
        "离地十公分EP",
        "单曲专辑",
        "其他歌手&OST专辑"
      ],
      typeText: [
        "全部类型",
        "SOLO",
        "双人原唱",
        "多人原唱",
        "翻唱（非制作）",
        "纯音乐",
        "为他人创作"
      ],
      onPlay: false,
      innerAudioContext: common_vendor.index.createInnerAudioContext()
    };
  },
  methods: {
    selectList(albumIndex, typeIndex, platformIndex, languageIndex) {
      var a = [];
      var b = pages_music_musiclib.musictable.data;
      if (albumIndex != 0) {
        for (var i = 0; i < b.length; i++) {
          if (b[i].album == this.albumText[albumIndex]) {
            a.push(b[i]);
          }
        }
      } else {
        a = b;
      }
      var c = [];
      if (typeIndex != 0) {
        for (var i = 0; i < a.length; i++) {
          if (a[i].SOLO == this.typeText[typeIndex]) {
            c.push(a[i]);
          }
        }
      } else {
        c = a;
      }
      var d = [];
      if (platformIndex != 0) {
        for (var i = 0; i < c.length; i++) {
          if (c[i].platform == this.platformList[platformIndex]) {
            d.push(c[i]);
          }
        }
      } else {
        d = c;
      }
      var e = [];
      if (languageIndex != 0) {
        for (var i = 0; i < d.length; i++) {
          if (d[i].language == this.languageList[languageIndex]) {
            e.push(d[i]);
          }
        }
      } else {
        e = d;
      }
      this.displayList = e;
    },
    changeAlbumSelect(index) {
      var a = [];
      for (var i = 0; i < 9; i++) {
        a.push(false);
      }
      a[index] = true;
      this.albumIsSelected = a;
      this.selectList(this.albumIsSelected.indexOf(true), this.typeIsSelected.indexOf(true), this.platformIsSelected.indexOf(true), this.languageIsSelected.indexOf(true));
    },
    changeTypeSelect(index) {
      var a = [];
      for (var i = 0; i < 7; i++) {
        a.push(false);
      }
      a[index] = true;
      this.typeIsSelected = a;
      this.selectList(this.albumIsSelected.indexOf(true), this.typeIsSelected.indexOf(true), this.platformIsSelected.indexOf(true), this.languageIsSelected.indexOf(true));
    },
    changePlatformSelect(index) {
      var a = [];
      for (var i = 0; i < 4; i++) {
        a.push(false);
      }
      a[index] = true;
      this.platformIsSelected = a;
      this.selectList(this.albumIsSelected.indexOf(true), this.typeIsSelected.indexOf(true), this.platformIsSelected.indexOf(true), this.languageIsSelected.indexOf(true));
    },
    changeLanguageSelect(index) {
      var a = [];
      for (var i = 0; i < 7; i++) {
        a.push(false);
      }
      a[index] = true;
      this.languageIsSelected = a;
      this.selectList(this.albumIsSelected.indexOf(true), this.typeIsSelected.indexOf(true), this.platformIsSelected.indexOf(true), this.languageIsSelected.indexOf(true));
    },
    moreInfo(index) {
      this.isInfo = index;
    },
    joinPlayThis(index) {
      var a = [];
      var delIndex = this.playList.indexOf(this.displayList[index]);
      if (this.playList.length == 0) {
        a.push(this.displayList[index]);
        this.playList = a;
        this.playMusic();
        common_vendor.index.showToast({
          title: "添加成功",
          icon: "success",
          duration: 2e3
          // 2秒
        });
        return;
      }
      for (var i = 0; i < this.playList.length; i++) {
        if (i == delIndex && this.curIndex != delIndex)
          continue;
        if (i != this.curIndex) {
          a.push(this.playList[i]);
        } else {
          if (this.playList[i].name != this.displayList[index].name) {
            a.push(this.displayList[index]);
          }
          a.push(this.playList[i]);
        }
      }
      this.playList = a;
      this.playMusic();
      common_vendor.index.showToast({
        title: "添加成功",
        icon: "success",
        duration: 2e3
        // 2秒
      });
    },
    playMusic() {
      if (this.playList[this.curIndex].platform == "跨平台" || this.playList[this.curIndex].platform == "网易") {
        this.innerAudioContext.autoplay = false;
        this.innerAudioContext.src = "http://music.163.com/song/media/outer/url?id=" + this.playList[this.curIndex].url + ".mp3";
        this.innerAudioContext.pause();
        this.innerAudioContext.play();
        this.onPlay = true;
      } else {
        common_vendor.index.request({
          url: "https://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=" + this.playList[this.curIndex].url,
          method: "GET",
          success: (res) => {
            console.log("请求成功", res.data);
            this.innerAudioContext.autoplay = false;
            this.innerAudioContext.src = res.data.url;
            this.innerAudioContext.play();
            this.onPlay = true;
          },
          fail: (err) => {
            console.log("请求失败", err);
          }
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.albumList, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: $data.albumIsSelected[index] ? "#dad4e6" : "#ffffff",
        c: $data.albumIsSelected[index] ? "#b4a1ce" : "#000000",
        d: index == $data.albumList.length - 1 ? "0rpx" : "32rpx",
        e: common_vendor.o(($event) => $options.changeAlbumSelect(index))
      };
    }),
    b: common_vendor.f($data.typeList, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: $data.typeIsSelected[index] ? "#dad4e6" : "#ffffff",
        c: $data.typeIsSelected[index] ? "#b4a1ce" : "#000000",
        d: index == $data.typeList.length - 1 ? "0rpx" : "32rpx",
        e: common_vendor.o(($event) => $options.changeTypeSelect(index))
      };
    }),
    c: common_vendor.f($data.platformList, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: $data.platformIsSelected[index] ? "#dad4e6" : "#ffffff",
        c: $data.platformIsSelected[index] ? "#b4a1ce" : "#000000",
        d: index == $data.platformList.length - 1 ? "0rpx" : "32rpx",
        e: common_vendor.o(($event) => $options.changePlatformSelect(index))
      };
    }),
    d: common_vendor.f($data.languageList, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: $data.languageIsSelected[index] ? "#dad4e6" : "#ffffff",
        c: $data.languageIsSelected[index] ? "#b4a1ce" : "#000000",
        d: index == $data.languageList.length - 1 ? "0rpx" : "32rpx",
        e: common_vendor.o(($event) => $options.changeLanguageSelect(index))
      };
    }),
    e: $data.isInfo == -1
  }, $data.isInfo == -1 ? {
    f: common_vendor.f($data.displayList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.o(($event) => $options.joinPlayThis(index)),
        c: common_vendor.o(($event) => $options.moreInfo(index)),
        d: common_vendor.t(item.album),
        e: common_vendor.t(item.musictype),
        f: common_vendor.t(item.publishtime)
      };
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/zzyfiles/RWikiAPP/pages/music/music.vue"]]);
wx.createPage(MiniProgramPage);
