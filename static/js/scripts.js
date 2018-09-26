

function remove_book(id){
	const xhttp = new XMLHttpRequest();
	// xhttp.onreadystatechange = function() {
	// 	if (this.readyState == 4 && this.status == 200)
	// 		callback(this.responseText);
	// 	};
	xhttp.open("DELETE", `/api/books/remove/${id}`, true);
	xhttp.send();
	console.log(xhttp);
	console.log(Object.keys(xhttp));
	var li = document.getElementById(id);
	li.parentElement.removeChild(li);
}
