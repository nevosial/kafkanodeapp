### Description

A simple login app wired with Kafka to log user activity.

### Platform

Nodejs
Kafka 2.11
Mongo
mongoose 4.10.8

### Working

1. New user registration.
Whenever a new user registers to the app, the kafka topic logs the details of the registered user once the registration is successful.


2. Login/Logout.
Wnenever a user logs into the application; the login log entry is produced to a kafka topic.
Wnenever a user logs out of the application; the logout log entry is produced to a kafka topic.

This way any consumer can consume these logs for analytics/reporting.

### Demo

1. Install all the dependencies
> $ npm install

2. Start zookeeper server.
> $ bin/zookeeper-server-start.sh config/zookeeper.properties

3. Start the kafka server.
> $ bin/kafka-server-start.sh config/server.properties

4. Start the application.
> $ npm start

5. Start the consumer for topic for signup
> $ bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic signup_response

6. Start the consumer for topic for loggedusers
> $ bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic loggedusers

7. Watch the signup_response consumer once the new user successfully registers.

8. Watch the loggedusers consumer console once a user logs in/out.


##### Notes

Code does not support higher version of mongoose.
