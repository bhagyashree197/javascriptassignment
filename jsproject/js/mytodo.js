(function(){
	if(sessionStorage.getItem("userId")== null)
	{
		alert("Session Expired!!Please Login Again!!");
		window.location.href="../html/loginpage.html";
	
	}
	})();

function validateitems(objectType){
	var title=document.getElementById("title").value;
	var startDate=document.getElementById("startdate").value;
	if(title == " " || startDate==""){
		document.getElementById("title").style.border="2px solid red";
        document.getElementById("startdate").style.border="2px solid red"
		document.getElementById("savestatus").innerHTML="**Please Fill All The Mandatory Fields**";
		return false;
	}
	addTodoItems(objectType);
}

function addTodoItems(objectType){
	var title=document.getElementById("title").value;
	var categorytype=document.getElementById("categorytype").value;
	var startDate=document.getElementById("startdate").value;
	var endDate=document.getElementById("enddate").value;
	var setReminder=document.getElementById("setreminder").checked;
	var makeToDoPublic= document.querySelector('input[name="maketodopublic"]:checked').value;
	var todoDescription=document.getElementById("tododescription").value;
	let arrayUserRecord=JSON.parse(localStorage.getItem("registeredUserRecord"));
	var userId=sessionStorage.getItem("userId");
	let todoArray=arrayUserRecord[userId].todoArray;
	var obj=new Object();
	obj.title=title;
	obj.categoryType=categorytype;
	obj.startDate=startDate;
	obj.endDate=endDate;
	obj.setReminder=setReminder;
	if(setReminder === true){
		var reminderdate=document.getElementById("reminderdate").value;
	}
	else{
		reminderdate=" ";
	}
	obj.reminderDate=reminderdate;
	obj.makeTodoPublic=makeToDoPublic;
	obj.todoDescription=todoDescription;
	if(objectType === "new"){
		obj.todoStatus="isPending";
		obj.todoID=makeid(5);
		function makeid(length) {
			var result           = '';
			var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			var charactersLength = characters.length;
			for ( var i = 0; i < length; i++ ) {
				result += characters.charAt(Math.floor(Math.random() * charactersLength));
			}
		return result;
	}
	arrayUserRecord[userId].todoArray.push(obj);
	}
	else if(objectType === "edited"){

		if(validateDate('enddate','startdate','dateerrorspan'))
		{
			let todoID=sessionStorage.getItem("todoId");
			obj.todoID=todoID;
			for(let i=0;i<todoArray.length;i++){
				if(todoArray[i].todoID == todoID){
					var todoIndex=i;
					break;
				}	
			}
			obj.todoStatus=todoArray[todoIndex].todoStatus;
			arrayUserRecord[userId].todoArray[todoIndex]=obj;
		}
		else
		{
			return false;
		}
	}
    arrayUserRecord=JSON.stringify(arrayUserRecord);
	localStorage.setItem("registeredUserRecord",arrayUserRecord);
	enableForm('createdanewtodo');
	document.getElementById("savestatus").innerHTML="Record Successfully Saved";
}

function clickStatus(IdOfElement){
	var id=IdOfElement.id;
	if(document.getElementById(id).checked){
		document.getElementById(id).checked=false;
	}
	else{
		document.getElementById(id).checked=true;
	}

}

function todopageInDisplayMode(inputValue,userid)
{
	var e=document.getElementById("todocards");
	var child = e.lastElementChild;  
	while (child) { 
		e.removeChild(child); 
		child = e.lastElementChild;
	}
	
	if(inputValue.length==0){
		var li = document.createElement("noRecordText");
		var content="<h1 style='margin-top:30px;'>No Records found</h1>";
		li.innerHTML=content;
		document.getElementById("todocards").appendChild(li);
	}
	else{
	  for(var count=0;count<inputValue.length;count++){
            var li = document.createElement("div111");
            var title = inputValue[count].title;
			var startdate=inputValue[count].startDate;
			var endDate=inputValue[count].endDate;
			var categoryType=inputValue[count].categoryType;
			var todoStatus=inputValue[count].todoStatus;
			var current=new Date();
			if(todoStatus == "isPending"){
				if((new Date(endDate)).getTime()<current.getTime()){
					var classname="isLate";
				}
				else{
						var classname="";
				}
			}
			else if(todoStatus == "isDone"){
				var classname="isDonetodo";	
			}
			
			var divtodo='<div class="tododisplayclass ' +classname+'" id=display-'+inputValue[count].todoID+'><input type=checkbox name="deletediv" id=checkbox-'+inputValue[count].todoID+'><h1>'+title+'</h1><h3>Category:'+categoryType+'</h3><h3>Start Date'+startdate+'</h3><h3>End Date'+endDate+'</h3><div class="isdonediv"><h3>Is Done</h3><input type=checkbox name="isdone" id="isdone-'+count+'" onclick=changeStatusOfTodo(this);></div><input type="button" name="viewfulltodo" value="View Full Todo"></div>';
			li.innerHTML=divtodo;
			document.getElementById("todocards").appendChild(li);

			if(todoStatus == "isDone"){
				document.getElementById("isdone-"+count).checked=true; 
			}
		}   
           
			let buttonArray=document.getElementsByName("viewfulltodo");
			for(let i=0;i<buttonArray.length;i++){
				buttonArray[i].addEventListener('click',function(){
					var parentId=buttonArray[i].parentNode.id;
					let todoId=parentId.split("-");
					sessionStorage.setItem("todoId",todoId[1]);
						enableForm('disabledform');
					});
			}	

	}	
}

