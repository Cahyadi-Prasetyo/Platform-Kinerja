"use client";

import { useState, useEffect } from 'react';
import DashboardShell, {
  IconHome,
  IconShieldProject,
  SidebarToggleButton
} from '../../components/DashboardShell';

interface WorkItem {
  id: string;
  title: string;
  timestamp: string;
  completed: boolean;
  status: 'backlog' | 'todo' | 'inprogress' | 'completed' | 'cancelled';
  assignees: string[];
  priority?: 'none' | 'low' | 'medium' | 'high' | 'urgent';
  assigneeName?: string;
  labels?: string[];
  dueDate?: string;
  createdOn?: string;
  updatedOn?: string;
  projectName?: string;
  projectId?: string;
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'summary' | 'assigned' | 'created' | 'subscribed' | 'activity'>('summary');
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string } | null>(null);
  const [items, setItems] = useState<WorkItem[]>([]);

  useEffect(() => {
    const rawUser = localStorage.getItem('user');
    if (rawUser) {
      setCurrentUser(JSON.parse(rawUser));
    }

    if (typeof window !== 'undefined') {
      const storedProjects = localStorage.getItem('projects');
      let projectsList = [];
      if (storedProjects) {
        try {
          projectsList = JSON.parse(storedProjects);
        } catch (e) {
          projectsList = [{ id: 'magangumra', name: 'MAGANG UMRAH 2026' }];
        }
      } else {
        projectsList = [{ id: 'magangumra', name: 'MAGANG UMRAH 2026' }];
      }

      const allItems: WorkItem[] = [];
      projectsList.forEach((proj: any) => {
        const storageKey = proj.id === 'magangumra' ? 'recents' : `recents_${proj.id}`;
        const storedRecents = localStorage.getItem(storageKey);
        if (storedRecents) {
          try {
            const parsed = JSON.parse(storedRecents);
            if (Array.isArray(parsed)) {
              parsed.forEach((item: any) => {
                allItems.push({
                  ...item,
                  projectName: proj.name,
                  projectId: proj.id
                });
              });
            }
          } catch (e) {
            console.error(e);
          }
        } else if (proj.id === 'magangumra') {
          const defaultItems = [
            {
              id: "MAGANGUMRA-184",
              title: "Install Nitro PDF 14",
              timestamp: "just now",
              completed: true,
              status: "completed",
              priority: "low",
              assignees: ["CP", "PA"],
              assigneeName: "Cahyadi Prasetyo",
              labels: [],
              startDate: "Mar 13, 2026",
              dueDate: "Mar 13, 2026",
              createdOn: "Mar 13, 2026",
              projectName: "MAGANG UMRAH 2026",
              projectId: "magangumra"
            },
            {
              id: "MAGANGUMRA-183",
              title: "Melakukan responsivitas (mode mobile) website dashboard strategis Kepri",
              timestamp: "5 mins ago",
              completed: true,
              status: "completed",
              priority: "urgent",
              assignees: ["PR"],
              assigneeName: "prasetyo",
              labels: [],
              startDate: "Mar 05, 2026",
              dueDate: "Mar 05, 2026",
              createdOn: "Mar 06, 2026",
              projectName: "MAGANG UMRAH 2026",
              projectId: "magangumra"
            },
            {
              id: "MAGANGUMRA-182",
              title: "Melakukan penginstallan software pada pc di Lt3",
              timestamp: "10 mins ago",
              completed: true,
              status: "completed",
              priority: "high",
              assignees: ["CP", "PA"],
              assigneeName: "Cahyadi Prasetyo",
              labels: [],
              startDate: "Mar 05, 2026",
              dueDate: "Mar 05, 2026",
              createdOn: "Mar 05, 2026",
              projectName: "MAGANG UMRAH 2026",
              projectId: "magangumra"
            },
            {
              id: "MAGANGUMRA-181",
              title: "instalasi forticlient lt 2",
              timestamp: "15 mins ago",
              completed: true,
              status: "completed",
              priority: "medium",
              assignees: ["FI"],
              assigneeName: "fia magang",
              labels: [],
              startDate: "Mar 04, 2026",
              dueDate: "Mar 04, 2026",
              createdOn: "Mar 06, 2026",
              projectName: "MAGANG UMRAH 2026",
              projectId: "magangumra"
            },
            {
              id: "MAGANGUMRA-180",
              title: "Melakukan penambahan SSD dan RAM pada PC di ruangan kerja",
              timestamp: "20 mins ago",
              completed: true,
              status: "completed",
              priority: "medium",
              assignees: ["FL"],
              assigneeName: "fla magang",
              labels: [],
              startDate: "Mar 04, 2026",
              dueDate: "Mar 04, 2026",
              createdOn: "Mar 06, 2026",
              projectName: "MAGANG UMRAH 2026",
              projectId: "magangumra"
            },
            {
              id: "MAGANGUMRA-179",
              title: "Melakukan responsivitas (mode mobile) website dashboard strategis Kepri",
              timestamp: "25 mins ago",
              completed: true,
              status: "completed",
              priority: "urgent",
              assignees: ["PR"],
              assigneeName: "prasetyo",
              labels: [],
              startDate: "Mar 04, 2026",
              dueDate: "Mar 04, 2026",
              createdOn: "Mar 06, 2026",
              projectName: "MAGANG UMRAH 2026",
              projectId: "magangumra"
            },
            {
              id: "MAGANGUMRA-178",
              title: "Melakukan penginstallan software pada pc di Lab Komputer",
              timestamp: "30 mins ago",
              completed: true,
              status: "completed",
              priority: "high",
              assignees: ["CP", "PA"],
              assigneeName: "Cahyadi Prasetyo",
              labels: [],
              startDate: "Mar 04, 2026",
              dueDate: "Mar 04, 2026",
              createdOn: "Mar 06, 2026",
              projectName: "MAGANG UMRAH 2026",
              projectId: "magangumra"
            },
            {
              id: "MAGANGUMRA-177",
              title: "Troubleshooting terkait permasalahan jaringan di ruangan Sekretaris",
              timestamp: "35 mins ago",
              completed: true,
              status: "completed",
              priority: "high",
              assignees: ["PR"],
              assigneeName: "prasetyo",
              labels: [],
              startDate: "Mar 04, 2026",
              dueDate: "Mar 04, 2026",
              createdOn: "Mar 06, 2026",
              projectName: "MAGANG UMRAH 2026",
              projectId: "magangumra"
            },
            {
              id: "MAGANGUMRA-176",
              title: "Monitoring wifi Pada Lt 4 dan 3",
              timestamp: "40 mins ago",
              completed: true,
              status: "completed",
              priority: "low",
              assignees: ["CP", "PA"],
              assigneeName: "Cahyadi Prasetyo",
              labels: [],
              startDate: "Mar 04, 2026",
              dueDate: "Mar 04, 2026",
              createdOn: "Mar 06, 2026",
              projectName: "MAGANG UMRAH 2026",
              projectId: "magangumra"
            },
            {
              id: "MAGANGUMRA-175",
              title: "Revisi Layout dashboard map",
              timestamp: "45 mins ago",
              completed: true,
              status: "completed",
              priority: "urgent",
              assignees: ["CP", "PA"],
              assigneeName: "Cahyadi Prasetyo",
              labels: [],
              startDate: "Mar 03, 2026",
              dueDate: "Mar 03, 2026",
              createdOn: "Mar 06, 2026",
              projectName: "MAGANG UMRAH 2026",
              projectId: "magangumra"
            },
            {
              id: "MAGANGUMRA-174",
              title: "Deployment Aero ke VPS Magangers",
              timestamp: "50 mins ago",
              completed: true,
              status: "completed",
              priority: "high",
              assignees: ["AB"],
              assigneeName: "Aldil Baihaqi",
              labels: [],
              startDate: "Mar 03, 2026",
              dueDate: "Mar 03, 2026",
              createdOn: "Mar 06, 2026",
              projectName: "MAGANG UMRAH 2026",
              projectId: "magangumra"
            }
          ];
          defaultItems.forEach(item => allItems.push(item as any));
        }
      });
      setItems(allItems);
    }
  }, []);

  const userDisplayName = currentUser?.name || 'Cahyadi Prasetyo';
  const userInitials = userDisplayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const assignedItems = items.filter(item => {
    const isNameMatch = item.assigneeName?.toLowerCase().includes(userDisplayName.toLowerCase()) || 
                        userDisplayName.toLowerCase().includes(item.assigneeName?.toLowerCase() || '___');
    const isInitMatch = item.assignees?.includes(userInitials) || 
                        (userInitials === 'CP' && item.assignees?.includes('CP')) || 
                        (userInitials === 'PR' && item.assignees?.includes('PR'));
    return isNameMatch || isInitMatch;
  });

  const createdItems = assignedItems;

  const subscribedItems = items.filter(item => {
    const isAssigned = assignedItems.some(ai => ai.id === item.id);
    const isHighPriority = item.priority === 'urgent' || item.priority === 'high';
    return isAssigned || isHighPriority;
  });

  const backlogCount = assignedItems.filter(i => i.status === 'backlog').length;
  const todoCount = assignedItems.filter(i => i.status === 'todo').length;
  const inprogressCount = assignedItems.filter(i => i.status === 'inprogress').length;
  const completedCount = assignedItems.filter(i => i.status === 'completed' || i.status === 'done').length;
  const cancelledCount = assignedItems.filter(i => i.status === 'cancelled').length;

  const priorityHighCount = assignedItems.filter(i => i.priority === 'high' || i.priority === 'urgent').length;
  const priorityMediumCount = assignedItems.filter(i => i.priority === 'medium').length;
  const priorityLowCount = assignedItems.filter(i => i.priority === 'low' || i.priority === 'none' || !i.priority).length;

  const maxPriorityCount = Math.max(priorityHighCount, priorityMediumCount, priorityLowCount, 1);

  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case 'completed':
      case 'done':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs text-[#10B981] font-semibold">
            <svg className="w-4 h-4 text-[#10B981] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Completed
          </span>
        );
      case 'inprogress':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs text-orange-500 font-semibold">
            <svg className="w-4 h-4 text-orange-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="4" fill="currentColor" />
            </svg>
            In progress
          </span>
        );
      case 'todo':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs text-blue-500 font-semibold">
            <svg className="w-4 h-4 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="9" />
            </svg>
            Todo
          </span>
        );
      case 'backlog':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3">
              <circle cx="12" cy="12" r="9" />
            </svg>
            Backlog
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l4-4m0 4l-4-4" />
            </svg>
            Cancelled
          </span>
        );
    }
  };

  const PriorityBadge = ({ priority }: { priority: string }) => {
    switch (priority) {
      case 'urgent':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded bg-red-50 border border-red-200 text-[10px] font-bold uppercase tracking-wider text-red-700">
            Urgent
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded bg-red-50 border border-red-100 text-[10px] font-bold uppercase tracking-wider text-red-600">
            High
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded bg-yellow-50 border border-yellow-200 text-[10px] font-bold uppercase tracking-wider text-yellow-700">
            Medium
          </span>
        );
      case 'low':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-[10px] font-bold uppercase tracking-wider text-[#0369A1]">
            Low
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded bg-gray-50 border border-gray-200 text-[10px] font-bold uppercase tracking-wider text-gray-600">
            None
          </span>
        );
    }
  };

  const renderWorkItemsTable = (filtered: WorkItem[]) => {
    if (filtered.length === 0) {
      return (
        <div className="py-20 text-center text-xs text-[#9CA3AF] border border-dashed border-[#E5E7EB] rounded-lg select-none bg-white font-semibold">
          Tidak ada item pekerjaan.
        </div>
      );
    }

    return (
      <div className="border border-[#E5E7EB] rounded-lg bg-white overflow-hidden shadow-sm animate-fadeIn">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[#6B7280] font-bold select-none">
                <th className="px-4 py-3.5 w-36">ID</th>
                <th className="px-4 py-3.5">Judul</th>
                <th className="px-4 py-3.5 w-48">Projek</th>
                <th className="px-4 py-3.5 w-36">Status</th>
                <th className="px-4 py-3.5 w-32">Prioritas</th>
                <th className="px-4 py-3.5 w-36">Tenggat Waktu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] font-medium text-[#111827]">
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="px-4 py-3.5 font-mono text-[#0369A1]">{item.id}</td>
                  <td className="px-4 py-3.5 text-[13px] font-semibold text-[#111827]">{item.title}</td>
                  <td className="px-4 py-3.5 text-[#4B5563] font-semibold">{item.projectName || 'MAGANG UMRAH 2026'}</td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-4 py-3.5">
                    <PriorityBadge priority={item.priority || 'medium'} />
                  </td>
                  <td className="px-4 py-3.5 text-gray-500 font-mono">{item.dueDate || item.startDate || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const getMockActivities = () => {
    return [
      {
        timestamp: "Baru saja",
        action: "Anda sedang mengerjakan tugas",
        target: "Install Nitro PDF 14",
        project: "MAGANG UMRAH 2026"
      },
      {
        timestamp: "5 menit yang lalu",
        action: "Anda menyelesaikan tugas",
        target: "Melakukan responsivitas (mode mobile) website dashboard strategis Kepri",
        project: "MAGANG UMRAH 2026"
      },
      {
        timestamp: "10 menit yang lalu",
        action: "Anda menyelesaikan tugas",
        target: "Melakukan penginstallan software pada pc di Lt3",
        project: "MAGANG UMRAH 2026"
      },
      {
        timestamp: "3 hari yang lalu",
        action: "Anda membuat tugas baru",
        target: "Revisi Layout dashboard map",
        project: "MAGANG UMRAH 2026"
      },
      {
        timestamp: "Jan 12, 2026",
        action: "Anda bergabung dengan projek",
        target: "MAGANG UMRAH 2026",
        project: ""
      }
    ];
  };

  const userInitialsDisplay = userDisplayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

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
            {activeTab === 'summary' && (
              <div className="space-y-8 animate-fadeIn">
                
                {/* Overview Metrics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  <div className="border border-[#E5E7EB] rounded-[6px] bg-[#F9FAFB] p-5 flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider select-none">Work items created</span>
                    <span className="text-3xl font-bold text-[#111827] select-all font-sans">{createdItems.length}</span>
                  </div>

                  <div className="border border-[#E5E7EB] rounded-[6px] bg-[#F9FAFB] p-5 flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider select-none">Work items assigned</span>
                    <span className="text-3xl font-bold text-[#111827] select-all font-sans">{assignedItems.length}</span>
                  </div>

                  <div className="border border-[#E5E7EB] rounded-[6px] bg-[#F9FAFB] p-5 flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider select-none">Work items subscribed</span>
                    <span className="text-3xl font-bold text-[#111827] select-all font-sans">{subscribedItems.length}</span>
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
                      <span className="text-[#111827] font-bold">{backlogCount}</span>
                    </div>

                    <div className="border border-[#E5E7EB] bg-white rounded-[6px] px-3.5 py-3 flex items-center justify-between text-xs font-semibold select-none">
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-2.5 h-2.5 bg-blue-500 rounded-[2px] shrink-0" />
                        <span className="text-[#6B7280] truncate">Not started</span>
                      </div>
                      <span className="text-[#111827] font-bold">{todoCount}</span>
                    </div>

                    <div className="border border-[#E5E7EB] bg-white rounded-[6px] px-3.5 py-3 flex items-center justify-between text-xs font-semibold select-none">
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-2.5 h-2.5 bg-orange-500 rounded-[2px] shrink-0" />
                        <span className="text-[#6B7280] truncate">Working on</span>
                      </div>
                      <span className="text-[#111827] font-bold">{inprogressCount}</span>
                    </div>

                    <div className="border border-[#E5E7EB] bg-white rounded-[6px] px-3.5 py-3 flex items-center justify-between text-xs font-semibold select-none">
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-2.5 h-2.5 bg-[#10B981] rounded-[2px] shrink-0" />
                        <span className="text-[#6B7280] truncate">Completed</span>
                      </div>
                      <span className="text-[#111827] font-bold">{completedCount}</span>
                    </div>

                    <div className="border border-[#E5E7EB] bg-white rounded-[6px] px-3.5 py-3 flex items-center justify-between text-xs font-semibold select-none">
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-2.5 h-2.5 bg-red-500 rounded-[2px] shrink-0" />
                        <span className="text-[#6B7280] truncate">Canceled</span>
                      </div>
                      <span className="text-[#111827] font-bold">{cancelledCount}</span>
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
                        <span className="text-[10px] font-bold text-red-600 opacity-0 group-hover:opacity-100 transition-opacity font-mono">{priorityHighCount}</span>
                        <div className="w-8 bg-red-500 rounded-t-[3px] transition-all duration-300" style={{ height: `${(priorityHighCount / maxPriorityCount) * 100 + 10}px` }} />
                        <span className="text-[10px] font-semibold text-[#6B7280] mt-1 select-none">High</span>
                      </div>

                      {/* Bar 2: Medium */}
                      <div className="flex flex-col items-center gap-1.5 w-16 group">
                        <span className="text-[10px] font-bold text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity font-mono">{priorityMediumCount}</span>
                        <div className="w-8 bg-orange-500 rounded-t-[3px] transition-all duration-300" style={{ height: `${(priorityMediumCount / maxPriorityCount) * 100 + 10}px` }} />
                        <span className="text-[10px] font-semibold text-[#6B7280] mt-1 select-none">Medium</span>
                      </div>

                      {/* Bar 3: Low */}
                      <div className="flex flex-col items-center gap-1.5 w-16 group">
                        <span className="text-[10px] font-bold text-[#0369A1] opacity-0 group-hover:opacity-100 transition-opacity font-mono">{priorityLowCount}</span>
                        <div className="w-8 bg-[#0369A1] rounded-t-[3px] transition-all duration-300" style={{ height: `${(priorityLowCount / maxPriorityCount) * 100 + 10}px` }} />
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
                          
                          {/* Completed Segment */}
                          <circle 
                            cx="18" 
                            cy="18" 
                            r="15.915" 
                            fill="none" 
                            stroke="#10B981" 
                            strokeWidth="3.2" 
                            strokeDasharray={`${assignedItems.length > 0 ? (completedCount / assignedItems.length) * 100 : 0} ${assignedItems.length > 0 ? (1 - completedCount / assignedItems.length) * 100 : 100}`} 
                            strokeDashoffset="0" 
                            className="transition-all duration-300"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
                          <span className="text-lg font-bold text-[#111827]">{completedCount}</span>
                          <span className="text-[8px] font-bold text-[#9CA3AF] uppercase">Done</span>
                        </div>
                      </div>

                      {/* Donut Legend */}
                      <div className="space-y-1.5 text-[10px] font-semibold text-[#6B7280] select-none">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                          <span>Completed: {completedCount}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-orange-500" />
                          <span>Working on: {inprogressCount}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-blue-500" />
                          <span>Not started: {todoCount}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#9CA3AF]" />
                          <span>Backlog: {backlogCount}</span>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

              </div>
            )}

            {activeTab === 'assigned' && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider select-none">Tugas yang Ditugaskan ke Anda</h3>
                {renderWorkItemsTable(assignedItems)}
              </div>
            )}

            {activeTab === 'created' && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider select-none">Tugas yang Anda Buat</h3>
                {renderWorkItemsTable(createdItems)}
              </div>
            )}

            {activeTab === 'subscribed' && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider select-none">Tugas yang Anda Ikuti</h3>
                {renderWorkItemsTable(subscribedItems)}
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="space-y-6">
                <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider select-none">Aktivitas Terbaru</h3>
                <div className="border border-[#E5E7EB] rounded-lg bg-white p-6 shadow-sm animate-fadeIn">
                  <div className="relative border-l border-[#E5E7EB] ml-4 pl-6 space-y-8">
                    {getMockActivities().map((act, index) => (
                      <div key={index} className="relative">
                        {/* Timeline Dot */}
                        <span className="absolute -left-[30px] top-0.5 bg-white border border-[#0369A1] rounded-full w-4 h-4 flex items-center justify-center">
                          <span className="bg-[#0369A1] rounded-full w-1.5 h-1.5" />
                        </span>
                        
                        {/* Details */}
                        <div className="space-y-1 text-left">
                          <div className="text-[10px] font-bold text-[#9CA3AF] uppercase font-mono">
                            {act.timestamp}
                          </div>
                          <div className="text-[13px] font-bold text-gray-800 leading-normal">
                            {act.action}{' '}
                            {act.target && (
                              <span className="text-[#0369A1] font-bold hover:underline cursor-pointer">
                                {act.target}
                              </span>
                            )}
                          </div>
                          {act.project && (
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                              {act.project}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
