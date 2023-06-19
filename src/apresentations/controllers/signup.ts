import { InvalidParamError, MissingParamError } from '../erros'
import { badRequest, serverError } from '../helpers/http-healper'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../protocols'

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

      if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
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
