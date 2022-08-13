const { Queue, Worker } = require('bullmq');
const { redisConfiguration, queueConfig, emailConfig } = require("./config");
const { sendEmail, addEmailJob} = require('./functions');
const { COMPLETED, FAILED } = require('./constants');

async function initQueue () {
  const queue = new Queue(queueConfig.name, {
    connection: redisConfiguration.connection,
  });

  await addEmailJob(queue, {
    email: emailConfig.defaultEmail,
    message: emailConfig.defaultMessage,
  });

  const worker = new Worker(queueConfig.name, sendEmail, {
    connection: redisConfiguration.connection,
  });

  worker.on(COMPLETED, function (job) {
    console.info(`${job.id} has completed!`);
  });

  worker.on(FAILED, function (job, err) {
    console.error(`${job.id} has failed with ${err.message}`);
  });
}

initQueue().then(() => console.info('Queue initialized'));

