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

var searcher = setInterval(function(){
	search();
	if(n==1){
		clearInterval(searcher);
}
	},10)