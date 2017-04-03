import * as moment from 'moment';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'skdsm-dropdown-datepicker',
  templateUrl: './dropdown-datepicker.component.html',
  styleUrls: ['./dropdown-datepicker.component.styl']
})
export class DropdownDatepickerComponent implements OnInit {
  @Input() placeholder = 'Дата';
  minDate = new Date;
  @Output() selected = new EventEmitter();
  currentDateStr = '';

  constructor() { }

  ngOnInit() {
  }

  selectionDone(date) {
    const dateMoment = moment(date);
    this.selected.emit(dateMoment);
    this.currentDateStr = dateMoment.format('LL');
  }
}
