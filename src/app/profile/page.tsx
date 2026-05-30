"use client";

import { useState, useEffect } from 'react';
import DashboardShell, {
  IconHome,
  IconShieldProject,
  SidebarToggleButton
} from '../../components/DashboardShell';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'summary' | 'assigned' | 'created' | 'subscribed' | 'activity'>('summary');
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string } | null>(null);

  useEffect(() => {
    const rawUser = localStorage.getItem('user');
    if (rawUser) {
      setCurrentUser(JSON.parse(rawUser));
    }
  }, []);

  const userDisplayName = currentUser?.name || 'Cahyadi Prasetyo';
  const userInitials = userDisplayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <DashboardShell>
      <div className="flex-1 flex flex-col items-stretch">
        
        {/* Workspace Sub-header Bar */}
        <div className="h-9 px-4 border-b border-[#E5E7EB] bg-white flex items-center justify-start shrink-0 select-none">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6B7280]">
            <SidebarToggleButton />
            <IconHome />
            <span>Profile & Analytics</span>
          </div>
        </div>

        {/* Outer Split Layout Container */}
        <div className="flex-1 flex flex-col md:flex-row overflow-y-auto">
          
          {/* LEFT AREA: Analytics Dashboard (70%) */}
          <div className="flex-1 p-6 md:p-8 space-y-8 max-w-[840px]">
            
            {/* Header Tabs */}
            <div className="border-b border-[#E5E7EB] select-none flex items-center gap-6 text-xs font-semibold text-[#6B7280]">
              {[
                { id: 'summary', label: 'Summary' },
                { id: 'assigned', label: 'Assigned' },
                { id: 'created', label: 'Created' },
                { id: 'subscribed', label: 'Subscribed' },
                { id: 'activity', label: 'Activity' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3 relative transition-colors cursor-pointer ${activeTab === tab.id ? 'text-[#111827] font-bold border-b-2 border-[#0369A1] -mb-[2px]' : 'hover:text-[#111827]'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content for active tab Summary */}
            {activeTab === 'summary' ? (
              <div className="space-y-8 animate-fadeIn">
                
                {/* Overview Metrics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  <div className="border border-[#E5E7EB] rounded-[6px] bg-[#F9FAFB] p-5 flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider select-none">Work items created</span>
                    <span className="text-3xl font-bold text-[#111827] select-all font-sans">63</span>
                  </div>

                  <div className="border border-[#E5E7EB] rounded-[6px] bg-[#F9FAFB] p-5 flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider select-none">Work items assigned</span>
                    <span className="text-3xl font-bold text-[#111827] select-all font-sans">108</span>
                  </div>

                  <div className="border border-[#E5E7EB] rounded-[6px] bg-[#F9FAFB] p-5 flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider select-none">Work items subscribed</span>
                    <span className="text-3xl font-bold text-[#111827] select-all font-sans">129</span>
                  </div>

                </div>

                {/* Workload Status Section */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider select-none">Workload Overview</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    
                    <div className="border border-[#E5E7EB] bg-white rounded-[6px] px-3.5 py-3 flex items-center justify-between text-xs font-semibold select-none">
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-2.5 h-2.5 bg-[#9CA3AF] rounded-[2px] shrink-0" />
                        <span className="text-[#6B7280] truncate">Backlog</span>
                      </div>
                      <span className="text-[#111827] font-bold">0</span>
                    </div>

                    <div className="border border-[#E5E7EB] bg-white rounded-[6px] px-3.5 py-3 flex items-center justify-between text-xs font-semibold select-none">
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-2.5 h-2.5 bg-blue-500 rounded-[2px] shrink-0" />
                        <span className="text-[#6B7280] truncate">Not started</span>
                      </div>
                      <span className="text-[#111827] font-bold">0</span>
                    </div>

                    <div className="border border-[#E5E7EB] bg-white rounded-[6px] px-3.5 py-3 flex items-center justify-between text-xs font-semibold select-none">
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-2.5 h-2.5 bg-orange-500 rounded-[2px] shrink-0" />
                        <span className="text-[#6B7280] truncate">Working on</span>
                      </div>
                      <span className="text-[#111827] font-bold">0</span>
                    </div>

                    <div className="border border-[#E5E7EB] bg-white rounded-[6px] px-3.5 py-3 flex items-center justify-between text-xs font-semibold select-none">
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-2.5 h-2.5 bg-[#10B981] rounded-[2px] shrink-0" />
                        <span className="text-[#6B7280] truncate">Completed</span>
                      </div>
                      <span className="text-[#111827] font-bold">108</span>
                    </div>

                    <div className="border border-[#E5E7EB] bg-white rounded-[6px] px-3.5 py-3 flex items-center justify-between text-xs font-semibold select-none">
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-2.5 h-2.5 bg-red-500 rounded-[2px] shrink-0" />
                        <span className="text-[#6B7280] truncate">Canceled</span>
                      </div>
                      <span className="text-[#111827] font-bold">0</span>
                    </div>

                  </div>
                </div>

                {/* Charts Panels */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Chart 1: Priority Bar Chart */}
                  <div className="border border-[#E5E7EB] bg-white rounded-[6px] p-5 space-y-4">
                    <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider select-none">Work items by Priority</span>
                    <div className="h-44 w-full flex items-end justify-around pb-2 border-b border-[#E5E7EB] relative">
                      
                      {/* Bar 1: High */}
                      <div className="flex flex-col items-center gap-1.5 w-16 group">
                        <span className="text-[10px] font-bold text-red-600 opacity-0 group-hover:opacity-100 transition-opacity font-mono">18</span>
                        <div className="w-8 bg-red-500 rounded-t-[3px] transition-all duration-300" style={{ height: '36px' }} />
                        <span className="text-[10px] font-semibold text-[#6B7280] mt-1 select-none">High</span>
                      </div>

                      {/* Bar 2: Medium */}
                      <div className="flex flex-col items-center gap-1.5 w-16 group">
                        <span className="text-[10px] font-bold text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity font-mono">42</span>
                        <div className="w-8 bg-orange-500 rounded-t-[3px] transition-all duration-300" style={{ height: '84px' }} />
                        <span className="text-[10px] font-semibold text-[#6B7280] mt-1 select-none">Medium</span>
                      </div>

                      {/* Bar 3: Low */}
                      <div className="flex flex-col items-center gap-1.5 w-16 group">
                        <span className="text-[10px] font-bold text-[#0369A1] opacity-0 group-hover:opacity-100 transition-opacity font-mono">48</span>
                        <div className="w-8 bg-[#0369A1] rounded-t-[3px] transition-all duration-300" style={{ height: '96px' }} />
                        <span className="text-[10px] font-semibold text-[#6B7280] mt-1 select-none">Low</span>
                      </div>

                    </div>
                  </div>

                  {/* Chart 2: State Donut Chart */}
                  <div className="border border-[#E5E7EB] bg-white rounded-[6px] p-5 space-y-4">
                    <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider select-none">Work items by state</span>
                    <div className="h-44 w-full flex items-center justify-center gap-6">
                      
                      {/* SVG Donut */}
                      <div className="relative w-28 h-28">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          {/* Background Ring */}
                          <circle cx="18" cy="18" r="15.915" fill="none" stroke="#F3F4F6" strokeWidth="3" />
                          
                          {/* Completed Segment (108 items ~ 100% in mockup) */}
                          <circle 
                            cx="18" 
                            cy="18" 
                            r="15.915" 
                            fill="none" 
                            stroke="#10B981" 
                            strokeWidth="3.2" 
                            strokeDasharray="100 0" 
                            strokeDashoffset="0" 
                            className="transition-all duration-300"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
                          <span className="text-lg font-bold text-[#111827]">108</span>
                          <span className="text-[8px] font-bold text-[#9CA3AF] uppercase">Done</span>
                        </div>
                      </div>

                      {/* Donut Legend */}
                      <div className="space-y-1.5 text-[10px] font-semibold text-[#6B7280] select-none">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                          <span>Completed: 108</span>
                        </div>
                        <div className="flex items-center gap-1.5 opacity-50">
                          <span className="w-2 h-2 rounded-full bg-blue-500" />
                          <span>In Progress: 0</span>
                        </div>
                        <div className="flex items-center gap-1.5 opacity-50">
                          <span className="w-2 h-2 rounded-full bg-orange-500" />
                          <span>Todo: 0</span>
                        </div>
                        <div className="flex items-center gap-1.5 opacity-50">
                          <span className="w-2 h-2 rounded-full bg-[#9CA3AF]" />
                          <span>Backlog: 0</span>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

              </div>
            ) : (
              <div className="py-20 text-center text-xs text-[#9CA3AF] select-none">
                Details for tab "{activeTab.toUpperCase()}" are loading...
              </div>
            )}

          </div>

          {/* RIGHT AREA: User Profile Section (30%) */}
          <div className="w-full md:w-[300px] border-t md:border-t-0 md:border-l border-[#E5E7EB] bg-white flex flex-col shrink-0">
            
            {/* Banner Cover Image (Geometric flat gradient) */}
            <div className="h-28 w-full bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] relative select-none">
              <div className="absolute inset-0 opacity-15 bg-dot-pattern" />
            </div>

            {/* Avatar block overlapping cover */}
            <div className="px-6 pb-6 relative flex flex-col items-stretch">
              
              {/* Overlapping Avatar */}
              <div className="w-18 h-18 rounded-full border-4 border-white bg-[#0369A1] text-white flex items-center justify-center font-bold text-xl select-none -mt-9 shadow-sm">
                {userInitials}
              </div>

              {/* Name Details */}
              <div className="mt-3 select-all">
                <h4 className="text-sm font-bold text-[#111827]">{userDisplayName}</h4>
                <p className="text-[11px] font-semibold text-[#6B7280]">@prasetyo</p>
              </div>

              {/* Description bio */}
              <p className="text-xs text-[#4B5563] mt-3 leading-relaxed font-medium select-none">
                Professional software development and team performance lead. Focuses on minimal, data-driven systems engineering.
              </p>

              {/* Profile Meta info */}
              <div className="mt-4 pt-4 border-t border-[#E5E7EB] space-y-2 text-xs font-semibold text-[#6B7280] select-none">
                <div className="flex items-center justify-between">
                  <span>Joined on</span>
                  <span className="text-[#111827]">Jan 12, 2026</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Timezone</span>
                  <span className="text-[#111827]">17:44 UTC</span>
                </div>
              </div>

              {/* Projects completion progress list */}
              <div className="mt-6 pt-6 border-t border-[#E5E7EB] space-y-3">
                <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider select-none">Projects</span>
                
                <div className="border border-[#E5E7EB] rounded-[6px] px-3 py-2.5 bg-[#F9FAFB] flex items-center justify-between text-xs font-semibold select-none">
                  <div className="flex items-center gap-2 truncate">
                    <IconShieldProject />
                    <span className="text-[#111827] truncate">MAGANG UMRAH 2026</span>
                  </div>
                  <span className="text-[10px] bg-green-50 text-green-700 font-bold px-1.5 py-0.5 rounded border border-green-200">
                    99%
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </DashboardShell>
  );
}
