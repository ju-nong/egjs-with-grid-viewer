import { Link } from "react-router-dom";

function Index() {
    return (
        <div>
            뭐여 아무데나 가셔
            <br />
            <Link to="/conveyer">Conveyer</Link>
            <br />
            <Link to="/flicking">Flicking</Link>
            <br />
            <Link to="/intro">Intro</Link>
        </div>
    );
}

export { Index as default };
