const videoElement = document.getElementById('input_video');
        const canvasElement = document.getElementById('output_canvas');
        const canvasCtx = canvasElement.getContext('2d');
        const offscreenCanvas = document.createElement('canvas');
        const offscreenCtx = offscreenCanvas.getContext('2d');
        
        // Set initial sizes for the canvas
        canvasElement.width = window.innerWidth*3;
        canvasElement.height = window.innerHeight*3;
        offscreenCanvas.width = window.innerWidth*3;
        offscreenCanvas.height = window.innerHeight*3;
        
        let ratio = window.innerWidth / window.innerHeight;

        // Initialize FaceDetection with options
        const faceDetection = new FaceDetection({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
        });
        faceDetection.setOptions({
            model: 'short',
            minDetectionConfidence: 0.5,
        });

        faceDetection.onResults(onResults);

        class Win {
            constructor(landmark, index) {
                this.landmark = landmark;
                this.index = index;
                this.text = `
                    <div class="zoomer" id="${this.index}zoomer">
                        
                        <canvas id="${this.index}canvas" class="image"></canvas>
                        <p class"marks" id="${this.index}marks"></p>
                        
                    </div>
                `;
                document.body.insertAdjacentHTML('beforeend', this.text);
                this.flip;
                if(Math.random()>1) this.flip = false;
                else this.flip = false;
                this.zoomer = document.getElementById(this.index + 'zoomer');
                this.canvas = document.getElementById(this.index + 'canvas');
                this.marks = document.getElementById(this.index + 'marks')
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;
                this.context = this.canvas.getContext('2d');
                this.zoomer.style.left = ((this.index+0.5)*(100/7))+ 'vw';
                this.zoomer.style.top =  '80vh';
                this.canvas.style.filter='grayscale(2)';
            }

            draw(landmark, sSize, factor, ratio, canvasElement) {
                if(this.flip){
                    this.context.save();
                    this.context.scale(1, -1);
                    this.context.translate(0, -this.canvas.height);
                    
                }
                this.landmark = landmark;
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.context.drawImage(
                    canvasElement,
                    (this.landmark.x - (sSize / 2)) * canvasElement.width,
                    ((this.landmark.y-0.05) - (sSize / 2)) * canvasElement.height,
                    sSize * canvasElement.width * factor,
                    (sSize-0.05) * canvasElement.height * factor * (ratio*2),
                    0, 0,
                    this.canvas.width,
                    ratio * this.canvas.height
                );
                if(this.flip){
                    
                    this.context.restore();
                }
                this.marks.innerHTML="x : "+landmark.x+"<br>"+"y : "+landmark.y+"<br>"+"z : "+landmark.z+"<br>"
            }
        }

        let WINS = [];
        for (let i = 0; i < 6; i++) {
            let myL = new Win(null, i);
            WINS.push(myL);
        }

        function onResults(results) {
            // Clear the previous drawings
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            // Draw the video frame to canvas
            canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
            
            if (results.detections.length > 0) {
                let factor = 1;
                let sSize = 0.2;
                for (const detection of results.detections) {
                    let i = 0;
                    detection.landmarks.forEach((l) => {
                        WINS[i].draw(l, sSize, factor, ratio, canvasElement);
                        i++;
                    });
                    
                }
            }
        }

        const camera = new Camera(videoElement, {
            onFrame: async () => {
                offscreenCanvas.width = videoElement.videoWidth;
                offscreenCanvas.height = videoElement.videoHeight;
                offscreenCtx.save();
                offscreenCtx.scale(-1, 1);
                offscreenCtx.translate(-videoElement.videoWidth, 0);
                offscreenCtx.drawImage(videoElement, 0, 0, videoElement.videoWidth, videoElement.videoHeight);
                offscreenCtx.restore();
                await faceDetection.send({image: offscreenCanvas});
            },
            width: window.innerWidth*3,
            height: window.innerHeight*3,
        });
        window.addEventListener('keydown',(()=>{
            WINS.forEach((w)=>{
                w.zoomer.style.left=(Math.random()*80)+'vw';
                w.zoomer.style.top=(Math.random()*80)+'vh';

            })
        }))
        camera.start();