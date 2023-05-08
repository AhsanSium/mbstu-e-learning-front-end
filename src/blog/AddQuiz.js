import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { ToastContainer, toast } from "react-toastify";

const AddQuiz = ({ props }) => {
    //console.log(props.state);

    const [mcq, setMcq] = useState([]);

    const handleQuizSubmit = (e) => {
        e.preventDefault();
        console.log(e.currentTarget.id);
        if (e.currentTarget.id === 'quizForm') {
            //console.log(props);
            const formObj = {
                topic: e.currentTarget.topic.value,
                level: e.currentTarget.level.value,
                totalQuestions: mcq.length,
                perQuestionScore: e.currentTarget.perQuestionScore.value,
                questions: mcq
            }
            props.setState({
                quiz: formObj
            })

            toast.success("Quiz Added success");
        }

    }

    useEffect(() => {
        console.log("MCQ", mcq);
    }, [mcq]);

    const inputChangeHandler = (e) => {
        e.preventDefault();
        const responseBody = {};
        const formData = new FormData(e.currentTarget)
        formData.forEach((value, property) => responseBody[property] = value);
        console.log(responseBody)
        //Form submission happens here
        const choicesTaken = [responseBody.choice1, responseBody.choice2, responseBody.choice3, responseBody.choice4];
        setMcq((current) => {
            return [...current, {
                no: mcq.length + 1,
                question: responseBody.question,
                choices: choicesTaken,
                type: 'MCQs',
                correctAnswer: choicesTaken[responseBody.correctAnswer]
            }
            ]
        });
        // setMcq([{
        //     no: mcq.length,
        //     question: responseBody.question,
        //     choices: [responseBody.choice1, responseBody.choice2, responseBody.choice3, responseBody.choice4],
        //     type: 'MCQs',
        //     correctAnswer: responseBody.correctAnswer
        // }
        // ])


    }

    const deleteQuizFromState = (id) => {
        setMcq((oldArray) => {
            return oldArray.filter((i) => i.no !== id);
        })
        toast.info("Quiz Removed");
    }



    return (
        <div>
            <h3 className='text-center'>AddQuiz</h3>
            <ToastContainer />
            <form id='quizForm' onSubmit={(e) => handleQuizSubmit(e)}>
                <FormGroup>
                    <Label> Topic </Label>
                    <Input required type='text' name='topic' />

                </FormGroup>

                <FormGroup className='d-flex justify-content-between'>
                    <div className='w-50 mr-2'>
                        <Label> Level </Label>
                        <Input type='select' required name='level'>
                            <option value=''> Please Select ... </option>
                            <option value='beginner'> Beginner </option>
                            <option value='medium'> Medium </option>
                            <option value='advanced'> Advanced </option>
                        </Input>
                    </div>
                    <div className='w-50 ml-2'>
                        <Label> Per Question Score </Label>
                        <Input min="0" step="1" required type='number' name='perQuestionScore' />
                    </div>
                </FormGroup>

                <div className='row my-3'>
                    {
                        mcq.length > 0 && mcq.map((single) => {
                            return (
                                <div className='col-lg-3 col-md-4 col-sm-6 mt-2' key={single.no} >
                                    {/* <div className='d-flex justify-content-between'>
                                        <span className='h6'>{single.question}</span>
                                        <span style={{ cursor: 'pointer' }} className='btn-danger px-2' onClick={() => deleteQuizFromState(single.no)}>{"×"}</span>
                                    </div> */}
                                    <ul className='list-group'>
                                        <li className='h6 list-group-item'>{single.question}</li>
                                        <li className='list-group-item'><span style={{ cursor: 'pointer' }} className='w-100 btn-danger px-2' onClick={() => deleteQuizFromState(single.no)}>{"×"}</span></li>

                                        {
                                            single.choices.map(s => {
                                                return (<li className='list-group-item' key={s}> {single.choices.indexOf(s) + 1} {": "} {s}</li>)
                                            })
                                        }

                                        <li className='list-group-item'>
                                            <strong>Correct Answer:</strong>
                                            <br />
                                            {single.correctAnswer}
                                        </li>
                                    </ul>
                                </div>
                            )
                        })
                    }
                </div>

                <form id='addForm' onSubmit={(e) => inputChangeHandler(e)}>
                    <FormGroup className='p-3 border border-2 border-primary rounded'>
                        <Label> Question </Label>
                        <Input required type='text' name='question' />

                        <div className='d-flex justify-content-between'>
                            <div className='w-50 mr-2'>
                                <div>
                                    <Label> Choice 1 </Label>
                                    <Input required type='text' name='choice1' />
                                </div>
                                <div>
                                    <Label> Choice 2 </Label>
                                    <Input required type='text' name='choice2' />
                                </div>
                            </div>

                            <div className='w-50 ml-2'>
                                <div>
                                    <Label> Choice 3 </Label>
                                    <Input required type='text' name='choice3' />
                                </div>
                                <div>
                                    <Label> Choice 4 </Label>
                                    <Input required type='text' name='choice4' />
                                </div>
                            </div>

                        </div>
                        <div className=''>
                            <Label> Correct Answer </Label>
                            <Input type='select' required name='correctAnswer'>
                                <option value=''> Please Select ... </option>
                                <option value='0'> Choice 1 </option>
                                <option value='1'> Choice 2 </option>
                                <option value='2'> Choice 3 </option>
                                <option value='3'> Choice 4 </option>
                            </Input>
                        </div>

                        <div className='mt-2'>
                            <button className='btn btn-secondary' form='addForm' type='submit'> Add + </button>
                        </div>
                    </FormGroup>
                </form>
                <div className='mt-2'>
                    <button className='btn btn-primary' form='quizForm' type='submit'> Done </button>
                </div>
            </form>
        </div>
    )
}

export default AddQuiz;