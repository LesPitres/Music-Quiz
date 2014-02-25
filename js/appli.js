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

function quit() { // to return to menu and quit the game
	//alert(t);
	var conf = confirm("Are you to skip this question ? \n Votre score est de : "+localStorage.getItem('score'));
	if(conf == true){
		triScore(localStorage.getItem('score'));
		document.location.href="index.html";
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
var first = 0;

function play_music(){ // to play music every ... seconds by reloading game.html
	compteur++;
	//console.log("----------------------------------------------------------- "+compteur);
	var x = readCookie('id_level'); 
	x =x*1000;
	var a = readCookie('level');
	
	
	if((a == "compet1") || (a=="compet2") ||(a=="compet3")){
		if(c>=2){
			c = 0;
			//deleteCookie('id_level');
			//deleteCookie('level');
			//deleteCookie('chanson');
			alert("La chanson était : "+nom_chanson+" \n Votre score est de : "+localStorage.getItem('score'));
			//alert("score == "+score);
			//deleteCookie('score');
			self.location.href='index.html';
		}
		else{
			c++;
			console.log("***********************************************************************"+c);
			document.getElementById('music').innerHTML = "";
			search_music();
			chansons[compteur]=name;
			if(first ==0){
				alert("Prêt ??? ");
			}
			else{
				check();
				alert("Prêt ??? \n La chanson était : "+nom_chanson+" \n Votre score est de : "+localStorage.getItem('score'));
			}
			first++;
			//alert("Prêt ??? \n La chanson était : "+nom_chanson);
			random();
			collect(r_number);
			createCookie("chanson",name);
			nom_chanson = readCookie('chanson');
			document.getElementById('music').innerHTML = "<audio src='"+name+"' autoplay></audio>";
			clearTimeout(counter);
		    counter=setTimeout("play_music()", x); 
			//check();	
		}
		
	}
	else{
		//alert(readCookie('id_level'));
		document.getElementById('music').innerHTML = "";
		search_music();
		chansons[compteur]=name;
		if(first ==0){
				alert("Prêt ??? ");
			}
			else{
				check();
				alert("Prêt ??? \n La chanson était : "+nom_chanson+" \n Votre score est de : "+localStorage.getItem('score'));
			}
		first++;
		//alert("Prêt ??? \n La chanson était : "+nom_chanson);
		random();
		collect(r_number);
		createCookie("chanson",name);
		nom_chanson = readCookie('chanson');
		document.getElementById('music').innerHTML = "<audio src='"+name+"' autoplay></audio>";
		clearTimeout(counter);
		counter=setTimeout("play_music()", x); 
		//check();
		
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
				console.log("CORRECT TITLE "+localStorage.getItem('score'));
			}
			else{
				console.log("WRONG TITLE !!!!");
			}
			document.game.title.value = "";
		}
		else{
			console.log("EMPTY TITLE");
		}
	}
	
	if( (level_txt == "zen2") || (level_txt == "compet2") ){ // check level 2
		if(user_singer != "") {
			if(user_singer == singer){
				score = localStorage.getItem('score');
				score ++;
				localStorage.setItem('score',score); //récupère la valeur du dernier score
				console.log("CORRECT SINGER "+localStorage.getItem('score'));
				
			}
			else{
				console.log("WRONG SINGER !!!!");
			}
		//alert("saisie == "+document.game.title.value);
		document.game.singer.value = "";
		}
		else{
			console.log("EMPTY SINGER");
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
						console.log("CORRECT TITLE AND CORRECT SINGER "+localStorage.getItem('score'));
					}
					else{
						console.log("WRONG SINGER !!!!");
					}
				}
				else{
					console.log("WRONG TITLE !!!!");
				}
			}
			else{
				console.log("EMPTY SINGER");
			}
		}
		else{
			console.log("EMPTY TITLE");
		}
			
		document.game.title.value = "";
		document.game.singer.value = "";
	}
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
		t2 =3;
	}
	if(level == txt2){
		t2 =25;
	}
	if(level == txt3){
		t2 =20;
	}
	if(level == txt4){
		t2 =3;
	}
	if(level == txt5){
		t2 =25;
	}
	if(level == txt6){
		t2 =20;
	}
	
	createCookie("id_level",t2);
	createCookie("level",level);
	localStorage.setItem('score', 0); //pr stockage permanent
	
	self.location.href='game.html';
}


function readCookie(name) { // to read a cookie
	return localStorage.getItem(name);
}

function createCookie(name, value){ // to create cookie
	localStorage.setItem(name, value);
}

function deleteCookie(name){
	localStorage.removeItem(name);
}


function triScore(score){
	var i =0;
	var a=0;
	var tab_score = localStorage.getItem('tab_score'); 
	//alert("tab score avant création"+tab_score);
	if (tab_score.length ==0){
		localStorage.setItem('tab_score', '3,4,5,2,5'); 
		//alert("loc stor après création"+localStorage.setItem('tab_score', '3,4,5,2,5'));
	}
	var chaine = localStorage.getItem('tab_score'); 
	var scores = chaine.split(',');
	
	scores.sort(); // scores = tableau trié dans ordre croissant
	
	if(scores[0]<score){
		scores[0] = score;
		scores.sort();
		localStorage.setItem('tab_score', scores[0]+','+scores[1]+','+scores[2]+','+scores[3]+','+scores[4]);
	}
	//alert("liste score "+scores);
	//localStorage.setItem('liste_score',tab_score); 
		
		
}

function afficherScore(){
	var ma_chaine = localStorage.getItem('tab_score');
	var result = ma_chaine.split(',');
	document.getElementById('score5').innerHTML = "Your best : "+result[4]+".";
	document.getElementById('score4').innerHTML = "Your second best : "+result[3]+".";
	document.getElementById('score3').innerHTML = "Your third best : "+result[2]+".";
	document.getElementById('score2').innerHTML = "Your fourth best : "+result[1]+".";
	document.getElementById('score1').innerHTML = "Your fifth best : "+result[0]+".";
}

