
import React, {Component} from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import cloudbk from './cloudbk.jpg'
import './WeatherDisplay.css'


export default class WeatherDisplay extends Component {
    constructor(props){
        super(props)
        this.state = {
            country: 'CA',
            city: 'Toronto',
            date: 'cc',
            temperature: 0,
            tempMin: 0,
            tempMax: 'ff',
            tempFeels: 'gg',
            humidity: 'ee',
            visibility: 'hh',
            weatherDescr: 'ii',
            windSpeed: 'jj',
            weatherIcon: '',
            dataValid: false
        }

    }

    onSubmitForm = (e) => {
        e.preventDefault()
        //console.log(this.state.city)
        //this.setState({city: })
        const currentURL = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=90b28b9fb706c1a4cbee25c41afb56cb`;
        axios.get(currentURL)
        .then(res => {
            //console.log("Weather: ")
            console.log(res.data)
            //console.log(res.data.name)
            
            this.setState({
                country: res.data.sys.country,
                city: res.data.name,
                date: '',
                temperature: Math.round(res.data.main.temp-273.15),
                tempMin: Math.round(res.data.main.temp_min-273.15),
                tempMax: Math.round(res.data.main.temp_max-273.15), 
                tempFeels: res.data.main.feels_like, 
                humidity: res.data.main.humidity,
                visibility: res.data.visibility,
                weatherDescr: res.data.weather[0].description,
                windSpeed: res.data.wind.speed,
                weatherIcon: res.data.weather[0].icon,
                dataValid: true
            })
            this.logState()
        }).catch(error => {
            console.log(error)
        })
         
    }
    // to be removed afterwards
    logState = () => {
        console.log(this.state.country)
        console.log(this.state.city)
        console.log(this.state.date)
        console.log(this.state.temperature)
        console.log(this.state.tempMin)
        console.log(this.state.tempMax) 
        console.log(this.state.tempFeels) 
        console.log(this.state.humidity)
        console.log(this.state.visibility)
        console.log(this.state.weatherDescr)
        console.log(this.state.windSpeed)
    }

    onValueChange = (e) => {
         this.setState({[e.target.name] : e.target.value})
    }
 
    dayOfWeek = () => {
        const today = new Date().getDay();
        return isNaN(today)?null: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][today]
    }
    month = () => {
        const today = new Date().getMonth();
        return isNaN(today)?null:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][today];
    }
    dayOfMonth = () => {
        const today = new Date().getDate();
        if(isNaN(today))
           return null
        if(today==1)
            return `${today}st`
        else if(today==2)
            return `${today}nd`
        else if(today==3)
            return `${today}rd`
        else 
           return `${today}th`
    }

    uppercaseFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);

    }

    render(){
        return(
            <>
            <div style={{backgroundImage:`url(${cloudbk})`}} className="background_container">
                <div >
                <h1>Weather App</h1> 
                    <img src={`http://openweathermap.org/img/wn/10d@2x.png`}/> 
                    <img src={`http://openweathermap.org/img/wn/04n@2x.png`}/>
                    <img src={`http://openweathermap.org/img/wn/02n@2x.png`}/>
                    <img src={`http://openweathermap.org/img/wn/03n@2x.png`}/>
                    <img src={`http://openweathermap.org/img/wn/01n@2x.png`}/>

 
            <div>
            <Container style={{width:450, backgroundColor:"whitesmoke", borderRadius:8, padding:10, opacity: 0.8}}>
                <Nav className = "navbar" >
                    <Form className="d-flex" onSubmit={this.onSubmitForm}>
                        <Form.Control type="search" placeholder="Enter search City" name="city"
                            onChange={(e)=>this.onValueChange(e) } className="me-2" aria-label="Search" style={{width: '80%', borderRadius:6}}/>
                        <Button type="submit" >
                            Search
                        </Button>
                    </Form>
                </Nav>
                </Container>
                <div className="weather_info" >
                <Container className='weather_info_summary' 
                style={{backgroundColor:"black", color:"white", fontSize:20, fontFamily:"roboto", borderRadius:3, padding:1, opacity: 0.8}}>
                { this.state.dataValid &&
                <div>
                <Row>
                    <Form.Text>{this.dayOfWeek()},{this.month()},</Form.Text>
                </Row>
                <Row>
                    <Form.Text>{this.dayOfMonth()}</Form.Text>
                </Row>
                <Row>
                    <Form.Text>{this.state.city}</Form.Text>
                </Row>
                <Row>
                    <div>
                        <Form.Text>{this.state.temperature}&#8451;</Form.Text>
                    </div>
                </Row>
                <Row>
                    <Form.Text>{this.uppercaseFirstLetter(this.state.weatherDescr)}</Form.Text>
                </Row>
                </div>
                }
            </Container>
            <Container >
                <div className="weather_details" >
                    <Table className="col1">
                        <tr>
                            <td className="col1">
                                <Form.Text >HUMIDITY</Form.Text> 
                            </td>
                            <td className="col2">
                            <Form.Text>{this.state.humidity}%</Form.Text>

                            </td>
                        </tr>

                        <tr>
                            <td className="col1">
                                <Form.Text >WIND</Form.Text>
                            </td>
                            <td className="col2">
                                <Form.Text >{this.state.windSpeed} km/h</Form.Text>

                            </td>
                        </tr>
 
 
                        <tr>
                            <td className="col1">
                            <Form.Text >MAX TEMP</Form.Text>
                            </td>
                            <td className="col2">
                            <Form.Text >{this.state.tempMax}&#8451;</Form.Text>
 
                            </td>
                        </tr>
 
                        <tr>
                            <td className="col1">
                            <Form.Text >MIN TEMP</Form.Text>
                            </td>
                            <td className="col2">
                            <Form.Text >{this.state.tempMin}&#8451;</Form.Text>
 
                            </td>
                        </tr>
                        </Table>
 
 
                    </div>
                    <div className="weather_details_down">

                    </div>
            </Container>
            </div>
            </div>
            </div>
            </div>
            </>
        )
    }
}