use wmd;
DROP TABLE IF EXISTS wormholes;
CREATE TABLE  wormholes (
  `a` int(10) unsigned NOT NULL default '0',
  `b` int(10) unsigned NOT NULL default '0',
  `time` float NOT NULL default '1.0',
  `space` float NOT NULL default '1.0',
  PRIMARY KEY  (`a`,`b`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
-- spiral stair
INSERT INTO wormholes (a, b, time, space) 
       VALUES (478, 358, 0.2, 0.001);
-- north fire stair
INSERT INTO wormholes (a, b, time, space) 
       VALUES (502, 435, 0.2, 0.001);
-- west fire stair
INSERT INTO wormholes (a, b, time, space) 
       VALUES (307, 222, 0.2, 0.001);
INSERT INTO wormholes (a, b, time, space) 
       VALUES (307, 445, 0.2, 0.001);
-- missing sensors in back hall on 8
INSERT INTO wormholes (a, b, time, space) 
       VALUES (445, 222, 0.5, 0.2);

