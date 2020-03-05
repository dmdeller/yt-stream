# What

Takes a YouTube video ID, returns a YouTube `.m3u8` streaming URL.

# Why

I want to listen to YouTube-based radio stations like [this][1] and [this][2] in a [radio app][3] instead of the YouTube app/web site.

[1]: https://www.youtube.com/watch?v=5qap5aO4i9A
[2]: https://www.youtube.com/watch?v=DWcJFNfaw9c
[3]: https://triode.app

# How

Run it on a server on your LAN, then plug a URL like this into Safari or your radio app:

    http://my-server.local:3050/relax_study
    http://my-server.local:3050/sleep_chill
    http://my-server.local:3050/stream?video_id=5qap5aO4i9A

The first two example URLs above are hard-coded to specific stations. The last one can be changed to any YouTube video ID which has a live stream. If it's not a live stream, it will probably fail.

# However

YouTube probably doesn't want people doing this, so they encode your IP address and some other obfuscated stuff in the stream URL. If you try to access the resulting stream URL from a different IP address than the one your server is running on, it will probably fail.

As a result, this will probably only work if your radio client is behind the same NAT as your server, and probably only on IPv4.

# Install

    npm install

# Run

    node index.js
