install:
	npm ci

publish:
	npm publish --dry-run

gendiff:
	npm bin/gendiff.js

lint:
	npx eslint .

test:
	npx jest
	