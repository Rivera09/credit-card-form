const card = document.querySelector("#card");
const openBtn = document.querySelector("#open-form-btn");
const cardForm = document.querySelector("#card-form");
const cardNumber = document.querySelector(".number");
const cardName = document.querySelector(".name");
const logoBrand = document.querySelector(".logo-brand");
const firm = document.querySelector("#firm .firm p");
const expirationMonth = document.querySelector(".month");
const expirationYear = document.querySelector(".year");
const ccv = document.querySelector('#ccv .ccv');
let expiration = {
  month: "MM",
  year: "AA",
};

window.onload = () => {
  const currentYear = new Date().getFullYear();
  for (let i = 1; i < 13; i++) {
    const optionMonth = document.createElement("option");
    const optionYear = document.createElement("option");
    optionMonth.value = i;
    optionMonth.innerHTML = i;
    cardForm.selectMonth.appendChild(optionMonth);
    optionYear.innerText = currentYear + (i - 1);
    optionYear.value = (currentYear + (i - 1)).toString().substring(2);
    cardForm.selectYear.appendChild(optionYear);
  }
};
// Rotación de tarjeta
card.addEventListener("click", () => {
  card.classList.toggle("active");
});

openBtn.addEventListener("click", () => {
  openBtn.classList.toggle("active");
  cardForm.classList.toggle("active");
});

cardForm.numberInput.addEventListener("keyup", (e) => {
  if (card.classList.contains("active")) card.classList.remove("active");
  const number = e.target.value
    .replace(/\D/g, "")
    .replace(/([0-9]{4})/g, "$1 ")
    .trim();
  e.target.value = number;
  if (number.length > 0) {
    cardNumber.innerText = number;
    if (number.length === 1) {
      const logo = document.createElement("img");
      if (number[0] == 4) {
        logo.alt = "Visa's logo";
        logo.src = "./img/logos/visa.png";
      } else if (number[0] == 5) {
        logo.alt = "Mastercard's logo";
        logo.src = "./img/logos/mastercard.png";
      }
      logoBrand.appendChild(logo);
    }
  } else {
    cardNumber.innerText = "#### #### #### ####";
    logoBrand.innerHTML = "";
  }
});

cardForm.nameInput.addEventListener("keyup", (e) => {
  if (card.classList.contains("active")) card.classList.remove("active");
  if (e.target.value.match(/[^\sA-Za-z]+/g)) console.log("match");
  const name = e.target.value.replace(/[^\sA-Za-z]+/g, "");
  e.target.value = name;
  cardName.innerText = name.trim().length > 0 ? name : "tu nombre aquí";
  firm.innerText = name.trim();
});

const changeExpiration = (e) => {
  if (card.classList.contains("active")) card.classList.remove("active");
  const value = e.target.value;
  expiration = {
    ...expiration,
    [e.target.name]: value.length === 1 ? "0" + value : value,
  };
  expirationMonth.innerText = expiration.month;
  expirationYear.innerText = expiration.year;
};

cardForm.selectMonth.addEventListener("change", changeExpiration);
cardForm.selectYear.addEventListener("change", changeExpiration);

cardForm.inputCCV.addEventListener('keyup',(e)=>{
  if (!card.classList.contains("active")) card.classList.add("active");
  const value = e.target.value.substring(0,3);
  cardForm.inputCCV.value = value;
  ccv.innerText = value
})
