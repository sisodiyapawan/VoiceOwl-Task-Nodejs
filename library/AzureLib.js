/********************************************/
// NOTE:- Due to azure credentials are not available, actual azure sdk integration is commented.
/********************************************/

const fs = require('fs');
const https = require('https');
const path = require('path');
// const sdk = require('@azure/cognitiveservices-speech-sdk');

class AzureLib {
    constructor() {
        // this.subscriptionKey = process.env.AZURE_SUBSCRIPTION_KEY;
        // this.region = process.env.AZURE_REGION;

        // Speech configuration
        //this.speechConfig = sdk.SpeechConfig.fromSubscription(this.subscriptionKey, this.region);
    }

    async transcribeAudio(audioUrl) {
        
        // Download the audio to a temporary file
        /*const tempFilePath = path.join(__dirname, 'tempAudio.wav');
        await this.downloadFile(audioUrl, tempFilePath);*/

        // Transcribe the audio file using Azure speech SDK
        
        /*const transcription =  new Promise((resolve, reject) => {
            const audioConfig = sdk.AudioConfig.fromWavFileInput(fs.readFileSync(tempFilePath));
            const recognizer = new sdk.SpeechRecognizer(this.speechConfig, audioConfig);

            recognizer.recognizeOnceAsync(result => {
                if (result.reason === sdk.ResultReason.RecognizedSpeech) {
                    resolve(result.text);
                } else {
                    reject(new Error(`Speech could not be recognized: ${result.reason}`));
                }
            });
        });*/
        const transcription = "This is a sample transcribed text mocked locally from Azure.";
        return transcription;
    }
    
    
    async downloadFile(url, dest) {
        return new Promise((resolve, reject) => {
            const file = fs.createWriteStream(dest);
            https.get(url, response => {
                response.pipe(file);
                file.on('finish', () => file.close(resolve));
            }).on('error', err => {
                fs.unlink(dest, () => reject(err));
            });
        });
    }
}

module.exports = new AzureLib();