import { HttpStatus } from '@nestjs/common';

export class HttpResponse<T> {
  status: HttpStatus;
  message: string;
  data: T;

  constructor(data: T, status: HttpStatus, message: string) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

export abstract class AbstractController {
  renderSuccessResponse<T>(
    data: T,
    message: string = 'success',
  ): HttpResponse<T> {
    return new HttpResponse(data, HttpStatus.OK, message);
  }

  renderNotFoundResponse<T>(
    data: T,
    message: string = 'success',
  ): HttpResponse<T> {
    return new HttpResponse(data, HttpStatus.OK, message);
  }

  renderErrorResponse<T>(
    data: T,
    message: string = 'success',
  ): HttpResponse<T> {
    return new HttpResponse(data, HttpStatus.OK, message);
  }

  renderCreatedResponse<T>(
    data: T,
    message: string = 'created',
  ): HttpResponse<T> {
    return new HttpResponse(data, HttpStatus.CREATED, message);
  }

  async render<T>(
    data: Promise<T>,
    status: HttpStatus = HttpStatus.OK,
    message: string = '',
  ): Promise<HttpResponse<T>> {
    return new HttpResponse(await data, status, message);
  }
}
