
import type { FastifyInstance } from "fastify";
import { createPlanSchema} from "../types";
import { generatePlan } from "../agent";

export async function planRoutes(app: FastifyInstance) { 
    app.post("/plan", async (request, reply) => {
      reply.raw.setHeader("Access-Control-Allow-Origin", "*");
      reply.raw.setHeader("Content-Type", "text/plain; charset=utf-8");
      reply.raw.setHeader("Content-Type", "text/event-stream");
      reply.raw.setHeader("Cache-Control", "no-cache");
      reply.raw.setHeader("Connection", "keep-alive");
        
      const parse = createPlanSchema.safeParse(request.body);
      if (!parse.success) {
        return reply.status(400).send({
          error: "Invalid request",
          details: parse.error.flatten(issue => issue.message),
        });
      }
      
      try {
        
        for await (const chunk of generatePlan(parse.data)) {
          reply.raw.write(chunk);
        }

        reply.raw.end();


      } catch (error: any) {
        request.log.error(error);
        reply.raw.write(`event: error\n ${JSON.stringify(error.message)}\n\n`);
        reply.raw.end();
      }

      return reply;

      });
    }