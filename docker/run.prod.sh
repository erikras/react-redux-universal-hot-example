#! /usr/bin/env sh

docker run -it \
  --expose=8080 \
  -p 8080:8080 -p 3030:3030 \
  react-redux-feathers \
  npm start
