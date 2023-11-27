import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { CounterComponent } from '@shared/components/counter/counter.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { HighlightDirective } from '@shared/directives/highlight.directive';
import { WaveAudioComponent } from '../../components/wave-audio/wave-audio.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    CounterComponent,
    WaveAudioComponent,
    HighlightDirective,
    HeaderComponent,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  duration = signal(1000);
  messagges = signal('Danniel');

  changeDuration(event: Event) {
    const input = event.target as HTMLInputElement;
    this.duration = signal(Number(input.value));
  }

  changeMessagges(event: Event) {
    const input = event.target as HTMLInputElement;
    this.messagges = signal(input.value);
  }
}
