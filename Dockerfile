FROM ubuntu
MAINTAINER Louis Borsu <sat@satprod.net>
 
# install our dependencies and nodejs
# RUN echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list
RUN apt-get update
RUN apt-get install -y software-properties-common python-software-properties git build-essential
RUN apt-add-repository -y ppa:chris-lea/node.js
RUN apt-get update
# RUN apt-get update
RUN apt-get install -y nodejs
 
# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/
 
# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
WORKDIR /opt/app
ADD . /opt/app
 
EXPOSE 3000
 
CMD ["node", "app.js"]