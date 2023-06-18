import { MissingParamError } from '../erros/missing-param-erro'
import { badRequest } from '../helpers/http-healper'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SingUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFilds = ['name', 'email']

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
