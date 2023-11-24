import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';

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
  }

  ngOnInit() {
    // after rendering
    // una vez
    // async code here
    console.log('ngOnInit');
    console.log('duration ',this.duration);
    console.log('message', this.messagges);
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
  }
}
