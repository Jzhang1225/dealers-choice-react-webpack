import React from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios'

const ListOfPeople = (props) =>{
    const { people, selectPerson, addPerson, deletePerson } = props
    return (
        <div>
            <h3>Total age is {people.reduce((acc, item)=> acc + item.age,0)}</h3>
            <button onClick={()=>addPerson()}>Add a Person</button>
            {people.map(person =>{
                return (
                    <div>
                        <div key = {person.id} >
                            <p onClick = {()=> selectPerson(person)}>{person.name} has lived for {person.age} years!</p>
                            <button onClick={()=>deletePerson(person.id)}>Delete</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

const SinglePerson = (props) =>{
    const { person, resetPerson } = props
    return(
        <div>
            <button onClick={()=>resetPerson()}>Go back to people list</button>
            <div>
            {person.name} is a special person with an age of {person.age} years.
            </div>
        </div>
    )
}
class Main extends React.Component {
    constructor(){
        super()
        this.state = {
            people: [],
            selectedPerson: {},
            totalAge: 0
        }
        this.selectPerson = this.selectPerson.bind(this)
        this.addPerson = this.addPerson.bind(this)
        this.deletePerson = this.deletePerson.bind(this)
        this.resetPerson= this.resetPerson.bind(this)
    }

    selectPerson(person){
        this.setState({
            selectedPerson: person
        })
    }

    resetPerson(){
        this.setState({
            selectedPerson: {}
        })
    }

    async addPerson(){
        try{
            const person = (await axios.post('/api/people')).data
            const people = [...this.state.people, person]
            this.setState({
                people,
                totalAge: people.reduce((acc, item)=> acc + item.age,0)
            })
            console.log(this.state.totalAge);
        }
        catch(e){
            console.log('ERROR WITH ADDPERSON', e)
        }
    }

    async deletePerson(personId){
        try{
            const people = (await axios.delete(`/api/people/${personId}`)).data
            this.setState({
                people,
                totalAge: people.reduce((acc, item)=> acc + item.age,0)
            })
            console.log(this.state.totalAge);
        }
        catch(e){
            console.log('ERROR WITH ADDPERSON', e)
        }
    }

    async componentDidMount(){
        try{
            const people = (await axios.get('/api/people')).data
            this.setState({
                people
            })
        }
        catch(e){console.log('PROBLEM WITH MOUNT', e)}
    }

    render(){
        if (this.state.totalAge === 500){ return(
            <h1>YOU'RE A WINNER, VERY SMART AND GREAT PERSON</h1>
        )}
        return (
            <div>
                <h1>Get a total age of 500 to receive a prize</h1>
                <div>{
                    !this.state.selectedPerson.id ?
                    <ListOfPeople people = {this.state.people} selectPerson = {this.selectPerson} addPerson = {this.addPerson} deletePerson = {this.deletePerson}/> :
                    <SinglePerson person = {this.state.selectedPerson} resetPerson = {this.resetPerson}/>
                }   
                </div>
            </div>
            )
    }
}

ReactDOM.render(<Main/>, document.querySelector('#root'))