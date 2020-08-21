#!/bin/bash

set -e
DIR=$(dirname $( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd ))

git checkout master $DIR/docker $DIR/client $DIR/server $DIR/db $DIR/.dockerignore $DIR/.gitignore $DIR/.gitattributes $DIR/README.md
