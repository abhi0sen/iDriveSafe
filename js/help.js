incre = document.getElementById("incre")
decre = document.getElementById("decre")

price = document.getElementById("price")

incre.onclick = () => {
    let a = price.innerHTML;
    a = Number.parseInt(a)
    price.innerHTML = a+1;
}
decre.onclick = () => {
    let a = price.innerHTML;
    a = Number.parseInt(a)
    if (a>1){
    price.innerHTML = a-1;
    }
}