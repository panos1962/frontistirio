#!/usr/bin/env bash

progname="$(basename $0)"

[ -z "${FRONTISTIRIO_BASEDIR}" ] && {
	echo "${progname}: FRONTISTIRIO_BASEDIR: not set" >&2
	exit 2
}

usage() {
	echo "usage: ${progname}" >&2
	exit 1
}

errs=

while getopts ":" opt
do
	case "${opt}" in
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

pass="$(cat "${sesami}")"
sed "s;__PASS__;${pass};g" "${FRONTISTIRIO_BASEDIR}/database/schema.sql" |
mysql -u root -p
