import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getListTopic } from "../../services/topicServices";
function Topic() {
    const [topics, setTopics] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListTopic();
            setTopics(response)
        }
        fetchApi();

    }, [])
    // console.log(topics)

    return (
        <>
            <h2>Danh sách chủ đề</h2>
            <table className="simple-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Tên chủ đề</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {topics.map(item => (
                        <tr key={item.id}>
                            <td>
                                {item.id}
                            </td>
                            <td>
                                {item.name}
                            </td>
                            <td>
                                <Link to={'/quiz/' + item.id}><button>Làm bài</button></Link>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </>
    )
}
export default Topic;