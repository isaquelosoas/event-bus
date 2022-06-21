import express from "express"
import axios from "axios"

const app = express()
app.use(express.json())

const events = []

app.post("/events", (req, res) => {
  const event = req.body

  events.push(event)

  axios.post("http://comments-clusterip-srv:4000/events", event)
  axios.post("http://posts-clusterip-srv:4001/events", event)
  axios.post("http://query-clusterip-srv:4002/events", event)
  axios.post("http://moderation-clusterip-srv:4003/events", event)

  return res.send({ status: "OK" })
})

app.get("/events", (req, res) => {
  res.send(events)
})

app.listen(5000, () => {
  console.log("Listening event bus on 5000")
})
