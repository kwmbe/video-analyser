#!/bin/bash
set -e

# ensure folder exists
mkdir -p "/app/uploads/"

# run ollama
ollama serve > /dev/null 2>&1 &  
until ollama pull llama3.2-vision
do
  sleep 1
done

inotifywait -m /app/uploads -e create -r --include '.*\.mp4$' | while read -r dirname action file; do
  echo "analyzing $dirname$file"
  video-analyzer $dirname$file
  mv ./output/analysis.json "${dirname}${file}.txt" # laptop crashed testing this - but should work
done
