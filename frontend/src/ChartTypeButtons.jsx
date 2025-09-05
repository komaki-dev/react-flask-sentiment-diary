const ChartTypeButtons = ({ chartType, setChartType }) => {
  const handleClick = (e) => {
    setChartType(e.target.name);
  };
  const buttonInfo = [
    { type: "bar", label: "棒グラフ" },
    { type: "line", label: "折れ線グラフ" },
    { type: "pie", label: "円グラフ" },
    { type: "none", label: "グラフ非表示" },
  ];

  return (
    <div>
      {buttonInfo.map(({ type, label }) => (
        <button
          key={type}
          name={type}
          onClick={handleClick}
          disabled={chartType === type}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default ChartTypeButtons;
