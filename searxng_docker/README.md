# How to enable the searx search engine in your instance

## Introduction

This document describes how to enable the searx search engine in your instance.

## Requirements

- docker
- docker-compose

## Steps

1. Open terminal and navigate to the searxng_docker directory.
```bash
cd searxng_docker
```

2. Create folder `searxng`
```bash
mkdir searxng
```

3. run docker compose
```bash
docker-compose up -d
```

4. in `searxng` folder, you will see `settings.yml` file. Open it and add/change the following
```yaml
...
search:
...
  formats:
    - html
    - json
...
```

5. Restart the searxng container
```bash
docker-compose restart <container_name>
```

as for the provided `docker-compose.yml` file, the container name is `searxng`. so
```bash
docker-compose restart searxng
```