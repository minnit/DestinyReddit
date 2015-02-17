.PHONY: build run test xpi install

build:
	$(MAKE) -C .. $@

run: build test
	cfx run --profiledir=./profile

test: build
	cfx test

xpi: build test
	cfx xpi

install: build xpi
	open -a Firefox destinyreddit.xpi
