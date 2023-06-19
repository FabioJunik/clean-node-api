import { InvalidParamError } from '../erros/invalid-param-erro'
import { MissingParamError } from '../erros/missing-param-erro'
import { badRequest, serverError } from '../helpers/http-healper'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email-validator'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SingUpController implements Controller {
  private readonly emailVatidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailVatidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFilds = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFilds) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const isValid = this.emailVatidator.isValid(httpRequest.body.email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      return {
        statusCode: 200,
        body: ''
      }
    } catch (error) {
      return serverError()
    }
  }
}
