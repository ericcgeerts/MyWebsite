var clickEmail = document.querySelector('#button')
var clickReset = document.querySelector('#button2')


clickEmail.addEventListener("click",function(){
    clickEmail.textContent = 'Thank you for your message!'
    clickReset.textContent = ''
    var frm = document.getElementsByName('high')[0]; 
    console.log(document.getElementById("name").value)
    console.log(document.getElementById("email").value)
    console.log(document.getElementById("subject").value)
    console.log(document.getElementById("message").value)
    var name = String(document.getElementById("name").value)
    //var email = document.getElementById("email").value
    var subject = String(document.getElementById("subject").value)
    var message = String(document.getElementById("message").value)
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");

    var raw = "{\r\n    \"Name\": \"Eric Geerts\",\r\n    \"Subject\": \"EmailSubject \",\r\n    \"Body\": \"BodyTest\"\r\n}";
    var ahh = ['{\r\n    \"Name\": \"',name,'\",'].join('');
    var ahh1 = ['\r\n    \"Subject\": \"',subject,'\",'].join('');
    var ahh2 = ['\r\n    \"Body\": \"',message,'\"\r\n}'].join('');
    var combine = ahh.concat(ahh1);
    combine = combine.concat(ahh2);

    console.log(raw)
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