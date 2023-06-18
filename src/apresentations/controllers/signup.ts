import { MissingParamError } from '../erros/missing-param-erro'
import { badRequest } from '../helpers/http-healper'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SingUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFilds = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFilds) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    return {
      statusCode: 200,
      body: ''
    }
  }
}
