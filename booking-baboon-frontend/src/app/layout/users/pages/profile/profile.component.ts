import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import {tap} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Guest} from "../../models/guest.model";
import {Host} from "../../models/host.model";
import {HostService} from "../../services/host.service";
import {GuestService} from "../../services/guest.service";
import {DialogService} from "../../../../shared/dialogs/dialog.service";
import {SharedService} from "../../../../shared/shared.service";
import {NotificationType} from "../../models/NotificationType.module";
import {AuthService} from "../../../../infrastructure/auth/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ReviewReport} from "../../../reports/models/review-report.model";
import {Admin} from "../../models/admin.model";
import {AdminService} from "../../services/admin.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userType: string = 'guest';
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  isFormValid!: boolean;
  isPasswordFormValid!: boolean;
  editModes: { [key: string]: boolean } = {
    email: true,
    firstName: true,
    lastName: true,
    phone: true,
    address: true,
    currentPassword: true,
    newPassword: true,
    confirmPassword: true,
  };
  isRoleHost!: boolean;
  isRoleGuest!: boolean;

  isReadOnly(key: string): boolean {
    return this.editModes[key];
  }

  toggleEditMode(key : string) {
    this.editModes[key] = !this.editModes[key];
  }

  user?: User;
  guest?: Guest;
  host?: Host;
  admin?: Admin;

  newPassword?: string;
  confirmPassword?: string;
  currentPassword?: string;

  errorLabel?: string = ""

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private hostService: HostService,
              private guestService: GuestService,
              private adminService: AdminService,
              private dialogService: DialogService,
              private sharedService: SharedService,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId: number = params['userId'];
      /*this.newPassword = "";
      this.confirmPassword = "";
      this.currentPassword = "";*/

      this.userService.getProfile(userId)
        .pipe(
          tap((user: User) => {
            this.user = user;
            this.initializeForm();
          })
        )
        .subscribe()

      if (this.authService.getRole() === "HOST") {
        this.isRoleHost = true;
        this.hostService.getProfile(userId)
          .pipe(
            tap((host: Host) => {
              this.host = host;
            })
          )
          .subscribe();
      }

      if (this.authService.getRole() === "GUEST") {
        this.isRoleGuest = true;
        this.userService.getProfile(userId)
          .pipe(
            tap((guest: Guest) => {
              this.guest = guest;
            })
          )
          .subscribe();
      }

      if (this.authService.getRole() === "ADMIN") {
        this.userService.getProfile(userId)
          .pipe(
            tap((admin: Admin) => {
              this.admin = admin;
            })
          )
          .subscribe();
      }

    });
  }
  initializeForm(): void {
    this.profileForm = this.formBuilder.group({
      email: [this.user?.email || '', [Validators.required, Validators.email]],
      firstName: [this.user?.firstName || '', Validators.required],
      lastName: [this.user?.lastName || '', Validators.required],
      phone: [this.user?.phoneNumber || '', [Validators.pattern("^\\+(?:[0-9]●?){6,14}[0-9]$"), Validators.required]],
      address: [this.user?.address || '', Validators.required],
    });

    this.passwordForm = this.formBuilder.group({
      currentPassword: new FormControl('',[Validators.required, Validators.minLength(6)]),
      newPassword: new FormControl('',[Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('',[Validators.required, Validators.minLength(6)]),
    });

    this.profileForm.valueChanges.subscribe(() => {
      this.isFormValid = this.profileForm.valid;
    });

    this.passwordForm.valueChanges.subscribe(() => {
      this.isPasswordFormValid = this.passwordForm.valid;
    });
  }

  deleteProfile(): void {

    this.dialogService.confirmDialog().subscribe(result => {
      if (result) {

        if (this.authService.getRole() === "HOST") {
          this.hostService.delete(this.user?.id).subscribe(
            (response) => {
              this.logoutUser("Profile succesfully deleted!")
            },
            (error) => {
              this.sharedService.openSnack("You cannot delete your profile while your accommodations have active reservations!")
            }
          );
        }

        else if (this.authService.getRole() === "GUEST") {
          this.guestService.delete(this.user?.id).subscribe(
            (response) => {
              this.logoutUser("Profile succesfully deleted!")
            },
            (error) => {
              this.sharedService.openSnack("You cannot delete your profile while you have active reservations.")
            }
          );
        }
      }
    });
  }

  logoutUser(message: string) {
    this.sharedService.openSnack(message);
    this.router.navigate(['login'])
    localStorage.clear();
    window.location.reload();
  }

/*  isFormValid() {
    if (this.host?.firstName == "") {
      return false;
    }
    if (this.host?.lastName == "") {
      return false;
    }
    if (this.host?.address == "") {
      return false;
    }
    if (this.host?.phoneNumber == "") {
      return false;
    }
    return true;
  }*/

  saveChanges(): void {
    if (this.user != undefined) {
      if (this.authService.getRole() === "HOST" && this.host != undefined) {

        this.host.id = this.user.id;
        this.host.firstName = this.user.firstName;
        this.host.lastName = this.user.lastName;
        this.host.phoneNumber = this.user.phoneNumber;
        this.host.address = this.user.address;
        this.host.email = this.user.email;

          if (this.isFormValid) {
            this.hostService.update(this.host).subscribe(
              (response) => {
                // Handle success case here
                if (this.user?.email != this.authService.getEmail()) {
                  this.logoutUser("Profile updated! Please log in again to confirm your email")
                } else this.sharedService.openSnack("Profile updated!");
              },
              (error) => {
                this.sharedService.openSnack("Email already in use!");
              }
            );
          }
          else {
            this.sharedService.openSnack("Fields cannot be empty!");
          }

      }
      else if (this.authService.getRole() === "GUEST" && this.guest != undefined) {

          this.guest.id = this.user.id;
          this.guest.firstName = this.user.firstName;
          this.guest.lastName = this.user.lastName;
          this.guest.phoneNumber = this.user.phoneNumber;
          this.guest.address = this.user.address;
          this.guest.email = this.user.email;

          if (this.isFormValid) {
            this.guestService.update(this.guest).subscribe(
              (response) => {
                // Handle success case here
                if (this.user?.email != this.authService.getEmail()) {
                  this.logoutUser("Profile updated! Please log in again to confirm your email")
                } else this.sharedService.openSnack("Profile updated!");

              },
              (error) => {
                this.sharedService.openSnack("Email already in use!");
              }
            );
          }
          else this.sharedService.openSnack("Fields cannot be empty!");
      }

      else if (this.authService.getRole() === "ADMIN" && this.admin != undefined) {

        this.admin.id = this.user.id;
        this.admin.firstName = this.user.firstName;
        this.admin.lastName = this.user.lastName;
        this.admin.phoneNumber = this.user.phoneNumber;
        this.admin.address = this.user.address;
        this.admin.email = this.user.email;

        if (this.isFormValid) {
          this.adminService.update(this.admin).subscribe(
            (response) => {
              if (this.user?.email != this.authService.getEmail()) {
                this.logoutUser("Profile updated! Please log in again to confirm your email")
              } else this.sharedService.openSnack("Profile updated!");

            },
            (error) => {
              this.sharedService.openSnack("Email already in use!");
            }
          );
        }
        else this.sharedService.openSnack("Fields cannot be empty!");
      }
    }
  }

  changePassword(): void {
    if (this.passwordForm.get("currentPassword")?.value !== "") {
      if (this.passwordForm.get("newPassword")?.value === this.passwordForm.get("confirmPassword")?.value && this.user !== undefined) {
        this.errorLabel = "";
        this.userService.changePassword(this.user.id, this.passwordForm.get("currentPassword")?.value, this.passwordForm.get("newPassword")?.value)
          .subscribe({
            next: (data: User) => {
              this.errorLabel = "";
              this.logoutUser("Password changed succesfully");
            },
            error: (_) => {this.errorLabel = "Wrong current password"}
          })
      } else {
        this.errorLabel = "Passwords don't match!";
      }
    }
  }

  isNotificationReservationCreation(): boolean {
    if (this.user?.ignoredNotifications) {
      return !this.user.ignoredNotifications.includes(NotificationType.ReservationCreated);
    }
    return true;
  }

  isNotificationReservationCancelled(): boolean {
    if (this.user?.ignoredNotifications) {
      return !this.user.ignoredNotifications.includes(NotificationType.ReservationCancelled);
    }
    return true;
  }

  isNotificationHostReview(): boolean {
    if (this.user?.ignoredNotifications) {
      return !this.user.ignoredNotifications.includes(NotificationType.HostReview);
    }
    return true;
  }

  isNotificationAccommodationReview(): boolean {
    if (this.user?.ignoredNotifications) {
      return !this.user.ignoredNotifications.includes(NotificationType.AccommodationReview);
    }
    return true;
  }

  isNotificationReservationRequestResponse(): boolean {
    if (this.user?.ignoredNotifications) {
      return !this.user.ignoredNotifications.includes(NotificationType.ReservationRequestResponse);
    }
    return true;
  }

  toggleNotification(id: number | undefined, notificationType: NotificationType): void {
    if (id) {
      this.userService.toggleNotifications(id, notificationType).subscribe({})
    }
  }

  protected readonly NotificationType = NotificationType;
}
