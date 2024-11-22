import { Router } from "express";
import ContactController from "../controller/ContactController";

const routes = Router();

routes.get("", ContactController.getAll)
routes.get("/getOne/:id", ContactController.getOne)
routes.post("", ContactController.create)
routes.put("/:id", ContactController.update)
routes.delete("/:id", ContactController.delete)

export default routes;