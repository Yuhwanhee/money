import React, { useEffect, useInsertionEffect, useState } from 'react'
import { Wheel } from 'react-custom-roulette';
import Navbar from '../component/Navbar';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updatePoint } from '../redux/features/pointSlice';

const Roulette = () => {


    const navigate = useNavigate()
    const dispatch = useDispatch()
    //룰렛이 회전 애니메이션을 시작
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);//당첨 인덱스

    const [points, setPoints] = useState(0)


    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/')
        }
    }, [])

    useEffect(() => {
        fetchPoint()
    }, [])


    //룰렛 데이터
    const data = [
        {
            option: '1000원'
            , style: { backgroundColor: '#edab56', textColor: 'black' }
            , percentage: 36
        },
        {
            option: '2000원'
            , style: { backgroundColor: '#5e4d30', textColor: 'black' }
            , percentage: 10
        },
        {
            option: '꽝'
            , style: { backgroundColor: '#edab56', textColor: 'black' }
            , percentage: 49
        },
        {
            option: '10000원'
            , style: { backgroundColor: '#5e4d30', textColor: 'black' }
            , percentage: 4
        },
        {
            option: '300000원'
            , style: { backgroundColor: '#edab56', textColor: 'black' }
            , percentage: 0.5
        },
        {
            option: '15000원'
            , style: { backgroundColor: '#5e4d30', textColor: 'black' }
            , percentage: 0.5
        },
    ]





    // 룰렛 애니메이션을 실행시킬 함수
    const handleSpinClick = () => {
        if (points < 2000) {
            alert('포인트가 부족합니다.')
            return
        }
        if (!mustSpin) {
            // 가중치 랜덤 알고리즘(Weighted Random Picker) 적용
            // 1. 랜덤 기준점 설정
            const pivot = Math.floor((Math.random() * 99) + 1);
            let stack = 0; // 가중치

            let percentage = data.map((row, idx) => { { return row.percentage } });

            let newPrizeNumber = null; //당첨 인덱스

            percentage.some((row, idx) => {
                //2. 가중치 누적
                stack += row;

                // 3. 누적 가중치 값이 기준점 이상이면 종료
                if (pivot <= stack) {
                    newPrizeNumber = idx;
                    return true;
                }

            })
            // 당첨 인덱스를 가리킴
            setPrizeNumber(newPrizeNumber);
            setMustSpin(true);
        }
    }

    // 룰렛 애니메이션이 멈출 때 실행되는 함수
    const StopSpinning = () => {
        setMustSpin(false);
        resultSubmit()
        alert(data[prizeNumber].option + '이 당첨되셨습니다');
        fetchPoint()
    }


    const resultSubmit = async () => {
        try {
            const response = await fetch('http://172.30.1.78:9595/rulet', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },

                body: JSON.stringify({
                    userId: jwtDecode(localStorage.getItem('token')).id,
                    prize: prizeNumber
                })
            })
            if (response.status === 200) {
                const data = await response.json()
                dispatch(updatePoint(data))
            }
        } catch (err) {
            console.log(err)

        }
    }

    const fetchPoint = async () => {
        try {
            const response = await fetch('http://172.30.1.78:9595/point', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },

                body: JSON.stringify({
                    userId: jwtDecode(localStorage.getItem('token')).id
                })
            })
            const data = await response.json()
            setPoints(data.point)
        } catch (err) {
            console.log(err)

        }
    }


    return (
        <div style={{ backgroundColor: 'black', width: '100%', height: '1000px' }}>
            <Navbar />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop:'70px' }}>
                <Wheel
                    spinDuration={0.2} // spin속도
                    //디폴트 위치 랜덤으로
                    startingOptionIndex={Math.floor(Math.random() * data.length)}
                    mustStartSpinning={mustSpin}
                    prizeNumber={prizeNumber}
                    data={data}
                    onStopSpinning={StopSpinning}
                />
                <div  style={{width:'100px', height:'25px', backgroundColor:'#edab56', borderRadius:'10px', display:'flex',
            justifyContent:'center', alignItems:'center',marginTop:'350px'}}onClick={handleSpinClick}>2000원</div>
                {/* <div>{prizeNumber}</div> */}
            </div>
        </div>
    )
}

export default Roulette