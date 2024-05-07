import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTopic } from "../../services/topicServices";
import { getListQuestion } from "../../services/questionServices";
import { getCookie } from "../../helpers/cookie";
import { createAnswer } from "../../services/quizService";

function Quiz() {
    const params = useParams();
    // console.log(params)
    const [dataTopic, setDataTopic] = useState(null); // Thay đổi từ [] sang null
    const [dataQuestions, setDataQuestions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getTopic(params.id);
            setDataTopic(response);
        }
        fetchApi();
    }, []) // Thêm params.id vào dependency array

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListQuestion(params.id);
            setDataQuestions(response);
        }
        fetchApi();
    }, []) // Thêm params.id vào dependency array

    // console.log(dataTopic);
    // console.log(dataQuestions);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(e);

        let selectedAnswers = [];
         for (let i = 0; i < e.target.elements.length ; i++) {
              if(e.target.elements[i].checked) {
                const name = e.target.elements[i].name;
                const value = e.target.elements[i].value;

                selectedAnswers.push({
                    questionId : parseInt(name),
                    answer : parseInt(value),
                }) 
              }
              
         }
        //  console.log(selectedAnswers);

         let option = {
            userId : parseInt(getCookie('id')),
            topicId : parseInt(params.id),
            answer : selectedAnswers
         }
          
         const response = await createAnswer(option);
         if(response) {
            navigate(`/result/${response.id}`)
         }
    }
    return (
        <>
            <h2>Bài Quiz chủ đề: {dataTopic && dataTopic.name}</h2> {/* Thay đổi cách kiểm tra dữ liệu topic */}
            {/* Kiểm tra dataQuestions có tồn tại và không rỗng trước khi map */}
            {dataQuestions && dataQuestions.length > 0 && (
                 <div className="form-quiz">
                    <form onSubmit={handleSubmit}>
                        {dataQuestions.map((item, index) => (
                            <div className="form-quiz__item" key={item.id}>
                                <p>Câu {index +1}: {item.question}</p>
                                {item.answers.map((itemAns, indexAns)=> (
                                    <div className="form-quiz__answers" key={indexAns}>
                                        <input type="radio" value={indexAns} name={item.id} id={`Quiz-${item.id}-${indexAns}`}/>
                                        <label htmlFor={`Quiz-${item.id}-${indexAns}`}>{itemAns}</label> 
                                    </div>
                                ))}
                            </div>
                        ))}
                        <button className="send" type="submit">
                            Nộp bài
                        </button>
                    </form>
                 </div>
            )}
        </>
    )
}
export default Quiz;
