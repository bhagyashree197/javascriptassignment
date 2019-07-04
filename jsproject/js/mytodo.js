function validateitems()
{
	var title=document.getElementById("Title").value;
	var startDate=document.getElementById("startDate").value;
	if(title == " " || startDate=="")
	{
		document.getElementById("Title").style.border="2px solid red";
        document.getElementById("startDate").style.border="2px solid red"
		alert("Please Fill All The Mandatory Fields");
		return false;
	}
	addTodoItems();
}
function clickStatus(IdOfElement)
{
	var id=IdOfElement.id;
	alert(id);
	if(document.getElementById(id).checked){
		document.getElementById(id).checked=false;
	}
	else
	{
		document.getElementById(id).checked=true;
	}

}

function addTodoItems()
{
	document.getElementById("MytodopageClass").style.display="none";
var title=document.getElementById("Title").value;
document.getElementById("registeredUserForm").style.display="none";
var categorytype=document.getElementById("categorytype").value;
var startDate=document.getElementById("startDate").value;
var endDate=document.getElementById("endDate").value;
var setReminder=document.getElementById("setReminder").value;
var reminderdate=document.getElementById("reminderdate").value;
var makeToDoPublic= document.querySelector('input[name="makeTodoPublic"]:checked').value;
var todoDescription=document.getElementById("todoDescription").value;
var userid=sessionStorage.getItem("userId");
let arrayUserRecord=JSON.parse(localStorage.getItem("registeredUserRecord"));


var todoID=makeid(5);
function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

var obj=new Object();
obj.todoID=todoID;
obj.title=title;
obj.categoryType=categorytype;
obj.startDate=startDate;
obj.endDate=endDate;
obj.setReminder=setReminder;
obj.reminderDate=reminderdate;
obj.makeTodoPublic=makeToDoPublic;
obj.todoDescription=todoDescription;
obj.todoStatus="isPending";
arrayUserRecord[userid].todoArray.push(obj);
var stringUserRecord=JSON.stringify(arrayUserRecord);
localStorage.setItem("registeredUserRecord",stringUserRecord);
document.getElementById("MytodopageClass").style.display="block";
document.getElementById("formpage").style.display="none";
window.location.replace("mytodopage.html");

}