function getFieldValues(){
	let todoId=sessionStorage.getItem("todoId");
	let todoIndex;
	let arrayUserRecord=JSON.parse(localStorage.getItem("registeredUserRecord"));
    var userId=sessionStorage.getItem("userId");
	var todoArray=arrayUserRecord[userId].todoArray;
	for(let i=0;i<todoArray.length;i++){
		if(todoArray[i].todoID == todoId)
		todoIndex=i;
	}
	var todoArray=arrayUserRecord[userId].todoArray[todoIndex]; 
	document.getElementById("title").value=todoArray.title;
	document.getElementById("startdate").value=todoArray.startDate;
	document.getElementById("enddate").value=todoArray.endDate;
	document.getElementById("tododescription").value=todoArray.todoDescription;
	
	var categoryId=document.getElementById("categorytype");
	document.getElementById("categorytype").disabled=true;
	for(let counter=0;counter<categoryId.options.length;counter++){
		if(categoryId[counter].value ===todoArray.categoryType){
			document.getElementById("categorytype").options[counter].selected=true;
			break;
		}
	}
		if(todoArray.setReminder == true){
			document.getElementById("setreminder").checked =true;
			document.getElementById("reminderdate").style.display="inline-block";
			document.getElementById("reminderdate").value=todoArray.reminderDate;
			document.getElementById("reminderdatelabel").style.display="inline-block";
			
		}
		else{
			document.getElementById("setreminder").checked =false;
			document.getElementById("reminderdate").style.display="none";
			document.getElementById("reminderdatelabel").style.display="none";
		}
		disableFields();
}
function disableFields(){
	let arrayUserRecord=JSON.parse(localStorage.getItem("registeredUserRecord"));
    var userId=sessionStorage.getItem("userId");
	var todoArray=arrayUserRecord[userId].todoArray;
	var makePublicId=document.getElementsByName("maketodopublic");
	makePublicId[0].disabled=true;
	makePublicId[1].disabled=true;
	if(todoArray.makeTodoPublic === "Yes")
		makePublicId[0].checked=true;
	else 
		makePublicId[1].checked=true;
	var todoItem1Array=document.getElementsByClassName("todoitem1");
	for(let i=0;i<todoItem1Array.length;i++){
		var childElements=todoItem1Array[i].childNodes;
		for(let j=0;j<childElements.length;j++)
		childElements[j].disabled=true;
	}
}

