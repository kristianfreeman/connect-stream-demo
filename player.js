let path = window.location.pathname;
let pollTimer;

function initializePlayer() {
  console.log("initializing");
  document.getElementById("up-wrap").style.display = "none";
  document.getElementById("player-container").style.display = "block";
  const videoId = path.replace("/video/", "");

  document.getElementById("embed-container").innerHTML = '<iframe id="stream-player" src="https://iframe.cloudflarestream.com/' + videoId + '" style="display:none;border: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen="true"></iframe>';
  const player = Stream(document.getElementById('stream-player'));
  player.addEventListener('error', () => {
    document.getElementById("stream-player").style.display = "none";
    document.getElementById("processing-notice").style.display = "block";
  });
  player.addEventListener('durationchange', () => {
    console.log('can play!');
    clearInterval(pollTimer);

    document.getElementById("stream-player").style.display = "block";
    document.getElementById("processing-notice").style.display = "none";
    document.getElementById("loading-placeholder").style.display = "none";
  });
}

if (path.indexOf('/video/') !== -1) {
  initializePlayer();
  pollTimer = setInterval(initializePlayer, 5000);
}
