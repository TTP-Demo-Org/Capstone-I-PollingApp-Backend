const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

app.get("/health", (req, res) => {
    res.json({ status: "ok" })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
