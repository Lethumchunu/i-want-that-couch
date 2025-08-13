// 🛋️ State Management
let savingsGoals = [];
let currentGoalIndex = 0;

// 🚀 Launch Animation Trigger
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});


// 🎹 Keyboard Shortcuts
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (key === "Enter") {
    topUp();
  }

  if (key === "Escape") {
    clearGoal();
  }
});


// 🎤 Motivational Slang Engine
const slangPhrases = [
  "Another R20? You're on your billionaire arc, mfethu.",
  "Stacking cash like Lego bricks 🧱💸.",
  "You dropped coins like a boss. Respect! 👑",
  "Couch money climbing—let 'em talk while you save 🛋️🗣️.",
  "This top-up’s got generational wealth vibes 📈.",
  "You're saving with spice, mfethu.🔥",
  "Ay, you ain't just saving—you’re building an empire! 🏰",
  "Goal smashed harder than a weekend groove 🍻💰.",
  "One step closer, one flex louder 💪💸.",
  "Call SARS—you're moving like a tycoon. 📞💼"
];

// 💡 Tip of the Day
const tipText = document.getElementById("tipText");

const tips = [
  "Automate your savings to stay consistent, even on tough months.",
  "Set realistic goals and celebrate small wins.",
  "Track your spending to find hidden savings.",
  "Use visuals to stay motivated — like a couch countdown!",
];

function showDailyTip() {
  const tipText = document.getElementById("tipText");
  if (tipText) {
    tipText.textContent = tips[Math.floor(Math.random() * tips.length)];
  }
}

function createGoal() {
  const name = document.getElementById("goalName").value;
  const amount = parseFloat(document.getElementById("goalAmount").value);
  const deadline = document.getElementById("goalDeadline").value;

  if (!name || isNaN(amount) || amount <= 0 || !deadline) {
    return alert("Please enter a valid name, amount, and deadline.");
  }

  localStorage.setItem("goalName", name);
  localStorage.setItem("goalAmount", amount);
  localStorage.setItem("goalDeadline", deadline);
  localStorage.setItem("savedAmount", 0);

  alert("Goal saved successfully!");
}


function showSlangToast(text) {
  const existingToast = document.getElementById("slang-toast");
  if (existingToast) existingToast.remove();

  const toast = document.createElement("div");
  toast.id = "slang-toast";
  toast.innerText = text;
  toast.style.position = "fixed";
  toast.style.bottom = "30px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "#ff8e3c";
  toast.style.color = "white";
  toast.style.padding = "12px 20px";
  toast.style.borderRadius = "10px";
  toast.style.fontWeight = "bold";
  toast.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

function triggerMilestoneAnimation(progress) {
  const emojiDisplay = document.getElementById("emojiDisplay");
  if ([25, 50, 75].includes(Math.floor(progress))) {
    emojiDisplay.classList.add("milestone");
    setTimeout(() => {
      emojiDisplay.classList.remove("milestone");
    }, 1000);
  }
}

function showMilestoneToast(progress) {
  let message = "";
  if (progress >= 100) {
    message = "Couch secured! That lounge is LOUD 🔥🛋️";
  } else if (progress >= 75) {
    message = "You’re basically sitting on it already 👀💸";
  } else if (progress >= 50) {
    message = "Halfway there — this couch is calling 🛋️📞";
  } else if (progress >= 25) {
    message = "We warming up, don’t stop now 🌡️🛋️";
  } else {
    message = slangPhrases[Math.floor(Math.random() * slangPhrases.length)];
  }
  showSlangToast(message);
}


// 💰 Top Up Goal
function topUp() {
  const depositInput = document.getElementById("depositAmount");
  const depositAmount = parseFloat(depositInput.value);

  if (isNaN(depositAmount) || depositAmount <= 0) {
    alert("Enter a valid deposit amount");
    return;
  }

  let currentSaved = parseFloat(localStorage.getItem("savedAmount")) || 0;
  let newSaved = currentSaved + depositAmount;
  localStorage.setItem("savedAmount", newSaved);

  const totalAmount = parseFloat(localStorage.getItem("goalAmount"));
  const progress = Math.min((newSaved / totalAmount) * 100, 100);
  updateProgressBar(progress);
  updateEmoji(newSaved, totalAmount);
  updateUI();

  // 🎉 Emoji Feedback + Milestone Animation
  triggerMilestoneAnimation(progress);

  // 🔥 Slang Toast
  showMilestoneToast(progress);

  if (progress >= 100) {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });
}


  // 🧾 Transaction History
  const transactionList = JSON.parse(localStorage.getItem("transactions")) || [];
  transactionList.push({ amount: depositAmount, time: new Date().toLocaleString() });
  localStorage.setItem("transactions", JSON.stringify(transactionList));

  depositInput.value = "";
  depositInput.focus();

}



