document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('toggleRefresh');
  const intervalInput = document.getElementById('intervalInput');

  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      const intervalMs = parseInt(intervalInput.value, 10);
      if (isNaN(intervalMs) || intervalMs < 1) {
        alert("Enter a valid number");
        toggle.checked = false;
        return;
      }
      chrome.runtime.sendMessage({ action: "start", interval: intervalMs });
    } else {
      chrome.runtime.sendMessage({ action: "stop" });
    }
  });
});
