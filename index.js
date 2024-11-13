let duck = document.querySelector('.Ducks-Quacked')
let parsedQuack = parseFloat(duck.innerHTML)

let qpcText = document.getElementById("qpc-text")
let qpsText = document.getElementById("qps-text")

let DuckImgContainer = document.querySelector('.duck-img-container')

let qpc = 1;
let qps = 0;

const upgrades = [
    {
        name: 'clicker',
        cost: document.querySelector('.clicker-cost'),
        parsedCost: parseFloat(document.querySelector('.clicker-cost').innerHTML),
        increase: document.querySelector('.clicker-increase'),
        parsedIncrease: parseFloat(document.querySelector('.clicker-increase').innerHTML),
        level: document.querySelector('.clicker-level'),
        QuackMultiplier: 1.1,
        CostMultiplier: 2,
    },
    {
        name: 'bread',
        cost: document.querySelector('.bread-cost'),
        parsedCost: parseFloat(document.querySelector('.bread-cost').innerHTML),
        increase: document.querySelector('.bread-increase'),
        parsedIncrease: parseFloat(document.querySelector('.bread-increase').innerHTML),
        level: document.querySelector('.bread-level'),
        QuackMultiplier: 1.1,
        CostMultiplier: 1.5,
    },
    {
        name: 'bakery',
        cost: document.querySelector('.bakery-cost'),
        parsedCost: parseFloat(document.querySelector('.bakery-cost').innerHTML),
        increase: document.querySelector('.bakery-increase'),
        parsedIncrease: parseFloat(document.querySelector('.bakery-increase').innerHTML),
        level: document.querySelector('.bakery-level'),
        QuackMultiplier: 1.1,
        CostMultiplier: 1.5,
    },
    {
        name: 'feeder',
        cost: document.querySelector('.feeder-cost'),
        parsedCost: parseFloat(document.querySelector('.feeder-cost').innerHTML),
        increase: document.querySelector('.feeder-increase'),
        parsedIncrease: parseFloat(document.querySelector('.feeder-increase').innerHTML),
        level: document.querySelector('.feeder-level'),
        QuackMultiplier: 1.5,
        CostMultiplier: 2.5,
    },
]

console.log(upgrades[0].name)


function incrementQuacks(event)
{
    duck.innerHTML = Math.round(parsedQuack += qpc)

    const x = event.offsetX
    const y = event.offsetY

    const div = document.createElement('div')
    div.innerHTML = `+${Math.round(qpc)}` 
    div.style.cssText = `color: white; position: absolute; top: ${y}px; left: ${x}px; font-size: 15px; pointer-events: none;`
    DuckImgContainer.appendChild(div)

    div.classList.add('fade-up')

    timeout(div)
}

const timeout = (div) => {
    setTimeout(() => {
        div.remove()
    }, 800);
}

function buyUpgrade(upgrade)
{
    const matchedUpgrade = upgrades.find((u) => {
        if (u.name === upgrade) return u
    })

    if (parsedQuack >= matchedUpgrade.parsedCost)
    {
        duck.innerHTML = Math.round(parsedQuack -= matchedUpgrade.parsedCost);
        matchedUpgrade.level.innerHTML ++
        matchedUpgrade.parsedIncrease = parseFloat((matchedUpgrade.parsedIncrease * matchedUpgrade.QuackMultiplier).toFixed(2))
        matchedUpgrade.increase.innerHTML = matchedUpgrade.parsedIncrease
        matchedUpgrade.parsedCost *= matchedUpgrade.CostMultiplier;
        matchedUpgrade.cost.innerHTML = Math.round(matchedUpgrade.parsedCost)

        if (matchedUpgrade.name === 'clicker')
        {
            qpc += matchedUpgrade.parsedIncrease
        }
        else 
        {
            qps += matchedUpgrade.parsedIncrease
        }
    }
}

function save()
{
    localStorage.clear()

    upgrades.map((upgrade) => {
        const obj = JSON.stringify({
            parsedLevel: parseFloat(upgrade.level.innerHTML),
            parsedCost: upgrade.parsedCost,
            parsedIncrease: upgrade.parsedIncrease
        })
        localStorage.setItem(upgrade.name, obj)
    })
    localStorage.setItem('qpc', JSON.stringify(qpc))
    localStorage.setItem('qps', JSON.stringify(qps))
    localStorage.setItem('quacks', JSON.stringify(parsedQuack))
}

function load()
{
    upgrades.map((upgrade) => {
        const savedValues = JSON.parse(localStorage.getItem(upgrade.name))
        upgrade.parsedCost = savedValues.parsedCost
        upgrade.parsedIncrease = savedValues.parsedIncrease
        upgrade.level.innerHTML = savedValues.parsedLevel
        upgrade.cost.innerHTML = Math.round(upgrade.parsedCost)
        upgrade.increase.innerHTML = upgrade.parsedIncrease
    })
    qpc = JSON.parse(localStorage.getItem('qpc'))
    qps = JSON.parse(localStorage.getItem('qps'))
    parsedQuack = JSON.parse(localStorage.getItem('quacks'))
    duck.innerHTML = Math.round(parsedQuack)
}


setInterval(() => 
{
    parsedQuack += qps / 10
    duck.innerHTML = Math.round(parsedQuack)
    qpcText.innerHTML = Math.round(qpc)
    qpsText.innerHTML = Math.round(qps)
}, 100)