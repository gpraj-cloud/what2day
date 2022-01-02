let dt = new Date();
/* --------------------------- */
//reusable-functions

const hide = (target) => {
  target.classList.add("is-hidden");
};
const show = (target) => {
  target.classList.remove("is-hidden");
};
const toggle = (target) => {
  target.classList.toggle("is-hidden");
};

/* 
let hideOther = (request, target) =>{
  let request = document.querySelector(request);
  let target = document.querySelector(target);
  request.addEventListener("click", function(){
    hide(target);
  })
}

let showOther = (request, target) =>{
  let request = document.querySelector('"'+request+'"');
  let target = document.querySelector('"'+target+'"');
  request.addEventListener("click", function(){
    show(target);
  })
} */

let hideOneShowOne = (request, targetHide, targetShow) => {
  request.addEventListener("click", function () {
    hide(targetHide) & show(targetShow);
  });
};

const getTime = (separator) => {
  let separateWith = separator == null ? ":" : separator;
  let dt = new Date();

  if (dt.getHours() > 0 && dt.getHours() < 10) {
    var hourNow = "0" + dt.getHours();
  } else if (dt.getHours() > 12) {
    var hourNow = dt.getHours() - 12;
    if (hourNow > 0 && hourNow < 10) {
      var hourNow = "0" + hourNow;
    }
  } else {
    var hourNow = "12";
  }

  let minuteNow = dt.getMinutes() >= 0 && dt.getMinutes() < 10 ? "0" + dt.getMinutes() : "" + dt.getMinutes();

  let noonNow = dt.getHours() < 12 ? "AM" : "PM";

  let getTime = hourNow + separateWith + minuteNow + " " + noonNow;
  return getTime;
};

/* --------------------------- */

//flyNote

function flyNote(note) {
  setTimeout(() => {
    let flyNote = document.querySelector(".flyNote");
    let flyNoteContent = document.querySelector(".flyNote > .flyNote-content");
    flyNote.style.display = "block";
    flyNoteContent.innerHTML = note;
    setTimeout(() => {
      for (let fly = 9; fly >= 0; fly--) {
        let flying = fly / 100;
        if (flying !== 0) {
          flyNote.style.opacity = flying;
        }
      }
      setTimeout(() => {
        flyNote.style.display = "none";
      }, 2000);
    }, 1500);
  }, 400);
}

//main-section
let mainSection = document.querySelector(".main-section");

//task-list
let taskList = document.querySelector(".task-list");
let taskDefault = document.querySelector(".task-default");
let taskImportant = document.querySelector(".task-important");
let taskSecondary = document.querySelector(".task-secondary");
let taskSnoozed = document.querySelector(".task-snoozed");
let taskFinished = document.querySelector(".task-finished");
let taskDeleted = document.querySelector(".task-deleted");

//task-form
let textForm_Open = document.querySelector(".task-actions-open");
let textForm_Close = document.querySelector(".cancel");
let textForm = document.querySelector(".text-task");
let time = document.getElementById("time");
let title = document.getElementById("title");
let message = document.getElementById("message");
let date = document.getElementById("date");
let important = document.getElementById("important");

//task-actions
let taskActions_Open = document.querySelector(".task-actions-open");
let taskActions_Close = document.querySelector(".task-actions-close");
let taskActions_Group = document.querySelector(".task-actions-group");
let taskActions = document.querySelector(".task-actions");

//task-sorting
let sortBox = document.querySelector(".sort-box");

//menu-actions
let settings_Open = document.querySelector(".im-gear");
let settings_Close = document.querySelector(".close-settings");
let settings_Group = document.querySelector(".all-settings");

//settings-options
let innerSettings = document.querySelector("#inner-settings");
let singleSettings = document.querySelectorAll("#single-setting");
let singleSettingOpen = document.querySelectorAll("#single-setting-open");
let singleSettingClose = document.querySelectorAll("#single-setting-close");
let brandBlock = document.querySelector(".brand-block");

//task-list-height
// taskList.style.height = screen.availHeight + "px";
mainSection.style.height = screen.availHeight + "px";

//plus-button-click-even
hideOneShowOne(taskActions_Open, taskActions_Open, taskActions_Group);
hideOneShowOne(taskActions_Close, taskActions_Group, taskActions_Open);

//text-form-events
textForm_Open.onclick = () => {
  show(textForm), hide(taskActions_Group), hide(taskActions_Open);
};
textForm_Close.onclick = () => {
  window.location = "index.html";
};

