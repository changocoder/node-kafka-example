const { Kafka } = require("kafkajs");
const config = require("./config/kafkaConnection");

const kafka = new Kafka(config);

const consumer = kafka.consumer({ groupId: "test-group-01" });

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "topic-01", fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      let msg = JSON.parse(message.value);
      console.log({
        "Doing something with the message": topic,
        partition,
        msg,
      });
    },
  });
};
runConsumer().catch(console.error);

