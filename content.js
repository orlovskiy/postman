function insertAfter(elem, refElem) {
  return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}
var storage = JSON.parse(localStorage.getItem('vkStorage'))||{};
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

imgReg = /http[^\s]*\.jpg/g;



chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
    if (request.greeting == "hello"){
      sendResponse({farewell:localStorage.getItem('vkStorage')});
    }
    else if(request.post){
    	console.log(request.post);
    
		var searcher = setInterval(function(){//здесь мог бы быть while(n!=1){...}, но, как я говорил, он отказался работать
			search(request.post);

			if(n==1){
				clearInterval(searcher);
		}
			},10);
	}
})




window.onload = function(){setButtons()}

/*Расширение интерфейса страницы кнопками*/
var lastLength = 0; //Переменная, в которую записывается количество уже созданных кнопок, что бы при добавлении контента кнопки создавались только у "новых" записей
function setButtons(){
	var targets = document.getElementsByClassName('feed_row') //перебираем массив новостных блоков, начиная с номера из lastLength
	for (var i = lastLength;i < targets.length;i++){
		targets[i].style.position = 'relative' //нужно для позиционирования кнопки, впоследствии можно переделать
		var button = document.createElement('button');
/*		var label = document.createElement('label');
		label.setAttribute('className','postmanButtonlabel');*/
		var trueId = i + 1; 
/*		label.setAttribute('for','mark'+trueId)
		label.innerHTML = 'заложить';*/
		button.setAttribute('id','mark'+trueId);// присвоил для какой-то проверки, но пусть пока тут поторчит
		button.setAttribute('class','markButton');
		button.innerHTML = 'Заложить'
		var itemId = targets[i].firstChild.id;
		var text = targets[i].firstChild.innerHTML;
		button.value = JSON.stringify({'id':itemId, 'text':text})
			if(storage[targets[i].childNodes[0].id]){ 
				button.style.backgroundColor = 'green'; //Если данный id имеется в объекте storage, то кнопка будет иметь зеленый bgc
			}


		button.onclick = function(){ //вешаем обработчик на click
			var data = JSON.parse(this.value);
			this.innerHTML = 'Заложено';
			var adress = window.location.href;
			var itemId = data['id'];
			var text = data['text'];
			var url = window.location.href + '?w=wall-' + itemId.split('post');
			var images = text.match(imgReg);
			console.log(text)
			console.log(images)
			var icon = images[0]// иконка разместившего новость пользователя
			var pic = images[1]// картинка из новости, если есть
			if (storage[itemId]){ // если элемент уже имеется в объекте storage  - дается команда на его удаление и bgc принимает значение "red"
				this.innerHTML='Заложить';
				delete storage[itemId]
				localStorage.setItem('vkStorage',JSON.stringify(storage));
			}else{
				storage[itemId] = {'url':url,'adress':adress,'icon':icon,'pic':pic};
				localStorage.setItem('vkStorage',JSON.stringify(storage));
			}
		}


		var target = targets[i];
		// insertAfter(button, target.getElementsByClassName('post_full_like')[0]);
		/*target.getElementsByClassName('post_share _share_wrap')[0].insertBefore(button,null)*/
		// insertAfter(label,button)
		try{
			target.getElementsByClassName('post_full_like_wrap')[0].appendChild(button)
		}catch(err){
			console.log('ha-ha')
		}
		lastLength = i+1;

	}
}



window.onscroll = function(){ //будет выполнятьяс при загрузке страницы и догрузке контента. Сейчас так, для отладки
	setButtons()
	}











var b = document.getElementsByClassName('feed_row')
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
