BUILD_TAG ?= latest
BUILD_IMAGE ?= c2dhunilu/statec-exhibit
NGINX_PORT ?= 8080
PUBLIC_LOCATION_ORIGIN ?= http://localhost:8080

run-dev:
	REACT_APP_GIT_TAG=$(shell git describe --tags --abbrev=0 HEAD) \
	REACT_APP_GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD) \
	REACT_APP_GIT_REVISION=$(shell git rev-parse --short HEAD) \
	yarn start


run-build:
	REACT_APP_GIT_TAG=$(shell git describe --tags --abbrev=0 HEAD) \
	REACT_APP_GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD) \
	REACT_APP_GIT_REVISION=$(shell git rev-parse --short HEAD) \
	REACT_APP_PUBLIC_LOCATION_ORIGIN=${PUBLIC_LOCATION_ORIGIN} yarn setup-qr-codes && \
	yarn build

run-build-noindex:
	REACT_APP_GIT_TAG=$(shell git describe --tags --abbrev=0 HEAD) \
	REACT_APP_GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD) \
	REACT_APP_GIT_REVISION=$(shell git rev-parse --short HEAD) \
	REACT_APP_PUBLIC_LOCATION_ORIGIN=${PUBLIC_LOCATION_ORIGIN} yarn setup-qr-codes && \
	yarn build-noindex

build-docker-image:
	docker build -t ${BUILD_IMAGE}:${BUILD_TAG} \
	--build-arg GIT_TAG=$(shell git describe --tags --abbrev=0 HEAD) \
	--build-arg GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD) \
	--build-arg GIT_REVISION=$(shell git rev-parse --short HEAD) \
	--build-arg PUBLIC_LOCATION_ORIGIN=${PUBLIC_LOCATION_ORIGIN} .
