import express, { Request, Response, Application } from "express";
import cors from "cors";
import { globalErrorhandler } from "./middlewares/globalErrorhandler";

const app: Application = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "",
  ],
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

// app.use("/api/auth", AuthRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Mr. Developer!");
});

app.use(globalErrorhandler);

export default app;
