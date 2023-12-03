import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { ObjectEncoder } from "npm:object-vectorization";

const router = new Router();

router.get("/", (context) => {
  context.response.type = "application/json";
  context.response.body = { status: 200, name: "Theo Personal Exmaple APIs" };
});

router.post("/vectorize", async (ctx) => {
  const { meta, data } = await ctx.request.body().value;
  const e = new ObjectEncoder(meta);
  const vec = e.encode(data);
  const feats = e.features();
  ctx.response.type = "application/json";
  ctx.response.body = {
    vec,
    feats,
  };
});

const app = new Application();

app.use(oakCors()); // Enable CORS for All Routes
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
