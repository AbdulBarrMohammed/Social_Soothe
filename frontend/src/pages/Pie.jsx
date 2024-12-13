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

    const [journals, setJournals] = useState([])


    const [cookies, setCookie, removeCookie] = useCookies(null)
    const authToken = cookies.AuthToken
    const userEmail = cookies.Email

    const pieData = [0,0,0,0,0,0]

    /**
         * Gets journals data
         * @param none
         * @return none
         */
    const getData = async () => {

        try {
            const res = await fetch(`http://localhost:8000/journals/${userEmail}`)
            const journalData = await res.json();

            //set user journals
            setJournals(journalData)
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getData()
    },[])


    //Iterate through journal to get each emotion count
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
                    "rgb(249,208,64)",
                    "#e0474c",
                    "rgb(87, 156, 149)",
                    "#6595DA",
                    "rgb(123, 57, 196)",
                    "rgb(199,107,152)"
                ],
                hoverOffset: 4,

            }
        ]
    };


    return (
        <div >
            <div className='h-72'>
                <Pie options={options}
                    data={pieChartData}

                    />

            </div>
        </div>


    );

};
