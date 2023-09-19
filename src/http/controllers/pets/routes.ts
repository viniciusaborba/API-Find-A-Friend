import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { registerPet } from "./register";

export async function petsRoutes(app: FastifyInstance) {
   app.post('/pets/:orgId/register', { onRequest: [verifyJWT] }, registerPet)
}