import { powerUpIntervals, upgrades, } from "./Constants/upgrades.js"
import { defaultSkillValues, defaultArtifactValues, defaultUpgradeValues } from "./Constants/defaultValues.js"
import { nf } from "./utils/formatter.js"

let duck = document.querySelector('.Ducks-Quacked')
let parsedQuack = parseFloat(duck.innerHTML)

let qpcText = document.getElementById("qpc-text")
let qpsText = document.getElementById("qps-text")

let DuckImgContainer = document.querySelector('.duck-img-container')


let upgradesNavButton = document.getElementById('upgrades-nav-button')
let skillsNavButton = document.getElementById('skills-nav-button')
let artifactsNavButton = document.getElementById('artifacts-nav-button')

let prestigeButton = document.querySelector('.prestige-button')
let relic = document.getElementById("relic")

let qpc = 1;
let qps = 0;


const bgm = new Audio('Assets/Audio/BGM.mp3')
bgm.volume = 0.1
const clickingSound = new Audio('Assets/Audio/Click.mp3')
clickingSound.volume = 0.1
const upgradeSound = new Audio('Assets/Audio/Upgrade.mp3')


function incrementQuacks(event)
{
    const clickingSound = new Audio('Assets/Audio/Click.mp3')
    clickingSound.play()


    duck.innerHTML = nf(parsedQuack += qpc)

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

        duck.innerHTML = nf(parsedQuack -= matchedUpgrade.parsedCost);

        let index = powerUpIntervals.indexOf(parseFloat(matchedUpgrade.level.innerHTML))

        if ( index !== -1)
        {
            upgradeDiv.style.cssText = `border-color: white`;
            nextLevelDiv.style.cssText = `background-color: #2c2c2c; font-weight: normal;`;
            matchedUpgrade.cost.innerHTML = Math.round(matchedUpgrade.parsedCost *= matchedUpgrade.CostMultiplier)

           if (matchedUpgrade.name === 'clicker') 
           {
            qpc *= matchedUpgrade.powerUps[index].multiplier
            nextLevelP.innerHTML = `+${matchedUpgrade.parsedIncrease} quacks per click`
           } else
           {
            qps -= matchedUpgrade.power
            matchedUpgrade.power *= matchedUpgrade.powerUps[index].multiplier
            qps += matchedUpgrade.power
            nextLevelP.innerHTML = `+${matchedUpgrade.parsedIncrease} quacks per second`
           }
        }

        matchedUpgrade.level.innerHTML ++
        
        index = powerUpIntervals.indexOf(parseFloat(matchedUpgrade.level.innerHTML))

        if (index !== -1)
        {
            upgradeDiv.style.cssText = `border-color: orange;`;
            nextLevelDiv.style.cssText = `background-color: #CC4500; font-weight: bold;`;
            nextLevelP.innerText = matchedUpgrade.powerUps[index].description

            matchedUpgrade.cost.innerHTML = Math.round(matchedUpgrade.parsedCost * 2 * 1.004 ** parseFloat(matchedUpgrade.level.innerHTML))
        } else 
        {
            matchedUpgrade.cost.innerHTML = Math.round(matchedUpgrade.parsedCost *= matchedUpgrade.CostMultiplier)
            matchedUpgrade.parsedIncrease = parseFloat((matchedUpgrade.parsedIncrease * matchedUpgrade.QuackMultiplier).toFixed(2))

            if (matchedUpgrade.name === 'clicker') nextLevelP.innerHTML = `+${matchedUpgrade.parsedIncrease} quacks per click`
            else nextLevelP.innerHTML = `+${matchedUpgrade.parsedIncrease} quacks per second`
        }
        if (matchedUpgrade.name === 'clicker')
        {
            qpc += matchedUpgrade.parsedIncrease
        }
        else 
        {
            qps -= matchedUpgrade.power
            matchedUpgrade.power += matchedUpgrade.parsedIncrease
            qps += matchedUpgrade.power
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

function prestige()
{
    upgrades.map((upgrade) => {
        const matchedUpgrade = defaultUpgradeValues.find((u) => { if (upgrade.name === u.name) return u})
        upgrade.parsedCost = matchedUpgrade.cost
        upgrade.parsedIncrease = matchedUpgrade.increase
        upgrade.level.innerHTML = 0
        upgrade.cost.innerHTML = matchedUpgrade.cost
        upgrade.increase.innerHTML = matchedUpgrade.increase 
        const upgradeDiv = document.getElementById(`${matchedUpgrade.name}-upgrade`)
        const nextLevelDiv = document.getElementById(`${matchedUpgrade.name}-next-level`)
        const nextLevelP = document.getElementById(`${matchedUpgrade.name}-next-p`)
        upgradeDiv.style.cssText = `border-color: white`;
        nextLevelDiv.style.cssText = `background-color: #2c2c2c; font-weight: normal;`;
        nextLevelP.innerHTML = `+${matchedUpgrade.increase} quacks per click`
    })
    relic.innerHTML = Math.ceil(Math.sqrt(parsedQuack - 999999)/300)
    qpc = 1
    qps = 0
    parsedQuack = 0
    duck.innerHTML = parsedQuack
}

setInterval(() => 
{
    parsedQuack += qps / 10
    duck.innerHTML = nf(parsedQuack)
    qpcText.innerHTML = Math.round(qpc)
    qpsText.innerHTML = Math.round(qps)
    bgm.play()

    if(parsedQuack >= 1_000_000)
    {
        prestigeButton.style.display = "block"
    }
    else
    {
        prestigeButton.style.display = "none"
    }
}, 100)

skillsNavButton.addEventListener("click", function() {
    const upgradeContainers = document.querySelectorAll(".upgrade")

    upgradeContainers.forEach((container) => {
        if (container.classList.contains('type-skill')) container.style.display = "flex"
        else container.style.display = "none"
    })
})

upgradesNavButton.addEventListener("click", function() {
    const upgradeContainers = document.querySelectorAll(".upgrade")

    upgradeContainers.forEach((container) => {
        if (container.classList.contains('type-upgrade')) container.style.display = "flex"
        else container.style.display = "none"
    })
})

artifactsNavButton.addEventListener("click", function() {
    const upgradeContainers = document.querySelectorAll(".upgrade")

    upgradeContainers.forEach((container) => {
        if (container.classList.contains('type-artifact')) container.style.display = "flex"
        else container.style.display = "none"
    })
})
let isMuted = false;
function mute()
{
    isMuted = !isMuted;
    bgm.volume = isMuted ? 0 : 0.1; 
}


window.incrementQuacks = incrementQuacks
window.buyUpgrade = buyUpgrade
window.save = save
window.load = load
window.mute = mute
window.prestige = prestige 

