import { Router } from "express";
import { getClasses, createClass } from "./class.controller.ts";
import { asyncHandler } from "../../shared/asyncHandler.ts";

const router = Router();

router.get("/", asyncHandler(getClasses));
router.post("/", asyncHandler(createClass));

export default router;