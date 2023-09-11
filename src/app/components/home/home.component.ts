import { Component, Input, OnInit } from '@angular/core';
import { CommunationService } from 'src/app/shared/services/communation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private service: CommunationService) {}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  // loader: boolean = this.service.loadingSpinner;
  // loader: boolean = false;

  // showNavigationArrows = false;
  // showNavigationIndicators = false;
  // images = [1055, 194, 368].map((n) => `https://picsum.photos/id/${n}/900/500`);

  // constructor(config: NgbCarouselConfig) {
  // 	// customize default values of carousels used by this component tree
  // 	config.showNavigationArrows = true;
  // 	config.showNavigationIndicators = true;
  // }
}
