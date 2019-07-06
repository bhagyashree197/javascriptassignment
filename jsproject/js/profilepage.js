(function(){
if(sessionStorage.getItem("userId")== null)
{
	alert("Session Expired!!Please Login Again!!");
	window.location.href="../html/loginpage.html";

}
})();


function profileInDisabledMode(){
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
	if(arrayUserRecord[userId].Gender === "Male")
		 document.getElementById("Male").checked=true;
	else if(arrayUserRecord[userId].Gender === "Female")
		 document.getElementById("Female").checked=true;
	else{
		 document.getElementById("Other").checked=true;
	}
	firstName.value=arrayUserRecord[userId].firstName;
	lastName.value=arrayUserRecord[userId].lastName;
	streetName.value=arrayUserRecord[userId].streetName;
	cityName.value=arrayUserRecord[userId].cityName;
	stateName.value=arrayUserRecord[userId].stateName;
	countryName.value=arrayUserRecord[userId].countryName;
	pincode.value=arrayUserRecord[userId].pincode;
	Emailid.value=arrayUserRecord[userId].emailID;
	document.getElementById("edituserpic").src=arrayUserRecord[userId].image;
}

function profileinEditmode(){
	document.getElementById("Save").style.display="inline-block";
	document.getElementById("Edit").style.display="none";
	 var profileFieldArray=document.getElementsByClassName("profileField");
	 document.getElementById("getnewimage").disabled=false;
	for(let j=0;j<profileFieldArray.length;j++)
	{
		var childElements=profileFieldArray[j].childNodes;
		for(let i=0;i<childElements.length;i++)
		childElements[i].disabled=false;
	}
	document.getElementById("Emailid").disabled=true;
}

function saveChangedData(){
	var firstName = document.getElementById("Firstname").value;
    var lastName = document.getElementById("Lastname").value;
	if((firstName=="")||(lastName=="")){
		document.getElementById("Firstname").style.border="2px solid red";
        document.getElementById("Lastname").style.border="2px solid red";
       	alert("Please fill out all the mandatory Elements");
		return false;
	}
	else{
		document.getElementById("Firstname").style.border="";
        document.getElementById("Lastname").style.border="";
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
		obj.Gender=Gender;
		obj.streetName=streetName;
		obj.cityName=cityName;
		obj.stateName=stateName;
		obj.countryName=countryName;
		obj.pincode=pincode;
		obj.emailID=emailID;
		obj.password=password;
		obj.todoArray=userArrayRecord[userId].todoArray;
		obj.image=userArrayRecord[userId].image;
		userArrayRecord[userId]=obj;
		var persondetailsinstring=JSON.stringify(userArrayRecord);
		localStorage.setItem("registeredUserRecord",persondetailsinstring);
		disableTextbox();
	
	}
}

function disableTextbox()
{
	document.getElementById("Edit").style.display="inline-block";
	document.getElementById("Save").style.display="none";
	document.getElementById("getnewimage").disabled=true;
    var profileFieldArray=document.getElementsByClassName("profileField");
	for(let j=0;j<profileFieldArray.length;j++)
	{
		var childElements=profileFieldArray[j].childNodes;
		for(let i=0;i<childElements.length;i++)
		childElements[i].disabled=true;
	}
}



function editImage()
{
    
    var Image =document.getElementById("getnewimage").files[0];

    getimgbase64(Image);
    function getimgbase64(Image){
        var reader = new FileReader();
        reader.readAsDataURL(Image);
       
        reader.onload = function () {
          
            var imgdata = reader.result;
            sessionStorage.setItem("tempimgdata1",imgdata);
			document.getElementById("edituserpic").src=sessionStorage.tempimgdata1;
			var arrayofuserobject=JSON.parse(localStorage.getItem("registeredUserRecord"));
			var userid=sessionStorage.getItem("userId");

			arrayofuserobject[userid].image=sessionStorage.getItem("tempimgdata1");
			var tostring=JSON.stringify(arrayofuserobject);
			localStorage.setItem("registeredUserRecord",tostring);
        };
    
        reader.onerror = function (error) {
        };
      
		

    }
    
}

  

