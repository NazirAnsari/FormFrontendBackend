var buttons = document.getElementById('signUp');
var btn = document.getElementById('signIn');
var block = document.getElementById('myblock');
var loginAuth = document.getElementById('login');
var authValue = document.getElementById('getName');
var regOpen = document.getElementById('reg');


console.log("hii");

var secondaryMap=new Map();
console.log(block);

var arr = [];
let count = 0;


regOpen.addEventListener('click', function(event){
    event.preventDefault();
    // if (block.style.display === "none") {

    //     block.style.display = "block";
    // } else {

    //     block.style.display = "none";
    // }

    console.log('call');

    document.getElementById('registration-form').style.display="block";
    document.getElementById('myblock').style.display="none";
})

btn.addEventListener('click', function (event) {
    event.preventDefault();
    
    document.getElementById('registration-form').style.display="none";
    document.getElementById('myblock').style.display="block";
    console.log('slfkj')
});

loginAuth.addEventListener('click', function (event) {
    event.preventDefault();
    var nameValue = authValue.value;
    // for (let i = 0; i < arr.length; i++) {
    //     obj = arr[i];
    //     if (obj.userName == nameValue) {
    //         alert("login Successful");
    //     }

    //     else {
    //         alert('user not exist');
    //     }
    // }
 
//  Validit(nameValue) ;
if(secondaryMap.has(nameValue))
     {
          alert("Login Successful");
          return false;
         }

         else{
             alert('user not exist')
         }
})

// function Validit(userName){
//     if(secondaryMap.has(userName))
//     {
//          alert("Login Successful");
//          return false;
//         }

//         else{
//             alert('user not exist')
//         }
// }



function clearError() {
    error = document.getElementsByClassName('Eroor');
    for (let item of error) {
        item.innerHTML = "";
    }
}

function setError(id, msg) {
    ele = document.getElementById(id);
    ele.getElementsByClassName('Eroor')[0].innerHTML = msg;

}



buttons.addEventListener('click', function (event) {
    event.preventDefault();
    var userName = document.forms['my-form']['name'].value;
    var userEmail = document.forms['my-form']['email'].value;
    var userPass = document.forms['my-form']['password'].value;
    var cUserPass = document.forms['my-form']['cpassword'].value;
    var display = document.getElementById('display');

    clearError();
    count++;
console.log(count);
    // validation
    if (userName.length < 7) {
        setError("yourName", "*length is short");
        console.log("validation name");
    }
    if (userEmail.indexOf('@') <= 0) {
        setError("yourEmail", " *dont put @ in starting point")
    }
    else if (userEmail.search(/[@]/) == -1) {
        setError("yourEmail", "* @ is missing here");
    }
    else if (userEmail.charAt(userEmail.length - 4) != '.' && userEmail.charAt(userEmail.length - 4) != '.') {
        setError("yourEmail", "* . is not at a correct position");
    }

    

    var obj = {
        userId: count,
        userName: userName,
        userEmail: userEmail,
        userPass: userPass,
        cUserPass: cUserPass
    }

    //     var arrr={
    //         userName : obj
    //     }

    //    console.log(arrr);
    // console.log(obj);
    arr.push(obj);
    let datadisplay = "";
  
    // secondaryMap.push(obj);
    secondaryMap.set(userName,userPass);
    console.log(secondaryMap)
    // console.log(secondaryMap);
    // for(let key in secondaryMap ){
    //     console.log(key);
    // }

    //Validit(userName);  
    // console.log("hello"+secondaryMap.get(userName));

    for(var key of secondaryMap){
        console.log(key);
    }


    

    for (var i = 0; i < arr.length; i++) {
        let obj = arr[i];
        datadisplay += "<tr> <td>" + obj.userId + "</td>";
        datadisplay += "<td>" + obj.userName + "</td>";
        datadisplay += "<td>" + obj.userEmail + "</td>";
        datadisplay += "<td>" + obj.userPass + " </td>";
        datadisplay += "<td>" + obj.cUserPass + "<br> </td> </tr>";
    }
    display.innerHTML = datadisplay;

    data_insertThroughApi(obj);

})


function data_insertThroughApi(user){
    alert("ABC")
    console.log(user);
    $.ajax({
        url: "http://localhost:3000/newuser",
        type:"POST",
        data : user,
        success: function(result){
          console.log(result+" jkllhkjk");
        },
        error: function(error){
          console.log(error);
        }
      })
  }

  var showdata=document.getElementById('showdata');
  showdata.addEventListener('click',datashowed);


function datashowed(e){
  e.preventDefault();
  $.ajax({
    url: "http://localhost:3000/viewUser",
    type:"GET",
    success: function(result){
      console.log(result);
    },
    error: function(error){
      console.log(error);
    }
  })

}

