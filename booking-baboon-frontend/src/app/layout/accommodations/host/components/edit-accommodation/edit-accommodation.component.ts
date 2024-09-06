import {Component, ElementRef, ViewChild} from '@angular/core';
import {Amenity} from "../../../shared/models/amenity.model";
import {Observable} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {AvailablePeriod} from "../../../shared/models/available-period.model";
import {AccommodationType} from "../../../shared/models/accommodation-type.model";
import {AmenityService} from "../../../shared/services/amenity.service";
import {AuthService} from "../../../../../infrastructure/auth/auth.service";
import {AccommodationService} from "../../../shared/services/accommodation.service";
import {ImageService} from "../../../../../shared/images/image.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DateValidators} from "../../validators/date-validators";
import {map, startWith} from "rxjs/operators";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {Accommodation} from "../../../shared/models/accommodation.model";
import {ImageResponse} from "../../../../../shared/images/imageResponse.model";

import {AccommodationModificationService} from "../../../modification/accommodation-modification.service";
import {AccommodationModificationRequest} from "../../../modification/model/accommodation-modification-request.model";
import {AccommodationModificationType} from "../../../modification/model/accommodation-modification-type";
import {AccommodationModification} from "../../../modification/model/accommodation-modification.model";


@Component({
  selector: 'app-edit-accommodation',
  templateUrl: './edit-accommodation.component.html',
  styleUrls: ['./edit-accommodation.component.css']
})
export class EditAccommodationComponent {
  public accommodation!: Accommodation;
  public amenities!: Amenity[];
  public amenitiesObservable!: Observable<Amenity[]>;
  public selectedAmenities: Amenity[] = [];
  public selectorFormControl: FormControl = new FormControl();
  @ViewChild('amenityInput') amenityInput!: ElementRef<HTMLInputElement>;

  separatorKeysCodes: number[] = [ENTER, COMMA];


  urls: string[] = [];
  imageList: File[] = [];
  oldImages: File[] = [];

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
  });

  constructor(private accommodationModificationService: AccommodationModificationService, private route: ActivatedRoute, private amenityService: AmenityService, private authService:AuthService, private accommodationService:AccommodationService, private imageService:ImageService, private router: Router, private validators: DateValidators) {
  }

  public periodForm: FormGroup = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
    price: new FormControl('',[Validators.min(1),Validators.required]),
    isPricingPerPerson: new FormControl(false)
  },{validators: [this.validators.validateDateRange('startDate', 'endDate'), this.validators.futureDateValidator('startDate'), this.validators.overlappingDatesValidator('startDate','endDate', this.availablePeriods)]})




  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      const id = +params['accommodationId'];

      this.accommodationService.getAccommodation(id).subscribe({
        next: (data: Accommodation) => {
          this.accommodation = data;
          this.loadForm();
          this.loadAvailablePeriods();
          this.loadAmenities();
          this.loadImages();
        },
        error: (_) => {console.log("Error"); }
      })
    });

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

  loadForm(): void {
    if (this.accommodationForm) {
      this.accommodationForm.get('name')?.setValue(this.accommodation.name);
      this.accommodationForm.get('country')?.setValue(this.accommodation.location?.country);
      this.accommodationForm.get('city')?.setValue(this.accommodation.location?.city);
      this.accommodationForm.get('address')?.setValue(this.accommodation.location?.address);
      this.accommodationForm.get('description')?.setValue(this.accommodation.description);
      this.accommodationForm.get('minGuests')?.setValue(this.accommodation.minGuests);
      this.accommodationForm.get('maxGuests')?.setValue(this.accommodation.maxGuests);
      this.accommodationForm.get('type')?.setValue(this.accommodation.type);
      this.periodForm.get('isPricingPerPerson')?.setValue(this.accommodation.isPricingPerPerson);
    }
  }
  loadAvailablePeriods(): void {
    if (this.accommodation.availablePeriods) {
      this.availablePeriods = this.accommodation.availablePeriods;
    }
  }

  loadAmenities(): void {
    if (this.accommodation.amenities) {
      this.selectedAmenities = this.accommodation.amenities;
      console.log(this.accommodation.amenities);
    }
  }

  loadImages(): void {
    if (this.accommodation.images) {
      this.accommodation.images.forEach((imageResponse: ImageResponse) => {
        this.imageService.getImage(imageResponse.id).subscribe({
          next: (imageData: Blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(imageData);
            reader.onloadend = () => {
              const dataUrl = reader.result as string;
              this.urls.push(dataUrl);

              if (imageResponse.id != undefined) {
                const file = new File([imageData], imageResponse.id.toString() + ".jpg");
                this.imageList.push(file);
                this.oldImages.push(file);
              }
            };
          },
          error: (error) => {
            console.error('Error fetching image:', error);
          },
        });
      });
    }
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
  editAccommodation() {
    if(!this.accommodationForm.valid) return;
    this.accommodation.isBeingEdited = true;
    if (this.accommodation.id) {
      this.accommodationService.updateEditingStatus(this.accommodation.id, true).subscribe({
        next(accommodation: Accommodation) {
          console.log("isBeingEdited = true");
        }, error(error) {
          console.log("an error occured");
        }
      });
    }
    const accommodationModification: AccommodationModificationRequest = {
      accommodation: {id: this.accommodation.id},
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
/*      requestDate: new Date(),*/
      requestType: AccommodationModificationType.Edited,
    }
    const images = this.imageList;
    console.log(this.imageList);
    console.log(this.urls);
    const accommodationService :AccommodationService = this.accommodationService;
    const accommodationModificationService :AccommodationModificationService = this.accommodationModificationService;
    const imageService = this.imageService;
    const periods =this.availablePeriods;
    const router = this.router;
    let id: number
/*
    this.imageList = images.filter(image => !this.oldImages.includes(image));
*/
    this.accommodationModificationService.create(accommodationModification).subscribe({
      next(data: AccommodationModification){
        if(data.id) id = data.id;
        if(!id) return;
        for (const period of periods) {
          accommodationService.createPeriod(period).subscribe({
            next(data: AvailablePeriod){
              accommodationModificationService.addPeriod(id,data.id).subscribe()
            },
            error(error) {
              console.log("Period error occured");
            }
          })
        }

        for (const image of images) {
          const formData: FormData = new FormData();
          formData.append('path', "accommodation-modifications/" + id.toString());
          formData.append('fileName', image.name);
          formData.append('content', image);
          imageService.create(formData).subscribe({
            next(data: ImageResponse){
              if(!data.id)return
              imageService.addToAccommodationModification(id,data.id).subscribe()
            }

          })
        }
        router.navigate(['/host/accommodations'])
      }
    })


  }
}
