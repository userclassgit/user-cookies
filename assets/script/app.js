import * as utils from './utils.js';
'use strict';

const modal = utils.select(".modal");
const btnAccept = utils.select(".accept");
const btnSettings = utils.select(".settings");
const span = utils.select(".close");
const btnReject = utils.select(".reject");
const settingsModal = utils.select(".settings-modal");

utils.listen('click', btnAccept, function() {
  modal.style.display = "none";
  setCookie('consent', 'true', 15);
  setCookie('browser', getBrowserName(), 15);
  setCookie('os', getOSName(), 15);
});
utils.listen('click', btnReject, function() {
  setCookie('consent', 'false', 15);
  modal.style.display = "none";
});

utils.listen('click', span, function() {
  modal.style.display = "none";
});

window.onload = function() {
  if (!navigator.cookieEnabled) {
    return;
  }

  const consent = getCookie('consent');
  if (consent) {
    console.log(document.cookie);
    return;
  }

  setTimeout(function() {
    modal.style.display = "block";
  }, 1000);
}




modal.style.display = "block";

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
  return match ? decodeURIComponent(match[2]) : null;
}