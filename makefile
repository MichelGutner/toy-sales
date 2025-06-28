up:
	cd ./toy-sales-api && docker-compose up -d

down:
	cd ./toy-sales-api && docker-compose down

build:
	docker-compose build

init:
	cd ./toy-sales-api && yarn start:dev
