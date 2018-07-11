self.addEventListener('push', e => {
    const data = e.data.json();
    console.log('Received!');
    self.registration.showNotification(data.title, {
        body: 'Flash sale! Hurry only 30mins left!',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Caudalie_Logo.jpg'
    });
})