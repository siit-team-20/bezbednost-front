import {NgModule} from "@angular/core";
import {NavbarComponent} from "./navbars/navbar/navbar.component";
import {LoginComponent} from "./authentication/login/login.component";
import {RegisterComponent} from "./authentication/register/register.component";
import {NavbarGuestComponent} from "./navbars/navbar-guest/navbar-guest.component";
import {NavbarHostComponent} from "./navbars/navbar-host/navbar-host.component";
import {NavbarAdminComponent} from "./navbars/navbar-admin/navbar-admin.component";
import {NavbarUnauthorizedComponent} from "./navbars/navbar-unauthorized/navbar-unauthorized.component";
import {
  AccommodationsSearchBarComponent
} from "./accommodations/search/components/accommodations-search-bar/accommodations-search-bar.component";
import {
  AccommodationCardsComponent
} from "./accommodations/search/components/accommodation-cards/accommodation-cards.component";
import {
  AccommodationCardComponent
} from "./accommodations/search/components/accommodation-card/accommodation-card.component";
import {
  AccommodationDetailsComponent
} from "./accommodations/search/components/accommodation-details/accommodation-details.component";
import {ImageCarouselComponent} from "./accommodations/search/components/image-carousel/image-carousel.component";
import {
  AccommodationDetailsPageComponent
} from "./accommodations/search/pages/accommodation-details-page/accommodation-details-page.component";
import {
  AccommodationsPageComponent
} from "./accommodations/search/pages/accommodations-page/accommodations-page.component";
import {
  AccommodationFilterComponent
} from "./accommodations/search/components/accommodation-filter/accommodation-filter.component";
import {ProfileComponent} from "./users/pages/profile/profile.component";
import {ActivationComponent} from "./authentication/activation/activation.component";
import {HostProfileComponent} from "./users/components/host-profile/host-profile.component";
import {HostProfilePageComponent} from "./users/pages/host-profile-page/host-profile-page.component";
import {ReviewCardComponent} from "./reviews/review-card/review-card.component";
import {ReviewCardsComponent} from "./reviews/review-cards/review-cards.component";
import {ReviewsDialogComponent} from "./reviews/reviews-dialog/reviews-dialog.component";
import {
  HostAccommodationsListComponent
} from "./accommodations/host/pages/host-accommodations-list/host-accommodations-list.component";
import {
  HostAccommodationCardComponent
} from "./accommodations/host/components/host-accommodation-card/host-accommodation-card.component";
import {
  HostAccommodationCardsComponent
} from "./accommodations/host/components/host-accommodation-cards/host-accommodation-cards.component";
import {
  AccommodationModificationPageComponent
} from "./accommodations/modification/pages/accommodation-modification-page/accommodation-modification-page.component";
import {
  AccommodationModificationCardComponent
} from "./accommodations/modification/components/accommodation-modification-card/accommodation-modification-card.component";
import {
  AccommodationModificationCardsComponent
} from "./accommodations/modification/components/accommodation-modification-cards/accommodation-modification-cards.component";
import {
  AccommodationModificationDetailsComponent
} from "./accommodations/modification/components/accommodation-modification-details/accommodation-modification-details.component";
import {
  ReservationRequestPageComponent
} from "./reservations/reservation-request-page/reservation-request-page.component";
import {ReservationRequestComponent} from "./reservations/reservation-request/reservation-request.component";
import {
  AccommodationCreationPageComponent
} from "./accommodations/host/pages/accommodation-creation-page/accommodation-creation-page.component";
import {
  AccommodationCreationComponent
} from "./accommodations/host/components/accommodation-creation/accommodation-creation.component";
import {
  AccommodationAvailablePeriodComponent
} from "./accommodations/host/components/accommodation-available-period/accommodation-available-period.component";
import {
  AccommodationAvailablePeriodPageComponent
} from "./accommodations/host/pages/accommodation-available-period-page/accommodation-available-period-page.component";
import {
  EditAccommodationPageComponent
} from "./accommodations/host/pages/edit-accommodation-page/edit-accommodation-page.component";
import {HostReviewFormComponent} from "./reviews/host-review-form/host-review-form.component";
import {StarRatingInputComponent} from "./reviews/star-rating-input/star-rating-input.component";
import {
  GuestReservationsPageComponent
} from "./reservations/guest/guest-reservations-page/guest-reservations-page.component";
import {GuestReservationsComponent} from "./reservations/guest/guest-reservations/guest-reservations.component";
import {
  AccommodationReviewFormComponent
} from "./reviews/accommodation-review-form/accommodation-review-form.component";
import {HostReportFormComponent} from "./reports/host-report-form/host-report-form.component";
import {HostReservationsComponent} from "./reservations/host/host-reservations/host-reservations.component";
import {
  HostReservationsPageComponent
} from "./reservations/host/host-reservations-page/host-reservations-page.component";
import {GuestReportFormComponent} from "./reports/guest-report-form/guest-report-form.component";
import {ReviewReportFormComponent} from "./reports/review-report-form/review-report-form.component";
import {GuestReviewsPageComponent} from "./reviews/guest-reviews-page/guest-reviews-page.component";
import {HostReviewCardComponent} from "./reviews/host-review-card/host-review-card.component";
import {
  AccommodationReviewCardComponent
} from "./reviews/accommodation-review-card/accommodation-review-card.component";
import {HostReviewCardsComponent} from "./reviews/host-review-cards/host-review-cards.component";
import {
  AccommodationReviewCardsComponent
} from "./reviews/accommodation-review-cards/accommodation-review-cards.component";
import {
  EditAccommodationComponent
} from "./accommodations/host/components/edit-accommodation/edit-accommodation.component";
import {
  MonthlySummaryDialogComponent
} from "./summaries/monthlySummary/monthly-summary-dialog/monthly-summary-dialog.component";
import {ReservationsChartComponent} from "./summaries/monthlySummary/reservations-chart/reservations-chart.component";
import {ProfitChartComponent} from "./summaries/monthlySummary/profit-chart/profit-chart.component";
import {
  SummaryGeneratorPageComponent
} from "./summaries/periodSummary/summary-generator-page/summary-generator-page.component";
import {SummaryGeneratorComponent} from "./summaries/periodSummary/summary-generator/summary-generator.component";
import {
  PeriodSummaryDialogComponent
} from "./summaries/periodSummary/period-summary-dialog/period-summary-dialog.component";
import {
  FavoriteAccommodationsPageComponent
} from "./accommodations/favorites/favorite-accommodations-page/favorite-accommodations-page.component";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "../infrastructure/material/material.module";
import {RouterLink, RouterModule} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {SharedModule} from "../shared/shared.module";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatTooltipModule} from "@angular/material/tooltip";
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatTabsModule} from "@angular/material/tabs";
import { NotificationPageComponent } from './notifications/notification-page/notification-page.component';
import { NotificationCardComponent } from './notifications/notification-card/notification-card.component';
import { NotificationCardsComponent } from './notifications/notification-cards/notification-cards.component';
import {
  AccommodationModificationDetailsPageComponent
} from "./accommodations/modification/pages/accommodation-modification-details-page/accommodation-modification-details-page.component";
import { AdminReviewReportsPageComponent } from './reports/admin-review-reports-page/admin-review-reports-page.component';
import { AdminReviewReportsComponent } from './reports/admin-review-reports/admin-review-reports.component';
import { UserReportsComponent } from './reports/user-reports/user-reports.component';
import { CertificateCardComponent } from './certificates/certificate-card/certificate-card.component';
import { CertificateCardsComponent } from './certificates/certificate-cards/certificate-cards.component';
import { CetrificatePageComponent } from './certificates/cetrificate-page/cetrificate-page.component';


