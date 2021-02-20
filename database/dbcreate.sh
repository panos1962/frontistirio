#!/usr/bin/env bash

progname="$(basename $0)"

[ -z "${FRONTISTIRIO_BASEDIR}" ] && {
	echo "${progname}: FRONTISTIRIO_BASEDIR: not set" >&2
	exit 2
}

usage() {
	echo "usage: ${progname} [-p]" >&2
	exit 1
}

errs=
mysqlprompt=

[ -z "${MYSQL_PWD}" ] &&
mysqlprompt="yes"

while getopts ":p" opt
do
	case "${opt}" in
	p)
		mysqlopts="${mysqlopts} -p"
		mysqlprompt="yes"
		;;
	?)
		echo "${progname}: -$OPTARG; invalid option" >&2
		errs=1
		;;
	esac
done

[ -n "${errs}" ] && usage

shift $(expr $OPTIND - 1)
[ $# -gt 0 ] && usage

sesami="${FRONTISTIRIO_BASEDIR}/local/secret/sesami.txt"

[ -r "${sesami}" ] || {
	echo "${progname}: ${sesami}: cannot read" >&2
	exit 3
}

[ -z "${mysqlprompt}" ] &&
[ -z "${MYSQL_PWD}" ] &&
mysqlopts="${mysqlopts} -p"

pass="$(cat "${sesami}")"
sed "s;__PASS__;${pass};g" "${FRONTISTIRIO_BASEDIR}/database/schema.sql" |
mysql -u root ${mysqlopts}
