import express from "express"
import { json } from "body-parser"

const app = express()
app.use(json)


app.listen(9000, () => {
    console.log("Server is listening on port 9000")
})
