const { Kafka } = require("kafkajs");
const config = require("./config/kafkaConnection");
const kafka = new Kafka(config);
const producer = kafka.producer();
const runProducer = async () => {
  const message = {
    nTransOrderID: 1000,
    sTransOrderCode: "TO-101212",
  }; // 3.Connecting producer to kafka broker.
  await producer.connect();
  for (let i = 0; i < 10; i++) {
    console.log(JSON.stringify(message));
    await producer.send({
      topic: "topic-01",
      messages: [{ value: JSON.stringify(message) }],
    });
  }
};
runProducer().catch(console.error);
