import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-star-rating-input',
  templateUrl: './star-rating-input.component.html',
  styleUrls: ['./star-rating-input.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class StarRatingInputComponent implements OnInit{
  @Input('rating') public rating: number = 3;
  @Input('starCount') public starCount: number = 5;
  @Output() public ratingUpdated = new EventEmitter();
  public ratings: number[] = [];



  ngOnInit() {
    console.log("a "+this.starCount)
    for (let index = 0; index < this.starCount; index++) {
      this.ratings.push(index);
    }
  }
  onClick(rating:number) {
    console.log(rating)
    this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
}

