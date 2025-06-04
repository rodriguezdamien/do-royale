#!/bin/sh
dir=$(pwd -P)
docker build -t battle-royale-front . --build-arg BASEDIR=$dir
docker run -p 127.0.0.1:5000:5000 battle-royale-front
