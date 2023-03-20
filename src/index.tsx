import { Link } from "react-router-dom";

function Index() {
    return (
        <div className="flex flex-col items-center">
            <h1 className="flex-1 pb-10">뭐여 아무데나 가셔</h1>
            <div className="flex gap-10">
                <Link to="/conveyer">Conveyer</Link>
                <Link to="/flicking">Flicking</Link>
                <Link to="/intro">Intro</Link>
            </div>
        </div>
    );
}

export { Index as default };
