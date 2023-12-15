const models = require('cargo-db-migration-service/models');

export const findByEmail = async (email: string) => {
  return await models.Token.findOne({ where: {email} });
}

export const save = async (email: string, refreshToken: string) => {
  return await models.Token.create({email, refreshToken});
}