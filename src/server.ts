import Fastify from "fastify";

const app = Fastify({
    logger: true,
});

app.listen({ port: Number(process.env.PORT) || 3333 , host: "0.0.0.0" }).then(() => {
    console.log("HTTP server running on http://localhost:3333");
}).catch((err) => {
    app.log.error(err);
    process.exit(1);
});

app.get("/", (req, res) => {
    res.send("Hello World");
})