const express = require('express')
const app = express()
const port = 3050
const ytdl = require('ytdl-core')

app.get('/', (req, res) => res.send('Hello World!'))

function sendToStream(videoID, response) {
  let url = "https://www.youtube.com/watch?v=" + videoID
  ytdl.getInfo(url, (err, info) => {
    if (err) throw err
    
//     console.log(info)
    
    let streamURL = info.player_response.streamingData.hlsManifestUrl
    
    if (!!streamURL) {
      response.redirect(302, streamURL)
      
    } else {
      console.log("Could not find stream URL in data:", info)
      response.status(500).send("Unable to get stream URL")
    }
  })
}

app.get('/relax_study', (request, response) => {
  let videoID = "5qap5aO4i9A"
  sendToStream(videoID, response)
})

app.get('/sleep_chill', (request, response) => {
  let videoID = "DWcJFNfaw9c"
  sendToStream(videoID, response)
})

app.get('/stream', (request, response) => {
  let videoID = request.query.video_id
  if (!videoID) {
    response.status(400).send("Specify a YouTube video ID with ?video_id=...")
    return
  }
  sendToStream(videoID, response)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
