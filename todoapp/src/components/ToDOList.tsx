'use client';

import { useState } from 'react';

const TodoList = () => {
  return <div className="overflow-x-auto p-4">
  <table className="min-w-full text-sm text-left text-gray-300 border border-gray-700">
    <thead className="text-xs uppercase bg-gray-800 text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">#</th>
        <th scope="col" className="px-6 py-3">Name</th>
        <th scope="col" className="px-6 py-3">Job</th>
        <th scope="col" className="px-6 py-3">Favorite Color</th>
      </tr>
    </thead>
    <tbody className="bg-gray-900 divide-y divide-gray-700">
      <tr>
        <td className="px-6 py-4">1</td>
        <td className="px-6 py-4">Cy Ganderton</td>
        <td className="px-6 py-4">Quality Control Specialist</td>
        <td className="px-6 py-4">Blue</td>
      </tr>
      <tr className="hover:bg-gray-800">
        <td className="px-6 py-4">2</td>
        <td className="px-6 py-4">Hart Hagerty</td>
        <td className="px-6 py-4">Desktop Support Technician</td>
        <td className="px-6 py-4">Purple</td>
      </tr>
      <tr>
        <td className="px-6 py-4">3</td>
        <td className="px-6 py-4">Brice Swyre</td>
        <td className="px-6 py-4">Tax Accountant</td>
        <td className="px-6 py-4">Red</td>
      </tr>
    </tbody>
  </table>
</div>
};

export default TodoList;
