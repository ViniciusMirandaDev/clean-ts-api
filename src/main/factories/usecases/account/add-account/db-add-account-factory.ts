import { DbAddAccount } from '../../../../../data/usecases/add-account/db-add-account'
import { AccountMongoRepository } from '../../../../../infra/db/mongodb/account/account-mongo-repository'
import { BCryptAdapter } from '../../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AddAccount } from '../../../../../domain/usecases/add-acount'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BCryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}
