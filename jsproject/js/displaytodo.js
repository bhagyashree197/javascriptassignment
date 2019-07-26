var filterFunctions=(function(){
	var displaydatetext=function(){
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
var filterTodoFunction=function(){
	document.getElementById("formpage").style.display="none";
    document.getElementById("mytodopageclass").style.display="block"; 
	let filterValue=document.getElementById("filterdropdown").value;
	var arrayUserRecord=retrieveDataFromLS();
	let inputValue = arrayUserRecord["arrayUserRecord"][arrayUserRecord["userId"]].todoArray;
	
	if(filterValue ==="Filter"){
		document.getElementById("filterdate").style.display="none";
		document.getElementById("filterdaterange").style.display="none";
		document.getElementById("filtercategory").style.display="none";
		document.getElementById("filterdatelabel").style.display="none";
		document.getElementById("toLabel").style.display="none"
		todopageInDisplayMode(inputValue);
	}
	 if(document.getElementById("filterdropdown").value === "byDate"){
		
		FilterByDate(inputValue);
	}

	 if(document.getElementById("filterdropdown").value === "byCategory"){
		FilterByCategory(inputValue);

	 }
	 if(document.getElementById("filterdropdown").value === "isDone")
	{
		StatusTodo(inputValue,"isDone");
	}
	if(document.getElementById("filterdropdown").value === "isPending")
	{
		StatusTodo(inputValue,"isPending");
	}

	if(document.getElementById("filterdropdown").value === "byDateRange")
	{
		filterByDateRange(inputValue);
		
	}
	document.getElementById("savestatus").value="";
}

function FilterByDate(inputValue){
        document.getElementById("filterdatelabel").style.display="none";
		var filterdate=document.getElementById("filterdate").value;
		inputValue=inputValue.filter(function(date1){
		return((new Date(date1.startDate)).getTime() === (new Date(filterdate)).getTime());
		})
		todopageInDisplayMode(inputValue);
}

function FilterByCategory(inputValue){
	Category=document.getElementById("filtercategory").value;
	inputValue=inputValue.filter(function(category1){
		return(category1.categoryType === Category)
	});
		todopageInDisplayMode(inputValue);
}

function StatusTodo(inputValue,value){
	inputValue=inputValue.filter(function(category1){
		return(category1.todoStatus === value);
	})
	todopageInDisplayMode(inputValue);
}

function filterByDateRange(inputValue){
	var startdate=document.getElementById("filterdate").value;
		var enddate=document.getElementById("filterdaterange").value;
		inputValue=inputValue.filter(function(date1){
		return(((new Date(date1.startDate)).getTime()>=(new Date(startdate).getTime())) && ((new Date(date1.startDate)).getTime()<=(new Date(enddate).getTime())));
})
todopageInDisplayMode(inputValue);
}
return{
	displaydatetext:displaydatetext,
	filterTodoFunction:filterTodoFunction
}
})();

function todopageInDisplayMode(inputValue)
{

	document.getElementById("formpage").style.display="none";
	document.getElementById("mytodopageclass").style.display="block";
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
			
			var divtodo='<div class="tododisplayclass ' +classname+'" id=display-'+inputValue[count].todoID+'><input type=checkbox name="deletediv" id=checkbox-'+inputValue[count].todoID+'><h1>'+title+'</h1><h3>Category:'+categoryType+'</h3><h3>Start Date'+startdate+'</h3><h3>End Date'+endDate+'</h3><div class="isdonediv"><h3>Is Done</h3><input type=checkbox name="isdone" id="isdone-'+count+'" onclick=todoFunctions.changeStatusOfTodo(this);></div><input type="button" name="viewfulltodo" value="View Full Todo"></div>';
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
					todoFunctions.enableForm('disabledform');
					});
			}	

	}	
}
