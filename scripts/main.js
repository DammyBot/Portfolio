const navigation = document.querySelector("#navigation");
const hamburger = document.querySelector("#hamburger");
hamburger.addEventListener("click", ()=>{
    navigation.classList.toggle("open");
})
const countries = ["Canada", "Chili", "Colombia", "Croatia", "Costa Rica"];
const countriesLong = countries.filter((country) => country.length > 7);
alert(countries.length - 1);

const discount = 15;
alert(discount <= 12 && discount >= 3);