//bulma-calendar-events
const calendars = bulmaCalendar.attach('[type="date"]');
calendars.forEach((calendar) => {
  calendar.on("select", (date) => {
    console.log(date);
  });
});
const element = document.querySelector("#my-element");
if (element) {
  element.bulmaCalendar.on("select", (datepicker) => {
    console.log(datepicker.data.value());
  });
}

//setting-button-click-event
settings_Open.onclick = () => {
  show(settings_Group), hide(taskActions), hide(taskList);
};

//settings-actions
for (let settingsKey = 0; settingsKey < singleSettings.length; settingsKey++) {
  singleSettingOpen[settingsKey].addEventListener("click", function () {
    hide(innerSettings) & show(singleSettings[settingsKey]) & hide(brandBlock);
  });
  singleSettingClose[settingsKey].addEventListener("click", function () {
    hide(singleSettings[settingsKey]) & show(innerSettings) & show(brandBlock);
  });
}

window.addEventListener("scroll", function () {
  if (window.scrollY > 5) {
    taskActions.style.opacity = "0.3";
    taskActions_Open.onclick = () => {
      taskActions.style.opacity = "1";
    };
  } else {
    taskActions.style.opacity = "1";
  }
});

//task-tune-options

function audioOptions(audio, audioBtn) {
  for (let audioKey in audio) {
    let isPlaying = true;
    audioBtn[audioKey].onclick = () => {
      if (isPlaying == true) {
        audio[audioKey].play();
        audioBtn[audioKey].classList.replace("im-play", "im-pause");
        //console.log(imAudio[audioKey].currentTime);
        isPlaying = false;
      } else {
        audio[audioKey].pause();
        audioBtn[audioKey].classList.replace("im-pause", "im-play");
        isPlaying = true;
      }
    };
  }
}
let imAudio = document.querySelectorAll(".important-audio > audio");
let imAudioBtn = document.querySelectorAll(".important-audio > i");
audioOptions(imAudio, imAudioBtn);
let secAudio = document.querySelectorAll(".secondary-audio > audio");
let secAudioBtn = document.querySelectorAll(".secondary-audio > i");
audioOptions(secAudio, secAudioBtn);

let radioBtn = document.querySelectorAll("input[type='radio']");
for (let key = 0; key < radioBtn.length; key++) {
  radioBtn[key].onchange = () => {
    flyNote("will update after");
  };
}

function clearTasks(clear) {
  storeKey = localStorage.length;
  while (storeKey >= 0) {
    let getKey = "taskKey_" + storeKey;
    let localKey = localStorage.getItem(getKey);
    if (localKey !== null) {
      let addRegEx = /\s*<\s*/;
      let localData = localKey.split(addRegEx);
      switch (clear) {
        case "finished": {
          if (localData[6] == "true") {
            localStorage.removeItem(getKey);
            flyNote("cleared!");
          }
          break;
        }
        case "deleted": {
          if (localData[7] == "true") {
            localStorage.removeItem(getKey);
            flyNote("cleared!");
          }
          break;
        }
        case "all": {
          localStorage.removeItem(getKey);
          flyNote("cleared!");
          break;
        }
      }
    }
    else{
      flyNote("nothing to clear");
    }
    storeKey--;
  }
}
/* ----------------x----------------- */

