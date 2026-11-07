import React, { useState } from 'react';
import { StudyGroup, Course } from '../../types/student';
import { X, Users, MapPin, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CreateStudyGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  onCreateGroup: (group: StudyGroup) => void;
}

export const CreateStudyGroupModal: React.FC<CreateStudyGroupModalProps> = ({
  isOpen,
  onClose,
  courses,
  onCreateGroup,
}) => {
  const [selectedCourse, setSelectedCourse] = useState<Course>(courses[0]);
  const [topic, setTopic] = useState<string>('');
  const [meetingTime, setMeetingTime] = useState<string>('Tomorrow at 4:00 PM');
  const [location, setLocation] = useState<string>('Bancroft Library 3rd Floor Pod B');
  const [maxMembers, setMaxMembers] = useState<number>(5);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) return;

    const newGroup: StudyGroup = {
      id: `grp-${Date.now()}`,
      courseCode: selectedCourse.code,
      courseName: selectedCourse.name,
      topic,
      meetingTime,
      location,
      membersCount: 1,
      maxMembers,
      hostName: 'Maya Chen (You)',
      isJoined: true,
      tags: ['Study Circle', 'Exam Prep'],
    };

    onCreateGroup(newGroup);
    confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Host Peer Study Circle</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Course
            </label>
            <select
              value={selectedCourse.id}
              onChange={e => {
                const found = courses.find(c => c.id === e.target.value);
                if (found) setSelectedCourse(found);
              }}
              className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            >
              {courses.map(c => (
                <option key={c.id} value={c.id}>
                  {c.code} · {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Study Goal / Topic Focus
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Midterm 2 Practice Problems & Cheat Sheet"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Meeting Time & Date
            </label>
            <input
              type="text"
              value={meetingTime}
              onChange={e => setMeetingTime(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Campus Location / Pod
            </label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Member Limit
            </label>
            <input
              type="number"
              min="2"
              max="10"
              value={maxMembers}
              onChange={e => setMaxMembers(Number(e.target.value))}
              className="w-full p-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono"
            />
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors"
            >
              Publish Study Circle
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-xl hover:bg-slate-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
