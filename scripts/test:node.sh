docker-compose up -d
mocha 'test/**/*.test.ts'
docker-compose down
