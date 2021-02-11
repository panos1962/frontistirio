LOAD DATA LOCAL INFILE 'kathigitis01.tsv'
INTO TABLE `kathigitis`
COLUMNS TERMINATED BY '\t' (
	`id`,
	`egrafi`,
	`eponimo`,
	`onoma`,
	`patronimo`,
	`genisi`
);

LOAD DATA LOCAL INFILE 'mathima01.tsv'
INTO TABLE `mathima`
COLUMNS TERMINATED BY '\t' (
	`id`,
	`perigrafi`,
	`apo`,
	`eos`
);

LOAD DATA LOCAL INFILE 'mathitis01.tsv'
INTO TABLE `mathitis`
COLUMNS TERMINATED BY '\t' (
	`id`,
	`egrafi`,
	`eponimo`,
	`onoma`,
	`patronimo`,
	`genisi`
);

LOAD DATA LOCAL INFILE 'didaskalia01.tsv'
INTO TABLE `didaskalia`
COLUMNS TERMINATED BY '\t' (
	`mathima`,
	`kathigitis`
);

LOAD DATA LOCAL INFILE 'simetoxi01.tsv'
INTO TABLE `simetoxi`
COLUMNS TERMINATED BY '\t' (
	`mathima`,
	`mathitis`
);


LOAD DATA LOCAL INFILE 'xristis01.tsv'
INTO TABLE `xristis`
COLUMNS TERMINATED BY '\t' (
	`login`,
	`onomateponimo`,
	`password`
);

