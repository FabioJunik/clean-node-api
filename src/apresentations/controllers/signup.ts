import { MissingParamError } from '../erros/missing-param-erro'
import { badRequest } from '../helpers/http-healper'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SingUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    }

    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }

    return {
      statusCode: 200,
      body: ''
    }
  }
}
