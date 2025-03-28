import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { CounterComponent } from '@shared/components/counter/counter.component';
import { WaveAudioComponent } from '../../components/wave-audio/wave-audio.component';

@Component({
  selector: 'app-about',
  imports: [CommonModule, CounterComponent, WaveAudioComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export default class AboutComponent {
  duration = signal(1000);
  messages = signal('Danniel');

  changeDuration(event: Event) {
    const input = event.target as HTMLInputElement;
    this.duration = signal(Number(input.value));
  }

  changeMessages(event: Event) {
    const input = event.target as HTMLInputElement;
    this.messages = signal(input.value);
  }
}
