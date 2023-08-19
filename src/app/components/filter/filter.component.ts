import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/Product';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  @Input() activeClass: boolean;
  @Input() data: string[] = [];
  @Output() filterDataSelect = new EventEmitter();

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  filterData(event: Event) {
    this.filterDataSelect.emit(event);
  }
}
