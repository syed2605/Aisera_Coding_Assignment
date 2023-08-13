const fs = require('fs');


function processLogs(logs) {
    const taskDuration = {};

    for (const log of logs) {
        let [timestamp, userId, taskId, eventType] = log;
        const eventTime = new Date(parseInt(timestamp.replace(/"/g, '')) * 1000);
        eventType = eventType.replace(/"\r/g,'');
        eventType = eventType.replace(/"/g,'');
        // console.log(timestamp,userId,taskId,eventType,eventTime,"logg")
        // console.log(eventType,"eventype");
        if (eventType == " Task Started") {
            console.log(taskDuration,"taskDurtnINNNNN111111111111111")
            taskDuration[`${userId}-${taskId}`] = { start: eventTime };
        } else if (eventType == " Task Stopped" || eventType == " Task Completed") {
            console.log(taskDuration,"taskDurtnINNNNN")
            if (taskDuration[`${userId}-${taskId}`]) {
                const start = taskDuration[`${userId}-${taskId}`].start;
                const end = eventTime;
                const duration = (end - start) / 1000;
                
                if (!isNaN(duration)) {
                    taskDuration[`${userId}-${taskId}`].duration = (taskDuration[`${userId}-${taskId}`].duration || 0) + duration;
                }
            }
        }
    }
    console.log(taskDuration,"tddd");

    return taskDuration;
}

function main() {
    const csvData = fs.readFileSync('sample_dataset.csv', 'utf8');
    const logs = csvData.split('\n').slice(1).map(row => row.split(','));
    // console.log(logs,"log");
    const taskDuration = processLogs(logs);

    console.log("User ID\tTask ID\tTime Spent (seconds)");
    // console.log(taskDuration,"drr");
    for (const key in taskDuration) {
        const [userId, taskId] = key.split('-');
        const duration = taskDuration[key].duration.toFixed(2);
        console.log(`${userId}\t${taskId}\t${duration}`);
    }
    const csvHeading = "User ID,\tTask ID,\tTime Spent for task (seconds)";
    const csvvData = Object.entries(taskDuration)
    .map(([taskId, taskInfo]) => {
      const { duration } = taskInfo;
    //   console.log(taskInfo,taskId,"taskInfooooooooooo");
      return `${taskId},\t${duration}`;
    })
    .join('\n');
  
  // Write the CSV data to a file
  fs.writeFileSync('sample_dataset1_Result.csv', `${csvHeading}\n${csvvData}`, (err) => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log('Task data has been written to sample_dataset1_Result.csv');
    }
  });
}

main();
