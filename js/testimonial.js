let testimonials = document.getElementsByClassName("testimonials")[0];
for (var i=0; i<6; i++) {
  testimonials.innerHTML = testimonials.innerHTML+`<div class="d-flex mt-2">
  <div class="w-50">
    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit</span><br><br>
    <strong >Tim Johnson</strong><br>
    <strong class="text-primary">Finance Manager</strong>
  </div>
  <div class="align-self-center">
    <img src="./profile.png" class="rounded-circle my-auto align-middle" alt="...">
  </div> 
</div>
<hr>`
}