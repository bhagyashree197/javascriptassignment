(function(){
	if(sessionStorage.getItem("userId")== null)
	{
		alert("Session Expired!!Please Login Again!!");
		window.location.href="../html/loginpage.html";
	
	}
	})();

	let retrieveDataFromLS=function(){
	let arrayUserRecord=JSON.parse(localStorage.getItem("registeredUserRecord"));
	var userId=sessionStorage.getItem("userId");
	return {
		arrayUserRecord:arrayUserRecord,
		userId:userId
	}
}

let retrieveTodoArray=function(){
	var userRecord=retrieveDataFromLS();
	return userRecord["arrayUserRecord"][userRecord["userId"]].todoArray;
}

function validateitems(objectType){
	var title=document.getElementById("title").value;
	var startDate=document.getElementById("startdate").value;
	if(title == " " || startDate==""){
		document.getElementById("title").style.border="2px solid red";
        document.getElementById("startdate").style.border="2px solid red"
		document.getElementById("savestatus").innerHTML="**Please Fill All The Mandatory Fields**";
		return false;
	}
	todoFunctions.addTodoItems(objectType);
}

var todoFunctions=(function(){
	var addTodoItems=function(objectType){
		var title=document.getElementById("title").value;
		var categorytype=document.getElementById("categorytype").value;
		var startDate=document.getElementById("startdate").value;
		var endDate=document.getElementById("enddate").value;
		var setReminder=document.getElementById("setreminder").checked;
		var makeToDoPublic= document.querySelector('input[name="maketodopublic"]:checked').value;
		var todoDescription=document.getElementById("tododescription").value;
		var userRecordArray=retrieveDataFromLS();
		var todoArray=retrieveTodoArray(); 
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
		userRecordArray["arrayUserRecord"][userRecordArray["userId"]].todoArray.push(obj);
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
				userRecordArray["arrayUserRecord"][userRecordArray["userId"]].todoArray[todoIndex]=obj;
			}
			else
			{
				return false;
			}
		}
		arrayUserRecord=JSON.stringify(userRecordArray["arrayUserRecord"]);
		localStorage.setItem("registeredUserRecord",arrayUserRecord);
		enableForm('createdanewtodo');
		document.getElementById("savestatus").innerHTML="Record Successfully Saved";
	}

	var deletetodos=function(){
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
	
	var editTodoItems=function(){
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

	var enableForm=function(formmode){
		document.getElementById("savestatus").value="";
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
		if(formmode ==="createform" ){
						
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
		else if(formmode === "disabledform"){
			buttonArray[0].style.display="none";
			buttonArray[1].style.display="inline-block";
			buttonArray[3].style.display="inline-block";
			buttonArray[2].style.display="none";
			getFieldValues();
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
	return{
		editTodoItems:editTodoItems,
		deletetodos:deletetodos,
		addTodoItems:addTodoItems,
		enableForm:enableForm,
		changeStatusOfTodo:changeStatusOfTodo
	}
	
})();

function clickStatus(IdOfElement){
	var id=IdOfElement.id;
	if(document.getElementById(id).checked){
		document.getElementById(id).checked=false;
	}
	else{
		document.getElementById(id).checked=true;
	}

}

function getFieldValues(){
	 let todoId=sessionStorage.getItem("todoId"); 
	 var todoArray=retrieveTodoArray();
	for(let i=0;i<todoArray.length;i++){
		if(todoArray[i].todoID == todoId)
		todoIndex=i;
	} 
	var todoArray=todoArray[todoIndex]; 
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
	
	var todoArray=retrieveTodoArray();
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