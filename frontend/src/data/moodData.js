export const lineChartData = {
    labels: [
        "Happy", "Unhappy"
    ],
    datasets: [
        {
            label: "Mood",
            data: [3000, 5000, 4500, 6000, 8000, 7000, 8000],
            borderColor: "rgb(75, 192, 192)",
            fill: false,  // Optional: adds a line without filling the area beneath it
            tension: 0.1   // Optional: smoothens the line
        }
    ]
};
