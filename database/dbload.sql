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

LOAD DATA LOCAL INFILE 'mathima.tsv'
INTO TABLE `kathigitis`
COLUMNS TERMINATED BY '\t' (
	`id`,
	`perigrafi`,
	`apo`,
	`eos`
);
