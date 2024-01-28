<template>
	<scroll-view scroll-x="true" class="scroll-x-list" id="first">
		<view v-for="(item,index) in albumList" class="view-parent"
			:style="{'--right': index==albumList.length-1 ? '0rpx' : '32rpx'}" @click="changeAlbumSelect(index)">
			<text class="view-item"
				:style="{'--bgColor': albumIsSelected[index] ? '#dad4e6' : '#ffffff', '--txColor': albumIsSelected[index] ? '#b4a1ce' : '#000000'}">{{item}}</text>
		</view>
	</scroll-view>
	<scroll-view scroll-x="true" class="scroll-x-list" id="first">
		<view v-for="(item,index) in typeList" class="view-parent"
			:style="{'--right': index==typeList.length-1 ? '0rpx' : '32rpx'}" @click="changeTypeSelect(index)">
			<text class="view-item"
				:style="{'--bgColor': typeIsSelected[index] ? '#dad4e6' : '#ffffff', '--txColor': typeIsSelected[index] ? '#b4a1ce' : '#000000'}">{{item}}</text>
		</view>
	</scroll-view>
	<scroll-view scroll-x="true" class="scroll-x-list" id="first">
		<view v-for="(item,index) in platformList" class="view-parent"
			:style="{'--right': index==platformList.length-1 ? '0rpx' : '32rpx'}" @click="changePlatformSelect(index)">
			<text class="view-item"
				:style="{'--bgColor': platformIsSelected[index] ? '#dad4e6' : '#ffffff', '--txColor': platformIsSelected[index] ? '#b4a1ce' : '#000000'}">{{item}}</text>
		</view>
	</scroll-view>
	<scroll-view scroll-x="true" class="scroll-x-list" id="first">
		<view v-for="(item,index) in languageList" class="view-parent"
			:style="{'--right': index==languageList.length-1 ? '0rpx' : '32rpx'}" @click="changeLanguageSelect(index)">
			<text class="view-item"
				:style="{'--bgColor': languageIsSelected[index] ? '#dad4e6' : '#ffffff', '--txColor': languageIsSelected[index] ? '#b4a1ce' : '#000000'}">{{item}}</text>
		</view>
	</scroll-view>
	<scroll-view v-if="isInfo == -1" scroll-y="true" class="display">
		<view v-for="(item,index) in displayList" class="display-item">
			<view class="display-item-name" @click="joinPlayThis(index)">
				<text> {{ item.name }} </text>
			</view>
			<image src="../../static/more.png" class="display-item-more" @click="moreInfo(index)" />
			<view class="display-item-info">
				<text class="display-item-album"> {{ item.album }} </text>
				<text class="display-item-type"> {{ item.music_type }}</text>
				<text class="display-item-time">{{ item.publish_time.slice(0, 10) }}</text>
			</view>
		</view>
	</scroll-view>
<!-- 	<view class="popup-box" @click="closePopup()" v-if="isInfo != -1"></view>
	<view v-if="isInfo != -1" class="more-info" style="width: 730rpx;">
		<view class="info-main">
			<image :src="displayList[isInfo].cover" class="info-main-cover" />
			<text class="info-main-name">{{ displayList[isInfo].name }}</text>
			<text class="info-main-platform">{{ displayList[isInfo].platform }}</text>
		</view>
		<image src="../../static/close.png" class="info-close" @click="closeInfo()" />
		<view class="info-content">
			<text> 作词：{{ displayList[isInfo].lyricist }}\n</text>
			<text> 作曲：{{ displayList[isInfo].composer }}\n</text>
			<text> 编曲：{{ displayList[isInfo].arranger }}\n</text>
			<text> 类型：{{ displayList[isInfo].musictype }}\n</text>
			<text> 语种：{{ displayList[isInfo].language }}\n</text>
			<text> 专辑：{{ displayList[isInfo].album }}\n</text>
			<text> 发行时间： {{ displayList[isInfo].publishtime }}\n</text>
			<text> 有无PV/MV：{{ displayList[isInfo].PV }}\n</text>
			<text v-if="displayList[isInfo].note != ''"> {{ displayList[isInfo].note }}</text>
		</view>
		<image src="../../static/add-music.png" class="info-next-img" @click="addNext(isInfo)" />
		<text class="info-next" @click="addNext(isInfo)">下一首播放</text>
		<text class="info-end" @click="addEnd(isInfo)">添加到播放列表末尾</text>
		<image src="../../static/list-add.png" class="info-end-img" @click="addEnd(isInfo)" />
	</view>
	<view class="playmenu">
		<image :src="playList[curIndex].cover" class="play-cover" />
		<image v-if="onPlay" src="../../static/pause.png" @click="pauseMusic()" class="play-cover" />
		<image v-if="!onPlay" src="../../static/play.png" @click="goOnMusic()" class="play-cover" />
		<text class="play-name">当前播放：{{ playList[curIndex].name }}</text>
		<image :src="orderList[orderIndex]" class="play-order" @click="changeOrder()" />
		<image src="../../static/list.png" class="play-list" @click="list()" />
	</view>
	<view class="popup-box" @click="closePopup()" v-if="isList"></view>
	<view v-if="isList" class="list">
		<text class="list-curplay">当前播放({{playList.length}})</text>
		<text class="list-deleteall" @click="deleteAll()">清空列表</text>
		<scroll-view scroll-y="true" class="list-table">
			<view v-for="(item,index) in playList" class="list-item">
				<text class="list-name" :style="{'--color': curIndex==index ? '#b4a1ce' : '#000000'}" @click="playThis(index)"
					>{{ item.name }}</text>
				<text class="list-album" :style="{'--color': curIndex==index ? '#b4a1ce' : '#000000'}" @click="playThis(index)"
					>-{{ item.album }}</text>
				<image src="../../static/delete.png" class="list-delete" @click="deleteThis(index)"/>
			</view>
		</scroll-view>
	</view> -->
