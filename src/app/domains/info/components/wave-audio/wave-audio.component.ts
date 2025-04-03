import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
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
})
export class WaveAudioComponent implements AfterViewInit {
  readonly url = input.required<string>();
  // @ViewChild('wave') waveform!: ElementRef
  $waveContainerRef = viewChild.required<ElementRef<HTMLDivElement>>('wave');
  private ws!: WaveSurfer;
  isPlaying = signal(false); // signal is a function that returns a signal

  ngAfterViewInit() {
    this.ws = WaveSurfer.create({
      url: this.url(),
      // container: this.waveform.nativeElement,
      container: this.$waveContainerRef().nativeElement,
    });
    this.ws.on('play', () => (this.isPlaying = signal(true)));
    this.ws.on('pause', () => (this.isPlaying = signal(false)));
  }

  playPause() {
    this.ws.playPause();
  }
}
