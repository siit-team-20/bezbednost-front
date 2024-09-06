import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AccommodationCreationComponent} from "../accommodation-creation/accommodation-creation.component";
import {AvailablePeriod} from "../../../shared/models/available-period.model";
import {AccommodationService} from "../../../shared/services/accommodation.service";
import {Accommodation} from "../../../shared/models/accommodation.model";
import {DateValidators} from "../../validators/date-validators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-accommodation-available-period',
  templateUrl: './accommodation-available-period.component.html',
  styleUrls: ['./accommodation-available-period.component.css']
})
export class AccommodationAvailablePeriodComponent implements OnInit{

  @Input() public accommodationId!: number;

  availablePeriods: AvailablePeriod[] = [];

  selectedPeriod!: AvailablePeriod;

  removedPeriods: number[] = [];

  constructor(private validators:DateValidators, private accommodationService: AccommodationService, private router: Router) {

  }

  ngOnInit(){
    if(!this.accommodationId) return
    this.accommodationService.getAccommodation(this.accommodationId).subscribe({
      next:(data: Accommodation) =>{
        if(data.availablePeriods)
        this.availablePeriods = data.availablePeriods;
        if (data.cancellationDeadline){
          this.cancelForm.get("cancelDeadline")?.setValue(data.cancellationDeadline)
        }

      }
    });
  }



  public periodForm: FormGroup = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
    price: new FormControl('',[Validators.min(1),Validators.required]),
  },{validators: [this.validators.validateDateRange('startDate', 'endDate'), this.validators.futureDateValidator('startDate'), this.validators.overlappingDatesValidator('startDate','endDate',this.availablePeriods)]})
  public editPeriodForm: FormGroup = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
    price: new FormControl('',[Validators.min(1),Validators.required]),
  },{validators: [this.validators.validateDateRange('startDate', 'endDate'), this.validators.futureDateValidator('startDate'), this.overlappingDatesValidator('startDate','endDate')]})
  public cancelForm: FormGroup = new FormGroup({
    cancelDeadline: new FormControl('',[Validators.min(1),Validators.required])
  })

  public overlappingDatesValidator(startControlName: string, endControlName: string): ValidatorFn {
    return (abstractControl: AbstractControl): ValidationErrors | null => {
      const startDate = abstractControl.get(startControlName);
      const endDate = abstractControl.get(endControlName);

      if (startDate && endDate) {
        const overlap = this.availablePeriods.some(period => period.id != this.selectedPeriod.id && this.validators.isDateRangeOverlapping(startDate.value, endDate.value, period));
        if (overlap){
          const error = {confirmedValidator: 'Dates are not valid.'};
          startDate.setErrors(error)
          return error;
        }
        return null;
      }

      return null;
    };
  }
  addAvailablePeriod(): void {
    if (this.periodForm.valid) {

      const newPeriod = {
        timeSlot: {
          startDate: new Date(this.periodForm.value.startDate.setMilliseconds(this.periodForm.value.startDate.getMilliseconds()+82800000 )) .toString(),
          endDate: new Date(this.periodForm.value.startDate.setMilliseconds(this.periodForm.value.endDate.getMilliseconds()+82800000 )) .toString()
        },
        pricePerNight: this.periodForm.value.price
      };
      this.availablePeriods.push({...newPeriod});
      this.periodForm.get('startDate')?.reset()
      this.periodForm.get('endDate')?.reset()
      console.log(newPeriod);
    }

  }

  removeAvailablePeriod(index: number): void {
    if(this.availablePeriods[index].id!=undefined) {
      this.removedPeriods.push(<number>this.availablePeriods[index].id)
    }
    this.availablePeriods.splice(index, 1);
  }


  updatePeriods() {
    if (!this.cancelForm.valid) return;
    for (const removedPeriod of this.removedPeriods) {
      this.accommodationService.removePeriod(this.accommodationId,removedPeriod).subscribe();
    }
    for (const period of this.availablePeriods) {
      if(period.id){
        this.accommodationService.editAvailablePeriod(period).subscribe();
      }else{
          this.accommodationService.createPeriod(period).subscribe({
            next: (data: AvailablePeriod) => {
              this.accommodationService.addPeriod(this.accommodationId, data.id).subscribe()
            }

          });

      }
    }
    this.accommodationService.updateCancellationDeadline(this.accommodationId ,this.cancelForm.get("cancelDeadline")?.value).subscribe();
    this.router.navigate(['/host/accommodations'])
  }

  edit(period: AvailablePeriod) {
    this.selectedPeriod = period
    if (period.timeSlot?.startDate && period.timeSlot?.endDate){
      this.editPeriodForm.setValue({startDate: new Date(period.timeSlot.startDate), endDate: new Date(period.timeSlot.endDate), price: period.pricePerNight})
    }

  }

  editAvailablePeriod() {
    if(this.editPeriodForm.valid) {
      let startDate:Date = new Date(this.editPeriodForm.get('startDate')?.value)
      let endDate:Date = new Date(this.editPeriodForm.get('endDate')?.value)
      startDate.setMilliseconds(startDate.getMilliseconds() + 82800000)
      endDate.setMilliseconds(endDate.getMilliseconds() + 82800000)
      const period = this.availablePeriods.find(obj => obj.id === this.selectedPeriod.id);
      if(period && period.timeSlot && period.timeSlot.startDate && period.timeSlot.endDate){
        period.timeSlot.startDate = new Date (startDate).toISOString()
        period.timeSlot.endDate = new Date (endDate).toISOString()
        period.pricePerNight = this.editPeriodForm.get('price')?.value
      }
    }


  }
}
