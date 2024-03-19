.PHONY: build start

# Build application image
build:
	npm install --dev
	docker build -t projeto-integrador-frontend -f development.Dockerfile .

# Start application
start:
	docker run --rm -it -p 3000:3000 -w /app --mount type=bind,source=$$(pwd),target=/app projeto-integrador-frontend
