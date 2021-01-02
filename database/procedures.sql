DELIMITER $$

CREATE PROCEDURE CONTACTLIST(IN USR VARCHAR(300))
BEGIN
	CREATE TEMPORARY TABLE RES(USERNAME VARCHAR(300), FIRST_NAME VARCHAR(100), LAST_NAME VARCHAR(100), STATUS BOOLEAN, LAST_ONLINE DATETIME, BLOCKED BOOLEAN DEFAULT FALSE);
INSERT INTO RES(USERNAME, FIRST_NAME, LAST_NAME, STATUS, LAST_ONLINE) (SELECT USERNAME, FIRST_NAME, LAST_NAME, STATUS, LAST_ONLINE FROM USERS WHERE USERNAME NOT IN (SELECT USERNAME1 FROM BLOCKED_LIST WHERE USERNAME2 = USR) AND USERNAME != USR);
UPDATE RES SET BLOCKED = TRUE WHERE USERNAME IN (SELECT USERNAME2 FROM BLOCKED_LIST WHERE USERNAME1 = USR);
SELECT * FROM RES;
DROP TABLE RES;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE REGISTER(IN USR VARCHAR(300), IN PASS VARCHAR(50), IN FIRSTNAME VARCHAR(100), IN LASTNAME VARCHAR(100))
BEGIN
INSERT INTO USERS VALUES(USR, PASS, FIRSTNAME, LASTNAME, TRUE, NULL);
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE LOGIN(IN USR VARCHAR(300), IN PASS VARCHAR(50), OUT CHCK BOOLEAN)
BEGIN
	IF (SELECT USERNAME FROM USERS WHERE USERNAME = USR AND PASSWORD = PASS) IS NOT NULL THEN
        SET CHCK = TRUE;
UPDATE USERS SET STATUS = TRUE WHERE USERNAME = USR;
UPDATE MESSAGES SET STATUS = '2' WHERE TO_USER = USR AND STATUS = '1';
END IF;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE LOGOUT(IN USR VARCHAR(300))
BEGIN
	IF (SELECT USERNAME FROM USERS WHERE USERNAME = USR) IS NOT NULL THEN
UPDATE USERS SET STATUS = FALSE, LAST_ONLINE = NOW() WHERE USERNAME = USR;
END IF;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE GETPROFILE(IN USR VARCHAR(300))
BEGIN
SELECT USERNAME, PASSWORD, FIRST_NAME, LAST_NAME FROM USERS WHERE USERNAME = USR;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE EDITPROFILE(IN USEROLD VARCHAR(300),IN USERNEW VARCHAR(300), IN PASS VARCHAR(50), IN FN VARCHAR(100), IN LN VARCHAR(100))
BEGIN
UPDATE USERS SET USERNAME = USERNEW, PASSWORD = PASS, FIRST_NAME = FN, LAST_NAME = LN WHERE USERNAME = USEROLD;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE BLOCKUSER(IN USER1 VARCHAR(300), IN USER2 VARCHAR(300))
BEGIN
INSERT INTO BLOCKED_LIST VALUES(USER1, USER2);
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE UNBLOCKUSER(IN USER1 VARCHAR(300), IN USER2 VARCHAR(300))
BEGIN
INSERT INTO BLOCKED_LIST VALUES(USER1, USER2);
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE SENDMESSAGE(IN FROMUSER VARCHAR(300), IN TOUSER VARCHAR(300), IN MSG LONGTEXT)
BEGIN	#age niaze blocked barrasi sh VA INKE KHODESH NABASHE, ALBATE AGAR AZ CONTACT LIST BARDARE INA CHCK SHODE
	INSERT INTO MESSAGES(FROM_USER, TO_USER, TEXT, DATETIME, STATUS) VALUES(FROMUSER, TOUSER, MSG, NOW(), '1');
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE DELETEMESSAGE(IN MID INT)
BEGIN
UPDATE MESSAGES SET STATUS = '4' WHERE MSGID = MID;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE EDITMESSAGE(IN MID INT, IN MSG LONGTEXT)
BEGIN
UPDATE MESSAGES SET TEXT = MSG, DATETIME = NOW() WHERE MSGID = MID;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE GETHISTORY(IN FROMUSER VARCHAR(300), IN TOUSER VARCHAR(300))
BEGIN
SELECT * FROM MESSAGES WHERE FROM_USER = FROMUSER AND TO_USER = TOUSER;
END $$

DELIMITER ;

