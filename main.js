var pageCounter = 1;
var info = document.getElementById('info');
var btn = document.getElementById('btn');

btn.addEventListener("click",function(){
	var ourRequest = new XMLHttpRequest();
	ourRequest.open('GET','https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json');
	ourRequest.onload = function(){
		if (ourRequest.status >=200 && ourRequest.status <400) {
			var ourData = JSON.parse(ourRequest.responseText);
		    renderHtml(ourData);
		}else{
			console.log("We connected to the server,but it returns an error");
		}
		
		pageCounter++;
		if (pageCounter>3) {
			btn.classList.add("hide-me");
		}
	}

	// error handling..
	ourRequest.onerror = function (argument) {
		console.log("Connection Error");
	}
	ourRequest.send();	
});

function renderHtml(data) {
	var htmlString = " ";
	for (i =0; i < data.length; i++) {
		htmlString += "<p>" + data[i].name + "is a" + data[i].species + "that like to eat ";

		//for loop starts..
		for (ii = 0; ii < data[i].foods.likes.length; ii++) {
			if (ii==0) {
				htmlString += data[i].foods.likes[ii];
			}else{
				htmlString += " and " + data[i].foods.likes[ii];
			}
		}

		htmlString += ' and dislikes ';

		//for loop starts..
		for (ii = 0; ii < data[i].foods.dislikes.length; ii++) {
			if (ii==0) {
				htmlString += data[i].foods.dislikes[ii];
			}else{
				htmlString += " and " + data[i].foods.dislikes[ii];
			}
		}

		htmlString += ". </p>";
	}
	info.insertAdjacentHTML('beforeend',htmlString);
}
