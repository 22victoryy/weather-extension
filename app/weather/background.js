'use strict';

chrome.runtime.onInstalled.addListener(details => {
    console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: 'clime'});

console.log('Browser Action enabled...');