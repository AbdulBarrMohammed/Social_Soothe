import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS , Tooltip, Legend, ArcElement} from 'chart.js'
//import { pieChartData } from './moodData'
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

    const getJournals = async () => {

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
        getJournals()
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
                    "rgb(251, 235, 190)",
                    "rgb(249, 230, 224)",
                    "rgb(214, 249, 246)",
                    "rgb(233, 234, 253)",
                    "rgb(232, 218, 250)",
                    "rgb(250, 225, 238)"
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
