import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'skdsm-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.styl']
})
export class ChipComponent {
  @Input() text: string;
  @Input() payload: Object;
  @Output() close = new EventEmitter();
}
