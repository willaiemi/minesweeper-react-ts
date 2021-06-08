import express from "express"
import mongoose from "mongoose"
import { json } from "body-parser"
import { highScoresRouter } from "./routes/highScores"

const app = express()
app.use(json())
app.use(highScoresRouter)

mongoose.connect("mongodb://localhost:27017/highScores", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () => {
    console.log("Connected to the database")
})

app.listen(9000, () => {
    console.log("Server is listening on port 9000")
})
