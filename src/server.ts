import Fastify from "fastify";
import { planRoutes } from "./routes/plan";

const app = Fastify({
    logger: true,
});

app.get("/test", (req, res) => {
    res.send("Hello World");
})

app.register(planRoutes)

app.listen({ port: Number(process.env.PORT) || 3333 , host: "0.0.0.0" }).then(() => {
    console.log("HTTP server running on http://localhost:3333");
}).catch((err) => {
    app.log.error(err);
    process.exit(1);
});

