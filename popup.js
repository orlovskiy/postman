	
/*скроллящий скрипт*/
	var n = 0;
function search(postId){
	window.scrollTo(0,document.body.scrollHeight);
	if(document.getElementById('show_more_link')){
		document.getElementById('show_more_link').click()
	}
	if(document.getElementById(postId)!=null){
		n = 1;
		document.getElementById(postId).scrollIntoView()
	}
}

var searcher = setInterval(function(){//здесь мог бы быть while(n!=1){...}, но, как я говорил, он отказался работать
	search();
	if(n==1){
		clearInterval(searcher);
}
	},10)





	var items = JSON.parse(localStorage.getItem('vkStorage')); //получаем хранилище
	for(var i in items){ // перебираем его и вытаскиваем все элементы в переменные
		console.log(items[i])
		var postId = i;
		var item = items[i];
		var url = item['url'];
		var adress = item['adress'];
		var icon = item['icon'];
		var pic = item['pic'];



	//формируем блок для каждого элемента хранилища
		var link = document.createElement('div') 
		link.className = 'link';
		var icon_element = document.createElement('img')
		icon_element.src = icon;
		icon_element.className = "icon"
		var pic_element = document.createElement('img')
		pic_element.src = pic;
		pic_element.className = 'pic'
		var go_button = document.createElement('input')
		go_button.type = 'button';
		go_button.className = 'go_button';
		go_button.value = 'перейти';

		link.appendChild(icon_element)
		link.appendChild(pic_element)
		link.appendChild(go_button)

		document.getElementById('links').appendChild(link); //готовый блок элемента помещается в существуюший в popup.html блок

		go_button.onclick = function(){//по клику открываем adress и ищем там блок с id 'postId'
			window.open(adress)
			search(postId)
			}
		}//операции повторяются для каждого элемента хранилища

