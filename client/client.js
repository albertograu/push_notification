const publicVapidKey = "BOYUznboJzyWrqdjMmVo4mVfoifS3lX8crHDR7uirsLHn1NRj09oV_y_J7fZdsv4V6iPkzpi5gYfF3Oix7dUs0o";

// Check for service worker in browser
if ('service worker' in navigator) {
    send().catch(err => console.error(err));
}

// Register service worker, register push and send push
async function send() {
    // register service worker
    console.log('registering service worker...');
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });
    console.log("Service Worker Regsitered");

    // register push
    console.log('Registering Push...');

    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log('Push Registered.');

    // Send push notification
    console.log('Sending push....');
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log('Sent!');
}

// fn to convert base64 to uint8array
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}