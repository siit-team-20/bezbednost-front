import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AccommodationType} from "../../../shared/models/accommodation-type.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Accommodation} from "../../../shared/models/accommodation.model";
import {AmenityService} from "../../../shared/services/amenity.service";
import {Amenity} from "../../../shared/models/amenity.model";
import {AccommodationFilter} from "../../models/accommodationFilter.model";

@Component({
  selector: 'app-accommodation-filter',
  templateUrl: './accommodation-filter.component.html',
  styleUrls: ['./accommodation-filter.component.css']
})
export class AccommodationFilterComponent implements OnInit {
  protected readonly AccommodationType = AccommodationType;
  amenities?: Amenity[];
  priceForm: FormGroup;
  ratingForm: FormGroup;
  accommodationTypeForm: FormGroup;
  amenitiesForm: FormGroup;

  selectedFilterCount: number = 0;

  @Output() closeFilter: EventEmitter<void> = new EventEmitter<void>();
  @Output() applyFilter: EventEmitter<AccommodationFilter> = new EventEmitter<AccommodationFilter>();
  @Output() selectedFilterCountChanged: EventEmitter<number> = new EventEmitter<number>();
  constructor(private formBuilder: FormBuilder, private amenityService: AmenityService) {
    this.ratingForm = this.formBuilder.group({
      selectedRating: null,
    });

    this.accommodationTypeForm = this.formBuilder.group({
      Hotel: false,
      Hostel: false,
      BedAndBreakfast: false,
      Resort: false,
      Motel: false,
      Apartment: false,
      House: false,
      Room: false,
      Tent: false,
    });

    this.amenitiesForm = this.formBuilder.group({});

    this.priceForm = this.formBuilder.group({
      minPrice: [null, Validators.min(0)],  // Adding a validation for minimum value
      maxPrice: [null, Validators.min(0)],  // Adding a validation for minimum value
    });
  }

  ngOnInit(): void {
    this.amenityService.getAll().subscribe({
      next: (data: Amenity[]) => {
        this.amenities = data;

        const amenityFormControls: { [key: string]: FormControl } = {};
        if (this.amenities) {
          this.amenities.forEach((amenity) => {
            amenityFormControls[amenity.name as string] = this.formBuilder.control(false);
          });
        }

        this.amenitiesForm = this.formBuilder.group({
          ...amenityFormControls,
        });
      },
      error: (_) => {
        console.log('Error!');
      },
    });
  }

  getEnumValues(enumType: any): string[] {
    const enumValues: string[] = [];
    for (const key in enumType) {
      if (typeof enumType[key] === 'string') {
        enumValues.push(enumType[key]);
      }
    }
    return enumValues;
  }

  onCloseClick() {
    this.closeFilter.emit();
  }

  onClearClick() {
    this.priceForm.reset();
    this.ratingForm.reset();
    this.accommodationTypeForm.reset();
    this.amenitiesForm.reset();
    this.updateSelectedFilterCount();
  }

  onApplyClick() {
    const filter: AccommodationFilter = {
      minPrice: this.priceForm.get('minPrice')?.value,
      maxPrice: this.priceForm.get('maxPrice')?.value,
      amenities: this.getSelectedAmenities(),
      types: this.getSelectedAccommodationTypes(),
      minRating: this.ratingForm.get('selectedRating')?.value,
    };

    this.applyFilter.emit(filter);
    this.updateSelectedFilterCount();
    this.onCloseClick();
  }

  private updateSelectedFilterCount() {
    const amenitiesCount = Object.values(this.amenitiesForm.controls)
      .filter(control => control.value === true)
      .length;

    const accommodationTypeCount = Object.values(this.accommodationTypeForm.controls)
      .filter(control => control.value === true)
      .length;

    const priceCount = Object.values(this.priceForm.controls)
      .filter(control => control.value !== null && control.value !== undefined)
      .length;

    const ratingCount = this.ratingForm.get('selectedRating')?.value !== null ? 1 : 0;

    this.selectedFilterCount = amenitiesCount + accommodationTypeCount + priceCount + ratingCount;

    this.selectedFilterCountChanged.emit(this.selectedFilterCount);
  }

  getSelectedAccommodationTypes(): AccommodationType[] {
    return Object.keys(this.accommodationTypeForm.controls)
      .filter((key) => this.accommodationTypeForm.get(key)?.value)
      .map((key) => key as unknown as AccommodationType);
  }

  getSelectedAmenities(): string[] {
    return Object.keys(this.amenitiesForm.controls)
      .filter((key) => this.amenitiesForm.get(key)?.value)
      .map((key) => key);
  }


}


