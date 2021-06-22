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
    frm.reset();
})