function filterTodoFunction(){
	document.getElementById("formpage").style.display="none";
    document.getElementById("mytodopageclass").style.display="block"; 
	let filterValue=document.getElementById("filterdropdown").value;
	let arrayUserRecord=JSON.parse(localStorage.getItem("registeredUserRecord"));
	let userid=sessionStorage.getItem("userId");
	let inputValue = arrayUserRecord[userid].todoArray;
	let filteredarray=[];
	if(filterValue ==="Filter"){
		todopageInDisplayMode(inputValue,userid);
		document.getElementById("filterdate").style.display="none";
		document.getElementById("filterdaterange").style.display="none";
		document.getElementById("filtercategory").style.display="none";
		document.getElementById("filterdatelabel").style.display="none";
		document.getElementById("toLabel").style.display="none"
			
	}
	 if(document.getElementById("filterdropdown").value === "byDate"){
		document.getElementById("filterdatelabel").style.display="none";
		var filterdate=document.getElementById("filterdate").value;
		inputValue=inputValue.filter(function(date1){
		return((new Date(date1.startDate)).getTime() === (new Date(filterdate)).getTime())
		})
		todopageInDisplayMode(inputValue,userid);
	}
	 if(document.getElementById("filterdropdown").value === "byCategory"){
		if(document.getElementById("filtercategory").value ==="Category"){
			todopageInDisplayMode(inputValue,userid);
	}
	 else if(document.getElementById("filtercategory").value ==="Office"){
		inputValue=inputValue.filter(function(category1){
			return(category1.categoryType === "Office")
		})
	}
	else if(document.getElementById("filtercategory").value ==="Home"){
		inputValue=inputValue.filter(function(category1){
				return(category1.categoryType === "Home")
		})
	}
	else  if(document.getElementById("filtercategory").value ==="Social")
	{
		inputValue=inputValue.filter(function(category1){
				return(category1.categoryType === "Social")
		})
	}
		todopageInDisplayMode(inputValue,userid);
	}
	 if(document.getElementById("filterdropdown").value === "isDone")
	{
		inputValue=inputValue.filter(function(category1){
			return(category1.todoStatus === "isDone")
		})	
			todopageInDisplayMode(inputValue,userid);

	}
	if(document.getElementById("filterdropdown").value === "isPending")
	{
		inputValue=inputValue.filter(function(category1){
			return(category1.todoStatus === "isPending")
		})
			todopageInDisplayMode(inputValue,userid);

	}
	if(document.getElementById("filterdropdown").value === "byDateRange")
	{
		
		var startdate=document.getElementById("filterdate").value;
		var enddate=document.getElementById("filterdaterange").value;
		inputValue=inputValue.filter(function(date1){
		return(((new Date(date1.startDate)).getTime()>=(new Date(startdate).getTime())) && ((new Date(date1.startDate)).getTime()<=(new Date(enddate).getTime())))
	})
	todopageInDisplayMode(inputValue,userid);	
	}
}

function displaydatetext(){
	document.getElementById("filterdate").style.display="none";
	document.getElementById("filterdaterange").style.display="none";
	document.getElementById("filtercategory").style.display="none";
	document.getElementById("filterdatelabel").style.display="none";
	document.getElementById("toLabel").style.display="none"
	if(document.getElementById("filterdropdown").value === "byDate"){
		document.getElementById("filterdate").style.display="inline-block";
	}
	else if(document.getElementById("filterdropdown").value === "byCategory"){
		document.getElementById("filtercategory").style.display="inline-block";	
	}
	else if(document.getElementById("filterdropdown").value === "byDateRange"){
		document.getElementById("filterdatelabel").style.display="inline-block";
		document.getElementById("toLabel").style.display="inline-block";
		document.getElementById("filterdaterange").style.display="inline-block";
		document.getElementById("filterdate").style.display="inline-block";
	}
	else{
		filterTodoFunction();
	}
}	

function enabletextbox(IdOfElement,IdOfReminderTextBox,labelId){
	id=IdOfElement.id;
	if(document.getElementById(id).checked ){
		document.getElementById(IdOfReminderTextBox).style.display="block";
		document.getElementById(labelId).style.display="block";	
	}
	else{
		document.getElementById(IdOfReminderTextBox).style.display="none";
		document.getElementById(labelId).style.display="none";	
	}
}

function enableForm(formmode){
	current=new Date();
	let current_date = new Date();
	let month = ('0' + (current_date.getMonth() + 1)).slice(-2);
	let date = ('0' + current_date.getDate()).slice(-2);
	let year = current_date.getFullYear();
	current = year + '-' + month + '-' + date;
	document.getElementById("startdate").min=current;
	document.getElementById("enddate").min=current;
	document.getElementById("reminderdate").min=current;
	var childArray=document.getElementById("bodysection").childNodes;
 	childArray[1].style.display="block";
	childArray[3].style.display="block";
	childArray[5].style.display="none";
	var buttonArray=document.getElementsByClassName("formbutton");

	if(formmode === "disabledform"){
		buttonArray[0].style.display="none";
		buttonArray[1].style.display="inline-block";
		buttonArray[3].style.display="inline-block";
		buttonArray[2].style.display="none";
		getFieldValues();
	}
	else if(formmode ==="createform" ){
					
		buttonArray[0].style.display="inline-block";
		buttonArray[3].style.display="inline-block";
		buttonArray[1].style.display="none";
		buttonArray[2].style.display="none";
	}
	else if(formmode=="createdanewtodo")
	{
		buttonArray[0].style.display="none";
		buttonArray[1].style.display="none";
		buttonArray[3].style.display="inline-block";
		buttonArray[2].style.display="none";
		disableFields();	
	}
}

function enableDisplay(){
    document.getElementById("formpage").style.display="none";
    document.getElementById("mytodopageclass").style.display="block";
	window.location.reload();

}

