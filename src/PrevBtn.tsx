import { useNavigate } from "react-router-dom";

function PrevBtn() {
    const navigate = useNavigate();
    return <button onClick={() => navigate(-1)}>어 뒤로가자</button>;
}

export { PrevBtn as default };
