const Sequelize = require('sequelize');
const { STRING, INTEGER, UUID, UUIDV4 } = Sequelize
const database = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/react_webpack', { logging:false })
const { randomName, randomAge } = require('./random')

const People = database.define('person', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    name: {
        type: STRING,
        allowNull: false,
    },
    age: {
        type: INTEGER,
        allowNull: false
    },
})

People.randomPerson = function () {
    return this.create({
        name: randomName(),
        age: randomAge()
    })
}

const init = async()=>{
    await database.sync({ force:true })
    await Promise.all([1,2,3,4,5].map(x=>{
        return People.randomPerson()
    }))
    console.log('Connected to Db');
}

module.exports = {
    init,
    database,
    People
}