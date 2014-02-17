var txt1;
txt1='<a href="encadrement.html"><input class="button_levels" value="Level 1" type="button"></a><br/><a href="encadrement.html"><input class="button_levels" value="Level 2" type="button"></a><br/><a href="encadrement.html"><input class="button_levels" value="Level 3" type="button"></a><br/>';

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
txt2='<a href="encadrement.html"><input class="button_levels" value="Level 1" type="button"></a><br/><a href="encadrement.html"><input class="button_levels" value="Level 2" type="button"></a><br/><a href="encadrement.html"><input class="button_levels" value="Level 3" type="button"></a><br/>';

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



