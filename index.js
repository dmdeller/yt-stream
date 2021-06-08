const express = require('express')
const app = express()
const port = 3050
const ytdl = require('ytdl-core')

app.get('/', (req, res) => res.send('Hello World!'))

async function sendToStream(videoID, response) {
  let url = "https://www.youtube.com/watch?v=" + videoID
  let info = await ytdl.getInfo(url)
  
  // console.log(info)
  
  let streamURL = info.player_response.streamingData.hlsManifestUrl
  
  if (!!streamURL) {
    response.redirect(302, streamURL)
    
  } else {
    console.log("Could not find stream URL in data:", info)
    response.status(500).send("Unable to get stream URL")
  }
}

app.get('/relax_study', async (request, response) => {
  let videoID = "5qap5aO4i9A"
  await sendToStream(videoID, response)
})

app.get('/sleep_chill', async (request, response) => {
  let videoID = "DWcJFNfaw9c"
  await sendToStream(videoID, response)
})

app.get('/stream', async (request, response) => {
  let videoID = request.query.video_id
  if (!videoID) {
    response.status(400).send("Specify a YouTube video ID with ?video_id=...")
    return
  }
  await sendToStream(videoID, response)
})

app.listen(port, () => console.log(`yt-stream listening on port ${port}!`))
