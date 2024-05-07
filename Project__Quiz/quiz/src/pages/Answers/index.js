import { useEffect, useState } from "react";
import { getAnswersByUserId } from "../../services/AnswersService";
import { getListTopic } from "../../services/topicServices";
import { Link } from "react-router-dom";

function Answers() {
    const [ dataAnswers, setDataAnswers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // Lấy các câu trả lời theo ID người dùng
            const answersByUserId = await getAnswersByUserId();
            // Lấy danh sách các chủ đề
            const topic = await getListTopic();
            // Kết hợp các câu trả lời với các chủ đề
            let result = [];
            for (let i = 0; i < answersByUserId.length; i++) {
                result.push({  
                     // eslint-disable-next-line
                    ...topic.find(item => item.id == answersByUserId[i].topicId), 
                    ...answersByUserId[i]
                });
            } 
            setDataAnswers(result.reverse());

        };

        fetchData();
    }, []);
    
    // console.log(dataAnswers);

    return (
        <div>
            <h2>Danh sách bài tập đã làm</h2>
            <table className="simple-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Tên chủ đề</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {dataAnswers.map(item => (
                        <tr key={item.id}>
                            <td>
                                {item.id}
                            </td>
                            <td>
                                {item.name}
                            </td>
                            <td>
                                <Link to={'/result/' + item.id}><button>Xem chi tiết</button></Link>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
}

export default Answers;