function changeDarkMode(dtTag, srTag) {
  let localKey = localStorage.getItem("settings");
  if (localKey !== null) {
    let addRegEx = /\s*>\s*/;
    let localData = localKey.split(addRegEx);
    if (localData[0] == "dark") {
      let greyDark = "has-background-grey-darker";
      document.querySelector("body").classList.add(greyDark);
      mainSection.classList.add(greyDark);
      settings_Group.classList.replace("has-background-white", greyDark);
      for (let key = 0; key < singleSettingClose.length; key++) {
        singleSettingClose[key].classList.replace(
          "has-background-info-light",
          "has-background-grey"
        );
      }

      let taskQuickActions = document.querySelectorAll(".task-quick-actions");

      function taskDark(dtTag, srTag) {
        for (let key = 0; key < dtTag.length; key++) {
          srTag[key].classList.replace(
            "has-background-info-light",
            "has-background-grey"
          );
          srTag[key].classList.replace("has-text-grey", "has-text-white-ter");

          dtTag[key].ontoggle = () => {
            srTag[key].classList.replace(
              "has-background-info-light",
              "has-background-grey-lighter"
            );
            taskQuickActions[key].classList.replace(
              "has-background-link-light",
              "has-background-grey-light"
            );
          };
        }
      }
      taskDark(dtTag, srTag);

      document
        .querySelector(".drag-panel")
        .classList.add("has-background-grey");
      let dragPanelLinks = document.querySelectorAll(".drag-panel > a");
      for (let key = 0; key < dragPanelLinks.length; key++) {
        dragPanelLinks[key].classList.add("has-text-white-ter");
      }

      settings_Group.classList.add("has-text-white-ter");
      let singleSettingClose_Icon = document.querySelectorAll(".close-icon");
      for (let key = 0; key < singleSettingClose_Icon.length; key++) {
        singleSettingClose_Icon[key].classList.replace(
          "has-text-info",
          "has-text-white-ter"
        );
      }
      let labels = document.querySelectorAll("label");
      for (let key = 0; key < labels.length; key++) {
        labels[key].classList.add("has-text-white-ter");
      }

      let onOffSwitch = document.querySelectorAll("input[type='radio']");
      for (let key = 0; key < onOffSwitch.length; key++) {
        onOffSwitch[key].setAttribute("id", "on-off-switch-dark");
      }

      textForm.classList.replace(
        "has-background-white",
        "has-background-grey-darker"
      );
      document
        .querySelector("#important")
        .classList.replace("has-text-info", "has-text-white-ter");
      document
        .querySelector(".important-text")
        .classList.add("has-text-white-ter");
    }
  }
}

function changeHiddenToDark() {
  let imp = document.querySelector(".task-important");
  let imp_dtTag = document.querySelectorAll(".task-important > details");
  let imp_srTag = document.querySelectorAll(
    ".task-important > details > summary"
  );
  let sec = document.querySelector(".task-secondary");
  let sec_dtTag = document.querySelectorAll(".task-secondary > details");
  let sec_srTag = document.querySelectorAll(
    ".task-secondary > details > summary"
  );
  let sn = document.querySelector(".task-snoozed");
  let sn_dtTag = document.querySelectorAll(".task-snoozed > details");
  let sn_srTag = document.querySelectorAll(".task-snoozed > details > summary");
  if (imp.classList.contains("is-hidden") !== true) {
    changeDarkMode(imp_dtTag, imp_srTag);
  }
  if (sec.classList.contains("is-hidden") !== true) {
    changeDarkMode(sec_dtTag, sec_srTag);
  }
  if (sn.classList.contains("is-hidden") !== true) {
    changeDarkMode(sn_dtTag, sn_srTag);
  }
}

/* ----------------x----------------- */

//default-settings
function getDefaultSettings() {
  //theme-data
  let changeTheme = document.getElementsByName("theme");
  for (let key in changeTheme) {
    if (changeTheme[key].checked == true) {
      var themeData = changeTheme[key].getAttribute("data-value");
    }
  }

  //audio-data
  let impTune = document.getElementsByName("important-tones");
  for (let key in impTune) {
    if (impTune[key].checked == true) {
      var impTuneData = impTune[key].getAttribute("data-value");
    }
  }
  let secTune = document.getElementsByName("secondary-tones");
  for (let key in secTune) {
    if (secTune[key].checked == true) {
      var secTuneData = secTune[key].getAttribute("data-value");
    }
  }

  //snooze-data
  let snoozeTime = document.getElementsByName("duration");
  for (let key in snoozeTime) {
    if (snoozeTime[key].checked == true) {
      var snoozeData = snoozeTime[key].getAttribute("data-value");
    }
  }

  //auto-deletion-data
  let fnAuto = document.getElementsByName("finished");
  for (let key in fnAuto) {
    if (fnAuto[key].checked == true) {
      var fnAutoData = fnAuto[key].getAttribute("data-value");
    }
  }
  let dlAuto = document.getElementsByName("deleted");
  for (let key in dlAuto) {
    if (dlAuto[key].checked == true) {
      var dlAutoData = dlAuto[key].getAttribute("data-value");
    }
  }

  let settingsData = {
    getTheme: themeData,
    getStarTone: impTuneData,
    getStarlessTone: secTuneData,
    getSnoozeTime: snoozeData,
    getAutoFinish: fnAutoData,
    getAutoDelete: dlAutoData,
    getStrict: false,
  };

  uploadDefaultSettings(settingsData);
}