function todopageInDisplayMode(inputValue,userid)
{
	var e=document.getElementById("todoCards");
	var child = e.lastElementChild;  
	while (child) { 
		e.removeChild(child); 
		child = e.lastElementChild;
	}
	if(inputValue.length==0)
	{
		var li = document.createElement("noRecordText");
		var content="<h1 style='margin-top:30px;'>No Records found</h1>";
		li.innerHTML=content;
		document.getElementById("todoCards").appendChild(li);
	}
	else
	{
	  for(var count=0;count<inputValue.length;count++)
        {
            var li = document.createElement("div111");
           
        var title = inputValue[count].title;
        var startdate=inputValue[count].startDate;
        var endDate=inputValue[count].endDate;
		var categoryType=inputValue[count].categoryType;
		var todoStatus=inputValue[count].todoStatus;
		var current=new Date();
		if(todoStatus == "isPending")
		{
			if((new Date(endDate)).getTime()<current.getTime())
			{
			var classname="isLate";
			}
			else
			{
				var classname="";
			}
		}
		else if(todoStatus == "isDone")
		{
			var classname="isDonetodo";	
		}
		
        var divtodo='<div class="todoDisplayclass ' +classname+'" id=display-'+inputValue[count].todoID+'><input type=checkbox name="deleteDiv" id=checkbox-'+inputValue[count].todoID+'><h1>'+title+'</h1><h3>Category:'+categoryType+'</h3><h3>Start Date'+startdate+'</h3><h3>End Date'+endDate+'</h3><div class="isDoneDiv"><h3>Is Done</h3><input type=checkbox name="isDone" id="isDone-'+count+'" onclick=changeStatusOfTodo(this);></div><input type="button" name="viewFullTodo" value="View Full Todo"></div>';
		
        li.innerHTML=divtodo;
		document.getElementById("todoCards").appendChild(li);
		if(todoStatus == "isDone")
		{
			document.getElementById("isDone-"+count).checked=true; 
		}
        }   
           
    	var buttonarray=document.getElementsByName("viewFullTodo");
		for(let i=0;i<buttonarray.length;i++)
		{
				document.getElementById("saveEditedTodoItem").disabled=true;
				document.getElementById("editTodoItem").disabled=false;
				buttonarray[i].addEventListener('click',function(){
					disableFields(i)
				});
					
		}	

	}	
			
			
}
function filterTodoFunction()
{
	
	document.getElementById("formpage").style.display="none";
    document.getElementById("MytodopageClass").style.display="block"; 
	document.getElementById("registeredUserForm").style.display="none";
	let filterValue=document.getElementById("filterDropdown").value;
	 let arrayUserRecord=JSON.parse(localStorage.getItem("registeredUserRecord"));
	  var userid=sessionStorage.getItem("userId");
	 var inputValue = arrayUserRecord[userid].todoArray;
	 var filteredarray=[];
	 if(filterValue ==="Filter")
	{
		todopageInDisplayMode(inputValue,userid);
		document.getElementById("filterdate").style.display="none";
		document.getElementById("filterdaterange").style.display="none";
		document.getElementById("filtercategory").style.display="none";
		document.getElementById("filterdatelabel").style.display="none";
		document.getElementById("toLabel").style.display="none"
	}


	 else if(document.getElementById("filterDropdown").value === "byDate")
	{
		document.getElementById("filterdatelabel").style.display="none";
	
		var filterdate=document.getElementById("filterdate").value;
		var filteredarray=inputValue.filter(function(date1){
		return((new Date(date1.startDate)).getTime() === (new Date(filterdate)).getTime())
		})
		todopageInDisplayMode(filteredarray,userid);
	}
	else if(document.getElementById("filterDropdown").value === "byCategory")
	{
	
		if(document.getElementById("filtercategory").value ==="Category")
		{
			todopageInDisplayMode(inputValue,userid);
		}
		else if(document.getElementById("filtercategory").value ==="Office")
		{
			var filteredarray=inputValue.filter(function(category1){
				return(category1.categoryType === "Office")
				})
		}
		else if(document.getElementById("filtercategory").value ==="Home")
		{
			var filteredarray=inputValue.filter(function(category1){
				return(category1.categoryType === "Home")
				})
		}
		else if(document.getElementById("filtercategory").value ==="Social")
		{
			var filteredarray=inputValue.filter(function(category1){
				return(category1.categoryType === "Social")
				})
		}
		todopageInDisplayMode(filteredarray,userid);
	}
	else if(document.getElementById("filterDropdown").value === "isDone")
	{
		var filteredarray=inputValue.filter(function(category1){
			return(category1.todoStatus === "isDone")
			})	
			todopageInDisplayMode(filteredarray,userid);

	}
	else if(document.getElementById("filterDropdown").value === "isPending")
	{
		var filteredarray=inputValue.filter(function(category1){
			return(category1.todoStatus === "isPending")
			})
			todopageInDisplayMode(filteredarray,userid);

	}
	else if(document.getElementById("filterDropdown").value === "byDateRange")
	{
		
		var startdate=document.getElementById("filterdate").value;
		var enddate=document.getElementById("filterdaterange").value;
		var filteredarray=inputValue.filter(function(date1){
		return(((new Date(date1.startDate)).getTime()>=(new Date(startdate).getTime())) && ((new Date(date1.startDate)).getTime()<=(new Date(enddate).getTime())))
	})
	todopageInDisplayMode(filteredarray,userid);	
	}
}


function displaydatetext()
{
	if(document.getElementById("filterDropdown").value === "byDate")
	{
	document.getElementById("filterdate").style.display="inline-block";
	document.getElementById("filtercategory").style.display="none";
	}
	else if(document.getElementById("filterDropdown").value === "byCategory")
	{
		document.getElementById("filterdate").style.display="none";
		document.getElementById("filtercategory").style.display="inline-block";	
		document.getElementById("filterdatelabel").style.display="none";
		document.getElementById("toLabel").style.display="none";
		document.getElementById("filterdaterange").style.display="none";
	}
	else if(document.getElementById("filterDropdown").value === "byDateRange")
	{
		document.getElementById("filterdatelabel").style.display="inline-block";
		document.getElementById("toLabel").style.display="inline-block";
		document.getElementById("filterdaterange").style.display="inline-block";
		document.getElementById("filterdate").style.display="inline-block";
		document.getElementById("filtercategory").style.display="none";
	}
	else
	{
		filterTodoFunction();
	}
}	


