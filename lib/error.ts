import { AxiosError } from "axios";

class AppError {
  // title: string;
  message: string;
  status: number;
  constructor(error: any) {
    let genericMessage = "Something went really wrong. Please try again later!";
    let status = 500;

    this.message = genericMessage;

    if (error instanceof AxiosError) {
      const errorMessages = Object.values(error.response?.data);
      if (Array.isArray(errorMessages[0])) {
        this.message = errorMessages[0][0];
      } else if (Array.isArray(errorMessages)) {
        this.message = errorMessages.join(", ");
      }
    }

    this.status = status;
  }
}

export default AppError;
