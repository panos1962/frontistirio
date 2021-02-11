DROP DATABASE IF EXISTS `frontistirio`
;

CREATE DATABASE IF NOT EXISTS `frontistirio`
DEFAULT CHARSET = utf8
DEFAULT COLLATE = utf8_general_ci
;

COMMIT WORK
;

USE `frontistirio`
;

SET default_storage_engine = INNODB
;

CREATE TABLE `kathigitis` (
	`id`		SMALLINT NOT NULL AUTO_INCREMENT COMMENT 'ID καθηγητή',
	`egrafi`	DATE NOT NULL COMMENT 'Ημερομηνία εγγραφής',
	`eponimo`	CHARACTER(30) NOT NULL COMMENT 'Επώνυμ καθηγητή',
	`onoma`		CHARACTER(20) NOT NULL COMMENT 'Όνομα καθηγητή',
	`patronimo`	CHARACTER(20) NOT NULL COMMENT 'Πατρώνυμο καθηγητή',
	`genisi`	DATE NOT NULL COMMENT 'Ημερομηνία γέννησης',
	`apoxorisi`	DATE NULL DEFAULT NULL COMMENT 'Ημερομηνία αποχώρησης',

	PRIMARY KEY (
		`id`
	) USING BTREE
)

COMMENT 'Πίνακας καθηγητών'
;

CREATE TABLE `mathitis` (
	`id`		MEDIUMINT NOT NULL AUTO_INCREMENT COMMENT 'ID μαθητή',
	`egrafi`	DATE NOT NULL COMMENT 'Ημερομηνία εγγραφής',
	`eponimo`	CHARACTER(30) NOT NULL COMMENT 'Επώνυμο μαθητή',
	`onoma`		CHARACTER(20) NOT NULL COMMENT 'Όνομα μαθητή',
	`patronimo`	CHARACTER(20) NOT NULL COMMENT 'Πατρώνυμο μαθητή',
	`genisi`	DATE NOT NULL COMMENT 'Ημερομηνία γέννησης',
	`diagrafi`	DATE NULL DEFAULT NULL COMMENT 'Ημερομηνία διαγραφής μαθητή',

	PRIMARY KEY (
		`id`
	) USING BTREE
)

COMMENT 'Πίνακας μαθητών'
;

CREATE TABLE `mathima` (
	`id`		MEDIUMINT NOT NULL AUTO_INCREMENT COMMENT 'ID μαθήματος',
	`perigrafi`	VARCHAR(128) NOT NULL COMMENT 'Περιγραφικός τίτλος',
	`apo`		DATE NOT NULL COMMENT 'Ημερομηνία έναρξης κύκλου μαθημάτων',
	`eos`		DATE NOT NULL COMMENT 'Ημερομηνία λήξης κύκλου μαθημάτων',

	PRIMARY KEY (
		`id`
	) USING BTREE
)

COMMENT 'Πίνακας μαθημάτων'
;

CREATE TABLE `didaskalia` (
	`mathima`	MEDIUMINT NOT NULL COMMENT 'ID μαθήματος',
	`kathigitis`	SMALLINT NOT NULL COMMENT 'ID καθηγητή',

	UNIQUE INDEX (
		`mathima`,
		`kathigitis`
	) USING BTREE
)

COMMENT 'Πίνακας διδασκόντων ανά μάθημα'
;

CREATE TABLE `simetoxi` (
	`mathima`	MEDIUMINT NOT NULL COMMENT 'ID μαθήματος',
	`mathitis`	MEDIUMINT NOT NULL COMMENT 'ID μαθητή',

	UNIQUE INDEX (
		`mathima`,
		`mathitis`
	) USING BTREE
)

COMMENT 'Πίνακας διδασκόντων ανά μάθημα'
;

CREATE TABLE `xristis` (
	`login`		CHARACTER(32) NOT NULL COMMENT 'Login name',
	`onomateponimo`	CHARACTER(64) NOT NULL COMMENT 'Ονοματεπώνυμο',
	`password`	CHARACTER(40) NOT NULL COMMENT 'Password in SHA-1',

	PRIMARY KEY (
		`login`
	) USING BTREE
)

COMMENT 'Πίνακας χρηστών της εφαρμογής'
;

COMMIT WORK
;

ALTER TABLE `didaskalia` ADD FOREIGN KEY (
	`mathima`
) REFERENCES `mathima` (
	`id`
) ON UPDATE CASCADE ON DELETE CASCADE
;

ALTER TABLE `didaskalia` ADD FOREIGN KEY (
	`kathigitis`
) REFERENCES `kathigitis` (
	`id`
) ON UPDATE CASCADE ON DELETE CASCADE
;

ALTER TABLE `simetoxi` ADD FOREIGN KEY (
	`mathima`
) REFERENCES `mathima` (
	`id`
) ON UPDATE CASCADE ON DELETE CASCADE
;

ALTER TABLE `simetoxi` ADD FOREIGN KEY (
	`mathitis`
) REFERENCES `mathitis` (
	`id`
) ON UPDATE CASCADE ON DELETE CASCADE
;

COMMIT WORK
;

DROP USER IF EXISTS 'frontistirio'@'localhost'
;

CREATE USER 'frontistirio'@'localhost' IDENTIFIED BY '__PASS__'
;

GRANT SELECT, INSERT, UPDATE, DELETE
ON frontistirio.* TO 'frontistirio'@'localhost'
;

COMMIT WORK
;