@NgModule({
  declarations: [
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    NavbarGuestComponent,
    NavbarHostComponent,
    NavbarAdminComponent,
    NavbarUnauthorizedComponent,
    AccommodationsSearchBarComponent,
    AccommodationCardsComponent,
    AccommodationCardComponent,
    AccommodationDetailsComponent,
    ImageCarouselComponent,
    AccommodationDetailsPageComponent,
    AccommodationsPageComponent,
    AccommodationFilterComponent,
    ProfileComponent,
    ActivationComponent,
    HostProfileComponent,
    HostProfilePageComponent,
    ReviewCardComponent,
    ReviewCardsComponent,
    ReviewsDialogComponent,
    HostAccommodationsListComponent,
    HostAccommodationCardComponent,
    HostAccommodationCardsComponent,
    AccommodationModificationPageComponent,
    AccommodationModificationCardComponent,
    AccommodationModificationCardsComponent,
    AccommodationModificationDetailsComponent,
    AccommodationModificationDetailsPageComponent,
    ReservationRequestPageComponent,
    ReservationRequestComponent,
    AccommodationCreationPageComponent,
    AccommodationCreationComponent,
    AccommodationAvailablePeriodComponent,
    AccommodationAvailablePeriodPageComponent,
    EditAccommodationPageComponent,
    HostReviewFormComponent,
    StarRatingInputComponent,
    GuestReservationsPageComponent,
    GuestReservationsComponent,
    AccommodationReviewFormComponent,
    HostReportFormComponent,
    HostReservationsComponent,
    HostReservationsPageComponent,
    GuestReportFormComponent,
    ReviewReportFormComponent,
    GuestReviewsPageComponent,
    HostReviewCardComponent,
    AccommodationReviewCardComponent,
    HostReviewCardsComponent,
    AccommodationReviewCardsComponent,
    EditAccommodationComponent,
    MonthlySummaryDialogComponent,
    ReservationsChartComponent,
    ProfitChartComponent,
    SummaryGeneratorPageComponent,
    SummaryGeneratorComponent,
    PeriodSummaryDialogComponent,
    FavoriteAccommodationsPageComponent,
    NotificationPageComponent,
    NotificationCardComponent,
    NotificationCardsComponent,
    AdminReviewReportsPageComponent,
    AdminReviewReportsComponent,
    UserReportsComponent,
    CertificateCardComponent,
    CertificateCardsComponent,
    CetrificatePageComponent
  ],
  exports: [
    NavbarComponent,
    LoginComponent,
    ActivationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterLink,
    RouterModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    SharedModule,
    MatAutocompleteModule,
    MatTooltipModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatTabsModule
  ]
})
export class LayoutModule { }
