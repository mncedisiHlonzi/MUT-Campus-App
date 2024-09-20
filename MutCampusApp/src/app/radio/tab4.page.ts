import { Component, ElementRef, OnInit, AfterViewInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit, AfterViewInit {
  @ViewChild('audioElement') audioElementRef!: ElementRef<HTMLAudioElement>;
  @ViewChildren('audioElement') audioElementRefs!: QueryList<ElementRef<HTMLAudioElement>>;
  private audioElement!: HTMLAudioElement;
  private _volume: number = 0.5;
  private _isMuted: boolean = false;
  currentTime: string = '00:00';
  isPlaying = false;
  radioUrl: string = 'https://edge.iono.fm/xice/153_medium.aac?ref=https%3A%2F%2Fiono.fm%2Fs%2F153&adToken=';

  get volume(): number {
    return this._volume;
  }

  set volume(value: number) {
    this._volume = value;
    if (this.audioElement) {
      this.audioElement.volume = this._volume;
    }
  }

  get isMuted(): boolean {
    return this._isMuted;
  }

  set isMuted(value: boolean) {
    this._isMuted = value;
    if (this.audioElement) {
      this.audioElement.muted = this._isMuted;
    }
  }

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.audioElementRef) {
      this.audioElement = this.audioElementRef.nativeElement;
      this.initAudio();
    }
  }

  initAudio(): void {
    if (this.audioElement) {
      this.audioElement.src = this.radioUrl;
      this.audioElement.volume = this._volume;
      this.audioElement.muted = this._isMuted;

      this.audioElement.addEventListener('timeupdate', () => {
        this.updateTime();
      });
      this.audioElement.addEventListener('canplay', () => {
        console.log('Audio can play');
      });
      this.audioElement.addEventListener('error', (event) => {
        console.error('Error event:', event);
      });
    }
  }

  play(): void {
    if (this.audioElement) {
      this.isPlaying = true;
      this.audioElement.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
  }

  pause(): void {
    if (this.audioElement) {
      this.isPlaying = false;
      this.audioElement.pause();
    }
  }

  togglePlayPause(): void {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  toggleMute(): void {
    this.isMuted = !this.isMuted;
    if (this.audioElement) {
      this.audioElement.muted = this.isMuted;
    }
  }

  volumeChange(event: CustomEvent): void {
    const value = (event.detail.value as number);
    this.volume = value;
  }

  updateTime(): void {
    if (this.audioElement) {
      const minutes = Math.floor(this.audioElement.currentTime / 60);
      const seconds = Math.floor(this.audioElement.currentTime % 60);
      this.currentTime = `${this.pad(minutes)}:${this.pad(seconds)}`;
    }
  }

  pad(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  seek(event: CustomEvent): void {
    const value = (event.detail.value as number);
    if (this.audioElement) {
      this.audioElement.currentTime = value;
    }
  }
}