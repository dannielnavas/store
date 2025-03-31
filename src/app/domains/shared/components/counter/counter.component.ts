import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  computed,
  effect,
  input,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent implements OnInit, AfterViewInit, OnDestroy {
  duration = input.required<number>();
  dobleDuration = computed(() => this.duration() * 2);
  messages = input.required<string>();
  counter = signal(0);
  counterRef: number | undefined;

  constructor() {
    // No async code here
    // before rendering
    console.log('constructor');
    console.log('-'.repeat(50));
    // vigila el signal de duration
    effect(() => {
      this.duration();
      this.doSomething();
    });
    // vigila el signal de messages
    effect(() => {
      this.messages();
      this.doSomethingTwo();
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
    console.log('duration ', this.duration());
    console.log('message', this.messages());
    console.log('-'.repeat(50));

    this.counterRef = setInterval(() => {
      console.log('counter', this.counter);
      this.counter.update((statePrev: number) => statePrev + 1);
    }, this.duration());
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
    clearInterval(this.counterRef);
  }

  doSomething() {
    console.log('doSomething');
    console.log('-'.repeat(50));
  }

  doSomethingTwo() {
    console.log('Message');
    console.log('-'.repeat(50));
  }
}
