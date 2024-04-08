import express from "express"

const router = new express.Router()

router.post("/login")
router.post("/register")
router.post("/logout")

export default router