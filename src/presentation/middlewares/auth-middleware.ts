import { LoadAccountByToken } from '../../domain/usecases/load-acount-by-token'
import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers/http/http-helper'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accesToken = httpRequest.headers?.['x-access-token']
    if (accesToken) {
      await this.loadAccountByToken.load(accesToken)
    }
    return forbidden(new AccessDeniedError())
  }
}
