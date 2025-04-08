import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { CounterComponent } from '@shared/components/counter/counter.component';
import { HighlightDirective } from '@shared/directives/highlight.directive';
import { BehaviorSubject, delay, Subject } from 'rxjs';
import { WaveAudioComponent } from '../../components/wave-audio/wave-audio.component';

@Component({
  selector: 'app-about',
  imports: [
    CommonModule,
    CounterComponent,
    WaveAudioComponent,
    HighlightDirective,
    FormsModule,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutComponent {
  duration = signal(1000);
  messages = signal('Danniel');

  // observables convertir a signal
  //   Casos donde NO deberías usar toSignal()
  // Si el observable no tiene un valor inicial y no puedes definirlo correctamente.
  // Cuando necesitas operadores avanzados de RxJS como switchMap, mergeMap o combineLatest.
  // Cuando manejas streams de eventos intensivos, como WebRTC o sensores, ya que Signals no están optimizados para eventos de alto rendimiento.

  obsWithInit$ = new BehaviorSubject<string>('Initial value');
  $withInit = toSignal(this.obsWithInit$, {
    requireSync: true, // que sea sincrono
  });

  obsWithoutInit$ = new Subject<string>();
  $withoutInit = toSignal(this.obsWithoutInit$.pipe(delay(3000)), {
    initialValue: '>>>> Initial value',
  });

  changeDuration(event: Event) {
    const input = event.target as HTMLInputElement;
    this.duration = signal(Number(input.value));
  }

  changeMessages(event: Event) {
    const input = event.target as HTMLInputElement;
    this.messages = signal(input.value);
  }

  emitWithInit() {
    this.obsWithInit$.next('New value');
  }
  emitWithoutInit() {
    this.obsWithoutInit$.next('******');
  }
}
