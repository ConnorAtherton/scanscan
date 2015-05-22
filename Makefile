SRC = $(wildcard src/*.js)
LIB = $(SRC:src/%.js=lib/%.js)
BIN = ./node_modules/.bin

BABEL := $(BIN)/babel
BABELRUN := $(BIN)/babel-node

lib: $(LIB)
lib/%.js: src/%.js
	@mkdir -p $(@D)
	@$(BABEL) $< -w -o $@

test:
	@$(BABELRUN) ./test/test.js

.PHONY: all test lib
