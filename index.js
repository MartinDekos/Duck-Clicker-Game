let duck = document.querySelector('.Ducks-Quacked')
let parsedQuack = parseFloat(duck.innerHTML)

let clickerCost = document.querySelector('.clicker-cost')
let parsedClickerCost = parseFloat(clickerCost.innerHTML)
let clickerlevel = document.querySelector('.clicker-level')
let clickerincrease = document.querySelector('.clicker-increase')
let parsedClickerIncrease = parseFloat(clickerincrease.innerHTML)


let breadCost = document.querySelector('.bread-cost')
let parsedBreadCost = parseFloat(breadCost.innerHTML)
let breadlevel = document.querySelector('.bread-level')
let breadincrease = document.querySelector('.bread-increase')
let parsedBreadIncrease = parseFloat(breadincrease.innerHTML)


let bakeryCost = document.querySelector('.bakery-cost')
let parsedBakeryCost = parseFloat(bakeryCost.innerHTML)
let bakerylevel = document.querySelector('.bakery-level')
let bakeryincrease = document.querySelector('.bakery-increase')
let parsedBakeryIncrease = parseFloat(bakeryincrease.innerHTML)


let qpcText = document.getElementById("qpc-text")
let qpsText = document.getElementById("qps-text")

let qpc = 1;
let qps = 0;

function incrementQuacks()
{
    duck.innerHTML = Math.round(parsedQuack += qpc)
}

function buyClicker()
{
    if (parsedQuack >= parsedClickerCost)
    {
        duck.innerHTML = Math.round(parsedQuack -= parsedClickerCost)

        clickerlevel.innerHTML ++

        parsedClickerIncrease = parseFloat((parsedClickerIncrease * 1.05).toFixed(2))
        clickerincrease.innerHTML = parsedClickerIncrease
        qpc += parsedClickerIncrease

        parsedClickerCost *= 2.5
        clickerCost.innerHTML = Math.round(parsedClickerCost)
    }
}

function buyBread()
{
    if (parsedQuack >= parsedBreadCost)
    {
        duck.innerHTML = Math.round(parsedQuack -= parsedBreadCost)

        breadlevel.innerHTML ++

        parsedBreadIncrease = parseFloat((parsedBreadIncrease * 1.05).toFixed(2))
        breadincrease.innerHTML = parsedBreadIncrease
        qps += parsedBreadIncrease

        parsedBreadCost *= 1.5
        breadCost.innerHTML = Math.round(parsedBreadCost)
    }
}

function buyBakery()
{
    if (parsedQuack >= parsedBakeryCost)
    {
        duck.innerHTML = Math.round(parsedQuack -= parsedBakeryCost)

        bakerylevel.innerHTML ++

        parsedBakeryIncrease = parseFloat((parsedBakeryIncrease * 1.05).toFixed(2))
        bakeryincrease.innerHTML = parsedBakeryIncrease
        qps += parsedBakeryIncrease

        parsedBakeryCost *= 1.5
        bakeryCost.innerHTML = Math.round(parsedBakeryCost)
    }
}


setInterval(() => 
{
    parsedQuack += qps / 10
    duck.innerHTML = Math.round(parsedQuack)
    qpcText.innerHTML = Math.round(qpc)
    qpsText.innerHTML = Math.round(qps)
}, 100)