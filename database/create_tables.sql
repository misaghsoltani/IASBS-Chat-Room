CREATE TABLE USERS(
                      USERNAME VARCHAR(300) NOT NULL,
                      PASSWORD VARCHAR(50) NOT NULL,
                      FIRST_NAME VARCHAR(100) NOT NULL,
                      LAST_NAME VARCHAR(100) NOT NULL,
                      STATUS BOOLEAN NOT NULL,
                      LAST_ONLINE DATETIME,
                      PRIMARY KEY(USERNAME)
);

CREATE TABLE BLOCKED_LIST(
                             USERNAME1 VARCHAR(300) NOT NULL,
                             USERNAME2 VARCHAR(300) NOT NULL,
                             PRIMARY KEY(USERNAME1, USERNAME2),
                             FOREIGN KEY(USERNAME1) REFERENCES USERS(USERNAME),
                             FOREIGN KEY(USERNAME2) REFERENCES USERS(USERNAME)
);

CREATE TABLE MESSAGES(
                         MSGID INT NOT NULL AUTO_INCREMENT,
                         FROM_USER VARCHAR(300) NOT NULL,
                         TO_USER VARCHAR(300) NOT NULL,
                         TEXT LONGTEXT,
                         DATETIME DATETIME NOT NULL,
                         STATUS CHAR(1) NOT NULL,
                         PRIMARY KEY(MSGID),
                         FOREIGN KEY(FROM_USER) REFERENCES USERS(USERNAME),
                         FOREIGN KEY(TO_USER) REFERENCES USERS(USERNAME)
);