settings_Close.onclick = () => getDefaultSettings();

function uploadDefaultSettings(settingsData) {
  let defaultSettings = [];
  defaultSettings =
    settingsData.getTheme +
    ">" +
    settingsData.getStarTone +
    ">" +
    settingsData.getStarlessTone +
    ">" +
    settingsData.getSnoozeTime +
    ">" +
    settingsData.getAutoFinish +
    ">" +
    settingsData.getAutoDelete +
    ">" +
    settingsData.getStrict;
  localStorage.setItem("settings", defaultSettings);
  window.location = "index.html";
}

function updateCurrentSettings() {
  let localKey = localStorage.getItem("settings");
  if (localKey !== null) {
    let addRegEx = /\s*>\s*/;
    let localData = localKey.split(addRegEx);

    if (localData[0]) {
      let theme = document.getElementsByName("theme");
      for (let key = 0; key < theme.length; key++) {
        theme[key].checked = false;
        let currentTheme = theme[key].getAttribute("data-value");
        if (localData[0] == currentTheme) {
          theme[key].checked = true;
        }
      }
    }

    if (localData[1] && localData[2]) {
      let impTune = document.getElementsByName("important-tones");
      for (let key = 0; key < impTune.length; key++) {
        impTune[key].checked = false;
        let currentImp = impTune[key].getAttribute("data-value");
        if (localData[1] == currentImp) {
          impTune[key].checked = true;
        }
      }
      let secTune = document.getElementsByName("secondary-tones");
      for (let key = 0; key < secTune.length; key++) {
        secTune[key].checked = false;
        let currentSec = secTune[key].getAttribute("data-value");
        if (localData[2] == currentSec) {
          secTune[key].checked = true;
        }
      }
    }

    if (localData[3]) {
      let snooze = document.getElementsByName("duration");
      for (let key = 0; key < snooze.length; key++) {
        snooze[key].checked = false;
        let currentSnooze = snooze[key].getAttribute("data-value");
        if (localData[3] == currentSnooze) {
          snooze[key].checked = true;
        }
      }
    }

    if (localData[4] && localData[5]) {
      let fnAuto = document.getElementsByName("finished");
      for (let key = 0; key < fnAuto.length; key++) {
        fnAuto[key].checked = false;
        let currentFnAuto = fnAuto[key].getAttribute("data-value");
        if (localData[4] == currentFnAuto) {
          fnAuto[key].checked = true;
        }
      }

      let dlAuto = document.getElementsByName("deleted");
      for (let key = 0; key < dlAuto.length; key++) {
        dlAuto[key].checked = false;
        let currentDlAuto = dlAuto[key].getAttribute("data-value");
        if (localData[5] == currentDlAuto) {
          dlAuto[key].checked = true;
        }
      }
    }
  }
}
updateCurrentSettings();

/*-------------x------------ */
//non-reusable-functions

function snoozedTaskActions(taskId, taskData) {
  let settingsData = localStorage.getItem("settings");
  if (settingsData !== null) {
    let addRegEx = /\s*>\s*/;
    settingsData = settingsData.split(addRegEx);
    let snoozeTime = Math.round(settingsData[3]);
    snoozeTime = snoozeTime * 60 * 1000;
    localStorage.setItem("snoozed", taskId);
    setTimeout(() => {
      function checkSnoozed() {
        let getSnoozed = localStorage.getItem("snoozed");
        let getTaskData = localStorage.getItem(getSnoozed);
        let addRegEx = /\s*<\s*/;
        getTaskData = getTaskData.split(addRegEx);

        taskCompletedMessage(taskId, getTaskData);
        //updateChanges(taskId, "snooze", false);
        console.log(taskId, getTaskData);
        setTimeout(checkSnoozed, 20000);
      }
      checkSnoozed()
    }, 10000);
  }
}

