export DIST_DIR ?= ./dist
export SHELL    := $(shell echo $$SHELL) -e -o pipefail
export PATH     := $(PATH):$(shell npm bin)
export APP_ENV  ?=development

dist: clean build-statics build-js build-icons build-css revhash

production:
	APP_ENV=production make build

build-statics:
	cp -R public/* $(DIST_DIR)/

revhash:
	HASH=$$(cat $(DIST_DIR)/assets/app.js | md5) && \
	mv $(DIST_DIR)/assets/app.js $(DIST_DIR)/assets/app-$$HASH.js && \
	perl -i -pe s/app.js/app-$$HASH.js/ dist/index.html

	HASH=$$(cat $(DIST_DIR)/assets/app.css | md5) && \
	mv $(DIST_DIR)/assets/app.css $(DIST_DIR)/assets/app-$$HASH.css && \
	perl -i -pe s/app.css/app-$$HASH.css/ dist/index.html

build-js:
	browserify --extension .hamlc --extension .coffee \
		-g uglifyify \
		-t coffeeify \
		-t yamlify \
		-t [ haml-coffee-browserify ] \
		-t [ envify purge ] \
		-t brfs \
		--debug \
		app/application.coffee | exorcist $(DIST_DIR)/assets/app.js.map | sed '/^\s*$$/d' > $(DIST_DIR)/assets/app.js

build-css:
	node-sass --stdout --output-style $${CSS_OUTPUT_STYLE:-compressed} --include-path vendor/stylesheets app/styles/application.scss | autoprefixer -b 'ios >= 8, android >= 4, ie >=10' > $(DIST_DIR)/assets/app.css

build-icons:
	DIST_DIR='$(DIST_DIR)' node script/build-iconfont.js

live:
	[ -n "$$LIVE_RELOAD" ] && (node script/livereload.js '$(DIST_DIR)/**/*' &) || return 0

serve: DIST_DIR := './tmp/watch-build'
serve: clean build-statics build-icons build-css live
	onchange 'public/**/*' -- make build-statics &
	CSS_OUTPUT_STYLE=expanded onchange 'app/styles/**/*.scss' -- make build-css &
	onchange 'app/styles/icons/*.svg' -- make build-icons &
	watchify -v --extension .hamlc --extension .coffee \
	 -t coffeeify \
	 -t yamlify \
	 -t [ haml-coffee-browserify ] \
	 -t [ envify purge ] \
	 -t brfs \
	 -x bugsnag-js \
	 app/application.coffee -o $(DIST_DIR)/assets/app.js &
	http-server -p 9090 $(DIST_DIR)

watch: serve

test:
	./node_modules/karma/bin/karma start --singleRun
	PRE_BUILT=true rspec

clean:
	rm -rf $(DIST_DIR) && mkdir -p $(DIST_DIR)/assets

.PHONY: clean build-statics build-js build-css build-icons serve watch
.SILENT: serve revhash