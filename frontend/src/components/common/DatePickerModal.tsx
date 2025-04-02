import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerModal = ({ onClose, startDate, setStartDate, endDate, setEndDate }: any) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
        <h2 className="text-xl font-semibold">Select dates</h2>
        <p className="text-sm text-gray-500">Add your travel dates for exact pricing</p>

        <div className="flex gap-3 mt-4">
          <div className="border p-2 rounded-lg w-1/2">
            <label className="text-xs text-gray-500">CHECK-IN</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="DD/MM/YYYY"
              className="w-full outline-none"
            />
          </div>

          <div className="border p-2 rounded-lg w-1/2">
            <label className="text-xs text-gray-500">CHECKOUT</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="Add date"
              className="w-full outline-none"
            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-5">
          <button onClick={() => { setStartDate(null); setEndDate(null); }} className="text-gray-500">
            Clear dates
          </button>
          <button onClick={onClose} className="bg-black text-white px-4 py-2 rounded-lg">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatePickerModal