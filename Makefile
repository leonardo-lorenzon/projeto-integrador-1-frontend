.PHONY: build start

# Build application image
build:
	docker compose build

# Start application
start:
	docker compose up
