new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "DESOLÉ",
          artist: "MERYL ",
          cover: "https://rawcdn.githack.com/RICHECAR/COVER/1c25f8d5d5919f13a4485b532951406b17620e2a/te%CC%81le%CC%81chargement.jpeg",
          source: "https://rawcdn.githack.com/RICHECAR/MP3/23492b5987e93840b9f2350208eca322746f9643/Meryl%20-%20De%CC%81sole%CC%81.mp3",
          url: "https://www.youtube.com/watch?v=nIkzquQDEBg ",
          favorited: false
        },
        {
          name: "SELFIE",
          artist: "Werenoi x Maes",
          cover: "https://rawcdn.githack.com/RICHECAR/COVER/1c25f8d5d5919f13a4485b532951406b17620e2a/maxresdefault-3-1.jpeg",
          source: "https://rawcdn.githack.com/RICHECAR/MP3/23492b5987e93840b9f2350208eca322746f9643/Werenoi%20(ft.%20Maes)%20-%20Selfie%20(Clip%20Officiel).mp3",
          url: "https://www.youtube.com/watch?v=6S7YXGkA5IQ",
          favorited: true
        },
        {
          name: "JEFFE",
          artist: "ninho",
          cover: "https://rawcdn.githack.com/RICHECAR/COVER/1c25f8d5d5919f13a4485b532951406b17620e2a/Jefe.jpeg",
          source: "https://rawcdn.githack.com/RICHECAR/MP3/eaa20ae83f6fe8e54822b8653cf4765107ff409a/Ninho%20-%20Jefe.mp3",
          url: "https://www.youtube.com/watch?v=pxjsZK_fkO4",
          favorited: false
        },
        {
          name: "Selfmade",
          artist: "Smeel",
          cover: "https://rawcdn.githack.com/RICHECAR/COVER/1c25f8d5d5919f13a4485b532951406b17620e2a/ab67616d00001e024f6670223e18b9a982bb698a.jpeg",
          source: "https://rawcdn.githack.com/RICHECAR/MP3/23492b5987e93840b9f2350208eca322746f9643/Smeels,%20Eyal%20Benisti,%20Mae%CC%88l%20Le%20Blevennec,%20Smeels%20Gang%20-%20Selfmade.mp3",
          url: "https://www.youtube.com/watch?v=Kj6YfOLbB0I",
          favorited: false
        },
        {
          name: "DORE",
          artist: "Josman",
          cover: "https://rawcdn.githack.com/RICHECAR/COVER/1c25f8d5d5919f13a4485b532951406b17620e2a/264x264.jpeg",
          source: "https://rawcdn.githack.com/RICHECAR/MP3/23492b5987e93840b9f2350208eca322746f9643/Josman%20-%20Dore%CC%81.mp3",
          url: "https://www.youtube.com/watch?v=1YckOV8vWCk",
          favorited: true
        },
        {
          name: "DIE",
          artist: "GAZO",
          cover: "https://rawcdn.githack.com/RICHECAR/COVER/1c25f8d5d5919f13a4485b532951406b17620e2a/gazo.jpeg",
          source: "https://rawcdn.githack.com/RICHECAR/MP3/23492b5987e93840b9f2350208eca322746f9643/GAZO%20-%20DIE.mp3",
          url: "https://www.youtube.com/watch?v=AHAcwzQJS4M",
          favorited: false
        },
        {
          name: "SI J'SAVAIS ",
          artist: "TIAKOLA",
          cover: "https://rawcdn.githack.com/RICHECAR/COVER/1c25f8d5d5919f13a4485b532951406b17620e2a/Melo-Edition-1.jpeg",
          source: "https://rawcdn.githack.com/RICHECAR/MP3/23492b5987e93840b9f2350208eca322746f9643/Tiakola%20-%20Si%20j%E2%80%99savais.mp3",
          url: "https://www.youtube.com/watch?v=me6aoX0wCV8",
          favorited: true
        },
        {
          name: "17",
          artist: "LETO",
          cover: "https://rawcdn.githack.com/RICHECAR/COVER/1c25f8d5d5919f13a4485b532951406b17620e2a/100-visages-inclus-3-titres-exclusifs.jpeg",
          source: "https://rawcdn.githack.com/RICHECAR/MP3/eaa20ae83f6fe8e54822b8653cf4765107ff409a/Leto%20-%2017%%20(Clip%20officiel).mp3",
          url: "https://rawcdn.githack.com/RICHECAR/MP3/23492b5987e93840b9f2350208eca322746f9643/Leto%20-%2017%%20(Clip%20officiel).mp3",
          favorited: false
        },
        {
          name: "Entre les murs",
          artist: "DA UZI",
          cover: "https://rawcdn.githack.com/RICHECAR/COVER/1c25f8d5d5919f13a4485b532951406b17620e2a/Vrai-2-Vrai.jpeg",
          source: "https://rawcdn.githack.com/RICHECAR/MP3/eaa20ae83f6fe8e54822b8653cf4765107ff409a/DA%20Uzi%20-%20Entre%20les%20murs%20feat.%20Ninho%20(Clip%20officiel).mp3",
          url: "https://www.youtube.com/watch?v=j1h09U3EA18",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
