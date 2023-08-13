const fs = require('fs');


function processLogs(logs) {
    const taskDuration = {};

 for (const log of logs) {
    let [timestamp, userId, taskId, eventType] = log;
    const eventTime = new Date(parseInt(timestamp.replace(/"/g, '')) * 1000);
    eventType = eventType.replace(/"\r/g, '');
    eventType = eventType.replace(/"/g, '');

    if (eventType == " Task Started") {
        taskDuration[`${userId}-${taskId}`] = { start: eventTime };
    } else if (eventType == " Task Stopped" || eventType == " Task Completed") {
        taskDuration[`${userId}-${taskId}`] = { ...taskDuration[`${userId}-${taskId}`] ,stop: eventTime };
        if (taskDuration[`${userId}-${taskId}`]) {
            const start = taskDuration[`${userId}-${taskId}`].start;
            if (start !== undefined) {
                const end = eventTime;
                const duration = (end - start) / 1000;
                taskDuration[`${userId}-${taskId}`].duration = (taskDuration[`${userId}-${taskId}`].duration || 0) + duration;
            } else {
                console.log(`Warning: No corresponding "Task Started" event found for Task ${taskId} by User ${userId}.`);// Giving warning and updating task time if has possibity with below code .
            }
        }
    }
 }
 for (const key in taskDuration) {
    const [userId, taskId] = key.split('-');
    const taskEntry = taskDuration[key];
    // console.log(taskEntry,"taskkkkkkentryy");
    if (taskEntry.start && !taskEntry.duration && !taskEntry.stop) {
        // If task has start time but no duration, updating end time based on the next task's start time.
        const taskNumber = taskId.substring(2);
        // console.log(taskNumber,"tasknumber");
        const nextTaskKey = `${userId}- T0${parseInt(taskNumber) + 1}`;
        // console.log(nextTaskKey,"nextTaskKey");
        if (taskDuration[nextTaskKey] && taskDuration[nextTaskKey].start) {
            const end = taskDuration[nextTaskKey].start;
            taskDuration[key].stop = end;
            taskDuration[key].duration = (end - taskEntry.start) / 1000;
            taskDuration[`${userId}-${taskId}`] = { ...taskDuration[`${userId}-${taskId}`] ,remark: "Task Stop event not found so taken next task start as stop time"};
        }
    }
    if (taskEntry.stop && !taskEntry.duration && !taskEntry.start) {
        // If task has stop time but no duration, update start time based on the prev task's end time.
        const taskNumber = taskId.substring(2);
        // console.log(taskNumber,"tasknumber");
        const nextTaskKey = `${userId}- T0${parseInt(taskNumber) - 1}`;
        // console.log(nextTaskKey,"nextTaskKey");
        if (taskDuration[nextTaskKey] && taskDuration[nextTaskKey].stop) {
            const start = taskDuration[nextTaskKey].stop;
            taskDuration[key].start = start;
            taskDuration[key].duration = (taskEntry.stop - start) / 1000;
            taskDuration[`${userId}-${taskId}`] = { ...taskDuration[`${userId}-${taskId}`] ,remark: "Task Started event not found so taken previous task end as start time"};
        }
    }
 }

 // Calculate Average Duration for Tasks with Missing subsequent end and start times of same userID
 for (const key in taskDuration) {
    const [userId, taskId] = key.split('-');
    const taskEntry = taskDuration[key];
    if (taskEntry.duration===undefined) {
        // console.log("innnnnnnnnnnnnnnnnnnn",userId,taskId);
        const taskNumber = taskId.substring(2);
        // console.log(taskNumber,"tasknumber");
        const nextTaskKey = `${userId}- T0${parseInt(taskNumber) + 1}`;
        if (taskDuration[nextTaskKey] && taskDuration[nextTaskKey].stop) {
            // console.log("innnnnnnnnnnnnnnnnnnn");
            const start1 = taskEntry.start;
            // console.log(start1.getTime(),"stttttttttttrrrrrrrrrrrrrrrttttttttt1111111111111111111111")
            const totalDuration=(taskDuration[nextTaskKey].stop-start1)/1000;
            // console.log(totalDuration,"taskDurationnnnnnnnnnnnn");
            const end1=new Date(start1.getTime()+ (((totalDuration)/2)*1000));
            // console.log(end1,"enddddddd111111111111111111111111111111111111111")
            // const end1=start1+;
            taskDuration[key].stop=end1;
            taskDuration[key].duration=totalDuration/2;
            taskDuration[nextTaskKey].start=end1;
            taskDuration[nextTaskKey].duration=totalDuration/2;
            taskDuration[nextTaskKey] = { ...taskDuration[nextTaskKey] ,remark: "Average Duration for Tasks taken due to Missing previous task end time and this task start time"};
            taskDuration[key] = { ...taskDuration[key] ,remark: "Average Duration for Tasks taken due to Missing prsent task end time and this next task start time"};
        }
    }
 }

    // console.log(taskDuration,"tdd1qww");

    return taskDuration;
}

function main() {
    const csvData = fs.readFileSync('sample_dataset2.csv', 'utf8');
    const logs = csvData.split('\n').slice(1).map(row => row.split(','));
    // console.log(logs,"log");
    const taskDuration = processLogs(logs);

    console.log("User ID\tTask ID\tStart Time\tStop Time\tTime Spent for task (seconds)\tRemarks");
    // console.log(taskDuration,"drr");
    for (const key in taskDuration) {
        const [userId, taskId] = key.split('-');
        let {duration,start,stop,remark} = taskDuration[key];
        if (remark===undefined) remark="No Remarks";
        console.log(`${userId},\t${taskId},\t${start},\t${stop},\t${duration},\t${remark}`);
    }
    const csvHeading = "User ID,\tTask ID,\tStart Time,\tStop Time,\tTime Spent for task (seconds),\tRemarks";
    const csvvData = Object.entries(taskDuration)
    .map(([taskId, taskInfo]) => {
      const { start, stop, duration, remark } = taskInfo;
    //   console.log(taskInfo,taskId,"taskInfooooooooooo");
      return `${taskId},\t${start},\t${stop},\t${duration},\t${remark || 'No remarks'}`;
    })
    .join('\n');
  
  // Write the CSV data to a file
  fs.writeFileSync('sample_dataset2_Result.csv', `${csvHeading}\n${csvvData}`, (err) => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log('\nTask data has been written to sample_dataset2_Result.csv');
    }
  });
    
}

main();
