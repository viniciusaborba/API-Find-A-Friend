import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { registerPet } from "./register";
import { petDetails } from "./details";
import { fetchByCity } from "./fetch";
import { verifyUserRole } from "../../middlewares/verify-user-role";

export async function petsRoutes(app: FastifyInstance) {
   app.post('/pets/:orgId/register', { onRequest: [verifyJWT, verifyUserRole('ADMIN')] }, registerPet)
   app.get('/pets/list', fetchByCity)

   app.get('/pets/:petId/details', petDetails)
}