# samdist.mk

WEBPACK = ./node_modules/.bin/webpack
dist_path = dist

dist: bundle.js
	mkdir -p dist
	cp -a index.xhtml bundle.js static $(dist_path)

.PHONY: dist

bundle.js: src package.json
	$(WEBPACK)
