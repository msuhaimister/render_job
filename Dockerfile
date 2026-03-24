FROM debian:bookworm-slim

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       ca-certificates \
       bash \
       postgresql-client \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Render Cron Job will override with its own command.
CMD ["bash", "-lc", "echo 'Container ready for cron command execution.'"]
