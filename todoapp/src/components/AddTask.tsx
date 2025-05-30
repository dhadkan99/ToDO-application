"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface Props {
  onAdd: (text: string, date: string) => void;
}

export default function AddTask({ onAdd }: Props) {
  const [text, setText] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSubmit = () => {
    if (!text.trim()) {
      toast.error(" Task cannot be empty");
      return;
    }
    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }

    const fullDate = new Date(selectedDate);
    if (fullDate.getTime() < Date.now() - 60000) {
      toast.error(" Date cannot be in the past");
      return;
    }

    onAdd(text.trim(), fullDate.toISOString());
    setText("");
    setSelectedDate(null);
    setShowCalendar(false);
    toast.success(" Task added!");
  };

  return (
    <div className="flex flex-wrap gap-3 items-center justify-center mb-6 w-full max-w-2xl">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 min-w-[220px] px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 max-w-sm"
      />

      <div className="relative">
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition"
          title="Select date"
        >
          <Calendar className="w-5 h-5" />
        </button>

        {showCalendar && (
          <div className="absolute top-12 left-0 z-50 bg-white text-black p-3 rounded-xl shadow-xl border border-gray-200">
            <DayPicker
              mode="single"
              selected={selectedDate ?? undefined}
              onSelect={(date: Date | undefined) => {
                if (date) {
                  setSelectedDate(date);
                  setShowCalendar(false);
                }
              }}
              modifiersClassNames={{
                selected: "!bg-purple-600 !text-white",
                today: "font-bold text-purple-700",
              }}
              className="rounded-lg"
            />
          </div>
        )}
      </div>

      <button
        onClick={handleSubmit}
        className="px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
      >
        +
      </button>

      {selectedDate && (
        <p className="text-white text-sm font-medium mt-2 w-full text-center">
          📅 Selected: {format(selectedDate, "PPP")}
        </p>
      )}
    </div>
  );
}
