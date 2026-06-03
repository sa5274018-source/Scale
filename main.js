function openModal() { document.getElementById('devModal').style.display = 'flex'; }

function closeModal() { document.getElementById('devModal').style.display = 'none'; }
window.onclick = function(event) {
  let modal = document.getElementById('devModal');
  if (event.target == modal) { modal.style.display = 'none'; }
}