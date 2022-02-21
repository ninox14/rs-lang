import CorrectSound from 'assets/audio/correct.mp3';
import WrongSound from 'assets/audio/wrong.mp3';
import { baseURL } from 'api/http';

// usage:
// const player = AudioPlayer.getInstance();
// player.playSound(url: string);

export default class AudioPlayer {
  private static instance: AudioPlayer;

  playlist: string[];

  audio: HTMLAudioElement;

  currentIndex: number;

  currentPage: string | null;

  correctAudio: HTMLAudioElement;

  wrongAudio: HTMLAudioElement;

  constructor() {
    this.playlist = [];
    this.audio = new Audio();
    this.currentIndex = 0;
    this.currentPage = null;
    this.correctAudio = new Audio(CorrectSound);
    this.wrongAudio = new Audio(WrongSound);
  }

  playCorrect() {
    if (this.audio) {
      this.audio.pause();
    }
    this.correctAudio.play();
  }

  playWrong() {
    if (this.audio) {
      this.audio.pause();
    }
    this.wrongAudio.play();
  }

  playSound(url: string) {
    // if (this.audio) {
    //   this.audio.pause();
    // }
    this.audio.src = `${baseURL}/${url}`;
    this.audio.play();
  }

  stopAudio() {
    if (this.audio) {
      this.audio.pause();
    }
  }

  updatePlaylist = (url: string[]) => {
    if (this.audio) {
      this.audio.pause();
    }
    this.currentIndex = 0;
    this.playlist = url.map((el) => `${baseURL}/${el}`);
  };

  startPlaylist() {
    if (this.currentIndex < this.playlist.length) {
      this.audio.src = this.playlist[this.currentIndex];
      this.audio.onended = () => {
        this.currentIndex += 1;
        this.startPlaylist();
      };
      this.audio.play();
    } else {
      this.currentIndex = 0;
      return;
    }
  }

  static getInstance(): AudioPlayer {
    AudioPlayer.instance = AudioPlayer.instance || new AudioPlayer();
    return AudioPlayer.instance;
  }
}
