const Explainer = ({ currentQuestion }) => {
    const reasons = [
        {
            id: 0,
            text: "Because if they are requesting a digital item, we want to send them to Libby and not waste their time.",
        },
        {
            id: 1,
            text: "Asked early to keep ineligible patrons from wasting their time"
        }];

    return (
        <div className="explainer">
            <h2>Why ask this now?</h2>
            {currentQuestion < reasons.length && <p>{reasons[currentQuestion].text}</p>}
        </div>
    )
}

export default Explainer;