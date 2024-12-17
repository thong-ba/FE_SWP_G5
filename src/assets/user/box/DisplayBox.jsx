import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './DisplayBox.css';
import Header from '../../components/Head/Header';
import Footer from '../../components/Foot/Footer';
const DisplayBox = () => {
    const [boxTypes, setBoxTypes] = useState([]);
    const sliderRef = useRef(null);

    useEffect(() => {
        const fetchBoxTypes = async () => {
            try {
                const response = await axios.get('https://localhost:7046/api/BoxType/GetAlBoxTypeAsync');
                setBoxTypes(response.data.result);
            } catch (error) {
                console.error('Failed to fetch box types:', error);
            }
        };

        fetchBoxTypes();
    }, []);

    const handlePrevClick = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollLeft -= 250; // Điều khiển việc cuộn về bên trái
        }
    };

    const handleNextClick = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollLeft += 250; // Điều khiển việc cuộn về bên phải
        }
    };

    return (
        <div>
            <Header />
            <div className="carousel-container">
                <h2 className="carousel-title">Available Box Types</h2>
                <div className="carousel-slider" ref={sliderRef}>
                    {boxTypes.map((box) => (
                        <div key={box.id} className="carousel-item">
                            <img
                                src={`/images/box-${box.id}.png`}
                                alt={box.boxName}
                                className="box-image"
                            />
                            <div className="box-info">
                                <h3 className="box-name">{box.boxName}</h3>
                                <p className="box-price">Shipping Cost: {box.shippingCost.toLocaleString()} VND</p>
                            </div>
                        </div>
                    ))}
                </div>
                <Footer />
            </div>
        </div>

    );
};

export default DisplayBox;
