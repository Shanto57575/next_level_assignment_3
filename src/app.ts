import express, { Request, Response } from "express";
import bookRoutes from "./app/routes/book.routes";
import borrowRoutes from "./app/routes/borrow.routes";

const app = express();

app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  res.json({ message: "Library management api is running fine" });
});

app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

export default app;
