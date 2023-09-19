import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { orgsRoutes } from './http/controllers/orgs/routes'
import fastifyCookie from '@fastify/cookie'
import { petsRoutes } from './http/controllers/pets/routes'

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
      cookieName: 'refreshToken',
      signed: false,
    },
    sign: {
      expiresIn: '10m'
    }
})

app.register(fastifyCookie)

app.register(orgsRoutes)
app.register(petsRoutes)

app.setErrorHandler((err, _req, res) => {
  if (err instanceof ZodError) {
    return res.status(400).send({
      message: 'Validation error',
      issues: err.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(err)
  } else {
    // TODO: Here we should log to an external tool like DataDog, etc...
  }

  return res.status(500).send({
    message: 'Internal server error',
  })
})
