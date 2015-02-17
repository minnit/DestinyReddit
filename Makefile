.PHONY: build clean deploy run

build:
	mkdir -p {Chrome,Firefox}/data
	gcp -al common/*{.js,.css} Firefox/data/
	gcp -al common/*{.js,.css} Chrome/data/

clean:
	rm -rf {Chrome,Firefox}/data
	rm -rf Firefox/profile
	rm -f destinyreddit.zip
	rm -f destinyreddit.xpi

deploy: build
	cd Chrome && zip destinyreddit.zip -r . -x \*.swp
	mv Chrome/destinyreddit.zip .
	$(MAKE) -C Firefox xpi
	mv Firefox/destinyreddit.xpi .

run:
	$(MAKE) -C Firefox $@
