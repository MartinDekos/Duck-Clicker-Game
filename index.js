import { powerUpIntervals, upgrades } from "./Constants/upgrades.js"

let duck = document.querySelector('.Ducks-Quacked')
let parsedQuack = parseFloat(duck.innerHTML)

let qpcText = document.getElementById("qpc-text")
let qpsText = document.getElementById("qps-text")

let DuckImgContainer = document.querySelector('.duck-img-container')

let qpc = 1;
let qps = 0;


const bgm = new Audio('Assets/Audio/BGM.mp3')
bgm.volume = 0.05
const clickingSound = new Audio('Assets/Audio/Click.mp3')
clickingSound.volume = 0.05
const upgradeSound = new Audio('Assets/Audio/Upgrade.mp3')


function incrementQuacks(event)
{
    const clickingSound = new Audio('Assets/Audio/Click.mp3')
    clickingSound.play()


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

    const upgradeDiv = document.getElementById(`${matchedUpgrade.name}-upgrade`)
    const nextLevelDiv = document.getElementById(`${matchedUpgrade.name}-next-level`)
    const nextLevelP = document.getElementById(`${matchedUpgrade.name}-next-p`)

    if (parsedQuack >= matchedUpgrade.parsedCost)
    {
        const upgradeSound = new Audio('Assets/Audio/Upgrade.mp3')
        upgradeSound.volume = 0.1
        upgradeSound.play()

        duck.innerHTML = Math.round(parsedQuack -= matchedUpgrade.parsedCost);
        nextLevelP.innerHTML = '';
        matchedUpgrade.increase.innerHTML = '';

        let index = powerUpIntervals.indexOf(parseFloat(matchedUpgrade.level.innerHTML))

        if ( index !== -1)
        {
            upgradeDiv.style.cssText = `border-color: white`;
            nextLevelDiv.style.cssText = `background-color: #2c2c2c; font-weight: normal;`;
            matchedUpgrade.parsedCost *= matchedUpgrade.CostMultiplier; 
            matchedUpgrade.cost.innerHTML = Math.round(matchedUpgrade.parsedCost);
            nextLevelDiv.querySelector(`.info-size`).style.display = 'none';

            if ( matchedUpgrade.name === 'clicker')
            {
                qpc *= matchedUpgrade.powerUps[index].multiplier  
            }
        }

        matchedUpgrade.level.innerHTML ++
        
        index = powerUpIntervals.indexOf(parseFloat(matchedUpgrade.level.innerHTML))
        if (index !== -1)
        {
            upgradeDiv.style.cssText = `border-color: orange;`;
            nextLevelDiv.style.cssText = `background-color: #CC4500; font-weight: bold;`;
            nextLevelP.innerText = matchedUpgrade.powerUps[index].description
            nextLevelDiv.querySelector(`.info-size`).style.display = 'none';
            matchedUpgrade.parsedCost = Math.round(matchedUpgrade.parsedCost * 2 * 1.004 ** parseFloat(matchedUpgrade.level.innerHTML));
            matchedUpgrade.cost.innerHTML = Math.round(matchedUpgrade.parsedCost);
        }
        else 
        {
            nextLevelDiv.querySelector('.info-size').style.display = 'block';
            matchedUpgrade.cost.innerHTML = Math.round(matchedUpgrade.parsedCost *= matchedUpgrade.CostMultiplier);
            matchedUpgrade.parsedIncrease = parseFloat((matchedUpgrade.parsedIncrease * matchedUpgrade.QuackMultiplier).toFixed(2))
        }

         matchedUpgrade.increase.innerHTML = matchedUpgrade.parsedIncrease;

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
    bgm.play()
}, 100)

window.incrementQuacks = incrementQuacks
window.buyUpgrade = buyUpgrade
window.save = save
window.load = load

