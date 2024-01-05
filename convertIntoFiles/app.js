const express = require("express")

const port = 8000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/api", require("./routes/index.js"))


app.listen(port, (err) => {
  if (err) {
    console.log(`Error in server listening :-${err}`)
    return;
  }
  console.log(`Http app listening on port ${port}!`);
})