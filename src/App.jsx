import { fetchWithFallback } from './Service/FetchWithFallback';
import React,{useState,useEffect,useRef} from 'react';
import "./Style/App.css";

function App() {
  //Fetched data
  const [eur, setEur] = useState({});
  const [usd, setUsd] = useState({});
  //inputs
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  //options
  const [fromOption, setFromOption] = useState('UAH');
  const [toOption, setToOption] = useState('USD');
  useEffect(() => {
    fetchWithFallback([
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/uah.min.json",
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/uah.min.json",
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/uah.json",
    "https://raw.githubusercontent.com/fawazahmed0/currency-api/1/latest/currencies/eur/uah.min.json",
    "https://raw.githubusercontent.com/fawazahmed0/currency-api/1/latest/currencies/eur/uah.json"
    ]).then(res => res.json()).then(data => setEur(data))
    fetchWithFallback([
      "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/uah.min.json",
      "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/uah.min.json",
      "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/uah.json",
      "https://raw.githubusercontent.com/fawazahmed0/currency-api/1/latest/currencies/usd/uah.min.json",
      "https://raw.githubusercontent.com/fawazahmed0/currency-api/1/latest/currencies/usd/uah.json"
      ]).then(res => res.json()).then(data => setUsd(data))
  }, []);

  const handleFrom = ({ target }) =>{
    setFrom(target.value)
    if(fromOption =='USD'){
      if(toOption ==='USD'){
        setTo(target.value)
      }
      if(toOption ==='UAH'){
        setTo(target.value * usd.uah)
      }
      if(toOption ==='EUR'){
        setTo(target.value * (usd.uah / eur.uah))
      }
    }
    if(fromOption =='UAH'){
      setTo(target.value)
      if(toOption ==='USD'){
        setTo(target.value * usd.uah)
      }
      if(toOption ==='EUR'){
        setTo(target.value * eur.uah)
      }
    }
    if(fromOption ==='EUR'){
      if(toOption ==='EUR'){
        setTo(target.value)
      }
      if(toOption ==='UAH'){
        setTo(target.value * eur.uah)
      }
      if(toOption ==='USD'){
        setTo(target.value * (eur.uah / usd.uah))
      }
    }
  }
  const handleTo = ({ target }) =>{
    setTo(target.value)
    if(toOption ==='USD'){
      if(fromOption==='UAH'){
        setFrom(target.value * usd.uah)
      }
      if(fromOption==='USD'){
        setFrom(target.value)
      }
      if(fromOption==='EUR'){
        setFrom(target.value * (usd.uah / eur.uah))
      }
    }
    if(toOption ==='UAH'){
      if(fromOption==='UAH'){
        setFrom(target.value)
      }
      if(fromOption==='USD'){
        setFrom(target.value / usd.uah)
      }
      if(fromOption==='EUR'){
        setFrom(target.value / eur.uah)
      }
    }
    if(toOption ==='EUR'){
      if(fromOption==='UAH'){
        setFrom(target.value * eur.uah)
      }
      if(fromOption==='USD'){
        setFrom(target.value * (eur.uah / usd.uah))
      }
      if(fromOption==='EUR'){
        setFrom(target.value)
      }
    }
  }
  const handleFromOption = ({ target }) =>{
    setFromOption(target.value)
    
  }
  const handleToOption = ({ target }) =>{
    setToOption(target.value)
  }
  return (
    <div className="App">
        <header className="App-header">
          <div className='Header-Currency'><span> USD: ${usd.uah} </span></div>
          <div className='Header-Currency'><span> Info by: {usd.date}</span></div>
          <div className='Header-Currency'><span> EUR: €{eur.uah}</span></div>
        </header>
      <div className="container">
        <div className='App-wrapper'>
          <h1 className="Title">Currency Converter</h1>
          <span style={{color:'white'}}>*after changing the currency you should change the input value too</span>
          <div className="Inputs">
            <input placeholder='0' value={from} onChange={handleFrom} type="number" />
            <h1>TO</h1>
            <input placeholder='0'  value={to} onChange={handleTo} type="number" />
          </div>
          <div className="Selections">
            <select value={fromOption} onChange={handleFromOption} name="" id="">
              <option value="UAH">UAH</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
            <select value={toOption} onChange={handleToOption} name="" id="">
              <option value="UAH">UAH</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export {App};
