## Installation
Run
```npm install```

Set mongodb url in .env

MONGO_URI=mongodb://localhost:27017/voiceowl

## Here are the answers of the questions which are asked to explain in the requirement pdf

1. What index you would add for this query if the dataset had 100M+ records.​
  
   **Reply:-** Because i am fetching record only those created in the last 30 days so i will add index on createdAt


2. Describe how you’d evolve your service to handle 10k+ concurrent requests.​
3. Mention 2–3 changes (e.g., caching, queues, containerization, autoscaling).​

   **Reply:-**
  
    On code level we can do
   
        - Putting the large processing logic to offloading using worker threads. So that node js main thread be always availble for new request
   
        - We can use Queue for heavy operations
   
        - We can use Connection Pooling so that DB doesn't create a new connection for every request
   
        - we can use caching whereever we can
   
        - We can use node.js clustering which allow us to use to all avialble cpu on server
   
        - Add Rate Limiting
  
  On server level we can do
  
      - We can run multiple instances of the service using load balancer (nginx/aws load balancer)




## Available Endpoints

**Require header in all request**

api-key = this_is_a_sample_api_key_12345



**POST /transcription**

Request Parameter:
1. audioUrl
   
   Example Value:- https://dummy-audio/sample.mp3

Response:
```
{
  "message": "Transcription completed successfully.",
  "data": {
    "_id": "6937f6b96fce045266f098eb"
  }
}
```


**GET /transcriptions**

Response:
```
{
  "message": "Transcription fetched successfully.",
  "data": {
    "transcriptions": [
      {
        "_id": "6938199ab18f57021d101816",
        "audioUrl": "https://dummy-audio/sample.mp3",
        "transcription": "This is a sample transcribed text mocked locally.",
        "createdAt": "2025-12-09T12:44:10.691Z"
      },
      {
        "_id": "69381984b18f57021d101813",
        "audioUrl": "https://dummy-audio/sample.mp3",
        "transcription": "This is a sample transcribed text mocked locally from Azure.",
        "createdAt": "2025-12-09T12:43:48.861Z"
      }
    ]
  }
}
```


**POST /azure-transcription**

Request Parameter:
1. audioUrl
2. 
   Example Value:- https://dummy-audio/sample.mp3

Response:
```
{
  "message": "Transcription completed successfully.",
  "data": {
    "_id": "69381984b18f57021d101813"
  }
}
```