function spotifyControls() {
  chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.message === 'playNextTrack') {
      console.log('tabId is ', request.tabId);
      document.querySelector('.spoticon-skip-forward-16').click();
    }
    if (request.message === 'playPreviousTrack') {
      console.log('tabId is ', request.tabId);
      document.querySelector('.spoticon-skip-back-16').click();
    }
    if (request.message === 'shuffleTracks') {
      console.log('tabId is ', request.tabId);
      let shuffleButton = document.querySelector('.spoticon-shuffle-16');
      shuffleButton.click();
    }
    if (request.message === 'togglePlayPause') {
      console.log('tabId is ', request.tabId);
      var pauseBttn = document.querySelector('.spoticon-pause-16');
      if (pauseBttn != null) {
        pauseBttn.click();
      } else {
        document.querySelector('.spoticon-play-16').click();
      }
    }
  });
}

spotifyControls();

// let shuffleButton = document.querySelector('.spoticon-shuffle-16');

// window.addEventListener('load', () => {
//   shuffleButton = document.querySelector('.spoticon-shuffle-16') || shuffleButton;
// });

// shuffleButton.addEventListener('click', function() {
//   let shuffleButtonTitle = shuffleButton.title;
//   chrome.runtime.sendMessage({ showIconForState: shuffleButtonTitle });
// });

function findShuffleState() {
  setTimeout(() => {
    if (document.querySelector('.spoticon-shuffle-16').title === 'Disable shuffle') {
      console.log('shuffle is active');
      chrome.runtime.sendMessage({ type: 'shuffleState', message: 'active', channel: 'Spotify' });
    } else {
      console.log('shuffle is inactive');
      chrome.runtime.sendMessage({
        type: 'shuffleState',
        message: 'inactive',
        channel: 'Spotify',
      });
    }
  }, 3500);
}

window.addEventListener('load', () => {
  findShuffleState();

  document.querySelector('.spoticon-shuffle-16').addEventListener('click', () => {
    findShuffleState();
  });
});
