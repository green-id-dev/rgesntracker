import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import 'chart.js/auto';
import GreyContainer from '../components/GreyContainer.tsx';
import TitleBlocks from '../components/TitleBlocks.tsx';

interface GaugeProps {
    value: number;
    maxValue: number;
    subLabel: string;
    color: string;
    bgColor: string;
}

const Gauge: React.FC<GaugeProps> = ({value, maxValue, subLabel, color, bgColor}) => {
    const data = {
        labels: ['', ''],
        datasets: [
            {
                data: [value, maxValue - value],
                backgroundColor: [color, bgColor],
                borderColor: ['black', 'black'],
                borderWidth: 1,
                borderRadius: 0,
                cutout: '70%',
            },
        ],
    };

    const options = {
        rotation: 270,
        circumference: 180,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        maintainAspectRatio: false,
        responsive: true,
    };

    return (
        <div className="w-52 h-52 flex flex-col items-center">
            <Doughnut data={data} options={options}/>
            <div className="flex flex-col w-full items-center -mt-24 z-10">
                <div className="text-4xl font-bold">{maxValue === 100 ? value + "%" : value}</div>
                <div className="text-base mt-4 font-bold">{subLabel}</div>
            </div>
        </div>
    );
};


interface DashboardProps {
    approved: number;
    rejected: number;
    notApplicable: number;
    globalRate: number;
    maxValue: number;
}

const DashboardGauges: React.FC<DashboardProps> = ({approved, rejected, notApplicable, globalRate, maxValue}) => {
    return (
        <GreyContainer flexDirection="flex-col md:flex-col">
            <TitleBlocks text="Critères d'évaluation"/>
            <div className="flex space-x-4 overflow-auto justify-between w-full p-4">
                <div
                    className="flex flex-col border-solid border-[1px] border-black rounded-xl px-6 bg-white items-center">
                    <Gauge value={globalRate} maxValue={100} subLabel="Score de conformité" color="#00000099"
                           bgColor='#DFDFDF99'/>
                </div>
                <Gauge value={rejected} maxValue={maxValue} subLabel="Critères non conformes" color="#FF0000"
                       bgColor='#FFE7E7'/>
                <Gauge value={approved} maxValue={maxValue} subLabel="Critères conformes" color="#4AC300"
                       bgColor='#DEFFCA'/>
                <Gauge value={notApplicable} maxValue={maxValue} subLabel="Critères non applicables" color="#000000"
                       bgColor='#DFDFDF'/>
            </div>
        </GreyContainer>
    );
};

export default DashboardGauges;
