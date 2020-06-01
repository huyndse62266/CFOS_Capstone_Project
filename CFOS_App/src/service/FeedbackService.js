import Service from "./Service";

export class FeedbackService {
  submitFeedback(feedback) {
    return Service
      .getRestClient()
      .post("customer/feedback", feedback);
  }
}
