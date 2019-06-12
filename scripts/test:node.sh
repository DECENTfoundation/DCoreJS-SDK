docker-compose -f ./test-dcore-node/docker-compose.yml up -d --build
mocha 'test/**/*.test.ts'
docker-compose -f ./test-dcore-node/docker-compose.yml down