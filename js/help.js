incre = document.getElementById("incre")
decre = document.getElementById("decre")

price = document.getElementById("price")
amt = document.getElementById("amt")
cutamt = document.getElementById("cutamt")
buy = document.getElementById("buy")
cost = document.getElementById("cost")

let b = amt.innerHTML;
b = Number.parseInt(b)
// cost.value = b
let c = cutamt.innerHTML;
c = Number.parseInt(c)

incre.onclick = () => {
    let a = price.innerHTML;
    a = Number.parseInt(a)
    price.innerHTML = a+1;
    amt.innerHTML = b*(a+1);
    cutamt.innerHTML = c*(a+1);
    cost.value = b*(a+1);
}
decre.onclick = () => {
    let a = price.innerHTML;
    a = Number.parseInt(a)
    if (a>1){
        price.innerHTML = a-1;
        amt.innerHTML = b*(a-1);
        cutamt.innerHTML = c*(a-1);
        cost.value = b*(a-1);
    }
}




