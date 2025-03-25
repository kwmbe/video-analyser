# video-analyser

A small application containing three Docker images. Upload videos to the frontend, send them to the backend, and run them through an AI. The output can be seen in the frontend upon a refresh.

The AI is ran locally. Be sure to run this on a computer which at least has a dedicated GPU.

## Installation

Make sure [git](https://git-scm.com/downloads) and [docker](https://docs.docker.com/engine/install/) are installed. Linux or WSL is recommended.

1. Clone the repo with `git clone https://github.com/kwmbe/video-analyser`
2. Run the containers:
  * With docker: 
    1. Make sure the .env file is set, and `VITE_API_URL` is equal to `http://localhost:5000`.
    2. Run `docker compose up`.
  * With k3s:
    1. If they aren't yet built, build the three images using `docker build --build-arg VITE_API_URL=http://localhost/api -t frontend frontend`. The name of the image is repeated twice since the directory has the same name. The build-arg flag only needs to be passed when building the frontend image.
    2. Send the images to k3s using `sudo docker save frontend:latest | sudo k3s ctr images import -`. Here you specify the name of the docker images.
    3. Install k3s with `curl -sfL https://get.k3s.io | sh -`.
    4. Run all manifests in `./manifests` with `sudo k3s kubectl apply -f manifests/frontend-service.yaml,manifests/backend-service.yaml,manifests/frontend-deployment.yaml,manifests/backend-deployment.yaml,manifests/ai-deployment.yaml,manifests/videos-persistentvolumeclaim.yaml,manifests/config.yaml,manifests/frontend-ingress.yaml,manifests/backend-ingress.yaml,manifests/env-vars.yaml`.
    5. Visit `http://localhost` and upload a file! You can check the logs of containers with, for example, `sudo k3s kubectl logs -f deployment/ai`. It is recommended to view the logs of the AI container before uploading a file, since it won't be analyzed if the AI isn't ready yet. More on that in the next section:

## Using the app

Since the AI is running locally, setting this up takes a while. The first time running this on Windows without WSL, just building the docker image took over an hour. 

After the images are built, a script in the AI container will start ollama and fetch the image recognition module. This may take a while. Even if it looks like it's not doing anything, or it looks like something's going wrong, don't worry, it's either working or it will retry until it works.

When this has finished, you should see "Watches established" being printed to the console. This means the AI container is ready to analyse any video uploaded to the backend. Now you can go to http://localhost (port 80 for k3s, port 3000 for docker compose) and upload a video!

When a video has been uploaded, the AI container should print `analyzing PATH/TO/VIDEO` to the console. Again, this may take a while. 

Expect waiting times of around 1~1.5 minutes per extracted frame when using a graphics card similar in performance to a 3070Ti. Of course this also depends on the resolution of the video. Running the AI without a dedicated graphics card may end up crashing your PC.

## Checklist

- [X] Minimal frontend functionality
- [X] Backend add, delete and fetch endpoints 
- [X] Display a part of the AI output in the frontend
- [X] Migrate to kubernetes (k3s)
- [ ] Prettify the frontend
