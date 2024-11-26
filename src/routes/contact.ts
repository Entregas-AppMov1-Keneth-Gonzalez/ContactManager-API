import { Router } from "express";
import { ContactController } from "../controller/ContactController";

const routes = Router();

routes.post("", ContactController.create)
routes.get("", ContactController.getAll)
routes.get("/getbyId/:Id", ContactController.getOne)
routes.get("/getbyFullName/:FullName", ContactController.getByFullName)
routes.put("/:Id", ContactController.update)
routes.delete("/:Id", ContactController.delete)

export default routes;