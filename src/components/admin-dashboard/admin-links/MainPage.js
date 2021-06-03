import React, { useEffect } from 'react'
import BarChart from '../Charts/BarChart'
import PieChart from '../Charts/PieChart'



function MainPage() {
    useEffect(() => {
        window.localStorage.removeItem('admin')
    }, [])


    return (
        <div style={{ width: '100%', backgroundColor: '#eee', height: '100%', paddingTop: '30px' }}>
            <div style={{ margin: 'auto', height: '100%', width: '90%', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
                <h1 style={{ textAlign: 'center', fontSize: '24px', fontWeight: '300', margin: '20px' }}>Number of cards in WebSite</h1>
                <PieChart />
                <br />
                <br />
                <br />
                <BarChart />
            </div>
        </div >
    )
}

export default MainPage
