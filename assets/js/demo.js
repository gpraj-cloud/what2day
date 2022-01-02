let dt = new Date();
let getHour = () => {
  let hour = dt.getHours();
  if (hour > 0 && hour < 10) {
    var hourNow = "0" + hour;
  } else if (hour > 12) {
    var hourNow = hour - 12;
    if (hourNow > 0 && hourNow < 10) {
      var hourNow = "0" + hourNow;
    }
  } else {
    var hourNow = "12";
  }
  return hourNow;
};
let getMinute = () => {
  let minute = dt.getMinutes();
  let minuteNow = minute >= 0 && minute < 10 ? "0" + minute : "" + minute;
  return minuteNow;
};
let getNoon = () => {
  let noon = dt.getHours();
  let noonNow = noon < 12 ? "AM" : "PM";
  return noonNow;
};
let get_time_modal = document.querySelector('input[data-type="time-modal"]');
get_time_modal.hidden = true;
let modalDiv = document.createElement("div");
modalDiv.classList.add("time-modal");
get_time_modal.after(modalDiv);
let modalSelector = document.createElement("div");
modalSelector.classList.add("modal-selector");
modalDiv.appendChild(modalSelector);
let modalIcon = document.createElement("span");
modalIcon.classList.add("modal-icon");
modalIcon.innerHTML = "O";
let modalInput = document.createElement("input");
modalInput.setAttribute("type", "button");
modalInput.classList.add("modal-input");
modalInput.value = "--:-- --";
modalSelector.appendChild(modalIcon);
modalSelector.appendChild(modalInput);
let modal = document.createElement("div");
modal.classList.add("main-modal");
modalDiv.appendChild(modal);
//modal.style.display = "none";
let modalClose = document.createElement("span");
modalClose.classList.add("modal-close");
modalClose.innerHTML = "x";
modal.appendChild(modalClose);
let modalBox = document.createElement("div");
modalBox.classList.add("modal-box");
modal.appendChild(modalBox);
let modalHour = document.createElement("ul");
modalHour.classList.add("modal-hour-block");
modalBox.appendChild(modalHour);
for (let key = 0; key <= 13; key++) {
  let modalHourOption = document.createElement("li");
  modalHour.appendChild(modalHourOption);
  if (key < 10) {
    key = "0" + key;
    modalHourOption.innerHTML = key;
  } else {
    modalHourOption.innerHTML = key;
  }
}
let modalMinute = document.createElement("ul");
modalMinute.classList.add("modal-minute-block");
modalBox.appendChild(modalMinute);
for (let key = -1; key <= 60; key++) {
  let modalMinuteOption = document.createElement("li");
  modalMinute.appendChild(modalMinuteOption);
  if (key >= 0 && key < 10) {
    key = "0" + key;
    modalMinuteOption.innerHTML = key;
  } else {
    modalMinuteOption.innerHTML = key;
  }
}
let modalOptions = document.createElement("div");
modalOptions.classList.add("modal-options");
modalBox.appendChild(modalOptions);
let modalNoonOne = document.createElement("input");
modalNoonOne.classList.add("modal-noon");
modalNoonOne.setAttribute("type", "radio");
modalNoonOne.setAttribute("name", "noon");
modalNoonOne.setAttribute("value", "AM");
modalOptions.appendChild(modalNoonOne);
let modalNoonTwo = document.createElement("input");
modalNoonTwo.classList.add("modal-noon");
modalNoonTwo.setAttribute("type", "radio");
modalNoonTwo.setAttribute("name", "noon");
modalNoonTwo.setAttribute("value", "PM");
modalOptions.appendChild(modalNoonTwo);
let modalSubmit = document.createElement("input");
modalSubmit.classList.add("modal-submit");
modalSubmit.setAttribute("type", "button");
modalSubmit.setAttribute("value", "Finish");
modalOptions.appendChild(modalSubmit);
let openModal = document.querySelector(".modal-selector");
let mainModal = document.querySelector(".main-modal");
let closeModal = document.querySelector(".modal-close");
let hourBlock = document.querySelector(".modal-hour-block");
let getHourEl = document.querySelectorAll(".modal-hour-block > li");
let minuteBlock = document.querySelector(".modal-minute-block");
let getMinuteEl = document.querySelectorAll(".modal-minute-block > li");
let noonBlock = document.querySelectorAll(".modal-noon");
let submitModal = document.querySelector(".modal-submit");

