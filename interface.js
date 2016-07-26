/*Расширение интерфейса страницы кнопками*/
var lastLength = 0; //Переменная, в которую записывается количество уже созданных кнопок, что бы при добавлении контента кнопки создавались только у "новых" записей
function setButtons(){
	var targets = document.getElementsByClassName('feed_row') //перебираем массив новостных блоков, начиная с номера из lastLength
	for (var i = lastLength;i < targets.length;i++){
		targets[i].style.position = 'relative' //нужно для позиционирования кнопки, впоследствии можно переделать
		var button = document.createElement('button');
		var trueId = i + 1; 
		button.setAttribute('id','mark'+trueId);// присвоил для какой-то проверки, но пусть пока тут поторчит
		button.setAttribute('class','markButton');
		button.innerHTML = 'нажми!';
		button.style.cssText =
			"width:200px;\
			position:absolute;\
			top:50px;\
			right:0;\
			height:50px;\
			background-color:red;";
			if(storage[targets[i].childNodes[0].id]){ 
				button.style.backgroundColor = 'green'; //Если данный id имеется в объекте storage, то кнопка будет иметь зеленый bgc
			}
		button.onclick = function(){ //вешаем обработчик на click
			this.style.backgroundColor = 'green';
			var adress = window.location.href;
			var itemId = this.previousSibling.id;
			var url = window.location.href + '?w=wall-' + itemId.split('post');
			var images = this.previousSibling.getElementsByTagName('img');
			var icon = images[0].getAttribute('src');// иконка разместившего новость пользователя
			var pic = images[1].getAttribute('src')||null; // картинка из новости, если есть
			if (storage[itemId]){ // если элемент уже имеется в объекте storage  - дается команда на его удаление и bgc принимает значение "red"
				this.style.backgroundColor = 'red';
				delete storage[itemId]
			}else{
				storage[itemId] = {'url':url,'adress':adress,'icon':icon,'pic':pic};
			}
		}
		var target = targets[i];
		target.insertBefore(button,null)
		lastLength = i;
	}
}
	window.onload = function(){ //при загрузке получаем хранилище
		var storage = JSON.parse(localStorage.getItem('vkStorage'))||{}
		setButtons()
	}
	window.onscroll = function(){ //будет выполнятьяс при загрузке страницы и догрузке контента. Сейчас так, для отладки
	setButtons()
	}
	document.onbeforeunload = function(){ // сохраняем результат в хранилище
	localStorage.setItem('vkStorage',JSON.stringify(storage));
	alert('ok')
}




