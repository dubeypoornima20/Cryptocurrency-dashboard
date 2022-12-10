import React from 'react'
import ExchangeRate from './ExchangeRate'
import { useState } from 'react'
import axios from 'axios'
function CurrencyConverter() {
    const currencies=['BTC','USD','ETH','XRP','LTC','ADA']
    const[choosenPrimaryCurrency,setPrimaryCurrency]=useState('BTC')
    const[choosenSecondaryCurrency,setSecondaryCurrency]=useState('BTC')
    const[amount,setAmount]=useState(1)
    const[exchangeRate,setExchangeRate]=useState(0)
    const[primaryCurrencyExchanged,setPrimaryCurrencyExchanged]=useState('BTC')
    const[secondaryCurrencyExchanged,setSecondaryCurrencyExchanged]=useState('BTC')
    const[result,setResult]=useState(0)
    const convert=()=>{
       
        const options = {
        method: 'GET',
        url: 'https://alpha-vantage.p.rapidapi.com/query',
        params: {from_currency: choosenPrimaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: choosenSecondaryCurrency},
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
            'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
        }
        };

        axios.request(options).then((response) =>{
            console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
            setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
            setResult(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']* amount)
            setPrimaryCurrencyExchanged(choosenPrimaryCurrency)
            setSecondaryCurrencyExchanged(choosenSecondaryCurrency)
        }).catch((error)=> {
            
            console.error(error);
        });
        
    }
console.log(exchangeRate)
  return (
    <div className='currency-converter'>
      <h2>CurrencyConverter</h2>
      <div className='input-box'>
      <table>
        <tbody>

            <tr>
                <td>Primary Currency:</td>
                <td>
                    <input type="number" value={amount} name="currency-amount-1" onChange={(e)=>setAmount(e.target.value)}/>
                </td>
                <td>
                    <select className='currency-options' value={choosenPrimaryCurrency} name="currency-option-1" onChange={(e)=>setPrimaryCurrency(e.target.value)}>
                       {currencies.map((currency ,_index)=>(<option key={_index}>{currency}</option>))} 
                    </select>
                </td>
            </tr>
            <tr>
                <td>Secondary Currency:</td>
                <td>
                    <input  value={result} name="currency-amount-2" disabled={true}/>
                </td>
                <td>
                    <select className='currency-options' value={choosenSecondaryCurrency} name="currency-option-2" onChange={(e)=>setSecondaryCurrency(e.target.value)}>
                    {currencies.map((currency ,_index)=>(<option key={_index}>{currency}</option>))} 
                    </select>
                </td>
            </tr>
        </tbody>
      </table>
      <button id="convert-button" onClick={convert}>Convert</button>
      </div>
      
      <ExchangeRate exchangeRate={exchangeRate} choosenPrimaryCurrency={primaryCurrencyExchanged} choosenSecondaryCurrency={secondaryCurrencyExchanged}/>
    </div>
  )
}

export default CurrencyConverter
