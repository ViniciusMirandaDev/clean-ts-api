import { Controller, HttpRequest, HttpResponse, EmailValidator, Authentication } from './login-protocols'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helper'

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
      const accessToken = await this.authentication.auth(email, password)
      if (!accessToken) {
        return unauthorized()
      }
      return ok({ accessToken: accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
