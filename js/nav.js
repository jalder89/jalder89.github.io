function myFunction(x) {
  x.classList.toggle("change");
}

menu.addEventListener('click', function(e) {
  drawer.classList.toggle('open');
  e.stopPropagation();
});
