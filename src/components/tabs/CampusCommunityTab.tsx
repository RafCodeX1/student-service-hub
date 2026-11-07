import React, { useState } from 'react';
import { CampusFacility, CampusEvent, StudyGroup } from '../../types/student';
import {
  MapPin,
  Calendar,
  Users,
  Compass,
  Check,
  Plus,
  Clock,
  Search,
  Filter,
  Sparkles,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CampusCommunityTabProps {
  facilities: CampusFacility[];
  events: CampusEvent[];
  studyGroups: StudyGroup[];
  onToggleRsvp: (eventId: string) => void;
  onToggleJoinGroup: (groupId: string) => void;
  onOpenCreateGroup: () => void;
}

export const CampusCommunityTab: React.FC<CampusCommunityTabProps> = ({
  facilities,
  events,
  studyGroups,
  onToggleRsvp,
  onToggleJoinGroup,
  onOpenCreateGroup,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'map' | 'events' | 'groups'>('map');
  const [facilityTypeFilter, setFacilityTypeFilter] = useState<string>('all');
  const [selectedFacility, setSelectedFacility] = useState<CampusFacility | null>(facilities[0] || null);
  const [groupSearchQuery, setGroupSearchQuery] = useState<string>('');

  const filteredFacilities = facilityTypeFilter === 'all'
    ? facilities
    : facilities.filter(f => f.type === facilityTypeFilter);

  const filteredGroups = studyGroups.filter(g =>
    g.courseCode.toLowerCase().includes(groupSearchQuery.toLowerCase()) ||
    g.topic.toLowerCase().includes(groupSearchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 pb-20">
      {/* Subtab Segmented Control */}
      <div className="p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl flex items-center gap-1">
        <button
          onClick={() => setActiveSubTab('map')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'map'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          Live Campus Map
        </button>
        <button
          onClick={() => setActiveSubTab('events')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'events'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          Events
        </button>
        <button
          onClick={() => setActiveSubTab('groups')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'groups'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          Study Groups
        </button>
      </div>

      {/* 1. CAMPUS FACILITY DIRECTORY & INTERACTIVE MAP */}
      {activeSubTab === 'map' && (
        <div className="space-y-3">
          {/* Facility Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {[
              { id: 'all', label: 'All Facilities' },
              { id: 'library', label: 'Libraries' },
              { id: 'study_lounge', label: 'Study Lounges' },
              { id: 'lab', label: 'Labs' },
              { id: 'dining', label: 'Dining' },
              { id: 'health_clinic', label: 'Health' },
            ].map(type => (
              <button
                key={type.id}
                onClick={() => setFacilityTypeFilter(type.id)}
                className={`py-1.5 px-2.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  facilityTypeFilter === type.id
                    ? 'bg-slate-900 text-white dark:bg-indigo-600'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Interactive 2D Campus Map Simulation */}
          <div className="relative w-full h-56 bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-inner">
            {/* Campus Map Background Graphic: stylized pathways and quads */}
            <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="campus-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#campus-grid)" />
              {/* Paths */}
              <path d="M 20 80 Q 150 120 300 100 T 400 160" fill="none" stroke="rgba(99,102,241,0.3)" strokeWidth="8" />
              <path d="M 120 10 L 180 200" fill="none" stroke="rgba(99,102,241,0.25)" strokeWidth="6" />
              <ellipse cx="50%" cy="45%" rx="60" ry="35" fill="rgba(16,185,129,0.12)" stroke="rgba(16,185,129,0.3)" strokeWidth="2" />
            </svg>

            {/* Central Quad Marker */}
            <div className="absolute top-[42%] left-[45%] text-[10px] font-bold text-emerald-400/80 uppercase tracking-widest pointer-events-none">
              Memorial Quad
            </div>

            {/* Interactive Facility Pins on Map */}
            {filteredFacilities.map(fac => {
              const isSelected = selectedFacility?.id === fac.id;
              const occColor = fac.currentOccupancy > 80
                ? 'bg-rose-500'
                : fac.currentOccupancy > 50
                ? 'bg-amber-500'
                : 'bg-emerald-500';

              return (
                <button
                  key={fac.id}
                  onClick={() => setSelectedFacility(fac)}
                  style={{ top: `${fac.coordinates.y}%`, left: `${fac.coordinates.x}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full transition-transform duration-200 z-10 ${
                    isSelected ? 'scale-125 ring-4 ring-indigo-400 bg-white' : 'scale-100 hover:scale-110 bg-slate-800'
                  }`}
                  title={`${fac.name} (${fac.currentOccupancy}% occupied)`}
                >
                  <span className={`w-3 h-3 rounded-full block ${occColor}`} />
                </button>
              );
            })}

            {/* Map Legend Floating Tag */}
            <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-lg text-[10px] text-slate-300 font-mono flex items-center gap-2">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                &lt;50%
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                50-80%
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                &gt;80%
              </span>
            </div>
          </div>

          {/* Selected Facility Details Card */}
          {selectedFacility && (
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-xs">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider font-mono">
                    <span>{selectedFacility.type.replace('_', ' ')}</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-500 font-normal">{selectedFacility.quietLevel} zone</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                    {selectedFacility.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">{selectedFacility.building}</p>
                </div>

                {/* Occupancy Gauge */}
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1.5 font-mono text-sm font-bold tabular-nums">
                    <span className={
                      selectedFacility.currentOccupancy > 80
                        ? 'text-rose-600 dark:text-rose-400'
                        : selectedFacility.currentOccupancy > 50
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-emerald-600 dark:text-emerald-400'
                    }>
                      {selectedFacility.currentOccupancy}%
                    </span>
                    <span className="text-xs text-slate-400">Full</span>
                  </div>
                  <div className="w-20 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-1 ml-auto">
                    <div
                      className={`h-full rounded-full ${
                        selectedFacility.currentOccupancy > 80
                          ? 'bg-rose-500'
                          : selectedFacility.currentOccupancy > 50
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${selectedFacility.currentOccupancy}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 font-mono">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{selectedFacility.hours}</span>
              </div>

              {/* Amenities */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1.5">
                {selectedFacility.amenities.map(a => (
                  <span
                    key={a}
                    className="text-[11px] text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. CAMPUS EVENT CALENDAR */}
      {activeSubTab === 'events' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Upcoming Campus Events</h3>
            <span className="text-xs text-slate-500 font-mono">This Week</span>
          </div>

          <div className="space-y-2.5">
            {events.map(event => (
              <div
                key={event.id}
                className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2 shadow-xs"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                      <span>{event.category.toUpperCase()}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-500 font-normal">{event.organizer}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {event.title}
                    </h4>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {event.description}
                </p>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div className="space-y-0.5 text-slate-500 font-mono text-[11px]">
                    <div>{event.date} · {event.time}</div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {event.location}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onToggleRsvp(event.id);
                      if (!event.isUserRsvp) {
                        confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
                      }
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                      event.isUserRsvp
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {event.isUserRsvp ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        RSVP’d ({event.rsvpCount})
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        RSVP ({event.rsvpCount})
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. PEER STUDY GROUP FINDER */}
      {activeSubTab === 'groups' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Peer Study Circles</h3>
              <p className="text-xs text-slate-500">Collaborate with students in your courses</p>
            </div>
            <button
              onClick={onOpenCreateGroup}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Create Group
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={groupSearchQuery}
              onChange={e => setGroupSearchQuery(e.target.value)}
              placeholder="Search by course code (e.g. CS 106, MATH) or topic..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2.5">
            {filteredGroups.map(group => (
              <div
                key={group.id}
                className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2 shadow-xs"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                        {group.courseCode}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs text-slate-500">{group.courseName}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                      {group.topic}
                    </h4>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">
                    {group.membersCount}/{group.maxMembers} spots
                  </span>
                </div>

                <div className="text-xs text-slate-500 font-mono space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{group.meetingTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{group.location}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">Host: {group.hostName}</span>
                  <button
                    onClick={() => {
                      onToggleJoinGroup(group.id);
                      if (!group.isJoined) {
                        confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
                      }
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      group.isJoined
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {group.isJoined ? 'Joined · Leave' : 'Join Study Circle'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
