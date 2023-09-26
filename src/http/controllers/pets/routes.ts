import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { registerPet } from "./register";
import { petDetails } from "./details";
import { fetchByCity } from "./fetch";

export async function petsRoutes(app: FastifyInstance) {
   app.post('/pets/:orgId/register', { onRequest: [verifyJWT] }, registerPet)
   app.get('/pets/list', fetchByCity)

   app.get('/pets/:petId/details', petDetails)
}