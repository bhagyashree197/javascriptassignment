function profileInDisabledMode()
{
	 disableTextbox();

	
	var arrayUserRecord=JSON.parse(localStorage.getItem("registeredUserRecord"));
	
	var userId=sessionStorage.getItem("userId");
	
	var firstName = document.getElementById("Firstname");
	var lastName = document.getElementById("Lastname");
	var streetName = document.getElementById("Streetname");
	var cityName = document.getElementById("Cityname");
	var stateName = document.getElementById("Statename");
	var countryName = document.getElementById("Countryname");
	var pincode = document.getElementById("Pincode");
	var genderarray=document.getElementsByName("Gender");
	 if(arrayUserRecord[userId].Gender === "Male")
		 document.getElementById("Male").checked=true;
	 else if(arrayUserRecord[userId].Gender === "Female")
		 document.getElementById("Female").checked=true;
	 else{
		 document.getElementById("Other").checked=true;
	 }
		 
	//document.getElementById("userName1").innerHTML=arrayUserRecord[userid].firstName;

	

	//=arrayUserRecord[userId].firstName;
	
	firstName.value=arrayUserRecord[userId].firstName;
	lastName.value=arrayUserRecord[userId].lastName;
	streetName.value=arrayUserRecord[userId].streetName;
	cityName.value=arrayUserRecord[userId].cityName;
	stateName.value=arrayUserRecord[userId].stateName;
	countryName.value=arrayUserRecord[userId].countryName;
	pincode.value=arrayUserRecord[userId].pincode;
	Emailid.value=arrayUserRecord[userId].emailID;
}

function profileinEditmode()
{
	document.getElementById("Edit").disabled=true;
		document.getElementById("Male").disabled=false;
	document.getElementById("Female").disabled=false;
	document.getElementById("Other").disabled=false;
	
	
	document.getElementById("Save").disabled=false;
	document.getElementById("Firstname").disabled=false;
	document.getElementById("Lastname").disabled=false;
	document.getElementById("Streetname").disabled=false;
	document.getElementById("Pincode").disabled=false;
	document.getElementById("Statename").disabled=false;
	document.getElementById("Countryname").disabled=false;
	document.getElementById("Cityname").disabled=false;
		 
		var firstName = document.getElementById("Firstname");
		var lastName = document.getElementById("Lastname");
		var streetName = document.getElementById("Streetname");
		var cityName = document.getElementById("Cityname");
		var stateName = document.getElementById("Statename");
		var countryName = document.getElementById("Countryname");
		var pincode = document.getElementById("Pincode");
	
  
}
function saveChangedData()
{
	var userId=sessionStorage.getItem("userId");
	var firstName = document.getElementById("Firstname").value;
	var lastName = document.getElementById("Lastname").value;
	var streetName = document.getElementById("Streetname").value;
	var cityName = document.getElementById("Cityname").value;
	var stateName = document.getElementById("Statename").value;
	var countryName = document.getElementById("Countryname").value;
	var pincode = document.getElementById("Pincode").value;
	var userArrayRecord=JSON.parse(localStorage.getItem("registeredUserRecord"));
	var Gender = document.querySelector('input[name="Gender"]:checked').value;
	var password=userArrayRecord[userId].password;
	var emailID=userArrayRecord[userId].emailID;
	var obj=new Object();
  
	obj.firstName=firstName;
  obj.lastName=lastName;
  obj.gender=Gender;
   obj.streetName=streetName;
  obj.cityName=cityName;
  obj.stateName=stateName;
  obj.countryName=countryName;
  obj.pincode=pincode;
  obj.emailID=emailID;
  obj.password=password;
	obj.todoArray=[];
	userArrayRecord[userId]=obj;
	var persondetailsinstring=JSON.stringify(userArrayRecord);
	localStorage.setItem("registeredUserRecord",persondetailsinstring);

	 disableTextbox();
   
   return true;
}
function disableTextbox()
{
		document.getElementById("Edit").disabled=false;
	document.getElementById("Save").disabled=true;
	document.getElementById("Firstname").disabled=true;
	document.getElementById("Lastname").disabled=true;
	document.getElementById("Streetname").disabled=true;
	document.getElementById("Pincode").disabled=true;
	document.getElementById("Cityname").disabled=true;
	document.getElementById("Statename").disabled=true;
	document.getElementById("Countryname").disabled=true;
	document.getElementById("Emailid").disabled=true;
	document.getElementById("Male").disabled=true;
	document.getElementById("Female").disabled=true;
	document.getElementById("Other").disabled=true;
	
	
}