function checkingCurrentTask() {
  let getDate = dt.getMonth() + 1 + "/" + dt.getDate() + "/" + dt.getFullYear();
  for (let getKey = 0; getKey < localStorage.length; getKey++) {
    let localKey = "taskKey_" + getKey;
    if (localStorage.getItem(localKey) !== null) {
      let checkTask = localStorage.getItem(localKey);
      let addRegEx = /\s*<\s*/;
      let localData = checkTask.split(addRegEx);
      if (localData[6] === "false" && localData[7] === "false") {
        if (localData[2] === getDate) {
          if (localData[3] == getTime()) {
            if (localData[4] === "true") {
                if (localData[5] === "true") {
                  snoozedTaskActions(localKey, localData)
                }
                taskCompletedMessage(localKey, localData)
            }else{
              if (localData[5] === "true") {
                snoozedTaskActions(localKey, localData)
              }
              else{
                taskCompletedMessage(localKey, localData)
              }
            }
          } else {
            console.log(`wait for your moment..`);
            document
              .querySelector(".task-completed")
              .classList.remove("is-active");
          }
        }
      } else {
        console.log("data deleted or finished");
      }
    }
  }
  setTimeout(checkingCurrentTask, 20000);
}
checkingCurrentTask();

function taskCompletedMessage(localKey, localData) {
  document.querySelector(".task-completed").classList.add("is-active");
  document.querySelector(".task-completed-title").innerHTML = localData[0];
  document.querySelector(".task-completed-content").innerHTML = localData[1];
  let alertTask = document.querySelectorAll(".task-completed-actions");
  for (let alertKey = 0; alertKey < alertTask.length; alertKey++) {
    alertTask[alertKey].onclick = () => {
      if (alertTask[alertKey].textContent == "Finished") {
        updateChanges(localKey, "finished", true);
      } else if (alertTask[alertKey].textContent == "Snooze") {
        updateChanges(localKey, "snooze", true);
      } else {
        updateChanges(localKey, "deleted", true);
        window.location = "index.html";
      }
    };
  }
}

function taskOnToggle(dtTag, srTag, emTag) {
  for (let dtKey = 0; dtKey < dtTag.length; dtKey++) {
    dtTag[dtKey].ontoggle = () => {
      if (dtTag[dtKey].open === true) {
        hide(emTag[dtKey]);
        srTag[dtKey].classList.remove("has-background-info-light");
        srTag[dtKey].classList.remove("has-text-grey");
        dtTag[dtKey].classList.add("is-info");
        dtTag[dtKey].classList.add("mb-4");
      } else {
        show(emTag[dtKey]);
        dtTag[dtKey].classList.remove("is-info");
        dtTag[dtKey].classList.remove("mb-4");
        srTag[dtKey].classList.add("has-text-grey");
        srTag[dtKey].classList.add("has-background-info-light");
      }
    };
  }
}

function validateTextData(taskId) {
  let formElements = [title, message, date, time];
  for (let formKey in formElements) {
    if (formElements[formKey].value !== "") {
      formElements[formKey].classList.remove("is-danger");
      if (formKey == 3) {
        let taskFormData = {
          getTitle: formElements[0].value,
          getMessage: formElements[1].value,
          getDate: formElements[2].value,
          getTime: formElements[3].value,
          getStar: important.checked,
          getSnooze: false,
          getFinished: false,
          getDeleted: false,
          getSubMessage: "message",
          getSubTime: "time",
        };
        
        if (taskId !== undefined) {
          localStorage.removeItem(taskId);
        }
        
        let taskKey = "taskKey_" + localStorage.length;
        uploadTextData(taskKey, taskFormData);
      }
    } else {
      formElements[formKey].classList.add("is-danger");
    }
  }
}

function uploadTextData(storeKey, taskData) {
  let storeValues = [];
  storeValues =
    taskData.getTitle +
    "<" +
    taskData.getMessage +
    "<" +
    taskData.getDate +
    "<" +
    taskData.getTime +
    "<" +
    taskData.getStar +
    "<" +
    taskData.getSnooze +
    "<" +
    taskData.getFinished +
    "<" +
    taskData.getDeleted +
    "<" +
    taskData.getSubMessage +
    "<" +
    taskData.getSubTime;

  localStorage.setItem(storeKey, storeValues);
  window.location = "index.html";
}

