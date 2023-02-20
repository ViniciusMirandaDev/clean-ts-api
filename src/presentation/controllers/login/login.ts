import { Authentication } from '../../../domain/usecases/authentication'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication
  constructor (emaiValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emaiValidator
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
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

      const { email, password } = httpRequest.body
      await this.authentication.auth(email, password)

      return new Promise(resolve => resolve(null))
    } catch (error) {
      return serverError(error)
    }
  }
}
