import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux'
import { fetchAdminsProducts, fetchOrderProducts } from '../../../actions'
import LoaderComponent from '../main-parts/Loader';



const BarChart = props => {
    useEffect(() => {
        props.fetchAdminsProducts()
        props.fetchOrderProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (!props.admin && !props.students[0 && !props.news[0 && !props.order]]) {
        return (
            < LoaderComponent />
        )
    }


    const adminLength = props.admin?.length
    const orderLength = props.order?.length

    const data = {
        labels: ['Admins', 'Orders'],
        datasets: [
            {
                label: 'Cards',
                data: [adminLength, orderLength],
                backgroundColor: [
                    'rgb(0%, 100%, 0%, 0.2)',
                    'rgb(22%, 99%, 99%, 0.2)',
                ],
                borderColor: [
                    'rgb(0%, 100%, 0%)',
                    'rgb(22%, 99%, 99%)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };
    return (
        (
            <div style={{ width: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                <Bar data={data} options={options} />
            </div>
        )
    )
}


const mapStateToProps = state => {
    return {
        admin: state.productsAdmins[0],
        order: state.order[0],
    }
}


export default connect(mapStateToProps, { fetchAdminsProducts, fetchOrderProducts })(BarChart);