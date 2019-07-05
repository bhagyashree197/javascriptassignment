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
if(setReminder === "on")
{
	var reminderdate=document.getElementById("reminderdate1").value;
}
else
{
	reminderdate=" ";
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
				if(inputValue[todoid].setReminder == "true")
				{
					document.getElementById("editsetReminder").checked =true;
					document.getElementById("editreminderdate").style.display="inline-block";
					document.getElementById("editreminderdate").disabled=true;


				}
				else
				{
					document.getElementById("editreminderdate").style.display="none";
					document.getElementById("editreminderlabel").style.display="none";
				}
				
			
				document.getElementById("editendDate").value=inputValue[todoid].endDate;
				
				
				var makepublicId=document.getElementsByName("editmakeTodoPublic");
				makepublicId[0].disabled=true;
				makepublicId[1].disabled=true;

				if(inputValue[todoid].makeTodoPublic === "Yes")
				makepublicId[0].checked=true;
				else 
				makepublicId[1].checked=true;

				document.getElementById("edittodoDescription").value=inputValue[todoid].todoDescription;
				document.getElementById("editstartDate").disabled=true;
				document.getElementById("editTitle").disabled=true;
				
				document.getElementById("editendDate").disabled=true;
				
			
				document.getElementById("edittodoDescription").disabled=true;
					document.getElementById("saveEditedTodoItem").disabled=true;
				document.getElementById("editTodoItem").disabled=false;
			
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



function enabletextbox(IdOfElement,IdOfremindertext)
{
	id=IdOfElement.id;
	if(document.getElementById(id).checked )
	{
document.getElementById(IdOfremindertext).disabled=false;
document.getElementById(IdOfremindertext).style.display="block";
document.getElementById(IdOfremindertext).style.display="block";
}
else
{
	document.getElementById(IdOfremindertext).disabled=true;
	document.getElementById(IdOfremindertext).style.display="none";
	document.getElementById(IdOfremindertext).style.display="none";	
}
}
function enableForm()
{
	current=new Date();
	let current_date = new Date();
	let month = ('0' + (current_date.getMonth() + 1)).slice(-2);
	let date = ('0' + current_date.getDate()).slice(-2);
	let year = current_date.getFullYear();
	current = year + '-' + month + '-' + date;

	document.getElementById("formpage").style.display="block";
	document.getElementById("startDate").min=current;
	document.getElementById("endDate").min=current;
	document.getElementById("reminderdate1").min=current;

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
				
				document.getElementById("editreminderdate").value=inputValue[todoid].reminderDate;
				enabletextbox(document.getElementById("editsetReminder"),'editreminderdate');
				document.getElementById("edittodoDescription").value=inputValue[todoid].todoDescription;
				var makepublicId=document.getElementsByName("editmakeTodoPublic");
				makepublicId[0].disabled=false;
				makepublicId[1].disabled=false;
				
				document.getElementById("editsetReminder").disabled=false;
				document.getElementById("editstartDate").disabled=false;
				document.getElementById("editTitle").disabled=false;
			document.getElementById("editcategorytype").disabled=false;
				document.getElementById("editendDate").disabled=false;
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
		var setReminder=document.getElementById("editsetReminder").checked;
		if(setReminder === true)
		{
			var reminderdate=document.getElementById("editreminderdate").value;
		}
		else
		{
		var reminderdate="";
		}
		var categorytype=document.getElementById("editcategorytype").value;	
		var startDate=document.getElementById("editstartDate").value;	
		var endDate=document.getElementById("editendDate").value;
		
		
		 var makeToDoPublic= document.querySelector('input[name="editmakeTodoPublic"]:checked').value;
       var todoDescription=document.getElementById("edittodoDescription").value;
			
			
				var obj=new Object();
				obj.todoID=userRecordArray[todoid].todoArray.todoID;
				obj.title=title;
				obj.categoryType=categorytype;
				obj.startDate=startDate;
				obj.endDate=endDate;
				obj.setReminder=setReminder;
				obj.reminderDate=reminderdate;
				obj.makeTodoPublic=makeToDoPublic;
				obj.todoDescription=todoDescription;
				obj.todoStatus=userRecordArray[userid].todoArray.todoStatus;
				userRecordArray[userid].todoArray[todoid]=obj;
				var stringUserRecord=JSON.stringify(userRecordArray);
				localStorage.setItem("registeredUserRecord",stringUserRecord);
				document.getElementById("MytodopageClass").style.display="block";
				document.getElementById("formpage").style.display="none";
				document.getElementById("editdateerrorspan").innerHTML=" ";
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




function validateDate(date1,date2,errorspan){
	let d2string=[];
	let d1string=[];
		current=new Date();
		d2=document.getElementById(date2).value;
		d2string[1]=date2.substring(date2.length-4,date2.length);
		d2string[0]=date2.substring(0,date2.length-4);
		d2string=(d2string.join(" "));
		console.log(d2string);
		d2string= (d2string[0].toUpperCase()) + d2string.slice(1);

	
	var d1=document.getElementById(date1).value;
	
	d1string[1]=date1.substring(date1.length-4,date1.length);
	d1string[0]=date1.substring(0,date1.length-4);
	d1string=(d1string.join(" "));
	console.log(d1string);
	d1string= (d1string[0].toUpperCase()) + d1string.slice(1);
	
	if((new Date(d1)).getTime()<(new Date(d2)).getTime()) 
	{
		document.getElementById(errorspan).innerHTML=d1string+" Cannot be before "+d2string;
		document.getElementById(date1).value="";
		document.getElementById(date1).focus();
		return false;
}
return true;
}