function updateChanges(taskId, request, status) {
  function updateReadyState(
    data_0,
    data_1,
    data_2,
    data_3,
    data_4,
    data_5,
    data_6,
    data_7,
    data_8,
    data_9
  ) {
    let storedData = localStorage.getItem(taskId);
    let addRegEx = /\s*<\s*/;
    let retrievedData = storedData.split(addRegEx);

    let taskFormData = {
      getTitle: data_0 !== null ? data_0 : retrievedData[0],
      getMessage: data_1 !== null ? data_1 : retrievedData[1],
      getDate: data_2 !== null ? data_2 : retrievedData[2],
      getTime: data_3 !== null ? data_3 : retrievedData[3],
      getStar: data_4 !== null ? data_4 : retrievedData[4],
      getSnooze: data_5 !== null ? data_5 : retrievedData[5],
      getFinished: data_6 !== null ? data_6 : retrievedData[6],
      getDeleted: data_7 !== null ? data_7 : retrievedData[7],
      getSubMessage: data_8 !== null ? data_8 : retrievedData[8],
      getSubTime: data_9 !== null ? data_9 : retrievedData[9],
    };
    //console.log(taskId, taskFormData);
    uploadTextData(taskId, taskFormData);
  }

  switch (request) {
    case "star": {
      updateReadyState(
        null,
        null,
        null,
        null,
        status,
        null,
        null,
        null,
        null,
        null
      );
      break;
    }

    case "snooze": {
      updateReadyState(
        null,
        null,
        null,
        null,
        null,
        status,
        null,
        null,
        null,
        null
      );
      break;
    }

    case "finished":
      {
        updateReadyState(
          null,
          null,
          null,
          null,
          null,
          null,
          status,
          false,
          null,
          null
        );
      }
      break;
    case "deleted":
      {
        updateReadyState(
          null,
          null,
          null,
          null,
          null,
          null,
          false,
          status,
          null,
          null
        );
      }
      break;
  }
}

function editTask(taskId) {
  let localKey = localStorage.getItem(taskId);
  if (localKey !== null) {
    let addRegEx = /\s*<\s*/;
    let localData = localKey.split(addRegEx);
    title.value = localData[0];
    message.value = localData[1];
    document.querySelector(".datetimepicker-dummy-input").value = localData[2];
    date.value = localData[2];
    time.value = localData[3];
    if (localData[4] == "true") {
      important.checked = true;
    } else {
      important.checked = false;
    }
    show(textForm);
    document.querySelector("#submit").classList.add("is-hidden");
    let updateBtn = document.querySelector("#update");
    updateBtn.classList.remove("is-hidden");
    updateBtn.setAttribute("onclick", `validateTextData('${taskId}')`);
  }
}

function createTextData(taskData, taskId, placeTo) {
  if (taskData[0]) {
    let createDt = document.createElement("details");
    createDt.classList.add("message") & createDt.classList.add("my-1");
    createDt.setAttribute("task-key", taskId);
    let dtSummary =
      "<summary class='message-header has-background-info-light has-text-grey is-radiusless has-text-weight-normal is-size-5 py-4'><p>" +
      taskData[0] +
      "</p><em>2m</em></summary>";
    let dtBody =
      "<div class='message-body is-size-5 py-3 px-4'>" + taskData[1] + "</div>";

    let dtStarData = String.raw`"` + taskId + `"` + String.raw`,"star"`;
    let dtStar =
      taskData[4] == "true"
        ? "<a class='im im-star has-text-link mx-4 is-size-5' href='javascript:updateChanges(" +
          dtStarData +
          ",false)'></a>"
        : "<a class='im im-star-o mx-4 is-size-5' href='javascript:updateChanges(" +
          dtStarData +
          ",true)'></a>";
    let dtSnoozeData = String.raw`"` + taskId + `"` + String.raw`,"snooze"`;
    let dtSnooze =
      taskData[5] == "true"
        ? "<a class='im im-clock has-text-link is-size-5' href='javascript:updateChanges(" +
          dtSnoozeData +
          ",false)'></a>"
        : "<a class='im im-clock-o is-size-5' href='javascript:updateChanges(" +
          dtSnoozeData +
          ",true)'></a>";

    let dtEditData = String.raw`"` + taskId + `"` + String.raw`,"edit"`;
    let dtEdit =
      "<a class='im im-edit is-size-5' href='javascript:editTask(" +
      dtEditData +
      ")'></a>";

    let createSubDt =
      "<!-- <span class='im im-plus-circle is-pulled-right is-size-5 toAdd'></span> -->";
    let dtFooter =
      "<div class='columns is-flex is-align-items-center has-background-link-light px-4 my-1 task-quick-actions'><div class='column pb-1 pt-2'>" +
      dtEdit +
      dtStar +
      dtSnooze +
      "</div><div class='column pb-1 pt-2'>" +
      createSubDt +
      "</div></div>";
    createDt.innerHTML = dtSummary + dtBody + dtFooter;
    placeTo.appendChild(createDt);
  }
}

