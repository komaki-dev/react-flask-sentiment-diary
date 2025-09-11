import InputForm from "./InputForm";
import "./App.css";
import ResultDisplay from "./ResultDisplay";
import ResultChart from "./ResultChart";
import ChartTypeButtons from "./ChartTypeButtons";

const DisplayPage = ({
  messageInput,
  setMessageInput,
  handleSend,
  result,
  chartType,
  setChartType,
  handleRead,
}) => {
  return (
    <div>
      <div>
        <InputForm
          messageInput={messageInput}
          setMessageInput={setMessageInput}
          onSend={handleSend}
          handleRead={handleRead}
        />
      </div>

      {result && (
        <>
          <ResultDisplay result={result} />
          <ChartTypeButtons chartType={chartType} setChartType={setChartType} />

          {chartType !== "none" && (
            <ResultChart result={result} chartType={chartType} />
          )}
        </>
      )}
    </div>
  );
};

export default DisplayPage;
