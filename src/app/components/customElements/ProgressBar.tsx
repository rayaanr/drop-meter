import React from 'react';
import ethPrice from "@/app/global/ethPrice";
import useEthPrice from "@/app/global/ethPrice";
import { Tooltip } from 'react-tooltip';
// import 'react-tooltip/dist/react-tooltip.css';

type ProgressBarProps = {
    progress: number;
    type : "Interactions" | "Volume" | "Bridge" | "Balance" | "Activity" |"ZkLite"| undefined;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ progress , type}) => {
    let colorClass = '';
    const ethPrice = useEthPrice();

    if (type === "Interactions") {
        if (progress < 4) {progress = 0;}
        else if (progress >= 4 && progress < 10) {progress = 25;}
        else if (progress >= 10 && progress < 25) {progress = 50;}
        else if (progress >= 25 && progress < 100) {progress = 75;}
        else if (progress >= 100) {progress = 100;}
    }else if (type === "Volume" || type === "Bridge") {
        if (progress < 10000) {
            progress = 10;
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

    if (progress === 0) {
        colorClass = 'border-red-500';
    } else if (progress >= 0 && progress <= 25) {
        colorClass = 'bg-red-500';
    } else if (progress > 25 && progress <= 50) {
        colorClass = 'bg-orange-500';
    } else if (progress > 50 && progress <= 75) {
        colorClass = 'bg-yellow-500';
    } else if (progress > 75 && progress <= 100) {
        colorClass = 'bg-green-500';
    }

    return (
        <>
            <a data-tooltip-id={type}
               data-tooltip-delay-hide={0}
            >
                <div>
                <div className="w-full h-2 bg-gray-300 rounded overflow-hidden">
                    <div
                        className={`h-20 transition-all ${colorClass}`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
                </div>
            </a>
            <Tooltip id={type} className={`max-w-[360px]`}>
                {(() => {
                    switch (type) {
                        case "Interactions":
                            return (
                                <p>Number of verified transactions<br/>
                                    1P - Conducted more than 4 transactions <br/>
                                    2P - Conducted more than 10 transactions<br/>
                                    3P - Conducted more than 25 transactions<br/>
                                    4P - Conducted more than 100 transactions<br/>
                                </p>)
                        case "Volume":
                            return (
                                <p>Aggregate Value is the total transaction value (Volume)<br/>
                                    1P - Conducted more than $10,000 tx<br/>
                                    2P - Conducted more than $50,000 tx<br/>
                                    3P - Conducted more than $250,000 tx<br/>
                                </p>
                            )
                        case "Bridge":
                            return (
                                <p>
                                    1P - Bridged more than $10,000 of assets<br/>
                                    2P - Bridged more than $50,000 of assets<br/>
                                    3P - Bridged more than $250,000 of assets<br/>
                                </p>
                            );
                        case "Balance":
                            return "Hold at least 0.005 Ξ";
                        case "Activity":
                            return (
                                <p>
                                    1P - Conducted txns during 2 distinct months<br/>
                                    2P - Conducted txns during 6 distinct months<br/>
                                    3P - Conducted txns during 9 distinct months<br/>
                                </p>
                            );
                        case "ZkLite":
                            return (
                                <p>
                                    1P - Conducted more than 3 transactions<br/>
                                    2P - Conducted more than 5 transactions<br/>
                                    3P - Conducted more than 10 transactions<br/>
                                </p>
                            );
                        default:
                            return '';
                    }
                })()}
            </Tooltip>
        </>
    );
};

export default ProgressBar;