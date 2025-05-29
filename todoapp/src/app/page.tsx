import Image from "next/image";
import AddTask from "../components/AddTask";
import TodoList from "../components/ToDOList";

export default function Home() {
  return (
   <main className='max-w-4xl mx-auto'>
    <div className='text-center my-5'>
    <p className='text-slate-500'>Please add to the list below to keep track of your tasks</p>
      <h1 className='text-2xl font-bold'>To DO List</h1> 
      <AddTask />
      <TodoList/>

      
    </div>
    <div className='flex justify-center'></div>
   </main>
  )
   
}
