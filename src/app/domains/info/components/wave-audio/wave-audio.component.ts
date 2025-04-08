import { CommonModule } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  signal,
  viewChild,
} from '@angular/core';

import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-wave-audio',
  imports: [CommonModule],
  templateUrl: './wave-audio.component.html',
  styleUrl: './wave-audio.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WaveAudioComponent {
  readonly url = input.required<string>();
  // @ViewChild('wave') waveform!: ElementRef
  $waveContainerRef = viewChild.required<ElementRef<HTMLDivElement>>('wave');
  private ws!: WaveSurfer;
  isPlaying = signal(false); // signal is a function that returns a signal

  constructor() {
    afterNextRender(() => {
      this.ws = WaveSurfer.create({
        url: this.url(),
        // container: this.waveform.nativeElement,
        container: this.$waveContainerRef().nativeElement,
      });
      this.ws.on('play', () => (this.isPlaying = signal(true)));
      this.ws.on('pause', () => (this.isPlaying = signal(false)));
    });
  }
  // se pasa al afterNextRender para que se ejecute después de renderizar esto en ssr
  // ngAfterViewInit() {
  //   this.ws = WaveSurfer.create({
  //     url: this.url(),
  //     // container: this.waveform.nativeElement,
  //     container: this.$waveContainerRef().nativeElement,
  //   });
  //   this.ws.on('play', () => (this.isPlaying = signal(true)));
  //   this.ws.on('pause', () => (this.isPlaying = signal(false)));
  // }

  playPause() {
    this.ws.playPause();
  }
}
