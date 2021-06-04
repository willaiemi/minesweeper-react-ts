import express from "express"

const router = express.Router()

router.get("/api/high-scores", (req, res) => {
    return res.send("High-scores list.")
})

router.post("/api/high-scores", (req, res) => {
    return res.send("High-score registered.")
})

export { router as highScoresRouter }
