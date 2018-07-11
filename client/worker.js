console.log('Service Worker Loaded');

self.addEventListener('push', e => {
    const data = e.datajson();
    console.log('Push received');
    self.registration.showNotification(data.title, {
        body: 'Flash sale! 50% off entire store',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Caudalie_Logo.jpg'
    });
})