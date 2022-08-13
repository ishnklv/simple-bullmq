module.exports = {
  redisConfiguration: {
    connection: {
      host: 'localhost',
      port: 6379,
    }
  },
  queueConfig: {
    name: 'emailSchedule',
    defaultDelay: 5000,
  },
  workerConfig: {
    emailJobName: 'email',
  },
  emailConfig: {
    defaultEmail: 'a.ishenkulov@gmail.com',
    defaultMessage: 'Hello world!',
  }
}
