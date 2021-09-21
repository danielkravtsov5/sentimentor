//getting all the elements needed
let button = document.getElementById("button");
let userInput = document.getElementById("textArea");
let loadingImg = document.getElementById("loadingGif");
let spanResult = document.getElementById("result");
let statusCat = document.getElementById("statusCat");

async function getInfoFromApi(){
    let textForApi = userInput.value
    loadingImg.hidden = false; 
    let response = await fetch ("https://sentim-api.herokuapp.com/api/v1/",{
        method : "post",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({text : textForApi})
    })
    let status=response.status
    addCatStatusToPage(status)
    loadingImg.hidden = true;
    if (response.ok){
        let resultOfPost = await response.json(); 
        resultOfPost=resultOfPost.result;
        
        changeDOM(resultOfPost)
    }
}

function changeDOM(result){
spanResult.textContent = "Polarity:" + JSON.stringify(result.polarity)+" Type:"+ JSON.stringify(result.type);
if (result.polarity > 0){
        spanResult.style.color = "green"
    }else if (result.polarity < 0){
        spanResult.style.color = "red"
        }
        else if (result.polarity === 0){
            spanResult.style.color = "#A9A9A9"
        }
} 

function addCatStatusToPage(status){
statusCat.src = `https://http.cat/${status}.jpg`
}   

button.addEventListener("click", getInfoFromApi)