</template>

<script>
	import {
		musictable
	} from './musiclib.js'
	export default {
		data() {
			return {
				albumList: [
					'全部专辑',
					'腐草为萤',
					'蚍蜉渡海',
					'琉璃',
					'银临EP(2012)',
					'风花雪月EP',
					'离地十公分EP',
					'单曲',
					'其他歌手&OST'
				],
				typeList: [
					'全部类型',
					'SOLO',
					'双人原唱',
					'多人原创',
					'翻唱',
					'纯音乐',
					'为他人创作'
				],
				platformList: [
					'全部平台',
					'腾讯系',
					'网易',
					'跨平台'
				],
				languageList: [
					'全部语种',
					'国语',
					'英语'
				],
				albumIsSelected: [
					true, false, false, false, false, false, false, false, false
				],
				typeIsSelected: [
					true, false, false, false, false, false, false
				],
				platformIsSelected: [
					true, false, false
				],
				languageIsSelected: [
					true, false, false
				],
				res: {},
				displayList: musictable.data,
				isInfo: -1,
				playList: musictable.data,
				curIndex: 0,
				orderIndex: 0,
				orderList: [
					'../../static/cycle.png',
					'../../static/only.png',
					'../../static/rand.png'
				],
				isList: false,
				albumText: [
					'全部专辑',
					'腐草为萤',
					'蚍蜉渡海',
					'琉璃',
					'银临（2012）EP',
					'风花雪月EP',
					'离地十公分EP',
					'单曲专辑',
					'其他歌手&OST专辑'
				],
				typeText: [
					'全部类型',
					'SOLO',
					'双人原唱',
					'多人原唱',
					'翻唱（非制作）',
					'纯音乐',
					'为他人创作'
				],
				onPlay: false,
				innerAudioContext: uni.createInnerAudioContext()
			}
		},
		methods: {
			selectList(albumIndex, typeIndex, platformIndex, languageIndex) {
				var a = [];
				var b = musictable.data;
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
				this.selectList(this.albumIsSelected.indexOf(true), this.typeIsSelected.indexOf(true), this
					.platformIsSelected.indexOf(true), this.languageIsSelected.indexOf(true));
			},
			changeTypeSelect(index) {
				var a = [];
				for (var i = 0; i < 7; i++) {
					a.push(false);
				}
				a[index] = true;
				this.typeIsSelected = a;
				this.selectList(this.albumIsSelected.indexOf(true), this.typeIsSelected.indexOf(true), this
					.platformIsSelected.indexOf(true), this.languageIsSelected.indexOf(true));
			},
			changePlatformSelect(index) {
				var a = [];
				for (var i = 0; i < 4; i++) {
					a.push(false);
				}
				a[index] = true;
				this.platformIsSelected = a;
				this.selectList(this.albumIsSelected.indexOf(true), this.typeIsSelected.indexOf(true), this
					.platformIsSelected.indexOf(true), this.languageIsSelected.indexOf(true));
			},
			changeLanguageSelect(index) {
				var a = [];
				for (var i = 0; i < 7; i++) {
					a.push(false);
				}
				a[index] = true;
				this.languageIsSelected = a;
				this.selectList(this.albumIsSelected.indexOf(true), this.typeIsSelected.indexOf(true), this
					.platformIsSelected.indexOf(true), this.languageIsSelected.indexOf(true));
			},
			moreInfo(index) {
				this.isInfo = index
			},
			joinPlayThis(index) {
				var a = [];
				var delIndex = this.playList.indexOf(this.displayList[index]);
				if (this.playList.length == 0) {
					a.push(this.displayList[index]);
					this.playList = a;
					this.playMusic();
					uni.showToast({
						title: '添加成功',
						icon: 'success',
						duration: 2000, // 2秒
					});
					return;
				}
				for (var i = 0; i < this.playList.length; i++) {
					if (i == delIndex && this.curIndex != delIndex) continue;
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
				uni.showToast({
					title: '添加成功',
					icon: 'success',
					duration: 2000, // 2秒
				});
			},
			playMusic() {
				if (this.playList[this.curIndex].platform == '跨平台' || this.playList[this.curIndex]
					.platform == '网易') {
					this.innerAudioContext.autoplay = false;
					this.innerAudioContext.src = "http://music.163.com/song/media/outer/url?id=" + this.playList[this
						.curIndex].url + ".mp3";
					this.innerAudioContext.pause();
					this.innerAudioContext.play();
					this.onPlay = true;
				} else {
					uni.request({
						url: "https://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=" + this
							.playList[this.curIndex].url,
						method: "GET",
						success: res => {
							console.log("请求成功", res.data);
							this.innerAudioContext.autoplay = false
							this.innerAudioContext.src = res.data.url
							this.innerAudioContext.play();
							this.onPlay = true;
						},
						fail: err => {
							console.log("请求失败", err);
						}
					})
				}
			},
			pauseMusic() {
				this.innerAudioContext.pause();
				console.log("暂停");
				this.onPlay = false;
			},
			closePopup() {
				this.isList = false;
				this.isInfo = -1;
			},
			goOnMusic() {
				this.innerAudioContext.play();
				console.log("播放");
				this.onPlay = true;
			},
			closeInfo() {
				this.isInfo = -1;
			},
			changeOrder() {
				this.orderIndex = (this.orderIndex + 1) % 3
			},
			playThis(index) {
				this.curIndex = index;
				this.playMusic();
			},
			deleteThis(index) {
				var a = [];
				for (var i = 0; i < this.playList.length; i++) {
					if (i != index) {
						a.push(this.playList[i]);
					}
				}
				this.playList = a;
				this.pauseMusic();
				this.playMusic();
			},
			deleteAll() {
				this.playList = [];
				this.curIndex = 0;
			},
			list() {
				this.isList = !this.isList;
			},
			addNext(index) {
				var a = [];
				var delIndex = this.playList.indexOf(this.displayList[index]);
				if (this.playList.length == 0) {
					a.push(this.displayList[index]);
					this.playList = a;
					uni.showToast({
						title: '添加成功',
						icon: 'success',
						duration: 2000, // 2秒
					});
					return;
				}
				for (var i = 0; i < this.playList.length; i++) {
					if (i == delIndex && this.curIndex != delIndex) continue;
					if (i != this.curIndex) {
						a.push(this.playList[i]);
					} else {
						a.push(this.playList[i]);
						if (this.playList[i].name != this.displayList[index].name) {
							a.push(this.displayList[index]);
						}
					}
				}
				this.playList = a;
				uni.showToast({
					title: '添加成功',
					icon: 'success',
					duration: 2000, // 2秒
				});
			},
			addEnd(index) {
				var a = [];
				var delIndex = this.playList.indexOf(this.displayList[index]);
				for (var i = 0; i < this.playList.length; i++) {
					if (i == delIndex) continue;
					a.push(this.playList[i]);
				}
				a.push(this.displayList[index]);
				this.playList = a;
				uni.showToast({
					title: '添加成功',
					icon: 'success',
					duration: 2000, // 2秒
				});
			},

		}
	}
</script>

<style>
	.scroll-x-list {
		height: 60rpx;
		white-space: nowrap;
		margin-left: 20rpx;
	}

	#first {
		margin-top: 20rpx;
	}

	.view-parent {
		display: inline-block;
		margin-right: var(--right);
		background-color: var(--bgColor);
		color: var(--txColor);
	}

	.view-item {
		padding-left: 10rpx;
		padding-top: 5rpx;
		padding-right: 10rpx;
		margin-right: 20rpx;
		padding-bottom: 5rpx;
		background-color: var(--bgColor);
		color: var(--txColor);
		border-radius: 15rpx;
	}

	.display {
		white-space: nowrap;
		margin-left: 20rpx;
		height: 974rpx;
	}

	.display-item {
		position: relative;
		height: 100rpx;
		border-bottom: 3rpx solid lightgrey;
	}

	.display-item-name {
		font-size: 40rpx;
		color: #b4a1ce;
		width: 100%;
	}

	.display-item-info {
		font-size: 25rpx;
	}

	.display-item-type {
		margin-left: 20rpx;
	}

	.display-item-time {
		margin-left: 20rpx;
	}

	.display-item-more {
		position: absolute;
		right: 30rpx;
		top: 30rpx;
		height: 48rpx;
		width: 48rpx;
	}

	.more-info {
		position: relative;
		background-color: #ffffff;
		top: 60rpx;
		height: 700rpx;
		width: 100%;
		left: 10rpx;
		z-index: 999;
		border-radius: 5%;
	}

	.info-close {
		position: absolute;
		width: 48rpx;
		height: 48rpx;
		top: 20rpx;
		right: 20rpx;
	}

	.info-main-cover {
		position: absolute;
		left: 20rpx;
		width: 130rpx;
		height: 130rpx;
		top: 20rpx;
	}

	.info-main-name {
		position: absolute;
		left: 170rpx;
		top: 25rpx;
		font-size: 40rpx;
	}

	.info-main-platform {
		position: absolute;
		left: 170rpx;
		top: 90rpx;
		font-size: 25rpx;
	}

	.info-content {
		position: absolute;
		left: 20rpx;
		top: 190rpx;
	}

	.playmenu {
		position: fixed;
		width: 100%;
		height: 100rpx;
		background-color: #b4a1ce;
		bottom: 80rpx;
		z-index: 9999;
	}

	.play-cover {
		position: absolute;
		left: 20rpx;
		top: 10rpx;
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}

	.play-name {
		position: absolute;
		left: 120rpx;
		font-size: 30rpx;
		top: 30rpx;
		color: #ffffff;
	}

	.play-order {
		position: absolute;
		right: 120rpx;
		top: 20rpx;
		width: 60rpx;
		height: 60rpx;
	}

	.play-list {
		position: absolute;
		right: 30rpx;
		top: 20rpx;
		width: 60rpx;
		height: 60rpx;
	}

	.popup-box {
		position: absolute;
		z-index: 99;
		top: 0;
		background-color: rgba(0, 0, 0, 0.5);
		width: 100%;
		height: 100%;
	}

	.list {
		position: sticky;
		width: 96%;
		height: 600rpx;
		background-color: #dad4e9;
		bottom: 100rpx;
		left: 2%;
		border-radius: 5%;
		z-index: 999;
	}

	.list-curplay {
		position: absolute;
		left: 20rpx;
		top: 10rpx;
	}

	.list-table {
		position: absolute;
		height: 550rpx;
		top: 50rpx;
	}

	.list-name {
		font-size: 32rpx;
		position: absolute;
		left: 20rpx;
		color: var(--color);
	}

	.list-album {
		font-size: 25rpx;
		margin-left: 50%;
		color: var(--color);
	}

	.list-item {
		margin-top: 25rpx;
	}

	.list-delete {
		position: absolute;
		right: 20rpx;
		width: 40rpx;
		height: 40rpx;
		margin-top: 5rpx;
	}

	.list-deleteall {
		position: absolute;
		right: 60rpx;
		top: 10rpx;
	}

	.info-next-img {
		position: absolute;
		width: 32rpx;
		height: 32rpx;
		left: 20rpx;
		bottom: 80rpx;
	}

	.info-next {
		position: absolute;
		bottom: 80rpx;
		left: 52rpx;
	}

	.info-end {
		position: absolute;
		right: 52rpx;
		bottom: 80rpx;
	}

	.info-end-img {
		position: absolute;
		right: 20rpx;
		width: 32rpx;
		height: 32rpx;
		bottom: 80rpx;
	}
</style>