import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnswer } from "../../services/AnswersService";
import { getListQuestion } from "../../services/questionServices";

function Result() {
    const params = useParams();
    const [dataResult, setDataResult] = useState([]); 
    
   
    useEffect(() => {
        const fetchAppi = async () => {
            const dataAnswers = await getAnswer(params.id)
            const dataQuestions = await getListQuestion(dataAnswers.topicId);

            // console.log(dataAnswers.answer);
            // console.log(dataQuestions);
          
            const resultFinal = [];
            for (let i = 0; i < dataQuestions.length; i++) {
                resultFinal.push({
                    ...dataQuestions[i],
                    ...dataAnswers.answer.find((item => item.questionId == dataQuestions[i].id)),
                })
            }
            setDataResult(resultFinal);
        }
        fetchAppi();
    }, [])
    // console.log(dataResult);
 
    return (
        <>
            <h1>Kết quả:  </h1>
            <div className="result__list">
                {dataResult.map((item, index) => (
                    <div className="result__item" key={item.id}>
                        <p>
                            Câu {index + 1}: {item.question}
                            {item.correctAnswer === item.answer ? (
                                <span className="result__tag result__tag--true">Đúng</span>
                            ) : (
                                <span className="result__tag result__tag--false">Sai</span>
                            )}
                        </p>
                        {item.answers.map((itemAns, indexAns) => {
                            let className = "";
                            let checked = false;
                            if (indexAns == item.correctAnswer) {
                                className += " result__item--correct";
                               
                            }
                            if (indexAns == item.answer) {
                                className += " result__item--selected";
                                checked = true;
                            }
                            return (
                                <div className={className} key={indexAns}>
                                    <input type="radio" checked={checked} disabled />
                                    <label className={className}>{itemAns}</label>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </>
    )
}
export default Result;