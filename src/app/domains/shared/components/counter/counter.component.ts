import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent {
  @Input({ required: true }) duration: number = 0;
  @Input({ required: true }) messagges: string = '';
  counter = signal(0);
  counterRef: number |
    undefined;

  constructor() {
    // No async code here
    // before rendering
    console.log('constructor');
    console.log('-'.repeat(50));
  }

  ngOnChanges(changes: SimpleChanges) {
    // before and during rendering
    console.log('ngOnChanges');
    console.log(changes);
    console.log('-'.repeat(50));

    const duration = changes['duration'];
    console.log('duration', duration);
    // if (!duration) return;
    // this.doSomething();

    if(duration && duration.currentValue !== duration.previousValue) {
      this.doSomething();
    }
  }

  ngOnInit() {
    // after rendering
    // una vez
    // async code here
    console.log('ngOnInit');
    console.log('duration ',this.duration);
    console.log('message', this.messagges);
    console.log('-'.repeat(50));

    this.counterRef = setInterval(() => {
      console.log('counter', this.counter);
      this.counter.update((statePrev: number) => statePrev + 1);
    }
    , this.duration);
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
}
