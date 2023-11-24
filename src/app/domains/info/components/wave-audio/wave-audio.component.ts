import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild, signal } from '@angular/core';

import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-wave-audio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wave-audio.component.html',
  styleUrl: './wave-audio.component.css',
})
export class WaveAudioComponent {
  @Input({ required: true }) url!: string;
  @ViewChild('wave') waveform!: ElementRef;
  private ws!: WaveSurfer;
  isPlaying= signal(false); // signal is a function that returns a signal

  ngAfterViewInit() {
    this.ws = WaveSurfer.create({
      url: this.url,
      container: this.waveform.nativeElement,
    });
    this.ws.on('play', () => this.isPlaying = signal(true));
    this.ws.on('pause', () => (this.isPlaying = signal(false)));
  }

  playPause() {
    this.ws.playPause();
  }
}