function disableFields(i){
	sessionStorage.setItem("todoid",i);
	let arrayUserRecord=JSON.parse(localStorage.getItem("registeredUserRecord"));
    var userid=sessionStorage.getItem("userId");
	var todoid=sessionStorage.getItem("todoid");
	  var inputValue = arrayUserRecord[userid].todoArray;
				document.getElementById("formpage").style.display="none";
				document.getElementById("MytodopageClass").style.display="none"; 
				document.getElementById("registeredUserForm").style.display="block";
				document.getElementById("editstartDate").value=inputValue[todoid].startDate;
				document.getElementById("editTitle").value=inputValue[todoid].title;
				var categoryId=document.getElementById("editcategorytype");
				document.getElementById("editcategorytype").disabled=true;
				for(let counter=0;counter<categoryId.options.length;counter++)
				{
							if(categoryId[counter].value === inputValue[todoid].categoryType)
							{
							document.getElementById("editcategorytype").options[counter].selected=true;
							break;
							}
				}
				
				document.getElementById("editendDate").value=inputValue[todoid].endDate;
				document.getElementById("editreminderdate").value=inputValue[todoid].reminderDate;
				
				if(inputValue[todoid].makeTodoPublic === "on")
					document.getElementById("editmakeTodoPublic").checked=true;
				else 
					document.getElementById("editmakeTodoPublic").checked=false;
				document.getElementById("edittodoDescription").value=inputValue[todoid].todoDescription;
				document.getElementById("editstartDate").disabled=true;
				document.getElementById("editTitle").disabled=true;
				
				document.getElementById("editendDate").disabled=true;
				if(inputValue[todoid].setReminder === "on")
				{
					document.getElementById("editsetReminder").checked=true;
					document.getElementById("editsetReminder").disabled=true;
					document.getElementById("editreminderdate").disabled=true;
				}
				else 
				{
					document.getElementById("editsetReminder").checked=false;
					document.getElementById("editsetReminder").disabled=true;
					document.getElementById("editreminderdate").disabled=true;
				}
			
				document.getElementById("editmakeTodoPublic").disabled=true;
				document.getElementById("edittodoDescription").disabled=true;
					document.getElementById("saveEditedTodoItem").disabled=true;
				document.getElementById("editTodoItem").disabled=false;
			
}

