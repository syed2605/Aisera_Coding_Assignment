

# TaskTrack Log Analysis

This Node.js script processes log data from the TaskTrack application, analyzes the time spent on each task by each user, identifies discrepancies in time tracking, and proposes solutions to address these issues.

## Table of Contents

- [Description](#description)
- [Usage](#usage)
- [Approach](#approach)
- [Issues and Solutions](#issues-and-solutions)
- [Testing and Debugging](#testing-and-debugging)
- [Results](#results)
- [Submission](#submission)
- [Evaluation](#evaluation)

## Description

TaskTrack is a time tracking and task management application. The goal of this script is to accurately calculate and report the time spent on each task by each user, considering various scenarios where log data might be missing or inconsistent.

## Usage

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/syed2605/tasktrack-log-analysis.git
   ```

2. Navigate to the project directory:

   ```bash
   cd tasktrack-log-analysis
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Run the script for normal approach:

   ```bash
   node time.js
   ```
   You can able to see the output in sample_dataset1_Result.csv file.

   Run the script for abnormal cases:

   ```bash
   node time2.js
   ```
    You can able to see the output in sample_dataset2_Result.csv file.


## Approach

1. Read log data from a CSV file and parse it into a structured format.
2. Process each log entry, identifying "Task Started," "Task Stopped," or "Task Completed" events.
3. Calculate time spent on each task by each user, considering missing start or end times.
4. Generate a detailed report including User ID, Task ID, Start Time, Stop Time, Time Spent for task (seconds), and Remarks.

## Issues and Solutions

- **Issue**: Missing "Task Started" event for a task.
  - **Solution**: Warn and update task time based on the next task's start time.

- **Issue**: Missing "Task Stopped" event for a task.
  - **Solution**: Update task time based on the previous task's end time.

- **Issue**: Missing start and stop times for subsequent tasks by the same user.
  - **Solution**: Calculate the average duration and distribute it between the tasks.

## Testing and Debugging

The script was tested with various datasets to ensure accurate time tracking. Debugging involved identifying and addressing issues related to missing start or end times, as well as validating calculations.

## Results

The script successfully calculates and reports the time spent on each task by each user, considering potential discrepancies and missing data. The generated report includes task details and remarks explaining any adjustments made.

You can able to see the results in sample_dataset1_Result.csv file & sample_dataset2_Result.csv file.

Certainly! Here's the revised "Submission" and "Evaluation" sections for your README file:

## Submission

For my solution, I ensured that I have followed these steps:

1. Write a well-commented script:
   - [time.js](time.js) for the normal approach.
   - [time2.js](time2.js) for considering abnormal cases.

2. And I also Created a detailed report in this readme file outlining my thought process, identified issues, proposed solutions for abnormal cases, and testing/debugging as with the help of     attached abnormal dummy csv file.

## Evaluation

By considering the evaluation criteria, Herby I followed:

1. **Code Quality**: Well maintained and organising code quality.
2. **Problem Solving Skills**:  Identified and address potential issues in the dataset and provided result for those as well.
3. **Communication**: In this report I included clear explanations of my approach, identified issues, and proposed solutions.
4. **Debugging Skills**: You can able to see the debugging skills in m code itself.
5. **Results**: The accuracy of my program in calculating time spent on each task by each user, considering various scenarios will generate a Result csv file. Pls refer for solution.

Hereby, I declare that I have maintained well-versed code & explained and provided results as well.

---

Pls be Feel free to contact me, if any details required for this project.

## Thanks
Thank you for giving me an opprtunity to participate in this task.
