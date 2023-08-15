import React, { useState, useEffect } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInputGroup,
    MDBRadio,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import './Style.css'

const Report = () => {

    const [resp, setResp] = useState({
        weather: [],
        main: [],
        name: [],
    })

    const [city, setCity] = useState('Guwahati')

    const weatherCity = async () => {
        const url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0154e26e60872290a4f6538db4642922`);
        const response = await url.json();
        setResp({
            weather: response.weather,
            main: response.main,
            name: response.name,
        })
    }

    const handleChange = (e) => {
        const newCity = e.target.value;
        console.log(newCity)
        setCity(newCity)
    }

    useEffect(() => {
        weatherCity()
    }, [])

    return (
        <section className="vh-100">
            <MDBContainer className="h-100 py-5">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol md="8" lg="6" xl="4">
                        <MDBTypography tag="h3" className="mb-4 pb-2 fw-normal">
                            Check the weather forecast
                        </MDBTypography>

                        <MDBInputGroup className="mb-3">
                            <input
                                className="form-control rounded"
                                type="text"
                                placeholder="City"
                                onChange={handleChange}
                            />
                            <a type="button" onClick={weatherCity}>
                                <span
                                    className="input-group-text border-0 fw-bold"
                                    id="search-addon"
                                >
                                    Check!
                                </span>
                            </a>
                        </MDBInputGroup>

                        { resp.name && resp.main && resp.weather.length>0 ? (
                            <MDBCard className="shadow-0 border">
                                <MDBCardBody className="p-4">
                                    <MDBTypography tag="h4" className="mb-1 sfw-normal">{resp.name}</MDBTypography>
                                    <p className="mb-2">
                                        Current temperature: <strong>{resp.main.temp}°C</strong>
                                    </p>
                                    <p>
                                        Feels like: <strong>{resp.main.feels_like}°C</strong>
                                    </p>
                                    <p>
                                        Max: <strong>{resp.main.temp_max}°C</strong>, Min: <strong>{resp.main.temp_min}°C</strong>
                                    </p>

                                    <div className="d-flex flex-row justify-content-center align-items-center">
                                        <p className="mb-0 me-4">{resp.weather.map(condition => condition.main).join(', ')}</p>
                                        <img src={`https://openweathermap.org/img/wn/${resp.weather.map(condition => condition.icon).join(', ')}@2x.png`} />
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        ) : (
                            <MDBCard className="shadow-0 border">
                                Invalid city entered
                            </MDBCard>
                        )}
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}

export default Report;
