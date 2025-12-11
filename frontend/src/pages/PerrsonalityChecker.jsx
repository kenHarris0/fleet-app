    import React, { useContext, useState } from 'react';
    import { myers_questions } from '../questions.js';
    import {toast} from 'react-toastify'
    import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fleetContext } from '../context/Context.jsx';
    const PersonalityChecker = () => {
const {url,setuserdata}=useContext(fleetContext)
    const [answers, setAnswers] = useState({});
    const [active, setactive] = useState(false);
    const handleSelect = (questionId, option) => {
        setAnswers(prev => ({
        ...prev,
        [questionId]: option
        }));
    };
    const navv=useNavigate()

    const calculatePersonality = async() => {
        if(Object.values(answers) 
    .length<24){
            return toast.error("please select all the options")
        }
        const scores = {
        E: 0, I: 0,
        S: 0, N: 0,
        T: 0, F: 0,
        J: 0, P: 0
        };

        
        Object.values(answers).forEach(ans => {
        scores[ans.trait] += ans.weight;
        });

        const EI = scores["E"] >= scores["I"] ? "E" : "I";
        const SN = scores["S"] >= scores["N"] ? "S" : "N";
        const TF = scores["T"] >= scores["F"] ? "T" : "F";
        const JP = scores["J"] >= scores["P"] ? "J" : "P";

        const personality = EI + SN + TF + JP;
        setAnswers({})

        try{
            const res=await axios.post(url+'/user/updatePersonality',{personality},{withCredentials:true})
            if(res.data){
                setuserdata(prev=>(
                    {
                        ...prev,
                        ...res.data
                    }
                ))
            }

        }
        catch(err){
            console.log(err)
        }

        navv(`/display/${personality}`)

        return personality;
    };

    return (
        <div className='w-full min-h-screen flex flex-col items-center justify-center'>

    <h1 className='text-lg mt-50'>Please take your time to answer the qustions below to find your personality</h1>
        <div className='w-[70%] h-fit flex flex-col gap-8 mt-50'>

            {myers_questions.map((question) => (
    <div
        key={question.id}
        className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition duration-200"
    >
        {/* Question */}
        <div className='flex items-center gap-4 mb-4'>
        <p className='text-lg font-bold text-black'>{question.id}.</p>
        <h1 className='text-lg font-semibold text-black'>{question.text}</h1>
        </div>

        {/* Options */}
        <div className='ml-4 space-y-3'>
        {question.options.map((opt, index) => (
            <label
            key={index}
            className={`${answers[question.id]?.label === opt.label 
    ? "bg-blue-100" 
    : "bg-gray-50"
    } text-black flex items-center gap-3 cursor-pointer p-3 rounded-md border border-transparent hover:border-gray-300 hover:bg-gray-100 transition`}

            >
            <input
                type="radio"
                name={`q-${question.id}`}
                checked={answers[question.id]?.label === opt.label}
                onChange={() => handleSelect(question.id, opt)}
                className="accent-blue-500 h-4 w-4"
            />
            <span className='text-black'>{opt.label}</span>
            </label>
        ))}
        </div>

    </div>
    ))}


            <button
            onClick={calculatePersonality}
            className='bg-blue-500 text-white px-6 py-2 rounded-md mb-100'
            >
            Submit
            </button>

        </div>

        </div>
    );
    };

    export default PersonalityChecker;
