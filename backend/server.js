const PORT = process.env.PORT ?? 8000
const express = require("express")
const app = express()
const cors = require("cors")
const authRouter = require("./routes/authRouter");
const journalRouter = require("./routes/journalRouter")
const flowerRouter = require("./routes/flowerRoutes")
const soundRouter = require("./routes/soundRouter")
const colorRouter = require("./routes/colorRouter")

app.use(cors())
app.use(express.json());
// Middleware to parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

app.use("/", authRouter);
app.use("/", journalRouter)
app.use("/", flowerRouter)
app.use("/", soundRouter)
app.use("/", colorRouter)

module.exports = app;


app.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`))
