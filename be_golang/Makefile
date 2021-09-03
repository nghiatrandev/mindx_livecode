up:
	docker-compose up -d

down:
	docker-compose down

clear:
	docker-compose down -v

migrate:
	migrate --path migrations --database "postgresql://postgres:postgres@localhost:5432/postgres?sslmode=disable" -verbose up