async function fetchUploadToken() {
  let response = await fetch('https://connect-london-demo.zaid-stream-demo.workers.dev/token');
  let data = await response.text();
  console.log(data);
  return data;
}

var uprog = {
  // (A) INIT
  hBar: null,     // html progress bar
  hPercent: null, // html upload percentage
  hFile: null,    // html file picker
  videoId: null,
  init: () => {
    // (A1) GET HTML ELEMENTS
    uprog.hBar = document.getElementById("up-bar");
    uprog.hPercent = document.getElementById("up-percent");
    uprog.hFile = document.getElementById("up-file");
    uprog.hLabel = document.getElementById("up-label");

    // (A2) ATTACH AJAX UPLOAD + ENABLE UPLOAD
    uprog.hFile.onchange = uprog.upload;
    uprog.hFile.disabled = false;
  },

  // (B) HELPER - UPDATE PROGRESS BAR
  update: (percent) => {
    uprog.hLabel.innerText = "Uploading..."
    percent = percent + "%";
    uprog.hBar.style.width = percent;
    uprog.hPercent.innerHTML = percent;
    if (percent == "100%") { 
      uprog.hFile.disabled = false; 
      uprog.hLabel.innerText = "Done!"
    }
  },

  // (C) PROCESS UPLOAD
  upload: async () => {
    const uploadToken = await fetchUploadToken();
    uprog.videoId = uploadToken;
    // (C1) GET FILE + UPDATE HTML INTERFACE
    let file = uprog.hFile.files[0];
    uprog.hFile.disabled = true; // disable upload button
    uprog.hFile.value = ""; // reset file picker

    // (C2) AJAX UPLOAD
    let xhr = new XMLHttpRequest(),
      data = new FormData();
    data.append("file", file);
    console.log("upload token: " + uploadToken)
    xhr.open("POST", uploadToken);

    // (C3) UPLOAD PROGRESS
    let percent = 0, width = 0;
    xhr.upload.onloadstart = (evt) => { uprog.update(0); };
    xhr.upload.onloadend = (evt) => { uprog.update(100); };
    xhr.upload.onprogress = (evt) => {
      percent = Math.ceil((evt.loaded / evt.total) * 100);
      if (percent == 100) window.location = "/video/" + uprog.videoId.replace('https://upload.videodelivery.net/', '');

      uprog.update(percent);
    };

    // (C4) ON LOAD & ERRORS
    xhr.onload = function () {
      if (this.response != "OK" || this.status != 200) {
        // @TODO - DO SOMETHING ON ERROR
        // alert("ERROR!");
        // reset form?
        console.log(this);
        console.log(this.response);
        console.log(this.status);
      } else {
        uprog.update(100);
        // @TODO - DO SOMETHING ON COMPLETE
      }
    };
    // xhr.onerror = () => { DO SOMETHING };

    // (C5) GO!
    xhr.send(data);
  }
};
window.addEventListener("load", uprog.init);