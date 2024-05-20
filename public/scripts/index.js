let questionsMaxCount
let nextQuestionID
let quizQuestionsCount

const instatiateVariables = () => {
    const request = new XMLHttpRequest()
    request.open('GET', "http://localhost:3000/api/v1/questions/")
    request.addEventListener('load', function(event) {
        if (request.status === 200 && request.readyState === 4) {
            let receivedResponse = JSON.parse(request.response).msg
            questionsMaxCount = receivedResponse.maxCount
            quizQuestionsCount = receivedResponse.quizQuestions
            nextQuestionID = Math.floor(Math.random() * questionsMaxCount) + 1
        } else {
            if (request.status == 400 && request.readyState === 4) {
                console.log(request.response)
                // TODO: Add proper error handling
            }
        }
    })
    request.send()
}

if (document.readyState === 'loading') {
    instatiateVariables()
}

const nextQuestion = () => {
    const request = new XMLHttpRequest()
    request.open('GET', `http://localhost:3000/api/v1/questions/capital?country_id=${parseInt(nextQuestionID)}`)
    request.setRequestHeader('Content-Type', 'application/json')
    request.addEventListener('load', function(event) {
        if (request.status === 200 && request.readyState === 4) {
            document.getElementById("main-body").innerHTML = request.response
            nextQuestionID = Math.floor(Math.random() * questionsMaxCount) + 1
        } else {
            if (request.status == 400 && request.readyState === 4) {
                console.log(request.response)
                // TODO: Add proper error handling
            }
        }
    })
    request.send()
}

const checkAnswer = (countryName, typedAnswer) => {
    const request = new XMLHttpRequest()
    const body = JSON.stringify({
        country: countryName,
        answer: typedAnswer
    })
    request.open('POST', "http://localhost:3000/api/v1/questions/capital")
    request.setRequestHeader('Content-Type', 'application/json')
    request.addEventListener('load', function(event) {
        if (request.status === 200 && request.readyState === 4){
            // check response
        } else {
            if (request.status == 400 && request.readyState == 4) {
                console.log(request.response)
            }
        }
    })
    request.send(body)
}