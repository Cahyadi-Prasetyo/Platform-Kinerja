"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardShell, {
  IconPlus,
  IconHome,
  IconLink,
  IconLinkSmall,
  IconCircle,
  IconSuccess,
  IconChartProject,
  IconCalendar,
  IconTrash,
  IconSearch,
  IconTuning,
  IconChevronDown,
  SidebarToggleButton,
} from '../components/DashboardShell';

// --- DATA STRUCTURES ---
interface QuickLink {
  id: string;
  title: string;
  url: string;
}

interface WorkItem {
  id: string;
  title: string;
  timestamp: string;
  completed: boolean;
  status: 'completed' | 'todo';
  assignees: string[]; // initials
  projectBadge?: 'chart' | 'calendar';
}

export default function Home() {
  const router = useRouter();

  // --- STATE MANAGEMENT ---
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Modals & Menu Popovers
  const [isNewItemModalOpen, setIsNewItemModalOpen] = useState(false);
  const [isAddLinkModalOpen, setIsAddLinkModalOpen] = useState(false);
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);

  // Widget & Filter states
  const [showGreeting, setShowGreeting] = useState(true);
  const [showQuicklinks, setShowQuicklinks] = useState(true);
  const [showRecents, setShowRecents] = useState(true);
  const [isManageWidgetsOpen, setIsManageWidgetsOpen] = useState(false);
  const [filterMode, setFilterMode] = useState<'all' | 'todo' | 'completed'>('all');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  
  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newId, setNewId] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Dashboard state
  const [quickLinks, setQuickLinks] = useState<QuickLink[]>([]);
  const [recents, setRecents] = useState<WorkItem[]>([]);
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string } | null>(null);

  // Sync quickLinks and recents with localStorage
  useEffect(() => {
    const rawUser = localStorage.getItem('user');
    if (rawUser) {
      setCurrentUser(JSON.parse(rawUser));
    }

    if (typeof window !== 'undefined') {
      setShowGreeting(localStorage.getItem('widget-greeting') !== 'false');
      setShowQuicklinks(localStorage.getItem('widget-quicklinks') !== 'false');
      setShowRecents(localStorage.getItem('widget-recents') !== 'false');

      const storedLinks = localStorage.getItem('quicklinks');
      if (storedLinks) {
        setQuickLinks(JSON.parse(storedLinks));
      } else {
        const defaultLinks: QuickLink[] = [];
        localStorage.setItem('quicklinks', JSON.stringify(defaultLinks));
        setQuickLinks(defaultLinks);
      }

      const storedRecents = localStorage.getItem('recents');
      if (storedRecents) {
        setRecents(JSON.parse(storedRecents));
      } else {
        const defaultRecents: WorkItem[] = [
          {
            id: "MAGANGUMRA-130",
            title: "Melanjutkan konfigurasi dashboard dan pembuatan branch ba...",
            timestamp: "about 2 months ago",
            completed: true,
            status: "completed",
            assignees: ["CP", "PA"],
            projectBadge: 'chart'
          },
          {
            id: "MAGANGUMRA-36",
            title: "Brainstorming Terkait Variabel serta Penyusunan Sheets ...",
            timestamp: "about 2 months ago",
            completed: true,
            status: "completed",
            assignees: ["CP"],
            projectBadge: 'chart'
          },
          {
            id: "MAGANGUMRA-27",
            title: "Membuat Dashboard",
            timestamp: "about 2 months ago",
            completed: true,
            status: "completed",
            assignees: ["CP"],
            projectBadge: 'calendar'
          }
        ];
        localStorage.setItem('recents', JSON.stringify(defaultRecents));
        setRecents(defaultRecents);
      }
    }
  }, []);

  const saveQuickLinks = (links: QuickLink[]) => {
    setQuickLinks(links);
    localStorage.setItem('quicklinks', JSON.stringify(links));
  };

  const saveRecents = (items: WorkItem[]) => {
    setRecents(items);
    localStorage.setItem('recents', JSON.stringify(items));
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandMenuOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsCommandMenuOpen(false);
        setIsNewItemModalOpen(false);
        setIsAddLinkModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleCreateWorkItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      showToast('Work item title is required!');
      return;
    }
    const idString = newId.trim() ? newId.trim().toUpperCase() : `SIMANTAP-${recents.length + 100}`;
    const newItem: WorkItem = {
      id: idString,
      title: newTitle.trim(),
      timestamp: 'just now',
      completed: false,
      status: 'todo',
      assignees: [currentUser ? currentUser.name.slice(0, 2).toUpperCase() : 'CP'],
      projectBadge: 'chart'
    };
    const nextRecents = [newItem, ...recents];
    saveRecents(nextRecents);
    setIsNewItemModalOpen(false);
    setNewTitle('');
    setNewId('');
    showToast(`Work item ${idString} created successfully.`);
  };

  const handleAddQuickLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkTitle.trim() || !linkUrl.trim()) {
      showToast('Both title and URL are required!');
      return;
    }
    const newLink: QuickLink = {
      id: Date.now().toString(),
      title: linkTitle.trim(),
      url: linkUrl.trim().startsWith('http') ? linkUrl.trim() : `https://${linkUrl.trim()}`
    };
    const nextLinks = [...quickLinks, newLink];
    saveQuickLinks(nextLinks);
    setIsAddLinkModalOpen(false);
    setLinkTitle('');
    setLinkUrl('');
    showToast('Quicklink added successfully.');
  };

  const handleDeleteQuickLink = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const nextLinks = quickLinks.filter(link => link.id !== id);
    saveQuickLinks(nextLinks);
    showToast('Quicklink removed.');
  };

  const toggleWorkItemComplete = (id: string) => {
    const nextRecents = recents.map(item => {
      if (item.id === id) {
        const nextCompleted = !item.completed;
        showToast(nextCompleted ? `Marked ${id} as completed` : `Reopened ${id}`);
        return {
          ...item,
          completed: nextCompleted,
          status: nextCompleted ? 'completed' : 'todo' as 'completed' | 'todo'
        };
      }
      return item;
    });
    saveRecents(nextRecents);
  };

  const deleteWorkItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const nextRecents = recents.filter(item => item.id !== id);
    saveRecents(nextRecents);
    showToast(`Deleted ${id}`);
  };

  // Filter commands menu search results
  const commandResults = recents.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const userDisplayName = currentUser?.name || 'Cahyadi Prasetyo';

  const filteredRecents = recents.filter(item => {
    if (filterMode === 'todo') return !item.completed;
    if (filterMode === 'completed') return item.completed;
    return true;
  });

  const saveWidget = (key: string, val: boolean, setter: any) => {
    setter(val);
    localStorage.setItem(key, String(val));
  };

  return (
    <DashboardShell 
      onOpenNewItemModal={() => setIsNewItemModalOpen(true)}
      toastMessage={toastMessage}
      setToastMessage={setToastMessage}
    >
      <div className="flex-1 flex flex-col items-stretch">
        
        {/* Workspace Sub-header Bar */}
        <div className="h-9 px-4 border-b border-[#E5E7EB] bg-white flex items-center justify-between shrink-0 select-none">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6B7280]">
            <SidebarToggleButton />
            <IconHome />
            <span>Home</span>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setIsManageWidgetsOpen(prev => !prev)}
              className="h-6 px-2.5 rounded-[6px] border border-[#E5E7EB] hover:bg-[#F3F4F6] text-[11px] font-semibold text-[#6B7280] hover:text-[#111827] flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <IconTuning />
              <span>Manage widgets</span>
            </button>
            
            {isManageWidgetsOpen && (
              <div className="absolute right-0 mt-1 w-44 bg-white border border-[#E5E7EB] rounded-[6px] py-2 z-30 premium-popover text-left">
                <div className="px-3 py-1 text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider select-none">Toggle Widgets</div>
                <label className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#F9FAFB] cursor-pointer text-xs font-medium text-[#111827]">
                  <input 
                    type="checkbox" 
                    checked={showGreeting} 
                    onChange={(e) => saveWidget('widget-greeting', e.target.checked, setShowGreeting)}
                    className="rounded border-[#E5E7EB] text-[#0369A1] focus:ring-[#0369A1] w-3.5 h-3.5"
                  />
                  <span>Greeting Header</span>
                </label>
                <label className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#F9FAFB] cursor-pointer text-xs font-medium text-[#111827]">
                  <input 
                    type="checkbox" 
                    checked={showQuicklinks} 
                    onChange={(e) => saveWidget('widget-quicklinks', e.target.checked, setShowQuicklinks)}
                    className="rounded border-[#E5E7EB] text-[#0369A1] focus:ring-[#0369A1] w-3.5 h-3.5"
                  />
                  <span>Quicklinks</span>
                </label>
                <label className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#F9FAFB] cursor-pointer text-xs font-medium text-[#111827]">
                  <input 
                    type="checkbox" 
                    checked={showRecents} 
                    onChange={(e) => saveWidget('widget-recents', e.target.checked, setShowRecents)}
                    className="rounded border-[#E5E7EB] text-[#0369A1] focus:ring-[#0369A1] w-3.5 h-3.5"
                  />
                  <span>Recents</span>
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-[760px] w-full px-6 py-12 flex flex-col gap-10 mx-auto">
          
          {/* Center Greeting & Date Header */}
          {showGreeting && (
            <div className="text-center space-y-2 select-all animate-fadeIn">
              <h2 className="text-2xl font-semibold tracking-tight text-[#111827]">
                Good morning, {userDisplayName}
              </h2>
              <p className="text-xs text-[#6B7280] font-medium tracking-wide flex items-center justify-center gap-1">
                <span>🌤️</span>
                <span>Sunday, May 31 18:13</span>
              </p>
            </div>
          )}

          {/* Quicklinks Section */}
          {showQuicklinks && (
            <section className="space-y-3 animate-fadeIn">
              <div className="flex justify-between items-center select-none">
                <h3 className="text-sm font-semibold tracking-tight text-[#111827]">
                  Quicklinks
                </h3>
                <button 
                  onClick={() => setIsAddLinkModalOpen(true)}
                  className="h-7 px-2.5 rounded-[6px] border border-[#E5E7EB] hover:bg-[#F9FAFB] text-xs font-medium text-[#6B7280] hover:text-[#111827] flex items-center gap-1 cursor-pointer transition-colors keyboard-focus"
                >
                  <IconPlus />
                  <span>Add quick link</span>
                </button>
              </div>

              {quickLinks.length === 0 ? (
                /* Empty State Card */
                <div className="h-32 border border-[#E5E7EB] rounded-[6px] bg-[#F9FAFB] flex flex-col items-center justify-center text-center p-6 gap-2">
                  <div className="opacity-40">
                    <IconLink />
                  </div>
                  <p className="text-xs text-[#6B7280] max-w-[320px] font-medium leading-normal">
                    Keep important references, resources, or docs handy for your work
                  </p>
                </div>
              ) : (
                /* Quicklinks Grid view */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {quickLinks.map(link => (
                    <div 
                      key={link.id}
                      onClick={() => window.open(link.url, '_blank')}
                      className="group border border-[#E5E7EB] rounded-[6px] px-3.5 py-3 bg-[#F9FAFB] hover:bg-[#F3F4F6] flex items-center justify-between text-xs font-semibold cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-[#0369A1] shrink-0"><IconLinkSmall /></span>
                        <span className="truncate text-[#111827]">{link.title}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#9CA3AF] font-mono select-all hidden group-hover:inline truncate max-w-[120px]">
                          {link.url.replace(/^https?:\/\//, '')}
                        </span>
                        <button
                          onClick={(e) => handleDeleteQuickLink(link.id, e)}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-[#EF4444]/10 rounded text-[#EF4444] transition-opacity duration-75 cursor-pointer"
                          title="Remove link"
                        >
                          <IconTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Recents Section */}
          {showRecents && (
            <section className="space-y-3 animate-fadeIn">
              <div className="flex justify-between items-center select-none">
                <h3 className="text-sm font-semibold tracking-tight text-[#111827]">
                  Recents
                </h3>
                <div className="relative">
                  <button 
                    onClick={() => setIsFilterDropdownOpen(prev => !prev)}
                    className="h-6 px-2.5 rounded-[6px] border border-[#E5E7EB] hover:bg-[#F9FAFB] text-[11px] font-semibold text-[#6B7280] hover:text-[#111827] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>{filterMode === 'all' ? 'All' : filterMode === 'todo' ? 'To-do' : 'Completed'}</span>
                    <IconChevronDown />
                  </button>

                  {isFilterDropdownOpen && (
                    <div className="absolute right-0 mt-1 w-32 bg-white border border-[#E5E7EB] rounded-[6px] py-1 z-30 premium-popover text-left">
                      {(['all', 'todo', 'completed'] as const).map(mode => (
                        <button
                          key={mode}
                          onClick={() => {
                            setFilterMode(mode);
                            setIsFilterDropdownOpen(false);
                            showToast(`Filtered recents: ${mode}`);
                          }}
                          className="w-full px-3 py-1.5 hover:bg-[#F9FAFB] text-xs font-semibold text-[#111827] text-left"
                        >
                          {mode === 'all' ? 'All' : mode === 'todo' ? 'To-do' : 'Completed'}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="border border-[#E5E7EB] rounded-[6px] divide-y divide-[#E5E7EB] bg-white overflow-hidden">
                {filteredRecents.length > 0 ? (
                  filteredRecents.map(item => (
                    <div 
                      key={item.id}
                      onClick={() => toggleWorkItemComplete(item.id)}
                      className={`group flex items-center justify-between h-[38px] px-3.5 hover:bg-[#F9FAFB] transition-colors cursor-pointer text-xs ${item.completed ? 'bg-white' : ''}`}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0 mr-4">
                        {/* Status Check Circle */}
                        <div className="shrink-0 flex items-center">
                          {item.completed ? <IconSuccess /> : <IconCircle />}
                        </div>

                        {/* Project Badge Indicator */}
                        {item.projectBadge && (
                          <div className="shrink-0 flex items-center">
                            {item.projectBadge === 'chart' ? <IconChartProject /> : <IconCalendar />}
                          </div>
                        )}

                        {/* ID Metrik */}
                        <span className="text-[11px] text-[#6B7280] font-mono shrink-0 select-all tracking-normal w-28">
                          {item.id}
                        </span>

                        {/* Ticket Title */}
                        <span className={`truncate font-medium text-[#111827] ${item.completed ? 'line-through text-[#9CA3AF]' : ''}`}>
                          {item.title}
                        </span>
                      </div>

                      {/* Right metadata and interactive tools */}
                      <div className="flex items-center gap-3 shrink-0 text-[#6B7280]">
                        
                        {/* Inline Actions (Show on hover) */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-75 flex items-center">
                          <button
                            onClick={(e) => deleteWorkItem(item.id, e)}
                            className="p-1 hover:bg-[#EF4444]/10 rounded text-[#EF4444] cursor-pointer"
                            title="Delete Item"
                          >
                            <IconTrash />
                          </button>
                        </div>

                        {/* Timestamp */}
                        <span className="text-[11px] text-[#9CA3AF] font-medium font-mono select-none">
                          {item.timestamp}
                        </span>

                        {/* Avatars */}
                        <div className="flex items-center -space-x-1 ml-1 select-none">
                          {item.assignees.map((init, index) => (
                            <div 
                              key={index}
                              className="w-4.5 h-4.5 rounded-full border border-white bg-[#0369A1] text-white flex items-center justify-center text-[7px] font-bold shrink-0"
                              title={`Assignee: ${init}`}
                            >
                              {init}
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  ))
                ) : (
                  <div className="py-6 text-center text-xs text-[#6B7280] select-none">
                    No recent work items found. Click "New work item" to create one.
                  </div>
                )}
              </div>
            </section>
          )}

        </div>

      </div>

      {/* ==========================================
          MODAL: CREATE NEW WORK ITEM
          ========================================== */}
      {isNewItemModalOpen && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-[1px] flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-[480px] bg-white border border-[#E5E7EB] rounded-[6px] flex flex-col premium-popover">
            
            {/* Modal Header */}
            <div className="h-10 px-4 border-b border-[#E5E7EB] flex items-center justify-between bg-[#F9FAFB] text-xs font-semibold text-[#6B7280] select-none">
              <span>Create Work Item</span>
              <button 
                onClick={() => setIsNewItemModalOpen(false)}
                className="hover:text-[#111827] text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateWorkItem} className="p-4 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Ticket ID (Optional)</label>
                <input 
                  type="text" 
                  placeholder="e.g. MAGANGUMRA-131"
                  value={newId}
                  onChange={(e) => setNewId(e.target.value)}
                  className="w-full h-8 px-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[6px] text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0369A1] transition-all font-medium text-[#111827]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Work Item Title</label>
                <input 
                  type="text" 
                  placeholder="What needs to be done?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full h-8 px-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[6px] text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0369A1] transition-all font-medium text-[#111827]"
                  required
                  autoFocus
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2 text-xs select-none">
                <button 
                  type="button"
                  onClick={() => setIsNewItemModalOpen(false)}
                  className="h-8 px-4 border border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#6B7280] hover:text-[#111827] rounded-[6px] cursor-pointer transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="h-8 px-4 bg-[#0369A1] hover:bg-[#0284C7] text-white rounded-[6px] cursor-pointer transition-colors font-semibold"
                >
                  Create
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ==========================================
          MODAL: ADD QUICK LINK
          ========================================== */}
      {isAddLinkModalOpen && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-[1px] flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-[480px] bg-white border border-[#E5E7EB] rounded-[6px] flex flex-col premium-popover">
            
            {/* Modal Header */}
            <div className="h-10 px-4 border-b border-[#E5E7EB] flex items-center justify-between bg-[#F9FAFB] text-xs font-semibold text-[#6B7280] select-none">
              <span>Add Quick Link</span>
              <button 
                onClick={() => setIsAddLinkModalOpen(false)}
                className="hover:text-[#111827] text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAddQuickLink} className="p-4 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Link Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Project Repository"
                  value={linkTitle}
                  onChange={(e) => setLinkTitle(e.target.value)}
                  className="w-full h-8 px-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[6px] text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0369A1] transition-all font-medium text-[#111827]"
                  required
                  autoFocus
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">URL</label>
                <input 
                  type="text" 
                  placeholder="e.g. github.com/username/project"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full h-8 px-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[6px] text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0369A1] transition-all font-medium text-[#111827]"
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2 text-xs select-none">
                <button 
                  type="button"
                  onClick={() => setIsAddLinkModalOpen(false)}
                  className="h-8 px-4 border border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#6B7280] hover:text-[#111827] rounded-[6px] cursor-pointer transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="h-8 px-4 bg-[#0369A1] hover:bg-[#0284C7] text-white rounded-[6px] cursor-pointer transition-colors font-semibold"
                >
                  Add Link
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </DashboardShell>
  );
}
