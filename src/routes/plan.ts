
import type { FastifyInstance } from "fastify";
import { createPlanSchema} from "../types";

export async function planRoutes(app: FastifyInstance) { 
    app.post("/plan", async (request, reply) => {
        
      const parse = createPlanSchema.safeParse(request.body);
      if (!parse.success) {
        return reply.status(400).send(parse.error);
      }
      
      try {
        



      } catch (error: any) {
        request.log.error(error);
        reply.raw.write(`event: error\n ${JSON.stringify(error.message)}\n\n`);
        reply.raw.end();
      }

      });
    }