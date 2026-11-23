const header = document.querySelector('header');
const menuToggle = document.querySelector('.menu-toggle');
const headerLinks = document.querySelectorAll('.header-menu a');

window.addEventListener('scroll',()=>{
 if(!header) return;

 if(window.scrollY>50){
   header.style.background='rgba(2,6,23,0.95)';
 }else{
   header.style.background='rgba(5,8,22,0.75)';
 }
});

if(menuToggle && header){
 menuToggle.addEventListener('click',()=>{
   const isOpen = header.classList.toggle('nav-open');
   menuToggle.setAttribute('aria-expanded', String(isOpen));
   menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
 });

 headerLinks.forEach(link=>{
   link.addEventListener('click',()=>{
     header.classList.remove('nav-open');
     menuToggle.setAttribute('aria-expanded','false');
     menuToggle.setAttribute('aria-label','Open menu');
   });
 });

 window.addEventListener('resize',()=>{
   if(window.innerWidth>980){
     header.classList.remove('nav-open');
     menuToggle.setAttribute('aria-expanded','false');
     menuToggle.setAttribute('aria-label','Open menu');
   }
 });
}
