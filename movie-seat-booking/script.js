const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

//Save selected movie and price

function setMovieData(movieIndex, moviePrice){
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Update total and count
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
//  console.log(selectedSeats);
  const seatsIndex = [...selectedSeats].map( (seat)=>
   [...seats].indexOf(seat));
  // console.log(seatsIndex);
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex)); //create a local storage for the selected seats

const selectedSeatsCount = selectedSeats.length;
// console.log(selectedSeatsCount);
count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

//Get data from local storage and populate UI
function populateUI(){
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  // console.log(selectedSeats);
  if(selectedSeats !== null && selectedSeats.length > 0){
    seats.forEach((seat, index)=>{
      if(selectedSeats.indexOf(index) > -1){
       seat.classList.add('selected');
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if(selectedMovieIndex !== null){
    movieSelect.selectedIndex = selectedMovieIndex;
  }

}

//Movie Select event
movieSelect.addEventListener('change', e =>{
  ticketPrice= +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

//Seat select event
container.addEventListener('click', (e) => {
// console.log(e.target);
if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});


// initial count and total set

updateSelectedCount();

