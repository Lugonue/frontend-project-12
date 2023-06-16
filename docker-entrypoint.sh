#!/bin/sh

npx start-server -s ./frontend/build &
cd ./frontend && npm start
