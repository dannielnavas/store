import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  afterNextRender,
  computed,
  effect,
  input,
  model,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent implements OnInit, AfterViewInit, OnDestroy {
  $duration = input.required<number>({ alias: 'duration' });
  $dobleDuration = computed(() => this.$duration() * 2);
  $messages = model.required<string>({ alias: 'messages' });
  // $newMessages = linkedSignal(() => this.$messages());

  $counter = signal(0);
  counterRef: number | null = null;

  constructor() {
    // No async code here
    // before rendering
    console.log('constructor');
    console.log('-'.repeat(50));
    // vigila el signal de duration
    effect(() => {
      this.$duration();
      this.doSomething();
    });
    // vigila el signal de messages
    effect(() => {
      this.$messages();
      this.doSomethingTwo();
    });

    afterNextRender(() => {
      // corre todo después de renderizar	 cuando ya esta del lado del cliente
      this.counterRef = window.setInterval(() => {
        console.log('counter', this.$counter);
        this.$counter.update((statePrev: number) => statePrev + 1);
      }, this.$duration());
    });
  }

  // es un solo método para leer todos los valors
  // ngOnChanges(changes: SimpleChanges) {
  //   // before and during rendering
  //   console.log('ngOnChanges');
  //   console.log(changes);
  //   console.log('-'.repeat(50));

  //   const duration = changes['duration'];
  //   console.log('duration', duration);
  //   // if (!duration) return;
  //   // this.doSomething();

  //   if (duration && duration.currentValue !== duration.previousValue) {
  //     this.doSomething();
  //   }
  // }

  ngOnInit() {
    // after rendering
    // una vez
    // async code here
    console.log('ngOnInit');
    console.log('duration ', this.$duration());
    console.log('message', this.$messages());
    console.log('-'.repeat(50));
  }

  ngAfterViewInit() {
    // after rendering
    // Cuando los hijos se renderizan
    console.log('ngAfterViewInit');
    console.log('-'.repeat(50));
  }

  ngOnDestroy() {
    // before destroy
    // async code here
    console.log('ngOnDestroy');
    console.log('-'.repeat(50));
    if (this.counterRef) {
      window.clearInterval(this.counterRef);
    }
  }

  doSomething() {
    console.log('doSomething');
    console.log('-'.repeat(50));
  }

  doSomethingTwo() {
    console.log('Message');
    console.log('-'.repeat(50));
  }

  setMessages() {
    this.$messages.set('Hola');
  }
}
