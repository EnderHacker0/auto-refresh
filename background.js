const ALARM_NAME = "refreshAlarm";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "start") {
    const intervalMinutes = message.interval / 60000;
    console.log(`Started with interval ${message.interval} ms（about ${intervalMinutes} mins）`);
    chrome.alarms.create(ALARM_NAME, { periodInMinutes: intervalMinutes });
  } else if (message.action === "stop") {
    console.log("stopped");
    chrome.alarms.clear(ALARM_NAME);
  }
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === ALARM_NAME) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.reload(tabs[0].id);
      }
    });
  }
});