//important-task
function taskAfterImportant() {
  let taskImportant_dtTag = document.querySelectorAll(
    ".task-important > details"
  );
  let taskImportant_srTag = document.querySelectorAll(
    ".task-important > details > summary"
  );
  let taskImportant_emTag = document.querySelectorAll(
    ".task-important > details > summary > em"
  );
  for (let imKey = 0; imKey < taskImportant_srTag.length; imKey++) {
    let starBtn = document.createElement("span");
    starBtn.setAttribute("class", "im im-star undo-important-task");
    taskImportant_emTag[imKey].innerHTML = "";
    taskImportant_emTag[imKey].appendChild(starBtn);
  }

  let undoTag = document.querySelectorAll(".undo-important-task");
  for (let undoKey in undoTag) {
    undoTag[undoKey].onclick = () => {
      let taskId = taskImportant_dtTag[undoKey].getAttribute("task-key");
      updateChanges(taskId, "star", false);
    };
  }
  taskOnToggle(taskImportant_dtTag, taskImportant_srTag, taskImportant_emTag);
}

//secondary-task
function taskAfterSecondary() {
  let taskSecondary_dtTag = document.querySelectorAll(
    ".task-secondary > details"
  );
  let taskSecondary_srTag = document.querySelectorAll(
    ".task-secondary > details > summary"
  );
  let taskSecondary_emTag = document.querySelectorAll(
    ".task-secondary > details > summary > em"
  );
  for (let imKey = 0; imKey < taskSecondary_srTag.length; imKey++) {
    let starBtn = document.createElement("span");
    starBtn.setAttribute("class", "im im-star-o undo-secondary-task");
    taskSecondary_emTag[imKey].innerHTML = "";
    taskSecondary_emTag[imKey].appendChild(starBtn);
  }

  let undoTag = document.querySelectorAll(".undo-secondary-task");
  for (let undoKey in undoTag) {
    undoTag[undoKey].onclick = () => {
      let taskId = taskSecondary_dtTag[undoKey].getAttribute("task-key");
      updateChanges(taskId, "star", true);
    };
  }
  taskOnToggle(taskSecondary_dtTag, taskSecondary_srTag, taskSecondary_emTag);
}

//snoozed-task
function taskAfterSnoozed() {
  let taskSnoozed_dtTag = document.querySelectorAll(".task-snoozed > details");
  let taskSnoozed_srTag = document.querySelectorAll(
    ".task-snoozed > details > summary"
  );
  let taskSnoozed_emTag = document.querySelectorAll(
    ".task-snoozed > details > summary > em"
  );
  for (let snKey = 0; snKey < taskSnoozed_srTag.length; snKey++) {
    let snoozeBtn = document.createElement("span");
    snoozeBtn.setAttribute("class", "im im-clock undo-snoozed-task");
    taskSnoozed_emTag[snKey].innerHTML = "";
    taskSnoozed_emTag[snKey].appendChild(snoozeBtn);
  }

  let undoTag = document.querySelectorAll(".undo-snoozed-task");
  for (let undoKey in undoTag) {
    undoTag[undoKey].onclick = () => {
      let taskId = taskSnoozed_dtTag[undoKey].getAttribute("task-key");
      updateChanges(taskId, "snooze", false);
    };
  }
  taskOnToggle(taskSnoozed_dtTag, taskSnoozed_srTag, taskSnoozed_emTag);
}

//finished-task
function taskAfterFinished(taskKey) {
  let taskFinished_dtTag = document.querySelectorAll(
    ".task-finished > details"
  );
  let taskFinished_srTag = document.querySelectorAll(
    ".task-finished > details > summary"
  );
  let taskFinished_emTag = document.querySelectorAll(
    ".task-finished > details > summary > em"
  );
  for (let fnKey = 0; fnKey < taskFinished_srTag.length; fnKey++) {
    taskFinished_srTag[fnKey].classList.replace(
      "has-background-info-light",
      "has-background-primary-light"
    );
    let undoBtn = document.createElement("span");
    undoBtn.setAttribute("class", "im im-undo undo-finished-task");
    taskFinished_emTag[fnKey].innerHTML = "";
    taskFinished_emTag[fnKey].appendChild(undoBtn);
  }
  let undoTag = document.querySelectorAll(".undo-finished-task");
  for (let undoKey in undoTag) {
    undoTag[undoKey].onclick = () => {
      let taskId = taskFinished_dtTag[undoKey].getAttribute("task-key");
      updateChanges(taskId, "finished", false);
    };
  }
}

