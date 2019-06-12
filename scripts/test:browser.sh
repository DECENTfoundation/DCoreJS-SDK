docker-compose -f ./test-dcore-node/docker-compose.yml up -d --build
karma start
docker-compose -f ./test-dcore-node/docker-compose.yml down
