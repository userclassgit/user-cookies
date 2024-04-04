import * as utils from './utils.js';
'use strict';

const modal = utils.select(".modal");
const btnAccept = utils.select(".accept");
const btnSettings = utils.select(".settings");
const span = utils.select(".close");
const settingsModal = utils.select(".settings-modal");


const browserSwitch = utils.select(".browser-switch");
const osSwitch = utils.select(".os-switch");
const widthSwitch = utils.select(".width-switch");
const heightSwitch = utils.select(".height-switch");

const savePreferencesButton = utils.select(".save-preferences");


utils.listen('click', btnAccept, function() {
  modal.style.display = "none";
  setCookie('consent', 'true', 15);
  setCookie('Browser', getBrowserName(), 15);
  setCookie('OS', getOSName(), 15);
  setCookie('Width', window.innerWidth + 'px', 15);
  setCookie('Height', window.innerHeight + 'px', 15);
});


utils.listen('click', span, function() {
  modal.style.display = "none";
});

utils.listen('click', btnSettings, function() {
  modal.style.display = "none";
  settingsModal.style.display = "block";
});

window.onload = function() {
  if (!navigator.cookieEnabled) {
    return;
  }

  const consent = getCookie('consent');

  if (consent === 'true' || consent === 'false') {
    console.log(document.cookie);
    return;
  }

  setTimeout(function() {
    modal.style.display = "block";
  }, 1000);

  browserSwitch.checked = true;
  osSwitch.checked = true;
  widthSwitch.checked = true;
  heightSwitch.checked = true;

  console.log(consent);
}


// Second modal
utils.listen('change', browserSwitch, function() {
  if (this.checked) {
    setCookie('Browser', getBrowserName(), 15);
  } else {
    setCookie('Browser', '', -1);
  }
});

utils.listen('change', osSwitch, function() {
  if (this.checked) {
    setCookie('OS', getOSName(), 15);
  } else {
    setCookie('OS', '', -1);
  }
});

utils.listen('change', widthSwitch, function() {
  if (this.checked) {
    setCookie('Width', window.innerWidth + 'px', 15);
  } else {
    setCookie('Width', '', -1);
  }
});

utils.listen('change', heightSwitch, function() {
  if (this.checked) {
    setCookie('Height', window.innerHeight + 'px', 15);
  } else {
    setCookie('Height', '', -1);
  }
});


utils.listen('click', savePreferencesButton, function() {

  if (browserSwitch.checked) {
    setCookie('Browser', getBrowserName(), 15);
  } else {
    setCookie('Browser', '', -1);
  }

  if (osSwitch.checked) {
    setCookie('OS', getOSName(), 15);
  } else {
    setCookie('OS', '', -1);
  }

  if (widthSwitch.checked) {
    setCookie('Width', window.innerWidth + 'px', 15);
  } else {
    setCookie('Width', '', -1);
  }

  if (heightSwitch.checked) {
    setCookie('Height', window.innerHeight + 'px', 15);
  } else {
    setCookie('Height', '', -1);
  }


  if (browserSwitch.checked || osSwitch.checked || widthSwitch.checked || heightSwitch.checked) {
    setCookie('consent', 'true', 15);
  } else {
    setCookie('consent', 'false', 15);
  }

  console.log(document.cookie);
  settingsModal.style.display = "none";
});


function getBrowserName() {
  let userAgent = navigator.userAgent;
  
  if (userAgent.indexOf("Firefox") > -1) {
    return "Firefox";
  } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
    return "Opera";
  } else if (userAgent.indexOf("Trident") > -1) {
    return "Internet Explorer";
  } else if (userAgent.indexOf("Edge") > -1) {
    return "Edge";
  } else if (userAgent.indexOf("Chrome") > -1) {
    return "Chrome";
  } else if (userAgent.indexOf("Safari") > -1) {
    return "Safari";
  } else {
    return "Unknown";
  }
}


function getOSName() {
  let os = "Unknown";
  if (navigator.appVersion.indexOf("Win") != -1) os = "Windows";
  if (navigator.appVersion.indexOf("Mac") != -1) os = "MacOS";
  if (navigator.appVersion.indexOf("X11") != -1) os = "UNIX";
  if (navigator.appVersion.indexOf("Linux") != -1) os = "Linux";
  return os;
}



function setCookie(name, value, maxAge) {
  const options = {
    Path: '/',
    SameSite: 'Lax'
  }

  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};`;

  if (maxAge) {
    cookie += `Max-Age=${maxAge};`;
  }

  for (let option in options) {
    cookie += `${option}=${options[option]};`;
  }

  document.cookie = cookie;
}


function getCookie(name) {
  const regex = new RegExp('(^|;\\s*)' + encodeURIComponent(name) + '=([^;]*)');
  const match = document.cookie.match(regex);
  return match ? decodeURIComponent(match[2]) : "The user hasn't made a decision about cookies";
}