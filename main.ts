import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";

const router = new Router();
router
  .get("/", (context) => {
    context.response.type = "application/json";
    context.response.body = { status: 200, name: "Theo Personal Exmaple APIs" };
  });

const app = new Application();
app.use(oakCors()); // Enable CORS for All Routes
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
