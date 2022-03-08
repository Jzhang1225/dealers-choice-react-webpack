const randomAmtLtrs = () =>{
    return Math.ceil(Math.random()*10 + 2)
}

const randomLtr = () =>{
    return String.fromCharCode(Math.ceil(Math.random()*26)+ 96)
}

const randomName = () =>{
    const Name = Array(randomAmtLtrs()).fill('').map((x,idx) =>{
        if(idx === 0) return randomLtr().toUpperCase()
        return randomLtr()
    }).join('')
    return Name
}

const randomAge = () =>{
    return Math.ceil(Math.random()*100)
}

module.exports = {
    randomName, 
    randomAge
}