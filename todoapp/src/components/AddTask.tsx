import { AiFillCheckCircle } from 'react-icons/ai';

const AddTask = () => {
  return (
    <form className="my-8 flex justify-center items-center gap-4">
      <input
        type="text"
        placeholder="Add a new task..."
        className="px-4 py-2 w-80 text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-6 py-2 flex items-center gap-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300"
      >
        <span>Add</span>
        <AiFillCheckCircle className="text-white text-lg" />
      </button>
    </form>
  );
};

export default AddTask;