import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {AvailablePeriod} from "../../shared/models/available-period.model";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DateValidators{
  public validateDateRange(startControlName: string, endControlName: string) :ValidatorFn {
    return (abstractControl: AbstractControl) => {
      const startDate = abstractControl.get(startControlName);
      const endDate = abstractControl.get(endControlName);
      if(!startDate||!endDate) return null;
      if (startDate.value && endDate.value && startDate.value > endDate.value) {
        const error = {confirmedValidator: 'Dates are not valid.'};
        endDate.setErrors({ dateRange: true });
        return error;
      } else {
        endDate.setErrors(null);
        return null;
      }
    };
  }

  public futureDateValidator(startControlName: string):ValidatorFn {
    return (control: AbstractControl) => {
      const currentDate = new Date();
      const startDate = control.get(startControlName);
      if(!startDate) return null;
      if (startDate?.value <= currentDate) {
        const error = {confirmedValidator: 'Dates are not valid.'};
        startDate.setErrors(error)
        return { error};
      }

      return null;
    };
  }

  public overlappingDatesValidator(startControlName: string, endControlName: string, availablePeriods: AvailablePeriod[]): ValidatorFn {
    return (abstractControl: AbstractControl): ValidationErrors | null => {
      const startDate = abstractControl.get(startControlName);
      const endDate = abstractControl.get(endControlName);

      if (startDate && endDate) {
        const overlap = availablePeriods.some(period => this.isDateRangeOverlapping(startDate.value, endDate.value, period));
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

  public isDateRangeOverlapping(newStartDate: Date, newEndDate: Date, existingPeriod: any): boolean {
    const existingStartDate =  new Date(existingPeriod.timeSlot.startDate) ;
    const existingEndDate = new Date(existingPeriod.timeSlot.endDate);

    return (
      (newStartDate >= existingStartDate && newStartDate <= existingEndDate) ||
      (newEndDate >= existingStartDate && newEndDate <= existingEndDate) ||
      (newStartDate <= existingStartDate && newEndDate >= existingEndDate)
    );
  }
}
