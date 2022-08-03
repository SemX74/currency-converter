import { fetchWithFallback } from './Service/FetchWithFallback';
import React,{useState,useEffect,useRef} from 'react';
import "./Style/App.css";

function App() {
  //Fetched data
  const uah = '1';
  const [eur, setEur] = useState('');
  const [usd, setUsd] = useState('');
  const [date, setDate] = useState('');
  //inputs
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  //options
  const [fromOption, setFromOption] = useState(uah);
  const [toOption, setToOption] = useState(uah);
  useEffect(() => {
    fetchWithFallback([
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/uah.min.json",
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/uah.min.json",
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/uah.json",
    "https://raw.githubusercontent.com/fawazahmed0/currency-api/1/latest/currencies/eur/uah.min.json",
    "https://raw.githubusercontent.com/fawazahmed0/currency-api/1/latest/currencies/eur/uah.json"
    ]).then(res => res.json()).then(data => setEur(data.uah)).then(data => setDate(data.date))
    fetchWithFallback([
      "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/uah.min.json",
      "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/uah.min.json",
      "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/uah.json",
      "https://raw.githubusercontent.com/fawazahmed0/currency-api/1/latest/currencies/usd/uah.min.json",
      "https://raw.githubusercontent.com/fawazahmed0/currency-api/1/latest/currencies/usd/uah.json"
      ]).then(res => res.json()).then(data => setUsd(data.uah))
  }, []);

  const handleFrom = ({ target }) =>{
    setFrom(target.value)
    setTo(String((target.value * (fromOption / toOption).toFixed(3))))
  }
  const handleTo = ({ target }) =>{
    setTo(target.value)
    setFrom(String((target.value * (toOption / fromOption)).toFixed(3)))
  }
  const handleFromOption = ({ target }) =>{
    setTo(String((parseFloat(from) * (parseFloat(target.value) / parseFloat(toOption))).toFixed(3)))
    setFromOption(target.value);
  }
  const handleToOption = ({ target }) =>{
    setTo(String((parseFloat(from) * (fromOption / target.value)).toFixed(3)))
    setToOption(target.value)
    
  }
  return (
    <div className="App">
        <header className="App-header">
          <div className='Header-Currency'><span> USD: ${usd} </span></div>
          <div className='Header-Currency'><span> Info by: {date}</span></div>
          <div className='Header-Currency'><span> EUR: €{eur}</span></div>
        </header>
      <div className="container">
        <div className='App-wrapper'>
          <h1 className="Title">Currency Converter</h1>
          <div className="Inputs">
            <input placeholder='0' value={from} onChange={handleFrom} type="number" />
            <h1>TO</h1>
            <input placeholder='0' value={to} onChange={handleTo} type="number" />
          </div>
          <div className="Selections">
            <select value={fromOption} onChange={handleFromOption} name="" id="">
              <option value={uah}>UAH</option>
              <option value={usd}>USD</option>
              <option value={eur}>EUR</option>
            </select>
            <select value={toOption} onChange={handleToOption} name="" id="">
              <option value={uah}>UAH</option>
              <option value={usd}>USD</option>
              <option value={eur}>EUR</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export {App};
