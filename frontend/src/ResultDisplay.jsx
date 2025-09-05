const ResultDisplay = ({result}) => {
  return (
    <div>
      <label>ポジネガ判定結果</label>
      {result && (
        <div>
          <p>全体の判定：{result.summary}</p>
          <p>
            {result.detail.map((item, index) => (
              <span key={index}>
                「{item.message}」→ {item.label} ({item.score.toFixed(1)}){" "}
                <br />
              </span>
            ))}
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
