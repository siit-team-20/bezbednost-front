import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Amenity} from '../../../shared/models/amenity.model';
import {AmenityService} from '../../../shared/services/amenity.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {map, startWith} from 'rxjs/operators';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Observable} from "rxjs";
import {AccommodationType} from "../../../shared/models/accommodation-type.model";
import {AvailablePeriod} from "../../../shared/models/available-period.model";
import {Accommodation} from "../../../shared/models/accommodation.model";
import {AuthService} from "../../../../../infrastructure/auth/auth.service";
import {AccommodationService} from "../../../shared/services/accommodation.service";
import {Image} from "../../../../../shared/images/image.model";
import {ImageService} from "../../../../../shared/images/image.service";
import {ImageResponse} from "../../../../../shared/images/imageResponse.model";
import {Router} from "@angular/router";
import {DateValidators} from "../../validators/date-validators";
@Component({
  selector: 'app-accommodation-creation',
  templateUrl: './accommodation-creation.component.html',
  styleUrls: ['./accommodation-creation.component.css'],
})
export class AccommodationCreationComponent implements OnInit {
  public amenities!: Amenity[];
  public amenitiesObservable!: Observable<Amenity[]>;
  public selectedAmenities: Amenity[] = [];
  public selectorFormControl: FormControl = new FormControl();
  @ViewChild('amenityInput') amenityInput!: ElementRef<HTMLInputElement>;

  separatorKeysCodes: number[] = [ENTER, COMMA];


  urls: string[] = [];
  imageList: File[] = [];

  availablePeriods: AvailablePeriod[] = [];

  accommodationTypes = Object.values(AccommodationType).filter(key => isNaN(Number(key)));


  public accommodationForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    minGuests: new FormControl(1,[Validators.min(1),Validators.required]),
    maxGuests: new FormControl(1,[Validators.min(1),Validators.required]),
    type: new FormControl(AccommodationType.Hotel,Validators.required),
    cancelDeadline: new FormControl(1,[Validators.min(1),Validators.required]),
  });

  constructor(private amenityService: AmenityService, private authService:AuthService, private accommodationService:AccommodationService, private imageService:ImageService, private router: Router, private validators: DateValidators) {
  }

  public periodForm: FormGroup = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
    price: new FormControl('',[Validators.min(1),Validators.required]),
    isPricingPerPerson: new FormControl(false)
  },{validators: [this.validators.validateDateRange('startDate', 'endDate'), this.validators.futureDateValidator('startDate'), this.validators.overlappingDatesValidator('startDate','endDate', this.availablePeriods)]})




  ngOnInit(): void {
    this.amenityService.getAll().subscribe({
      next: (data: Amenity[]) => {
        this.amenities = data;
        this.amenitiesObservable = this.selectorFormControl.valueChanges.pipe(
          startWith(null),
          map((value: string) => (value ? this.filter(value) : this.amenities.slice()))
        );
      },
      error: (error) => {
        console.error('Error fetching amenities:', error);
      },
    });
  }

  ngAfterViewInit() {
    console.log('Amenity Input:', this.amenityInput);
  }

  private filter(value: string): Amenity[] {
    const filterValue = value.toLowerCase();
    return this.amenities.filter((amenity) => amenity.name && amenity.name.toLowerCase().includes(filterValue));
  }

  copyAmenityByName(amenityName: string): Amenity | undefined {
    const foundAmenity = this.amenities.find((amenity) => amenity.name === amenityName);

    if (foundAmenity) {
      return { ...foundAmenity };
    }

    return undefined;
  }
  add(event: MatChipInputEvent): void {
    const value: string = (event.value || '').trim();

    const isDuplicate = this.selectedAmenities.some(
      (amenity) => amenity && amenity.name === value
    );


    if (!isDuplicate) {
      let amenity: Amenity|undefined = this.copyAmenityByName(value)
      if(amenity != undefined){
        this.selectedAmenities.push(amenity);
      }
      event.chipInput!.clear();
      this.selectorFormControl.setValue(null);
    }
  }

  remove(amenity: Amenity): void {
    const index = this.selectedAmenities.indexOf(amenity);

    if (index >= 0) {
      this.selectedAmenities.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const selectedAmenity: Amenity|undefined = this.copyAmenityByName(event.option.viewValue);
    if(selectedAmenity!=undefined){
      const isDuplicate = this.selectedAmenities.some(
        (amenity) => amenity && amenity.name === selectedAmenity.name
      );
      if (!isDuplicate){
        this.selectedAmenities.push(selectedAmenity);
      }
    }


    this.amenityInput.nativeElement.value = '';
    this.selectorFormControl.setValue(null);
  }

  onselect(event: any){
    const files: FileList | null = event.target.files;
    if(files){
      for(let i=0; i< files.length; i++){
        this.imageList.push(files[i]);
        let reader: FileReader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload=(events:any)=>{
          this.urls.push(events.target.result as string);
        }
      }
    }
  }

  removeImage(url: string) {
    const index = this.urls.indexOf(url);

    if (index >= 0) {
      this.urls.splice(index, 1);
      this.imageList.splice(index, 1);
    }
  }



  addAvailablePeriod(): void {
    if (this.periodForm.valid) {
      const newPeriod = {
        timeSlot: {
          startDate: this.periodForm.value.startDate.toString(),
          endDate: this.periodForm.value.endDate.toString()
        },
        pricePerNight: this.periodForm.value.price
      };
      this.availablePeriods.push({...newPeriod});
      this.periodForm.get('startDate')?.reset()
      this.periodForm.get('endDate')?.reset()
    }
  }

  removeAvailablePeriod(index: number): void {
    this.availablePeriods.splice(index, 1);
  }

  createAccommodation() {
    if(!this.accommodationForm.valid) return;
    const accommodation: Accommodation = {
      name: this.accommodationForm.value.name,
      description: this.accommodationForm.value.description,
      host: {id: this.authService.getId()},
      location: {
        country: this.accommodationForm.value.country,
        city: this.accommodationForm.value.city,
        address: this.accommodationForm.value.address
      },
      availablePeriods: [],
      amenities: this.selectedAmenities.map(amenity => ({ id: amenity.id })),
      minGuests: this.accommodationForm.value.minGuests,
      maxGuests: this.accommodationForm.value.maxGuests,
      isPricingPerPerson: this.periodForm.value.isPricingPerPerson,
      type: this.accommodationForm.value.type,
      isAutomaticallyAccepted: false,
      cancellationDeadline: this.accommodationForm.value.cancelDeadline
      }
    const images = this.imageList;
    const accommodationService :AccommodationService = this.accommodationService;
    const service = this.imageService;
    const periods =this.availablePeriods;
    const router = this.router;
    this.accommodationService.create(accommodation).subscribe({
      next(data: Accommodation){
        const id = data.id;
        if(!id) return;
        for (const period of periods) {
          accommodationService.createPeriod(period).subscribe({
            next(data: AvailablePeriod){
              accommodationService.addPeriod(id,data.id).subscribe()
            }
          })
        }
        for (const image of images) {
          const formData: FormData = new FormData();
          formData.append('path', "accommodations/" + id.toString());
          formData.append('fileName', image.name);
          formData.append('content', image);
          service.create(formData).subscribe({
            next(data: ImageResponse){
              if(!data.id)return
              service.addToAccommodation(id,data.id).subscribe()
            }

          })
        }
        router.navigate(['/host/accommodations'])
      }
    })

  }
}
