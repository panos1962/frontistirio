all:
	@echo "make { status | diff | commit | push | pull | dbrefresh | test }"

status:
	@git status

diff:
	@git diff

commit:
	@git commit -m "modifications" .

push:
	@git push

git:
	@if git commit -m "modifications" .; then git push; else exit 0; fi

pull:
	@git pull

dbrefresh:
	@bash database/dbcreate.sh && bash database/dbload.sh

test:
	bash local/test.sh
