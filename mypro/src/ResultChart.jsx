import { useRef, useEffect } from "react";
import {Chart, scales} from "chart.js/auto";

const ResultChart = ({result, chartType}) =>{
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(()=>{
        if(!result)return;

        if(chartRef.current){
            chartRef.current.destroy();
        }

        const labels = result.detail.map((item) => item.message.slice(0.10));
        const data = result.detail.map((item) => item.label === "positive" ? item.score : -item.score);

        chartRef.current = new Chart(canvasRef.current,{
            type : chartType,
            data : {
                labels,
                datasets:[
                    {
                        label: "感情スコア",
                        data,
                        backgroundColor: data.map((val)=>
                        val >= 0 ? "rgba(75,192,192,0.6)": "rgba(255,99,132,0.6)"),
                    },
                ],
            },
            options: {
                scales:{
                    y:{
                        beginAtZero: true,
                        suggestedMin:-1,
                        suggestedMax:1,
                    },
                },
            },
        });
    });

    return <canvas ref={canvasRef} />
}

export default ResultChart;