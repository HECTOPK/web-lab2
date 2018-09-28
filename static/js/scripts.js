

function remove_book(id){
	const xhttp = new XMLHttpRequest();
	xhttp.open("DELETE", `/api/books/remove/${id}`, true);
	xhttp.send();
	var li = document.getElementById(id);
	li.parentElement.removeChild(li);
}

function return_book(id){
	const xhttp = new XMLHttpRequest();
	xhttp.open("PUT", `/api/books/${id}/return_book`, true);
	xhttp.send();
	var p = document.getElementById('stock');
	p.innerHTML = 'In Stock';
	var btn = document.getElementById('btn');
	btn.innerHTML = 'Give away';
	btn.setAttribute('onclick', 'javascript: give_away_button('+ id + ');');
}

function give_away_button(){
	var div = document.getElementById('give_away');
	div.style.display = 'block';
}

function give_away(id){
	var name = document.getElementById('name').value;
	document.getElementById('name').value = '';
	var date = document.getElementById('date').value;
	document.getElementById('date').value = '';
	if(!name){
		return;
	}
	if(!date){
		return;
	}
	const xhttp = new XMLHttpRequest();
	xhttp.open("POST", `/api/books/${id}/give_away`, true);
	xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhttp.send('name=' + name + '&' + 'date=' + date);
	var div = document.getElementById('give_away');
	div.style.display = 'none';
	var p = document.getElementById('stock');
	p.innerHTML = name + ' until ' + date;
	var btn = document.getElementById('btn');
	btn.innerHTML = 'Return book';
	btn.setAttribute('onclick', 'javascript: return_book('+ id + ');');
}

function give_away_cancel(){
	document.getElementById('give_away').style.display = 'none';
}

var onlyInStock = false;
var filterBydate = false;

function showBooks(books){
	var ul = document.getElementById('bookList');
	console.log(ul);
	var template = document.getElementById('book_template').cloneNode(true);
	ul.innerHTML = '';
	console.log(template);
	for (var book in books) {
		book = books[book];
		var li = template.cloneNode(true);
		// console.log(li);
		li.querySelector('#book_link').innerHTML = book.title;
		li.querySelector('#book_link').href = '/books/' + book.id;
		li.querySelector('#book_author').innerHTML = book.author;
		if (book.inStock) {
			li.querySelector('#book_stock').innerHTML = 'In Stock';
		}
		else{
			li.querySelector('#book_stock').innerHTML = book.customer + ' until ' + book.date;
		}
		li.style.display = 'block';
		li.querySelector('#edit_link').setAttribute('href', '/books/edit/' + book.id);
		li.querySelector('#remove_button').setAttribute('onclick', 'javascript: remove_book('+ book.id + ');');
		li.setAttribute('id', book.id);
		ul.appendChild(li);
	}
	ul.appendChild(template);
}

function showOnlyInStock(x){
	var btn = document.getElementById('onlyInStockButton');
	if (x) {
		btn.innerHTML = 'Show all books';
		btn.setAttribute('onclick', 'javascript: showOnlyInStock(false);');
		const xhttp = new XMLHttpRequest();
		xhttp.open("GET", '/api/books?filter=onlyInStock', true);
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200){
				showBooks(JSON.parse(this.responseText));
			}

		};
		xhttp.send();
	}
	else{
		btn.innerHTML = 'Show only in stock';
		btn.setAttribute('onclick', 'javascript: showOnlyInStock(true);');
		const xhttp = new XMLHttpRequest();
		xhttp.open("GET", '/api/books?filter=all', true);
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200){
				showBooks(JSON.parse(this.responseText));
			}
		};
		xhttp.send();
	}
}

function filterByDateCheck(){
	var checkbox = document.getElementById('dateCheckbox');
	var input = document.getElementById('dateInput');
	if(checkbox.checked == true){
		if(!input.value){
			input.setAttribute('style', 'border-color:red;')
			checkbox.checked = false;
		}

	}
	else{

	}
}

function onlyInStockCheck(){
	var checkbox = document.getElementById('inStockCheckbox');
	if(checkbox.checked == true){
		onlyInStock = true;
		const xhttp = new XMLHttpRequest();
		xhttp.open("GET", '/api/books?onlyInStock=true&' + 'filterBydate=' + filterBydate, true);
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200){
				console.log(this.responseText);
				showBooks(JSON.parse(this.responseText));
			}
		};
		xhttp.send();
	}
	else{
		onlyInStock = false;
		const xhttp = new XMLHttpRequest();
		xhttp.open("GET", '/api/books?onlyInStock=false&' + 'filterBydate=' + filterBydate, true);
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200){
				console.log(this.responseText);
				showBooks(JSON.parse(this.responseText));
			}
		};
		xhttp.send();
	}
}
