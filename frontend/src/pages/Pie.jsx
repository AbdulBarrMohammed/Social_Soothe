import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS , Tooltip, Legend, ArcElement} from 'chart.js'
import { useCookies } from 'react-cookie'
import { useEffect } from 'react'
import { useState } from 'react'

ChartJS.register(
    Tooltip, Legend, ArcElement
)

export const PieChart = () => {
    const options = {}
    const data = {}

    const [journals, setJournals] = useState([])


    const [cookies, setCookie, removeCookie] = useCookies(null)
    const authToken = cookies.AuthToken
    const userEmail = cookies.Email

    const pieData = [0,0,0,0,0,0]
    const socialTreeLength = 0

    const getData = async () => {

        try {
            const res = await fetch(`http://localhost:8000/journals/${userEmail}`)
            const journalData = await res.json();

            //    "Happy", "Angry", "Embarrassed", "Sad", "Worried", "Stressed"

            //set user journals
            setJournals(journalData)
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getData()
    },[])


    journals.map((j) => {
        if (j.mood == 'happy') {
            pieData[0] += 1
        }
        else if (j.mood == 'angry') {
            pieData[1] += 1
        }
        else if (j.mood == 'embarrassed') {
            pieData[2] += 1
        }
        else if (j.mood == 'sad') {
            pieData[3] += 1
        }
        else if (j.mood == 'worried') {
            pieData[4] += 1
        }
        else {
            pieData[5] += 1
        }
    })


    const pieChartData = {
        labels: [
            "Happy", "Angry", "Embarrassed", "Sad", "Worried", "Stressed"
        ],
        datasets: [
            {
                label: "Mood",
                data: pieData,
                backgroundColor: [
                    "rgb(195, 159, 60)",
                    "rgb(209, 112, 83)",
                    "rgb(87, 156, 149)",
                    "rgb(69, 74, 186)",
                    "rgb(123, 57, 196)",
                    "rgb(205, 92, 146)"
                ],
                hoverOffset: 4,

            }
        ]
    };


    return (
        <div >

            <div className='h-80'>
                <Pie options={options}
                    data={pieChartData}


                    />

            </div>




        </div>


    );

};
