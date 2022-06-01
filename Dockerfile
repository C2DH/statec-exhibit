FROM node:16-alpine as builder

ARG GIT_TAG
ARG GIT_BRANCH
ARG GIT_REVISION
ARG PUBLIC_LOCATION_ORIGIN

WORKDIR /statec-exhibit

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY public ./public
COPY src ./src

ENV NODE_ENV production
ENV NODE_OPTIONS --max_old_space_size=4096

ENV REACT_APP_GIT_TAG=${GIT_TAG}
ENV REACT_APP_GIT_BRANCH=${GIT_BRANCH}
ENV REACT_APP_GIT_REVISION=${GIT_REVISION}
ENV REACT_APP_PUBLIC_LOCATION_ORIGIN=${PUBLIC_LOCATION_ORIGIN}

RUN yarn build
RUN yarn setup-qr-codes

FROM busybox
WORKDIR /statec-exhibit
COPY --from=builder /statec-exhibit/build ./
