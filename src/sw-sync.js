self.addEventListener('sync', function(event) {
    console.log('tag:', event.tag);
    self.registration.showNotification("Sync event fired!");
});