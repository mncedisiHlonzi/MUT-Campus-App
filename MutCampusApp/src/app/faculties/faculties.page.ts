import { Component } from '@angular/core';

@Component({
  selector: 'app-faculties',
  templateUrl: './faculties.page.html',
  styleUrls: ['./faculties.page.scss'],
})
export class FacultiesPage {

  // State for managing which faculties are expanded
  showMoreState: { [key: string]: boolean } = {
    engineering: false,
    management: false,
    naturalSciences: false
  };

  // Toggle the state for each faculty
  toggleShowMore(event: Event, faculty: string) {
    event.preventDefault();  // Prevent the default anchor behavior
    this.showMoreState[faculty] = !this.showMoreState[faculty];
  }
}
