import React, { useEffect, useState } from 'react'
import axios from 'axios'

function InputComponent() {
    const [coins, setCoins] = useState([])
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      setLoading(true)
        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=${page}&sparkline=false`)
        .then(res => {
            console.log(res)
          setCoins([...coins, ...res.data])
          setLoading(false)

        })
        .catch(err => {
            console.log(err);
            setLoading(false)
        })
    }, [page])

    console.log(coins)

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const filteredCoins = coins.filter(coin=>
        coin.name.toLowerCase().includes(search.toLowerCase())
        )

        const red = {
            color: "red"
        }

        const green = {
            color: "green"
        }

  return (
    <div>
      <div className='black'>
      <div className="input-wrapper">
        <input className="coin-name-input" type="text" placeholder='Provide the coin name' onChange={handleChange} value={search}/>
      </div>
      </div>
      <div className='coin-wrapper'>
        { filteredCoins.length ? 
        
        filteredCoins.map((coin, i) => (
            <div key={(coin.id + i).toString()} className="coin">
                <div className='coin-name'>
                <img src={coin.image} alt="" />
                <p>{coin.name}</p>
                </div>
                <div>Rs.{coin.current_price}</div>
                <div style={coin.price_change_percentage_24h.toString().includes("-") ? red : green}>{coin.price_change_percentage_24h.toFixed(2)}%</div>
                <div className='mkt-cap'>
                    <p>Mkt Cap:</p>
                    <p>Rs.{coin.market_cap.toLocaleString()}</p>
                </div>
            </div>
        )) : null}
      </div>
      <div style={{width: 200, margin: "0 auto"}}>
        <button onClick={() => setPage(page + 1)} disabled={loading}>Load More</button>
      </div>
    </div>
  )
}

export default InputComponent