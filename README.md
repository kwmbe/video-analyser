# video-analyser

A small application containing three Docker images. Upload videos to the frontend, send them to the backend, and run them through an AI. The output can be seen in the frontend upon a refresh.

The AI is ran locally. Be sure to run this on a computer which at least has a dedicated GPU.

## Installation

Make sure [git](https://git-scm.com/downloads) and [docker](https://docs.docker.com/engine/install/) are installed. Linux or WSL is recommended.

1. Clone the repo with `git clone https://github.com/kwmbe/video-analyser`
2. Run everything with `docker compose up`

## Using the app

Since the AI is running locally, setting this up takes a while. The first time running this on Windows without WSL, just building the docker image took over an hour. 

After the images are built, a script in the AI container will start ollama and fetch the image recognition module. This may take up to 15 minutes and will rapidly enter a bunch of identical strings in the console. Even if it looks like it's not doing anything, don't worry, it should be working.

When this has finished, you should see "starting watcher" being printed to the console. This means the AI container is ready to analyse any video uploaded to the backend. Now you can go to http://localhost:3000 and upload a video!

When a video has been uploaded, the AI container should print `analyzing PATH/TO/VIDEO` to the console. Again, this may take a while. 

For me, analyzing a 54 second video took 1.5 hours with an AMD 5700X and an RTX3070Ti. Analyzing a 3 second video  with an i3 10100Y and integrated graphics ended up crashing my laptop after 20 minutes, it never finished.

## Checklist

- [X] Minimal frontend functionality
- [X] Backend add, delete and fetch endpoints 
- [ ] Display a part of the AI output in the frontend
- [ ] Migrate to kubernetes (k3s)
- [ ] Prettify the frontend
