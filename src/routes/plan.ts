import type { FastifyInstance } from "fastify";

export async function planRoutes(app: FastifyInstance) { 
    app.post("/plan", async (request, reply) => {
        return reply.send({ message: "Criando um novo plano" });
      });
    }