function deletetodos(){
	let checkedarray=[];
	userRecordArray=JSON.parse(localStorage.getItem("registeredUserRecord"));
	var userid=sessionStorage.getItem("userId");
	var deleteDiv=document.getElementsByName("deletediv");
	for(var i=0;i<deleteDiv.length;i++){
		var todoidstring=deleteDiv[i].id;
		var todoid=todoidstring.split("-");
		if(document.getElementById("checkbox-"+todoid[1]).checked === true){
			checkedarray.push(todoid[1]);
		} 
		else
		console.log(document.getElementById("checkbox-"+todoid[1]).checked);
		
	}
	for(let count=checkedarray.length-1;count>=0;count--){
		for(let j=0;j<userRecordArray[userid].todoArray.length;j++){
			if(userRecordArray[userid].todoArray[j].todoID === checkedarray[count]){
				userRecordArray[userid].todoArray.splice(j,1);
				console.log("checkedarray[count]",checkedarray[count]);
				document.getElementById("display-"+checkedarray[count]).remove();
			}
		}
	}
	var todostringify=JSON.stringify(userRecordArray);
	localStorage.setItem("registeredUserRecord",todostringify);
}

function editTodoItems(){
	let todoId=sessionStorage.getItem("todoId");
	let todoIndex;
	let arrayUserRecord=JSON.parse(localStorage.getItem("registeredUserRecord"));
   	let userId=sessionStorage.getItem("userId");
	let todoArray=arrayUserRecord[userId].todoArray;
	for(let i=0;i<todoArray.length;i++){
		if(todoArray[i].todoID == todoId)
		todoIndex=i;
	}
	 todoArray=arrayUserRecord[userId].todoArray[todoIndex]; 
	let makepublicId=document.getElementsByName("maketodopublic");
	var todoItem1Array=document.getElementsByClassName("todoitem1");
		for(let i=0;i<todoItem1Array.length;i++){
			var childElements=todoItem1Array[i].childNodes;
			for(let j=0;j<childElements.length;j++)
			childElements[j].disabled=false;
		}

	var buttonArray=document.getElementsByClassName("formbutton");
	buttonArray[0].style.display="none";
	buttonArray[2].style.display="inline-block";
	buttonArray[1].style.display="none";
	buttonArray[3].style.display="none";
 }

function searchTodoByName(){
	var arrayValue=[];
	var searchtext=document.getElementById("searchtodo").value;
	let userRecordArray=JSON.parse(localStorage.getItem("registeredUserRecord"));
	var userid=sessionStorage.getItem("userId");
	var inputValue=userRecordArray[userid].todoArray;
	if(searchtext === ""){
		todopageInDisplayMode(inputValue,userid);
	}
	else{
		for(var i=0;i<inputValue.length;i++){
			if(searchtext.toUpperCase() === inputValue[i].title.toUpperCase()){
				arrayValue.push(inputValue[i]);}
		}
		todopageInDisplayMode(arrayValue,userid);
	}
}

function changeStatusOfTodo(IdOfElement){
	var strid=IdOfElement.id;
	let userRecordArray=JSON.parse(localStorage.getItem("registeredUserRecord"));
	var userid=sessionStorage.getItem("userId");
	var id=strid.split("-");
	if(IdOfElement.checked === true){
		userRecordArray[userid].todoArray[id[1]].todoStatus="isDone";
	}
	else{
		userRecordArray[userid].todoArray[id[1]].todoStatus="isPending";
	}
	var tostring=JSON.stringify(userRecordArray);
	localStorage.setItem("registeredUserRecord",tostring);
	window.location.reload();
}

function validateDate(date1,date2,errorspan){
	let d2string=[];
	let d1string=[];
		
		d2=document.getElementById(date2).value;
		d2string[1]=date2.substring(date2.length-4,date2.length);
		d2string[0]=date2.substring(0,date2.length-4);
		d2string=(d2string.join(" "));
		
		d2string= (d2string[0].toUpperCase()) + d2string.slice(1);
		var d1=document.getElementById(date1).value;
		d1string[1]=date1.substring(date1.length-4,date1.length);
		d1string[0]=date1.substring(0,date1.length-4);
		d1string=(d1string.join(" "));
		d1string= (d1string[0].toUpperCase()) + d1string.slice(1);
	if((new Date(d1)).getTime()<(new Date(d2)).getTime()){
		document.getElementById(errorspan).innerHTML=d1string+" Cannot be before "+d2string;
		document.getElementById(date1).value="";
		document.getElementById(date1).focus();
		return false;
	}
	document.getElementById(errorspan).innerHTML=" ";
	return true;
}