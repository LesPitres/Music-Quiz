var txt1;
txt1='<input class="button_levels" id="zen1" value="Level 1" type="button" onClick="choose_level(id)"><br/><input class="button_levels" id="zen2" value="Level 2" type="button" onClick="choose_level(id)"><br/><input class="button_levels" id="zen3" value="Level 3" type="button" onClick="choose_level(id)"><br/>';

function menu1()
{
	ref1=document.getElementById(1);
	
	if (ref1.innerHTML=="")
	{
		ref1.innerHTML=txt1;
	}
	else
	{
		ref1.innerHTML="";
	}
}
function fin1()
{
	ref=document.getElementById(1);
	ref.innerHTML="";
}


var txt2;
txt2='<input class="button_levels" id="compet1" value="Level 1" type="button" onClick="choose_level(id)"><br/><input class="button_levels" id="compet2" value="Level 2" type="button" onClick="choose_level(id)"><br/><input class="button_levels" id="compet3" value="Level 3" type="button" onClick="choose_level(id)"><br/>';

function menu2()
{
	ref2=document.getElementById(2);
	
	if (ref2.innerHTML=="")
	{
		ref2.innerHTML=txt2;
	}
	else
	{
		ref2.innerHTML="";
	}
}
function fin2()
{
	ref=document.getElementById(2);
	ref.innerHTML="";
}

function valider(form) { // to post the answer
 if (form.title.value == "") {
 // if title is empty
  alert("Are you sure about your answer ?"); return false;
 }
 else {
  //checker nom du titre ou singer
 }
}

function skip() { // to skip a question
	//alert(t);
	var conf = confirm("Are you to skip this question ?");
	if(conf == true){
		document.location.href="index.html"
	}
}

var count =0; //array.size()
var files = new Array; //array with all file names
var r_number=''; //random number
var name=''; //name of one song picked up with r_number

function search_music(){
	var music = navigator.getDeviceStorage('sdcard'); //music or sdcard 
	var cursor = music.enumerate(); //objectfile
	cursor.onsuccess = function () {
	//var file = this.result;
	var file = cursor.result;
	//alert("File found: " + file.name);
	console.log("Get the file: " + file.name);
		if (!this.done) {
			this.continue();
			files[count] = file.name; //filling array
			count++;
		}
	}
	cursor.onerror = function () {
	console.warn("No file found: " + this.error);
	}
}

function random(){ // to create a random number
	r_number = Math.floor((Math.random()*count)+1); 
}

function collect(r_number){ //to take a random song from the list
	for (var i in files)
	{
		 name = files[r_number-1];
	}
}

var nom_chanson = "";
var compteur=-1;
var chansons = new Array;
var taille = 0;
var c = 0;
var counter = 0;


function play_music(){ // to play music every ... seconds by reloading game.html
	
	compteur++;
	//console.log("----------------------------------------------------------- "+compteur);
	var x = readCookie('id_level'); 
	x =x*1000;
	var a = readCookie('level');
	
	
	if((a == "compet1") || (a=="compet2") ||(a=="compet3")){
		if(c>=2){
			c = 0;
			deleteCookie('id_level');
			deleteCookie('level');
			deleteCookie('chanson');
			alert("score == "+score);
			//deleteCookie('score');
			self.location.href='index.html';
		}
		else{
			c++;
			console.log("***********************************************************************"+c);
			document.getElementById('music').innerHTML = "";
			search_music();
			chansons[compteur]=name;
			alert("Prêt ??? \n La chanson était : "+nom_chanson);
			random();
			collect(r_number);
			createCookie("chanson",name);
			nom_chanson = readCookie('chanson');
			//check();
			document.getElementById('music').innerHTML = "<audio src='"+name+"' autoplay></audio>";
			clearTimeout(counter);
		    counter=setTimeout("play_music()", x); 
			check();	
		}
		
	}
	else{
		//alert(readCookie('id_level'));
		document.getElementById('music').innerHTML = "";
		search_music();
		chansons[compteur]=name;
		alert("Prêt ??? \n La chanson était : "+nom_chanson);
		random();
		collect(r_number);
		createCookie("chanson",name);
		nom_chanson = readCookie('chanson');
		document.getElementById('music').innerHTML = "<audio src='"+name+"' autoplay></audio>";
		clearTimeout(counter);
		counter=setTimeout("play_music()", x); 
		check();
		
	}
}

var songs="";
var song="";
var singer=0;
var tab = new Array;
var tab_score2 = new Array;

