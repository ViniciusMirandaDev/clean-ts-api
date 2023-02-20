import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emaiValidator: EmailValidator) {
    this.emailValidator = emaiValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['email', 'password']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    const emailValidator = this.emailValidator.isValid(httpRequest.body.email)

    if (!emailValidator) {
      return badRequest(new InvalidParamError('email'))
    }
    return new Promise(resolve => resolve(null))
  }
}
