import {Report} from "../../reports/models/report.model";
import {Review} from "../../reviews/model/review.model";
export interface ReviewReport extends Report{
  reportedReview: Review;
}
