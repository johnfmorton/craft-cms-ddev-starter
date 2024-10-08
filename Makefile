.PHONY: build dev composer craft pull up install

build: up
	ddev exec npm run build
dev: build
	ddev launch
	ddev exec npm run serve
composer: up
	ddev composer \
		$(filter-out $@,$(MAKECMDGOALS))
craft: up
	ddev exec php craft \
		$(filter-out $@,$(MAKECMDGOALS))
pull: up
	ddev exec bash scripts/pull_assets.sh
	ddev exec bash scripts/pull_db.sh
install: up build
	ddev exec php craft setup/app-id \
		$(filter-out $@,$(MAKECMDGOALS))
	ddev exec php craft setup/security-key \
		$(filter-out $@,$(MAKECMDGOALS))
	ddev exec php craft install \
		$(filter-out $@,$(MAKECMDGOALS))
	ddev exec php craft plugin/install vite
	ddev exec php craft plugin/install ckeditor
	ddev exec php craft plugin/install cookies
	ddev exec php craft plugin/install minify
up:
	if [ ! "$$(ddev describe | grep OK)" ]; then \
        ddev auth ssh; \
        ddev start; \
        ddev composer install; \
        ddev exec npm install; \
    fi
%:
	@:
# ref: https://stackoverflow.com/questions/6273608/how-to-pass-argument-to-makefile-from-command-line
