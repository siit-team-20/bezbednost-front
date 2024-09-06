import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDatepicker } from "@angular/material/datepicker";
import { AccommodationService } from "../../../shared/services/accommodation.service";
import { AccommodationFilter } from "../../models/accommodationFilter.model";

@Component({
  selector: 'app-accommodations-search-bar',
  templateUrl: './accommodations-search-bar.component.html',
  styleUrls: ['./accommodations-search-bar.component.css']
})
export class AccommodationsSearchBarComponent implements OnInit {

  constructor(private fb: FormBuilder, private accommodationService: AccommodationService) {}

  searchForm: FormGroup = this.fb.group({
    city: [''],
    checkin: [''],
    checkout: [''],
    guestNum: ['']
  });

  isFilterShowing: boolean = false;
  selectedFilterCount: number = 0;

  ngOnInit(): void {}

  @Output()
  searchClicked: EventEmitter<AccommodationFilter> = new EventEmitter<AccommodationFilter>();


  onResetClick() {
    this.searchForm.reset();
  }

  onFilterButtonClick() {
    this.isFilterShowing = !this.isFilterShowing;
  }

  onCloseFilter() {
    this.isFilterShowing = false;
  }

  onFilterCountChanged(num: number) {
    this.selectedFilterCount = num;
  }

  onSubmitClick() {
    if (this.searchForm.valid) {
      const searchFilter = this.collectSearchFormData();
      this.searchClicked.emit(searchFilter);
    }
  }

  onApplyFilter(filter: AccommodationFilter) {
    if (this.searchForm.valid) {
      const searchFilter = this.collectSearchFormData();
      const mergedFilter: AccommodationFilter = {
        ...searchFilter,
        minPrice: filter.minPrice,
        maxPrice: filter.maxPrice,
        amenities: filter.amenities,
        types: filter.types,
        minRating: filter.minRating,
      };

      this.searchClicked.emit(mergedFilter);
      console.log(mergedFilter);
    }
  }

  private collectSearchFormData(): AccommodationFilter {
    const searchFilter: AccommodationFilter = {};

    const cityValue = this.searchForm.get('city')?.value;
    if (cityValue !== null && cityValue !== undefined) {
      searchFilter.city = cityValue;
    }

    const checkinValue = this.searchForm.get('checkin')?.value;
    if (checkinValue !== null && checkinValue !== undefined) {
      searchFilter.checkin = this.getDateISOString(checkinValue);
    }

    const checkoutValue = this.searchForm.get('checkout')?.value;
    if (checkoutValue !== null && checkoutValue !== undefined) {
      searchFilter.checkout = this.getDateISOString(checkoutValue);
    }

    const guestNumValue = parseInt(this.searchForm.get('guestNum')?.value, 10);
    if (!isNaN(guestNumValue)) {
      searchFilter.guestNum = guestNumValue;
    }

    return searchFilter;
  }
  private getDateISOString(date: Date | null | undefined): string | null {
    return date ? date.toISOString().split('T')[0] : null;
  }
}
