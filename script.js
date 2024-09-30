// // // Smooth Scroll
// document.querySelectorAll('nav a').forEach(anchor => {
//     anchor.addEventListener('click', function(e) {
//         e.preventDefault();
//         const target = document.querySelector(this.getAttribute('href'));
//         target.scrollIntoView({
//             behavior: 'smooth',
//             block: 'start'
//         });
//     });
// });

// // Change Navbar Background on Scroll
// window.addEventListener('scroll', function() {
//     const navbar = document.getElementById('navbar');
//     if (window.scrollY > 50) {
//         navbar.style.backgroundColor = '#000';  // Change navbar color on scroll
//     } else {
//         navbar.style.backgroundColor = '#0072ff'; // Default navbar color
//     }
// });

// // Active Section Highlight in Navbar
// const sections = document.querySelectorAll('section');
// const navLi = document.querySelectorAll('nav ul li a');

// window.addEventListener('scroll', () => {
//     let current = '';

//     sections.forEach(section => {
//         const sectionTop = section.offsetTop;
//         if (window.scrollY >= sectionTop - 50) {
//             current = section.getAttribute('id');
//         }
//     });

//     navLi.forEach(li => {
//         li.classList.remove('active');
//         if (li.getAttribute('href') === `#${current}`) {
//             li.classList.add('active');
//         }
//     });
// });
// // Smooth Scroll
// document.querySelectorAll('nav a').forEach(anchor => {
//   anchor.addEventListener('click', function(e) {
//       e.preventDefault();
//       const target = document.querySelector(this.getAttribute('href'));
//       target.scrollIntoView({
//           behavior: 'smooth',
//           block: 'start'
//       });
//   });
// });

// // Change Navbar Background on Scroll
// window.addEventListener('scroll', function() {
//   const navbar = document.getElementById('navbar');
//   if (window.scrollY > 50) {
//       navbar.style.backgroundColor = '#000';  // Change navbar color on scroll
//   } else {
//       navbar.style.backgroundColor = '#0072ff'; // Default navbar color
//   }
// });

// // Active Section Highlight in Navbar
// const sections = document.querySelectorAll('section');
// const navLi = document.querySelectorAll('nav ul li a');

// window.addEventListener('scroll', () => {
//   let current = '';

//   sections.forEach(section => {
//       const sectionTop = section.offsetTop;
//       if (window.scrollY >= sectionTop - 50) {
//           current = section.getAttribute('id');
//       }
//   });

//   navLi.forEach(li => {
//       li.classList.remove('active');
//       if (li.getAttribute('href') === `#${current}`) {
//           li.classList.add('active');
//       }
//   });
// });
const handleSubmit =(event)=>{
    event.preventDefault();
    const alert = document.querySelector("#alert");
    const myform = event.target;
    const formData = new FormData(myform);
    const handleAlert = (s,t)=>{
        if (t) {
            alert.classList.add("alert-success");
        }else{
            alert.classList.add("alert-danger");
        }
        alert.innerHTML=s;
        alert.classList.remove("d-none");

        setTimeout(()=>{
            alert.classList.add("d-none");
            alert.classList.remove("alert-success");
            alert.classList.remove("alert-danger");
        },3000);
    };
    const messageData=Object.fromEntries(formData);
    if(messageData.message.length<10){
        handleAlert("Message less than 10 characters", false)
        return;
    }
    const mpattern= /^(\+\d{1,3}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
    if(!mpattern.test(messageData.phone)){
        handleAlert("Invalid Phone Number", false)
        return;
    }

    const url=".netlify/functions/sendMail";
    const options={
     method: "POST",
     headers:{
        "Content-Type":"application/json",
     },
     body: JSON.stringify(messageData),   
    };
    fetch(url,options)
    .then(response=>response.json())
    .then(data=>{
        if(data.status==="Success"){
            handleAlert(data.message,true);
            document.querySelector('#contact-f').requestFullscreen();
        } else{
            handleAlert(data.message,false);
        }
    })
    .catch(error=>handleAlert(error.message||"An error occurred.Please try again.",false));
   };
   document.querySelector("form")
   .addEventListener("submit",handleSubmit);==$0
