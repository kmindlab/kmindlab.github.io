'use strict';
// Core content is server-rendered static HTML. This file only provides progressive enhancement.
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',()=>{
    const id=a.getAttribute('href').slice(1);
    const target=id?document.getElementById(id):null;
    if(target){target.setAttribute('tabindex','-1');setTimeout(()=>target.focus({preventScroll:true}),200);}
  });
});
