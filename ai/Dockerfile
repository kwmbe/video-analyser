FROM ubuntu:latest

RUN apt-get update
RUN apt install inotify-tools bash ffmpeg git python3-pip python3 curl tar -yq
WORKDIR /app

RUN git clone https://github.com/byjlw/video-analyzer.git .
RUN pip install -e . --break-system-packages
RUN curl -fsSL https://ollama.com/download/ollama-linux-amd64.tgz -o ollama-linux-amd64.tgz
RUN tar -C /usr -xzf ollama-linux-amd64.tgz
# RUN ollama serve > /dev/null 2>&1 &
# COPY ollama.service /etc/systemd/system/ollama.service
# RUN systemctl daemon-reload
# RUN systemctl enable ollama
# RUN ollama pull llama3.2-vision

COPY watcher.sh .
RUN chmod +x watcher.sh

CMD ["./watcher.sh"]