function time_modal() {
  for (let addKey = 0; addKey < getHourEl.length; addKey++) {
    getHourEl[0].innerHTML = "12";
    getHourEl[13].innerHTML = "01";
    for (let removeKey = 0; removeKey < getHourEl.length; removeKey++) {
      let hourStyle = () => {
        getHourEl[removeKey].style.color = "#0003";
        getHourEl[removeKey].classList.remove("modal-active-hour");
        getHourEl[addKey].style.color = "#000";
        getHourEl[addKey].classList.add("modal-active-hour");
      };
      getHourEl[addKey].addEventListener("click", function () {
        hourStyle();
        if (addKey > 0) {
          hourBlock.scrollTo(0, (addKey - 1) * 55);
          if (addKey == 13) {
            hourBlock.scrollTo(0, 0);
          }
        } else if (addKey == 0) {
          hourBlock.scrollBy(0, 605);
        }
      });
      let currentHour = getHour();
      let currentKey = addKey < 10 ? "0" + addKey : "" + addKey;
      if (currentHour === currentKey) {
        hourStyle();
        if (addKey > 0) {
          hourBlock.scrollTo(0, (addKey - 1) * 55);
          if (addKey == 13) {
            hourBlock.scrollTo(0, 0);
          }
        } else if (addKey == 0) {
          hourBlock.scrollBy(0, 605);
        }
      }
    }
  }

  for (let addKey = 0; addKey < getMinuteEl.length; addKey++) {
    getMinuteEl[0].innerHTML = "59";
    getMinuteEl[61].innerHTML = "00";
    for (let removeKey = 0; removeKey < getMinuteEl.length; removeKey++) {
      let minuteStyle = () => {
        getMinuteEl[removeKey].style.color = "#0003";
        getMinuteEl[removeKey].classList.remove("modal-active-minute");
        getMinuteEl[addKey].style.color = "#000";
        getMinuteEl[addKey].classList.add("modal-active-minute");
      };
      getMinuteEl[addKey].addEventListener("click", function () {
        minuteStyle();
        if (addKey > 0) {
          minuteBlock.scrollTo(0, (addKey - 1) * 55);
          if (addKey == 61) {
            minuteBlock.scrollTo(0, 0);
          }
        } else if (addKey == 0) {
          minuteBlock.scrollBy(0, 3240);
        }
      });

      let currentMinute = getMinute();
      let currentKey = addKey < 10 ? "0" + addKey : "" + addKey;
      if (currentMinute === currentKey) {
        minuteStyle();
        if (addKey > 0) {
          minuteBlock.scrollTo(0, (addKey - 1) * 55);
          if (addKey == 62) {
            minuteBlock.scrollTo(0, 0);
          }
        } else if (addKey == 0) {
          minuteBlock.scrollBy(0, 605);
        }
      }
    }
  }
  if (getNoon() == "AM") {
    noonBlock[0].checked = true;
  } else {
    noonBlock[1].checked = true;
  }
}
time_modal();

openModal.onclick = () => {
  mainModal.removeAttribute("style");
  time_modal();
};
closeModal.onclick = () => (mainModal.style.display = "none");
submitModal.onclick = () => {
  for (let key = 0; key < getHourEl.length; key++) {
    if (getHourEl[key].getAttribute("class") == "modal-active-hour") {
      var selectedHour = getHourEl[key].textContent;
    }
  }
  for (let key = 0; key < getMinuteEl.length; key++) {
    if (getMinuteEl[key].getAttribute("class") == "modal-active-minute") {
      var selectedMinute = getMinuteEl[key].textContent;
    }
  }
  for (let key = 0; key < noonBlock.length; key++) {
    if (noonBlock[key].checked == true) {
      var selectedNoon = noonBlock[key].value;
    }
  }
  get_time_modal.value = "";
  get_time_modal.value = `${selectedHour}:${selectedMinute} ${selectedNoon}`;
  modalInput.value = `${selectedHour}:${selectedMinute} ${selectedNoon}`;
  modal.style.display = "none";
};