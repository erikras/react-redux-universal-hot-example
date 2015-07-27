#! /usr/bin/env bash

git log | git shortlog -s -n | tee $(dirname $0)/../tmp/authors.txt
