function addTodoItems()
{
  
    document.getElementById("MytodopageClass").style.display="none";
var title=document.getElementById("Title").value;
var categorytype=document.getElementById("categorytype").value;
var startDate=document.getElementById("startDate").value;
var endDate=document.getElementById("endDate").value;
var setReminder=document.getElementById("setReminder").value;
var reminderdate=document.getElementById("reminderdate").value;
var makeTodoPublic=document.getElementById("makeTodoPublic").value;
var todoDescription=document.getElementById("todoDescription").value;
var userid=sessionStorage.getItem("sessionUserId");
let arrayUserRecord=JSON.parse(localStorage.getItem("registeredUserRecord"));
var obj=new Object();
obj.title=title;
obj.categoryType=categorytype;
obj.startDate=startDate;
obj.endDate=endDate;
obj.setReminder=setReminder;
obj.reminderDate=reminderdate;
obj.makeTodoPublic=makeTodoPublic;
obj.todoDescription=todoDescription;
arrayUserRecord[userid].todoArray.push(obj);
var stringUserRecord=JSON.stringify(arrayUserRecord);
localStorage.setItem("registeredUserRecord",stringUserRecord);
document.getElementById("MytodopageClass").style.display="block";
document.getElementById("formpage").style.display="none";

}


function todopageInDisplayMode()
{
    document.getElementById("formpage").style.display="none";
    document.getElementById("MytodopageClass").style.display="block"; 
    
    let arrayUserRecord=JSON.parse(localStorage.getItem("registeredUserRecord"));
    var userid=sessionStorage.getItem("sessionUserId");
    var inputValue = arrayUserRecord[userid].todoArray;
        for(var count=0;count<inputValue.length;count++)
        {
            var li = document.createElement("div111");
           
        var title = inputValue[count].title;
        var startdate=inputValue[count].startDate;
        var endDate=inputValue[count].endDate;
        var categoryType=inputValue[count].categoryType;
        var divaa='<div class=todoDisplayclass><input type=checkbox name="deleteDiv"><h1>'+title+'</h1><h3>Category:'+categoryType+'</h3><h3>Start Date'+startdate+'</h3><h3>End Date'+endDate+'</h3><input type="button" name="viewFullTodo" value="View Full Todo"></div>';

        li.innerHTML=divaa;
        document.getElementById("MytodopageClass").appendChild(li);
        }   
           
    

}
function enableForm()
{
    document.getElementById("formpage").style.display="block";
    document.getElementById("MytodopageClass").style.display="none"; 
}
function enableDisplay()
{
    document.getElementById("formpage").style.display="none";
    document.getElementById("MytodopageClass").style.display="block";

}
function deletetodos()
{
    let userRecordArray=JSON.parse(localStorage.getItem("registeredUserRecord"));
    var userid=sessionStorage.getItem("sessionUserId");
    var checkedtodo=document.querySelectorAll("deleteDiv").value;
    let todoArray=userRecordArray[userid].todoArray;
    
    for(let count=0;count<todoArray.length;count++)
    {
        if( document.querySelector('input[name="deleteDiv"]:checked'))
        {
            
            todoArray.splice(count,1);
         }
    }
    var todostringify=JSON.stringify("todoArray");
    localStorage.setItem("registeredUserRecord[userid].todoArray",todostringify);

}