function enabletextbox()
{
	
document.getElementById("reminderdate").disabled=false;
document.getElementById("reminderdate").style.display="block";
document.getElementById("reminderdatelabel").style.display="block";
}
function enableForm()
{
    document.getElementById("formpage").style.display="block";
    document.getElementById("MytodopageClass").style.display="none"; 
	document.getElementById("registeredUserForm").style.display="none";
}
function enableDisplay()
{
    document.getElementById("formpage").style.display="none";
    document.getElementById("MytodopageClass").style.display="block";
	document.getElementById("registeredUserForm").style.display="none";
	window.location.reload();

}
function deletetodos()
{
	let checkedarray=[];
	userRecordArray=JSON.parse(localStorage.getItem("registeredUserRecord"));
	var userid=sessionStorage.getItem("userId");
	var deleteDiv=document.getElementsByName("deleteDiv");
	
	
	for(var i=0;i<deleteDiv.length;i++)
	{
		var todoidstring=deleteDiv[i].id;
		var todoid=todoidstring.split("-");
		
		 if(document.getElementById("checkbox-"+todoid[1]).checked === true)
		{
			
			
		checkedarray.push(todoid[1]);
		} 
		else
		console.log(document.getElementById("checkbox-"+todoid[1]).checked);
		
	}
for(let count=checkedarray.length-1;count>=0;count--)
	{
		for(let j=0;j<userRecordArray[userid].todoArray.length;j++)
		{
		if(userRecordArray[userid].todoArray[j].todoID === checkedarray[count])
		{
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
				let userRecordArray=JSON.parse(localStorage.getItem("registeredUserRecord"));
				var userid=sessionStorage.getItem("userId");
			var inputValue = userRecordArray[userid].todoArray;
				var buttonarray=document.getElementsByName("editTodoItem");
              var todoid=sessionStorage.getItem("todoid");
			var categoryId=document.getElementById("editcategorytype");
				document.getElementById("formpage").style.display="none";
				document.getElementById("MytodopageClass").style.display="none"; 
				document.getElementById("registeredUserForm").style.display="block";
				document.getElementById("editstartDate").value=inputValue[todoid].startDate;
				document.getElementById("editTitle").value=inputValue[todoid].title;
				for(let counter=0;counter<categoryId.options.length;counter++)
				{
							if(categoryId[counter].value==="inputValue[todoid].categoryType")
									document.getElementById("editcategorytype").options.selected=true;
				}
				document.getElementById("editendDate").value=inputValue[todoid].endDate;
				
				document.getElementById("reminderdate").value=inputValue[todoid].reminderDate;
				
				
				document.getElementById("edittodoDescription").value=inputValue[todoid].todoDescription;
				
				document.getElementById("editsetReminder").disabled=false;
				document.getElementById("editstartDate").disabled=false;
				document.getElementById("editTitle").disabled=false;
			document.getElementById("editcategorytype").disabled=false;
				document.getElementById("editendDate").disabled=false;
				document.getElementById("editreminderdate").disabled=false;
			
				document.getElementById("reminderdate").disabled=false;
				document.getElementById("editmakeTodoPublic").disabled=false;
				document.getElementById("edittodoDescription").disabled=false;
				
					document.getElementById("saveEditedTodoItem").disabled=false;
			   document.getElementById("editTodoItem").disabled=true;
			   }

	
	function saveEditedTodoItem()
	{
		let userRecordArray=JSON.parse(localStorage.getItem("registeredUserRecord"));
				var userid=sessionStorage.getItem("userId");
				var todoid=sessionStorage.getItem("todoid");
		var title=document.getElementById("editTitle").value;
	
		var categorytype=document.getElementById("editcategorytype").value;	
		var startDate=document.getElementById("editstartDate").value;	
		var endDate=document.getElementById("editendDate").value;
		var setReminder=document.getElementById("editsetReminder");
		 var reminderdate=document.getElementById("editreminderdate").value;
       var makeTodoPublic=document.getElementById("editmakeTodoPublic").value;
       var todoDescription=document.getElementById("edittodoDescription").value;
			
			
				var obj=new Object();
				
				obj.title=title;
				obj.categoryType=categorytype;
				obj.startDate=startDate;
				obj.endDate=endDate;
				obj.setReminder=setReminder;
				obj.reminderDate=reminderdate;
				obj.makeTodoPublic=makeTodoPublic;
				obj.todoDescription=todoDescription;
				obj.todoStatus=userRecordArray[userid].todoArray.todoStatus;
				userRecordArray[userid].todoArray[todoid]=obj;
				var stringUserRecord=JSON.stringify(userRecordArray);
				localStorage.setItem("registeredUserRecord",stringUserRecord);
				document.getElementById("MytodopageClass").style.display="block";
				document.getElementById("formpage").style.display="none";
				disableFields(todoid);
}

function searchTodoByName()
{
	var arrayValue=[];
	var searchtext=document.getElementById("searchTodo").value;
	
	let userRecordArray=JSON.parse(localStorage.getItem("registeredUserRecord"));
	var userid=sessionStorage.getItem("userId");
	var inputValue=userRecordArray[userid].todoArray;
	if(searchtext === ""){
	todopageInDisplayMode(inputValue,userid);}
	else{

	for(var i=0;i<inputValue.length;i++)
	{
	if(searchtext.toUpperCase() === inputValue[i].title.toUpperCase()){
	arrayValue.push(inputValue[i]);}
	}
	todopageInDisplayMode(arrayValue,userid);
}
}
function validStartDate()
{
	var valueOfElement=new Date(document.getElementById("startDate").value);
 let today=new Date();
 if(valueOfElement.getTime() < today.getTime())
 {
 alert("Start Date Cannot be Before The Current Date");
 document.getElementById("startDate").value="";
 document.getElementById("startDate").focus();
 return false;
 }
}


function validEndDate(IdOfElement){
	var valueOfStartDate=document.getElementById("startDate").value;
	var valueOfEndDate=IdOfElement.value;
	let today=new Date();
	if(((new Date(valueOfEndDate)).getTime()<(new Date(valueOfStartDate)).getTime()) || (new Date(valueOfEndDate)).getTime()< today.getTime())
	{
		alert("Please Set value of "+IdOfElement.id+" after the Start Date and Current Date");
		
		document.getElementById("endDate").value="";
		document.getElementById("endDate").focus();
		return false;
}
return true;
}


function changeStatusOfTodo(IdOfElement){
	var strid=IdOfElement.id;
	let userRecordArray=JSON.parse(localStorage.getItem("registeredUserRecord"));
				var userid=sessionStorage.getItem("userId");
				var id=strid.split("-");
				
			if(IdOfElement.checked === true)
			{
			userRecordArray[userid].todoArray[id[1]].todoStatus="isDone";
			}
			else
			{
				userRecordArray[userid].todoArray[id[1]].todoStatus="isPending";
			}
			var tostring=JSON.stringify(userRecordArray);
			localStorage.setItem("registeredUserRecord",tostring);
			window.location.reload();
			
}
function validReminderDate(IdOfElement)
{
	valueOfElement=IdOfElement.value;
	var valueOfEndDate=document.getElementById("endDate").value;
	if((new Date(valueOfEndDate)).getTime()>(new Date(valueOfEndDate)).getTime())
	{
		alert("Please Set value of "+IdOfElement.id+" before the End Date");

		document.getElementById("endDate").focus();
		return false;
}
return true;
}