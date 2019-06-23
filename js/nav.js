menu.addEventListener('click', function(e) {
  drawer.classList.toggle('open');
  e.stopPropagation();
});

function myFunction(x) {
  x.classList.toggle("change");
}
