import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import './style.css'


const loanForm = document.getElementById("loan-form");
const  amount = document.getElementById("amount");
const interest = document.getElementById("interest");
const years = document.getElementById("years");
const monthlyPayment = document.getElementById("monthly-payment");
const totalPayment = document.getElementById("total-payment");
const totalinterest = document.getElementById("total-interest");
const principalContainer = document.querySelector(".principal-container");
const spinner = document.querySelector(".spinner");
const result = document.querySelector(".results-container");


const error = () =>{
  spinner.style.display = "none"; 
  const errorDiv =  document.createElement("div");
  errorDiv.className = "alert alert-danger";
  const p = document.createElement("p");
  p.innerText = "Please introduce the data again";
  errorDiv.appendChild(p);
  principalContainer.insertBefore(errorDiv, loanForm);
  setTimeout(()=>{
    errorDiv.remove();
  }, 2000)
}

const calculation = () => {
  const amoutValue = amount.value;
  const interestCalculation = parseFloat(interest.value)/100/12;
  const paymentsCalculation = (parseFloat(years.value))* 12;

  const x = Math.pow(1 + interestCalculation, paymentsCalculation);
  const month = (amoutValue * x * interestCalculation)/ (x - 1);

  if(isFinite(month)){
    monthlyPayment.value = month.toFixed(2);
    totalPayment.value = (month * paymentsCalculation).toFixed(2);
    totalinterest.value = ((month * paymentsCalculation) - amoutValue).toFixed(2);
    spinner.style.display = "none";
    result.style.display = "block";
  } else {
    error();    
  }
}


loanForm.addEventListener("submit", (e)=> {
  e.preventDefault();
  
  result.style.display = "none";
  spinner.style.display = "block"; 
  setTimeout(calculation, 2000);
  
  

})

