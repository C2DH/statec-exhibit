BUILD_TAG ?= latest
BUILD_IMAGE ?= c2dhunilu/statec-exhibit
NGINX_PORT ?= 8080

run-dev:
	REACT_APP_GIT_TAG=$(shell git describe --tags --abbrev=0 HEAD) \
	REACT_APP_GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD) \
	REACT_APP_GIT_REVISION=$(shell git rev-parse --short HEAD) \
	yarn start

run-build-noindex:
	REACT_APP_GIT_TAG=$(shell git describe --tags --abbrev=0 HEAD) \
	REACT_APP_GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD) \
	REACT_APP_GIT_REVISION=$(shell git rev-parse --short HEAD) \
	yarn build-noindex

build-docker-image:
	docker build -t ${BUILD_IMAGE}:${BUILD_TAG} \
	--build-arg GIT_TAG=$(shell git describe --tags --abbrev=0 HEAD) \
	--build-arg GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD) \
	--build-arg GIT_REVISION=$(shell git rev-parse --short HEAD) .

run-dev-docker-image:
	export NGINX_PORT=${NGINX_PORT} && \
	docker-compose down --remove-orphans && \
	docker-compose -f docker-compose-dev.yml up --build --always-recreate-deps

run-docker-image:
	export NGINX_PORT=${NGINX_PORT} && \
	docker-compose down --remove-orphans && \
	docker-compose rm -f && \
	docker-compose build --no-cache
	docker-compose up --build --no-cache
