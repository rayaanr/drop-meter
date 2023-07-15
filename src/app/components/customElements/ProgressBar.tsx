import React from 'react';
import ethPrice from "@/app/global/ethPrice";
import useEthPrice from "@/app/global/ethPrice";

type ProgressBarProps = {
    progress: number;
    type : "Interactions" | "Volume" | "Bridge" | "Balance" | "Activity" |"ZkLite"| undefined;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ progress , type}) => {
    let colorClass = '';
    const ethPrice = useEthPrice()



    if (type === "Interactions") {
        if (progress < 4) {progress = 0;}
        else if (progress >= 4 && progress < 10) {progress = 25;}
        else if (progress >= 10 && progress < 25) {progress = 50;}
        else if (progress >= 25 && progress < 100) {progress = 75;}
        else if (progress >= 100) {progress = 100;}
    }else if (type === "Volume") {
        if (progress < 10000) {
            progress = 0;
        } else if (progress >= 10000 && progress <= 50000) {
            progress = 33;
        } else if (progress > 50000 && progress <= 250000) {
            progress = 66;
        } else if (progress > 250000) {
            progress = 100;
        }
    } else if (type === "Activity") {
        if (progress < 2) {
            progress = 0;
        } else if (progress >= 2 && progress < 6) {
            progress = 33;
        } else if (progress >= 9 && progress < 9) {
            progress = 66;
        } else if (progress >= 9) {
            progress = 100;
        }
    } else if (type === "Balance") {
        if ((progress / ethPrice) <= .005) {
            progress = 0;
        } else progress = 100;

    } else if (type === "ZkLite") {
        if (progress <= 3) {
            progress = 0;
        } else if (progress > 3 && progress <= 5) {
            progress = 33;
        } else if (progress > 5 && progress <= 10) {
            progress = 66;
        } else if (progress > 10) {
            progress = 100;
        }
    }






    if (progress >= 0 && progress <= 25) {
        colorClass = 'bg-red-500';
    } else if (progress > 25 && progress <= 50) {
        colorClass = 'bg-orange-500';
    } else if (progress > 50 && progress <= 75) {
        colorClass = 'bg-yellow-500';
    } else if (progress > 75 && progress <= 100) {
        colorClass = 'bg-green-500';
    }

    return (
        <div>
            <div className="w-full h-2 bg-gray-300 rounded overflow-hidden">
                <div
                    className={`h-20 transition-all ${colorClass}`}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;