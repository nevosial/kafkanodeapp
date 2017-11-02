


//Not using this file anywhere in the node app.


var avro = require('avsc');
var kafka = require('kafka-node');
var HighLevelProducer = kafka.HighLevelProducer;
var KeyedMessage = kafka.KeyedMessage;
var Client = kafka.Client;

//Creating a client.
var client = new Client('localhost:2181', 'my-client-id2', {
  sessionTimeout: 300,
  spinDelay: 100,
  retries: 2
});
// For this demo we just log client errors to the console.
client.on('error', function(error) {
  console.error(error);
});

//Creation of the producer.
var producer = new HighLevelProducer(client);


//Creating the avro schema for usersinfo

var avroSchema = {
   name: 'usersInfo',
   type: 'record',
   "fields" : [{"name" : "name",
                "type" : "string",
               },

                {"name" : "email",
                "type" : "string",
                },

                {"name" : "username",
                "type" : "string",
                },

                {"name" : "password",
                "type" : "string",
                }]
              };

//Creating a avro type from the schema
var type = avro.parse(avroSchema);



var producer = new HighLevelProducer(client);

producer.on('ready', function() {
  // Create message and encode to Avro buffer
  console.log('Inside producer');
  var messageBuffer = type.toBuffer({
    name: req.body.name,
    email: req.params.email,
    username: req.params.username,
    password: req.params.password,
  });

  // Create a new payload
  var payload = [{
    topic: 'signup_response',
    messages: messageBuffer,
    attributes: 1 /* Use GZip compression for the payload */
  }];

  //Send payload to Kafka and log result/error
  producer.send(payload, function(error, result) {
    console.info('Sent payload to Kafka: ', payload);
    if (error) {
      console.error(error);
    } else {
      var formattedResult = result[0]
      console.log('Result: ', result)
    }
  });
}); //end of kafka producer.
