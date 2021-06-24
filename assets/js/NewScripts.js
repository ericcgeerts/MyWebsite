var clickEmail = document.querySelector('#button')
var clickReset = document.querySelector('#button2')


clickEmail.addEventListener("click",function(){
    clickEmail.textContent= ''
    clickReset.textContent = ''
    clickEmail.style.visibility="hidden"
    var frm = document.getElementsByName('high')[0]; 
    var name = String(document.getElementById("name").value)
    //var email = document.getElementById("email").value
    var subject = String(document.getElementById("subject").value)
    var message = String(document.getElementById("message").value)
    message = message.replace(/\n/g, "\\n");
    console.log(message)
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");

    var ahh = ['{\r\n    \"Name\": \"',name,'\",'].join('');
    var ahh1 = ['\r\n    \"Subject\": \"',subject,'\",'].join('');
    var ahh2 = ['\r\n    \"Body\": \"',message,'\"\r\n}'].join('');
    var combine = ahh.concat(ahh1);
    combine = combine.concat(ahh2);

    console.log(combine)

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: combine,
    redirect: 'follow'
    };

    fetch("https://tkoqr84s4c.execute-api.us-east-1.amazonaws.com/PROD/email", requestOptions)
   .then(response => response.text())
   .then(result => console.log(result))
   .catch(error => console.log('error', error));
    
    frm.reset();
})