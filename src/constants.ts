export const baseUrl: string = '/api/users'

export enum StatusCodes {
  'OK' = 200,
  'CREATED' = 201,
  'NO_CONTENT' = 204,
  'BAD_REQUEST' = 400,
  'NOT_FOUND' = 404,
  'INTERNAL_SERVER_ERROR' = 500,
  'NOT_IMPLEMENTED' = 501,
}

export enum Fields {
  USERNAME = 'username',
  AGE = 'age',
  HOBBIES = 'hobbies'
}