//deleted-task
function taskAfterDeleted() {
  let taskDeleted_dtTag = document.querySelectorAll(".task-deleted > details");
  let taskDeleted_srTag = document.querySelectorAll(
    ".task-deleted > details > summary"
  );
  let taskDeleted_emTag = document.querySelectorAll(
    ".task-deleted > details > summary > em"
  );
  for (let delKey = 0; delKey < taskDeleted_srTag.length; delKey++) {
    taskDeleted_srTag[delKey].classList.replace(
      "has-background-info-light",
      "has-background-danger-light"
    );
    let undoBtn = document.createElement("span");
    undoBtn.setAttribute("class", "im im-undo undo-deleted-task");
    taskDeleted_emTag[delKey].innerHTML = "";
    taskDeleted_emTag[delKey].appendChild(undoBtn);
  }
  let undoTag = document.querySelectorAll(".undo-deleted-task");
  for (let undoKey in undoTag) {
    undoTag[undoKey].onclick = () => {
      let taskId = taskDeleted_dtTag[undoKey].getAttribute("task-key");
      updateChanges(taskId, "deleted", false);
    };
  }
}

//task-update
function showTextData(sortBy) {
  let sortOptions = document.querySelectorAll(".sort-list");
  let storeKey = localStorage.length;

  function taskListOnSort() {
    let listOnSort = document.querySelectorAll(".task-list > div");
    for (let sortKey = 0; sortKey < listOnSort.length; sortKey++) {
      listOnSort[sortKey].classList.add("is-hidden");
      listOnSort[sortKey].innerHTML = "";
    }
    hide(sortBox);
  }

  switch (sortBy) {
    case "important": {
      taskListOnSort();
      taskImportant.classList.remove("is-hidden");
      break;
    }
    case "secondary": {
      taskListOnSort();
      taskSecondary.classList.remove("is-hidden");
      break;
    }
    case "snoozed": {
      taskListOnSort();
      taskSnoozed.classList.remove("is-hidden");
      break;
    }
    case "finished": {
      taskListOnSort();
      taskFinished.classList.remove("is-hidden");
      break;
    }
    case "deleted": {
      taskListOnSort();
      taskDeleted.classList.remove("is-hidden");
      break;
    }
    default: {
      taskListOnSort();
      taskDefault.classList.remove("is-hidden");
      break;
    }
  }

  while (storeKey >= 0) {
    let getKey = "taskKey_" + storeKey;
    let localKey = localStorage.getItem(getKey);
    if (localKey !== null) {
      let addRegEx = /\s*<\s*/;
      let localData = localKey.split(addRegEx);
      switch (sortBy) {
        case "important": {
          if (
            localData[6] !== "true" &&
            localData[7] !== "true" &&
            localData[4] == "true"
          ) {
            createTextData(localData, getKey, taskImportant);
            flyNote("by important");
            taskAfterImportant();
            changeHiddenToDark();
          }
          break;
        }
        case "secondary": {
          if (
            localData[6] !== "true" &&
            localData[7] !== "true" &&
            localData[4] !== "true"
          ) {
            createTextData(localData, getKey, taskSecondary);
            flyNote("by secondary");
            taskAfterSecondary();
            changeHiddenToDark();
          }
          break;
        }
        case "snoozed": {
          if (
            localData[6] !== "true" &&
            localData[7] !== "true" &&
            localData[5] == "true"
          ) {
            createTextData(localData, getKey, taskSnoozed);
            flyNote("by snoozed");
            taskAfterSnoozed();
            changeHiddenToDark();
          }
          break;
        }
        case "finished": {
          if (localData[6] == "true" && localData[7] !== "true") {
            createTextData(localData, getKey, taskFinished);
            taskAfterFinished();
            flyNote("by finished");
          }
          break;
        }
        case "deleted": {
          if (localData[6] !== "true" && localData[7] == "true") {
            createTextData(localData, getKey, taskDeleted);
            taskAfterDeleted();
            flyNote("by deleted");
          }
          break;
        }

        default: {
          if (
            localData[6] !== "true" &&
            localData[7] !== "true" &&
            localData[4] !== null
          ) {
            createTextData(localData, getKey, taskDefault);
          }
          break;
        }
      }
    }
    storeKey--;
  }
}
