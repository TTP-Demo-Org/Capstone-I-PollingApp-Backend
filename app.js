const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const app = express()
const PORT = process.env.PORT || 3000

const pollDb = require("./db")
require("./models")

const pollsRouter = require("./routes/polls")


app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use("/polls", pollsRouter)

app.get("/health", (req, res) => {
    res.json({ status: "ok" })
})

async function startServer() {
    try {
        await pollDb.authenticate()
        console.log("DATABASE connected")

        await pollDb.sync()
        console.log("Models synced")

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`)
        })
    } catch (error) {
        console.error("Unable to connect to database:", error)
    }

}

app.use((error, req, res, next) => {
    console.error(error)
    res.status(500).json({error: "Something went wrong."})
})

startServer()
