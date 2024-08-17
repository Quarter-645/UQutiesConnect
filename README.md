# UQutiesConnect
The UQutiesConnect Team's Repository


## To run backend server...
### Locally:
python3 run.py 8000

### On Docker
sudo docker build -t backend .
sudo docker run -d -p 8000:8000 backend


## HOW TO ACCESS DATABASE FOR SQL COMMANDS
### Ubuntu Only:
Access (Use any SQL statements in here you'd like!):
sqlite3 instance/db.sqlite 

List Tables:
.tables 

View Table Schema
.schema TABLE_NAME