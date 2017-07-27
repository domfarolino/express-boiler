# express-boiler

This repository houses basic express application boilerplate I use a lot when testing random web stuff. Note
this is extremely barebones and is just a step up from a totally static server (like `python -m SimpleHTTPServer 8080`).
The purpose of this is so I can get a little more control over how files are served. For example if I want to create an
artificial delay when serving files that match a certain pattern, or have more control over the headers the server sends
`SimpleHTTPServer` isn't the best thing.

**Disclaimer:** this is not boilerplate that would be wise to use on a complicated application as it is extremely
barebones and provides no real architecture for serious applications.
