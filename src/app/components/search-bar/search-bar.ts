import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.html',
})
export class SearchBar {
  city = '';

  @Input()
  darkMode = false;

  @Output()
  citySearch = new EventEmitter<string>();

  search() {
    this.citySearch.emit(this.city);
  }
}
