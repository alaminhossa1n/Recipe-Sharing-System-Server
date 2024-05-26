import express, { Request, Response, Application } from "express";
import cors from "cors";
import { globalErrorhandler } from "./middlewares/globalErrorhandler";
import { userRoute } from "./modules/Users/user.route";
import { recipeRoute } from "./modules/Recipe/recipe.route";
import { paymentRoute } from "./modules/payment/payment.route";

const app: Application = express();

const corsOptions = {
  origin: ["http://localhost:5173", ""],
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/user", userRoute);
app.use("/api/recipe", recipeRoute);

// payments
app.use("/api/payment", paymentRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Mr. Developer!");
});

app.use(globalErrorhandler);

export default app;
