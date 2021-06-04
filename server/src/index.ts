import express from "express"
import { json } from "body-parser"
import { highScoresRouter } from "./routes/highScores"

const app = express()
app.use(json())
app.use(highScoresRouter)


app.listen(9000, () => {
    console.log("Server is listening on port 9000")
})