// 😎 Emoji Feedback Logic
function updateEmoji(current, target) {
  const emojiDisplay = document.getElementById("emojiDisplay");
  emojiDisplay.style.visibility = "visible";

  const percentage = (current / target) * 100;

  if ([25, 50, 75].includes(Math.floor(percentage))) {
    emojiDisplay.classList.add("milestone");
    setTimeout(() => {
    emojiDisplay.classList.remove("milestone");
    }, 1000);
  }


  if (percentage >= 100) {
    emojiDisplay.innerText = "🎉🔥💪"; // Goal crushed
  } else if (percentage >= 75) {
    emojiDisplay.innerText = "😎🧃🪙"; // Almost there!
  } else if (percentage >= 50) {
    emojiDisplay.innerText = "👍😌🚆"; // Halfway vibes
  } else if (percentage >= 25) {
    emojiDisplay.innerText = "🙌🎨🫱"; // Making progress
  } else {
    emojiDisplay.innerText = "💸🛋️😅"; // Getting started
  }

      // 👉 Bounce effect
  emojiDisplay.classList.add("bounce");
  setTimeout(() => emojiDisplay.classList.remove("bounce"), 400);

}

// 🟣 Animate Progress Bar
function animateProgressBar(current, target) {
  const progress = Math.min((current / target) * 100, 100);
  document.getElementById("progressFill").style.width = `${progress}%`;
}

// 🧼 Update UI Stub
function updateUI() {
  const name = localStorage.getItem("goalName") || "No goal set";
  const amount = parseFloat(localStorage.getItem("goalAmount")) || 0;
  const saved = parseFloat(localStorage.getItem("savedAmount")) || 0;
  const deadline = localStorage.getItem("goalDeadline") || "N/A";

  document.getElementById("goalTitleDisplay").innerText = `${name} – Deadline: ${deadline}`;
  document.getElementById("savedAmount").innerText = saved.toFixed(2);
  document.getElementById("totalAmount").innerText = amount.toFixed(2);
  document.getElementById("tipText").innerText = "Save smart!";

  updateEmoji(saved, amount);
  updateProgressBar((saved / amount) * 100);
  renderHistory();
}

function renderHistory() {
  const list = document.getElementById("transactionHistory");
  if (!list) return; // Prevent error if element is missing

  list.innerHTML = "";
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  transactions.forEach(t => {
    const item = document.createElement("li");
    item.innerText = `Deposited R${t.amount} at ${t.time}`;
    list.appendChild(item);
  });
}


function updateProgressBar(percent) {
  const fill = document.getElementById("progressFill");
  fill.style.width = percent + "%";
  fill.style.transition = "width 0.5s ease, background-color 0.3s ease";
  fill.setAttribute("data-label", `${Math.floor(percent)}%`);

  if (percent < 33) {
    fill.style.backgroundColor = "red";
  } else if (percent < 66) {
    fill.style.backgroundColor = "orange";
  } else {
    fill.style.backgroundColor = "green";
  }
}

function clearGoal() {
  if (confirm("Are you sure you want to clear your goal and history?")) {
    localStorage.clear();
    updateUI();
    alert("Goal cleared. Fresh start!");
    location.reload(); // 🔄 Refresh the page
  }
}

function handleNavToast() {
  const btn = document.querySelector('.nav-button');
  btn.style.pointerEvents = 'none';

  showSlangToast("Let’s chase that couch money! 🛋️💸");

  setTimeout(() => {
    window.location.href = "tracker.html";
  }, 1000);
}



  // ✅ Automatically sync progress bar on page load
  window.onload = () => {
  updateUI(); // ensures all visual components reflect the current state
  renderHistory();
  showDailyTip();
};


