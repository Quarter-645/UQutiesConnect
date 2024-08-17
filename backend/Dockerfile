FROM ubuntu:22.04

# Installing dependencies for running a python application
RUN apt-get update
RUN apt-get install -y python3 python3-pip wget && rm -rf /var/lib/apt/lists/*

# Set the working directory to /app
WORKDIR /app

# Copy the rest of the application
COPY . /app/.

# Install the dependencies (Seperated to improve caching)
RUN pip3 install --no-cache-dir Flask==2.3.2 
RUN pip3 install --no-cache-dir requests==2.28.1 
RUN pip3 install --no-cache-dir sqlalchemy==1.4.47 
RUN pip3 install --no-cache-dir Flask-SQLAlchemy==3.0.3


# Expose the port (e.g., 8000)
EXPOSE 8000

# Run the Python script on the specified port (e.g., 8000)
CMD ["python3", "run.py", "8000"]