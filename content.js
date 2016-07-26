var storage = JSON.parse(localStorage.getItem('vkStorage'))
window.onload = function(){setButtons()}
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
				localStorage.setItem('vkStorage',JSON.stringify(storage));
			}else{
				storage[itemId] = {'url':url,'adress':adress,'icon':icon,'pic':pic};
				localStorage.setItem('vkStorage',JSON.stringify(storage));
			}
		}
		var target = targets[i];
		target.insertBefore(button,null)
		lastLength = i;
	}
}















var b = document.getElementsByClassName('feed_row')
console.log(b)
	var items = JSON.parse(localStorage.getItem('vkStorage'));
	console.log(items)
	for(var i in items){
		console.log(items[i])
		var postId = i;
		var item = items[i];
		var url = item['url'];
		var adress = item['adress'];
		var icon = item['icon'];
		var pic = item['pic'];

		var link = document.createElement('div')
		link.className = 'link';
		var icon_element = document.createElement('img')
		icon_element.src = icon;
		icon_element.className = "icon"
		var pic_element = document.createElement('img')
		pic_element.src = pic;
		pic_element.className = 'pic'
		var go_button = document.createElement('input')
		go_button.type = 'button'
		go_button.className = 'go_button';
		go_button.value = 'перейти';

		link.appendChild(icon_element)
		link.appendChild(pic_element)
		link.appendChild(go_button)


		go_button.onclick = function(){
			window.open(adress)
			search(postId)
			}
		}
		console.log('xhr')