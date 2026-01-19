const fs = require("fs");

const createLog = ({ user, task, activities = [] }) => {
    const timestamp = new Date().toISOString(); 
    const path = require("path");
    let log = "";

    if (task === "login") {
        log = `[${timestamp}] USER: ${user} | ACTION: LOGIN | ACTIVITIES: ${activities.join(", ")}\n`;
    }
    else if (task === "logout") {
        log = `[${timestamp}] USER: ${user} | ACTION: LOGOUT\n`;
    }
    else if (task === "page") {
        log = `[${timestamp}] USER: ${user} | ACTION: PAGE_ACCESS | PAGE: ${activities.join(", ")}\n`;
    }
    else {
        log = `[${timestamp}] USER: ${user} | ACTION: UNKNOWN_TASK (${task})\n`;
    }

    
    fs.appendFileSync(path.join(__dirname, "../logs/activity.log"), log);
};

module.exports = createLog;