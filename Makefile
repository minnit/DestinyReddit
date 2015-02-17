.PHONY: build clean deploy run

run:
	$(MAKE) -C Firefox $@

build:
	mkdir -p {Chrome,Firefox}/data/common/
	gcp -al common/*{.js,.css} Firefox/data/common/
	gcp -al common/*{.js,.css} Chrome/data/common/

clean:
	rm -rf {Chrome,Firefox}/data/common/
	rm -rf Firefox/profile
	rm -f destinyreddit.zip
	rm -f destinyreddit.xpi

deploy: build
	cd Chrome && zip destinyreddit.zip -r . -x \*.swp
	mv Chrome/destinyreddit.zip .
	$(MAKE) -C Firefox xpi
	mv Firefox/destinyreddit.xpi .
