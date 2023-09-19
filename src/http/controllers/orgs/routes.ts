import { FastifyInstance } from "fastify";
import { register } from "./register";
import { refresh } from "./refresh";
import { authenticate } from "./authenticate";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { profile } from "./profile";

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', register)
  app.post('/sessions', authenticate)
  
  app.patch('/token/refresh', refresh)

  app.get('/me', { onRequest: [verifyJWT] }, profile)
}