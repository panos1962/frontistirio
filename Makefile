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

pull:
	@git pull

dbrefresh:
	@bash database/dbcreate.sh && bash database/dbload.sh

test:
	bash local/test.sh
