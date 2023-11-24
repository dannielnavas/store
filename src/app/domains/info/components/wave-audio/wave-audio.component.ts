import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-wave-audio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wave-audio.component.html',
  styleUrl: './wave-audio.component.css'
})
export class WaveAudioComponent {
  @Input({ required: true }) url!: string;
  @ViewChild('waveform') waveform!: ElementRef;

  ngAfterViewInit() {
    WaveSurfer.create({
      url: this.url,
      container: this.waveform.nativeElement,
    })
  }
}
