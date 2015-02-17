.PHONY: build run test xpi install

build: data/destinyreddit.js

run: build test
	cfx run --profiledir=./profile

test: build
	cfx test

xpi: build test
	cfx xpi

install: build xpi
	open -a Firefox destinyreddit.xpi
