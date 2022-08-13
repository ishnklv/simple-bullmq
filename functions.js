const { queueConfig, workerConfig } = require('./config');

exports.sendEmail = function(job) {
  const { email, message } = job;
  console.log(`Message ${message} was sent to ${email}.`);
}

exports.addEmailJob = async function(queue, {
  email,
  message,
  delay = queueConfig.defaultDelay
}) {
  if (!queue) {
    throw new Error('not found queue');
  }

  if (!email) {
    throw new Error('email not been empty!');
  }

  await queue.add(workerConfig.emailJobName, { email, message }, { delay});
}