function check(){
	var score=0;
	var user_title="";
	var user_singer="";
	var level_txt = readCookie('level');
	//alert(level_txt);
	user_singer = document.game.singer.value;
	user_title = document.game.title.value;
	songs = chansons[compteur];
	songs = songs.replace(' == ',";");
	tab = songs.split(";");
	singer = tab[0];
	song = tab[1];
	song = song.replace(".ogg","");
	//console.log("-------------------------------------------------- "+singer + " "+song+" "+compteur);
	song = song.toLowerCase();
	singer = singer.toLowerCase();
	user_title = user_title.toLowerCase();
	user_singer = user_singer.toLowerCase();
	
	if( (level_txt == "zen1") || (level_txt == "compet1") ){ // check level 1
		if(user_title != "") {
			if(user_title == song){
				score = localStorage.getItem('score');
				score ++;
				localStorage.setItem('score',score); //récupère la valeur du dernier score
				alert("CORRECT TITLE "+localStorage.getItem('score'));
			}
			else{
				alert("WRONG TITLE !!!!");
			}
			//alert("saisie == "+document.game.title.value);
			document.game.title.value = "";
		}
		else{
			alert("EMPTY TITLE");
		}
	}
	
	
	if( (level_txt == "zen2") || (level_txt == "compet2") ){ // check level 2
		if(user_singer != "") {
			if(user_singer == singer){
				score = localStorage.getItem('score');
				score ++;
				localStorage.setItem('score',score); //récupère la valeur du dernier score
				/*localStorage.setItem('tab_score',score);
				score5 = localStorage.getItem('tab_score');
				score5.push(score);*/
				alert("CORRECT SINGER "+localStorage.getItem('score'));
				
			}
			else{
				alert("WRONG SINGER !!!!");
			}
		//alert("saisie == "+document.game.title.value);
		document.game.singer.value = "";
		}
		else{
			alert("EMPTY SINGER");
		}
	}
	
	if( (level_txt == "zen3") || (level_txt == "compet3") ){
		if(user_title != ""){
			if(user_singer != ""){
				if( (user_title == song ) ){
					if(user_singer == singer){
						score = localStorage.getItem('score');
						score ++;
						localStorage.setItem('score',score); //récupère la valeur du dernier score
						alert("CORRECT TITLE AND CORRECT SINGER "+localStorage.getItem('score'));
					}
					else{
						alert("WRONG SINGER !!!!");
					}
				}
				else{
					alert("WRONG TITLE !!!!");
				}
			}
			else{
				alert("EMPTY SINGER");
			}
		}
		else{
			alert("EMPTY TITLE");
		}
			
		document.game.title.value = "";
		document.game.singer.value = "";
	}
		
	
	
	
	
	//alert("nom artiste suivante "+singer+" \n nom chanson "+song+ " "+songs);
	//alert("nom chanson précédente "+song);
}

function choose_level(t){ // to know what level has been chose by the user
	var level = t;
	var txt = "zen1";
	var txt2 = "zen2";
	var txt3 = "zen3";
	var txt4 = "compet1";
	var txt5 = "compet2";
	var txt6 = "compet3";
	var t2;
	
	if(level == txt){
		t2 =30;
	}
	if(level == txt2){
		t2 =25;
	}
	if(level == txt3){
		t2 =20;
	}
	if(level == txt4){
		t2 =30;
	}
	if(level == txt5){
		t2 =25;
	}
	if(level == txt6){
		t2 =20;
	}
	
	createCookie("id_level",t2);
	createCookie("level",level);
	//alert("read cookie "+readCookie('id_level'));
	localStorage.setItem('score', 0); //pr stockage permanent
	var tab_score = localStorage.getItem('tab_score'); 
	if((tab_score == undefined) || (tab_score == null)){
		localStorage.setItem('tab_score', []); 
	}

	self.location.href='game.html';
}


function readCookie(name) { // to read a cookie
	/*var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;*/
	
	return sessionStorage.getItem(name);
	 
}

function createCookie(name, value){ // to create cookie
	/*var date = new Date(); // use of cookie to keep the id_level value between levels.html and game.html
	date.setTime(date.getTime()+(2*24*60*60*1000));
	var expires = "; expires="+date.toGMTString();
	var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";*/
	sessionStorage.setItem(name, value);
}

function deleteCookie(name){
	sessionStorage.removeItem(name);
}
/*function createSession(key,valeur){ // key = nom creation et modif
	sessionStorage.setItem(key, value);
}
 DataManager = { 
 getItem:function(key){
  if(typeof(Storage)!=="undefined"){
  
   try{
    v = JSON.parse(sessionStorage.getItem(key));
   }catch(e){
    v = sessionStorage.getItem(key);
   }
   return v;
  }
  else
   console.log('unsupport');
 },
 setItem:function(key, value){
  if(typeof(Storage)!=="undefined"){
   if(typeof(value)=='object')
    value = JSON.stringify(value);
   sessionStorage.setItem(key, value);
  }
  else
   console.log('unsupport');
 },
 removeItem:function(key){
  if(typeof(Storage)!=="undefined"){
   sessionStorage.removeItem(key);
  }
  else
   console.log('unsupport');
 },

 closeSession:function(){
  sessionStorage = [];
 }
};*/