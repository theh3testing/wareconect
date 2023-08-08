const videoCont = document.querySelector('.video-self');
        const mic = document.querySelector('#mic');
        const cam = document.querySelector('#webcam');

        let micAllowed = 1;
        let camAllowed = 1;

        let mediaConstraints = { video: true, audio: true };

        function requestPermissionsAndLoadCamera() {
            navigator.mediaDevices.getUserMedia(mediaConstraints)
                .then(localstream => {
                    videoCont.srcObject = localstream;
                })
                .catch(error => {
                    console.error('Error accessing camera or microphone:', error);
                });
        }

        cam.addEventListener('click', () => {
            if (camAllowed) {
                mediaConstraints = { video: false, audio: micAllowed ? true : false };
                cam.classList = "nodevice";
                cam.innerHTML = `<i class="fas fa-video-slash"></i>`;
                camAllowed = 0;
            } else {
                mediaConstraints = { video: true, audio: micAllowed ? true : false };
                cam.classList = "device";
                cam.innerHTML = `<i class="fas fa-video"></i>`;
                camAllowed = 1;
            }
            requestPermissionsAndLoadCamera();
        });

        mic.addEventListener('click', () => {
            if (micAllowed) {
                mediaConstraints = { video: camAllowed ? true : false, audio: false };
                mic.classList = "nodevice";
                mic.innerHTML = `<i class="fas fa-microphone-slash"></i>`;
                micAllowed = 0;
            } else {
                mediaConstraints = { video: camAllowed ? true : false, audio: true };
                mic.innerHTML = `<i class="fas fa-microphone"></i>`;
                mic.classList = "device";
                micAllowed = 1;
            }
            requestPermissionsAndLoadCamera();
        });

        // Cargar la cámara al cargar la página
        requestPermissionsAndLoadCamera();
