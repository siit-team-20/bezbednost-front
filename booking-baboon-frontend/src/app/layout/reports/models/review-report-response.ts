import {User} from "../../users/models/user.model";
import {ReportStatus} from "./report.model";
import {Review} from "../../reviews/model/review.model";

export interface ReviewReportResponse {
  id: number;
  reportee: UserReferenceRequest;
  createdOn: Date; // Adjust type based on the actual type in the backend
  status: ReportStatus;
  message: string;
  reportedReview: ReviewReferenceRequest;
}

export interface UserReferenceRequest {
  id: number;
}

export interface ReviewReferenceRequest {
  id: number;
}
