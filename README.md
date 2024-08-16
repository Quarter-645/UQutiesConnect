# UQutiesConnect
The UQutiesConnect Team's Repository

# Run Frontend
cd userinterface
sudo docker build -t frontend .
sudo docker run -it -p 3000:3000 frontend npm start