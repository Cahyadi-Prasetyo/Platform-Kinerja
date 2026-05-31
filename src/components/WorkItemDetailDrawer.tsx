"use client";

import React, { useState, useEffect, useRef } from 'react';

// Interfaces match page.tsx WorkItem
export interface CommentItem {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export interface ActivityItem {
  id: string;
  type: 'create' | 'assignee' | 'comment' | 'status' | 'other';
  author: string;
  text: string;
  timestamp: string;
}

interface WorkItem {
  id: string;
  title: string;
  timestamp: string;
  completed: boolean;
  status: 'backlog' | 'todo' | 'inprogress' | 'completed' | 'cancelled';
  assignees: string[];
  projectBadge?: 'chart' | 'calendar';
  dateRange?: string;
  priority?: 'none' | 'low' | 'medium' | 'high' | 'urgent';
  assigneeName?: string;
  labels?: string[];
  dueDate?: string;
  createdOn?: string;
  updatedOn?: string;
  linksCount?: number;
  attachmentsCount?: number;
  startDate?: string;
  description?: string;
  parentId?: string;
  comments?: CommentItem[];
  activities?: ActivityItem[];
}

interface WorkItemDetailDrawerProps {
  item: WorkItem;
  onClose: () => void;
  allItems: WorkItem[];
  onUpdateItem: (updated: WorkItem) => void;
  showToast: (msg: string) => void;
}

// Sub-component SVGs for clean look
const IconCloseArrow = () => (
  <svg className="w-4 h-4 text-[#4B5563]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

// const IconExpand = () => (
//   <svg className="w-4 h-4 text-[#4B5563]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
//   </svg>
// );

// const IconSplit = () => (
//   <svg className="w-4 h-4 text-[#4B5563]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
//   </svg>
// );

const IconBell = () => (
  <svg className="w-3.5 h-3.5 text-[#4B5563]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const IconLink = () => (
  <svg className="w-3.5 h-3.5 text-[#4B5563]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

const IconDots = () => (
  <svg className="w-4 h-4 text-[#4B5563]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="5" r="1" fill="currentColor" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
    <circle cx="12" cy="19" r="1" fill="currentColor" />
  </svg>
);

const IconSubtask = () => (
  <svg className="w-3.5 h-3.5 text-[#4B5563]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 10a2 2 0 00-2-2H8a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-8z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h4m-4 4h4" />
  </svg>
);

const IconRelation = () => (
  <svg className="w-3.5 h-3.5 text-[#4B5563]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4-4m-4 4l4 4" />
  </svg>
);

const IconPaperclip = () => (
  <svg className="w-3.5 h-3.5 text-[#4B5563]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
  </svg>
);

const IconCalendar = () => (
  <svg className="w-3.5 h-3.5 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

// Standard priority chart icons inside drawer
const IconPriorityNone = () => (
  <svg className="w-3.5 h-3.5 text-[#9CA3AF]" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1">
    <rect x="1" y="8" width="2" height="3" rx="0.5" />
    <rect x="5" y="5" width="2" height="6" rx="0.5" />
    <rect x="9" y="2" width="2" height="9" rx="0.5" />
  </svg>
);

const IconPriorityLow = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 12 12">
    <rect x="1" y="8" width="2" height="3" rx="0.5" fill="#3B82F6" />
    <rect x="5" y="5" width="2" height="6" rx="0.5" fill="#E5E7EB" />
    <rect x="9" y="2" width="2" height="9" rx="0.5" fill="#E5E7EB" />
  </svg>
);

const IconPriorityMedium = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 12 12">
    <rect x="1" y="8" width="2" height="3" rx="0.5" fill="#EAB308" />
    <rect x="5" y="5" width="2" height="6" rx="0.5" fill="#EAB308" />
    <rect x="9" y="2" width="2" height="9" rx="0.5" fill="#E5E7EB" />
  </svg>
);

const IconPriorityHigh = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 12 12">
    <rect x="1" y="8" width="2" height="3" rx="0.5" fill="#EF4444" />
    <rect x="5" y="5" width="2" height="6" rx="0.5" fill="#EF4444" />
    <rect x="9" y="2" width="2" height="9" rx="0.5" fill="#EF4444" />
  </svg>
);

const IconPriorityUrgent = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 12 12">
    <rect x="1" y="8" width="2" height="3" rx="0.5" fill="#B91C1C" />
    <rect x="5" y="5" width="2" height="6" rx="0.5" fill="#B91C1C" />
    <rect x="9" y="2" width="2" height="9" rx="0.5" fill="#B91C1C" />
    <rect x="0.5" y="0.5" width="11" height="11" rx="1.5" fill="none" stroke="#B91C1C" strokeWidth="1" className="opacity-50" />
  </svg>
);

export default function WorkItemDetailDrawer({
  item,
  onClose,
  allItems,
  onUpdateItem,
  showToast,
}: WorkItemDetailDrawerProps) {
  // Localized user state from localStorage
  const [currentUser, setCurrentUser] = useState({ name: 'Aidil Baihaqi' });
  
  // Field editing states
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title);
  
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [editedDesc, setEditedDesc] = useState(item.description || '');

  // Comment composer state
  const [commentText, setCommentText] = useState('');

  // Dropdown popover active toggles
  const [activePopover, setActivePopover] = useState<'status' | 'assignee' | 'priority' | 'parent' | 'labels' | null>(null);

  // Native Date Ref Bindings for Properties
  const startPickerRef = useRef<HTMLInputElement>(null);
  const duePickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const rawUser = localStorage.getItem('user');
    if (rawUser) {
      try {
        setCurrentUser(JSON.parse(rawUser));
      } catch (e) {}
    }
  }, []);

  // Sync edits on item switch
  useEffect(() => {
    setEditedTitle(item.title);
    setEditedDesc(item.description || '');
    setActivePopover(null);
  }, [item]);

  // Click outside to close helper popovers
  useEffect(() => {
    const handleOutside = () => setActivePopover(null);
    window.addEventListener('click', handleOutside);
    return () => window.removeEventListener('click', handleOutside);
  }, []);

  // Set default creation logs if not existing
  const getActivitiesList = (): ActivityItem[] => {
    if (item.activities && item.activities.length > 0) {
      return item.activities;
    }
    const defaults: ActivityItem[] = [
      {
        id: 'act-create',
        type: 'create',
        author: 'Aidil Baihaqi',
        text: 'created the work item.',
        timestamp: '5 months ago'
      }
    ];
    if (item.assignees && item.assignees.length > 0) {
      defaults.push({
        id: 'act-asg',
        type: 'assignee',
        author: 'Aidil Baihaqi',
        text: `added a new assignee ${item.assigneeName || item.assignees.join(', ')}.`,
        timestamp: '5 months ago'
      });
    }
    return defaults;
  };

  const activities = getActivitiesList();

  // Save changes wrapper
  const handleUpdate = (updates: Partial<WorkItem>) => {
    onUpdateItem({
      ...item,
      ...updates
    });
  };

  // Title Save
  const handleSaveTitle = () => {
    if (editedTitle.trim() && editedTitle !== item.title) {
      handleUpdate({ title: editedTitle.trim() });
      showToast('Title updated');
    }
    setIsEditingTitle(false);
  };

  // Description Save
  const handleSaveDesc = () => {
    handleUpdate({ description: editedDesc.trim() || undefined });
    setIsEditingDesc(false);
    showToast('Description updated');
  };

  // Comment Save
  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: CommentItem = {
      id: `comment-${Date.now()}`,
      author: currentUser.name,
      text: commentText.trim(),
      timestamp: 'just now'
    };

    const newActivity: ActivityItem = {
      id: `activity-${Date.now()}`,
      type: 'comment',
      author: currentUser.name,
      text: `added a comment: "${commentText.trim()}"`,
      timestamp: 'just now'
    };

    const updatedComments = [...(item.comments || []), newComment];
    const updatedActivities = [...activities, newActivity];

    onUpdateItem({
      ...item,
      comments: updatedComments,
      activities: updatedActivities
    });

    setCommentText('');
    showToast('Comment added');
  };

  // Helper date formatter from page.tsx
  const formatDateToReadable = (dateStr: string) => {
    if (!dateStr || dateStr === 'Start date' || dateStr === 'Due date' || dateStr === '-') return dateStr;
    if (/^[A-Za-z]{3} \d{1,2}, \d{4}$/.test(dateStr)) return dateStr;
    const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (match) {
      const y = match[1];
      const m = parseInt(match[2], 10) - 1;
      const d = parseInt(match[3], 10);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[m]} ${d}, ${y}`;
    }
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const formatDateToInput = (dateStr: string) => {
    if (!dateStr || dateStr === 'Start date' || dateStr === 'Due date' || dateStr === '-') return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
    const months = {
      Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
      Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
    } as any;
    const match = dateStr.match(/^([A-Za-z]{3}) (\d{1,2}), (\d{4})$/);
    if (match) {
      const m = months[match[1]] || '01';
      const d = match[2].padStart(2, '0');
      const y = match[3];
      return `${y}-${m}-${d}`;
    }
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  // Avatar Initials builder
  const getInitials = (name: string) => {
    if (!name || name === 'Unassigned') return '?';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/10 z-40 backdrop-blur-[1px]"
      />

      {/* Drawer Container */}
      <div className="fixed top-0 right-0 bottom-0 w-[650px] bg-white border-l border-[#E5E7EB] z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-out transform translate-x-0">
        
        {/* Header toolbar */}
        <div className="h-11 px-4 border-b border-[#E5E7EB] flex items-center justify-between shrink-0 bg-white select-none">
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="p-1 hover:bg-[#F3F4F6] rounded-md transition-colors cursor-pointer"
              title="Close Panel"
            >
              <IconCloseArrow />
            </button>
            {/* <button className="p-1 hover:bg-[#F3F4F6] rounded-md transition-colors cursor-pointer" title="Expand view">
              <IconExpand />
            </button>
            <button className="p-1 hover:bg-[#F3F4F6] rounded-md transition-colors cursor-pointer" title="Split layout">
              <IconSplit />
            </button> */}
          </div>

          <div className="flex items-center gap-1.5">
            {/* <button className="h-7 px-3 border border-[#E5E7EB] hover:bg-[#F9FAFB] text-xs font-semibold text-[#374151] rounded-[6px] flex items-center gap-1.5 cursor-pointer bg-white transition-colors">
              <IconBell />
              <span>Subscribe</span>
            </button> */}
            <button 
              onClick={() => {
                navigator.clipboard.writeText(window.location.origin + `/projects?item=${item.id}`);
                showToast('Link copied to clipboard!');
              }}
              className="p-1.5 border border-[#E5E7EB] hover:bg-[#F9FAFB] rounded-[6px] cursor-pointer bg-white transition-colors"
              title="Copy task link"
            >
              <IconLink />
            </button>
            {/* <button className="p-1.5 border border-[#E5E7EB] hover:bg-[#F9FAFB] rounded-[6px] cursor-pointer bg-white transition-colors" title="Actions menu">
              <IconDots />
            </button> */}
          </div>
        </div>

        {/* Scrollable details body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          
          {/* ID and Title */}
          <div className="space-y-1.5">
            <div className="text-[10px] font-mono text-[#6B7280] font-bold uppercase tracking-wider select-all">
              {item.id}
            </div>
            {isEditingTitle ? (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onBlur={handleSaveTitle}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveTitle();
                  if (e.key === 'Escape') {
                    setEditedTitle(item.title);
                    setIsEditingTitle(false);
                  }
                }}
                className="w-full text-[20px] font-bold text-[#111827] border border-[#0284C7] rounded-[6px] px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#0284C7]"
                autoFocus
              />
            ) : (
              <h1 
                onClick={() => setIsEditingTitle(true)}
                className="text-[20px] font-bold text-[#111827] leading-snug cursor-text hover:bg-slate-50 rounded px-1 -mx-1"
                title="Click to edit title"
              >
                {item.title}
              </h1>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="flex items-center gap-1 text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider select-none">
              <span>Description</span>
            </div>
            {isEditingDesc ? (
              <div className="space-y-2">
                <textarea
                  value={editedDesc}
                  onChange={(e) => setEditedDesc(e.target.value)}
                  placeholder="Add details and notes..."
                  className="w-full min-h-[100px] border border-[#E5E7EB] rounded-[6px] p-2.5 text-xs text-[#374151] focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7]"
                />
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleSaveDesc}
                    className="h-7 px-3 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-semibold rounded-[6px] cursor-pointer transition-colors"
                  >
                    Save
                  </button>
                  <button 
                    onClick={() => {
                      setEditedDesc(item.description || '');
                      setIsEditingDesc(false);
                    }}
                    className="h-7 px-3 border border-[#E5E7EB] hover:bg-[#F9FAFB] text-xs font-semibold text-[#374151] rounded-[6px] cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div 
                onClick={() => setIsEditingDesc(true)}
                className={`text-xs p-2 -mx-2 rounded hover:bg-slate-50 cursor-text min-h-[40px] leading-relaxed ${item.description ? 'text-[#374151]' : 'text-[#9CA3AF] italic'}`}
              >
                {item.description || 'Click to add description...'}
              </div>
            )}
          </div>

          {/* Toolbar actions */}
          <div className="flex flex-wrap items-center gap-2 select-none border-b border-[#F3F4F6] pb-5">
            {/* <button className="h-7 px-2.5 border border-[#E5E7EB] hover:bg-[#F9FAFB] text-xs font-semibold text-[#374151] rounded-[6px] flex items-center gap-1.5 cursor-pointer bg-white transition-colors">
              <IconSubtask />
              <span>Add sub-work item</span>
            </button> */}
            {/* <button className="h-7 px-2.5 border border-[#E5E7EB] hover:bg-[#F9FAFB] text-xs font-semibold text-[#374151] rounded-[6px] flex items-center gap-1.5 cursor-pointer bg-white transition-colors">
              <IconRelation />
              <span>Add relation</span>
            </button> */}
            <button 
              onClick={() => {
                const updatedCount = (item.linksCount || 0) + 1;
                handleUpdate({ linksCount: updatedCount });
                showToast('Link added');
              }}
              className="h-7 px-2.5 border border-[#E5E7EB] hover:bg-[#F9FAFB] text-xs font-semibold text-[#374151] rounded-[6px] flex items-center gap-1.5 cursor-pointer bg-white transition-colors"
            >
              <IconLink />
              <span>Add link ({item.linksCount || 0})</span>
            </button>
            <button 
              onClick={() => {
                const updatedCount = (item.attachmentsCount || 0) + 1;
                handleUpdate({ attachmentsCount: updatedCount });
                showToast('Attachment added');
              }}
              className="h-7 px-2.5 border border-[#E5E7EB] hover:bg-[#F9FAFB] text-xs font-semibold text-[#374151] rounded-[6px] flex items-center gap-1.5 cursor-pointer bg-white transition-colors"
            >
              <IconPaperclip />
              <span>Attach ({item.attachmentsCount || 0})</span>
            </button>
          </div>

          {/* Properties Grid */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider select-none">Properties</h3>
            <div className="grid grid-cols-[150px_1fr] gap-y-3.5 text-xs align-middle">
              
              {/* 1. State */}
              <div className="text-[#6B7280] font-medium flex items-center gap-2 select-none">
                <svg className="w-3.5 h-3.5 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /></svg>
                <span>State</span>
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePopover(prev => prev === 'status' ? null : 'status');
                  }}
                  className="flex items-center gap-1.5 hover:bg-[#F3F4F6] px-2 py-1 rounded-[6px] cursor-pointer text-[#111827] font-semibold border border-transparent hover:border-[#E5E7EB] bg-white transition-all"
                >
                  <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                  <span className="capitalize">{item.status === 'completed' ? 'Done' : item.status === 'inprogress' ? 'In Progress' : item.status}</span>
                </button>
                {activePopover === 'status' && (
                  <div className="absolute left-0 mt-1 w-40 bg-white border border-[#E5E7EB] rounded-[6px] py-1 z-50 premium-popover shadow-md" onClick={(e) => e.stopPropagation()}>
                    {(['backlog', 'todo', 'inprogress', 'completed', 'cancelled'] as const).map(st => (
                      <button
                        key={st}
                        onClick={() => {
                          handleUpdate({ status: st, completed: st === 'completed' });
                          setActivePopover(null);
                          showToast(`Status updated to ${st}`);
                        }}
                        className="w-full text-left px-3 py-1.5 hover:bg-[#F9FAFB] text-xs text-[#111827] flex items-center justify-between"
                      >
                        <span className="capitalize">{st === 'completed' ? 'Done' : st}</span>
                        {item.status === st && <span className="text-[#0284C7] font-bold">✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. Assignees */}
              <div className="text-[#6B7280] font-medium flex items-center gap-2 select-none">
                <svg className="w-3.5 h-3.5 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                <span>Assignees</span>
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePopover(prev => prev === 'assignee' ? null : 'assignee');
                  }}
                  className="flex items-center gap-2 hover:bg-[#F3F4F6] px-2 py-1 rounded-[6px] cursor-pointer border border-transparent hover:border-[#E5E7EB] bg-white transition-all"
                >
                  <div className="w-5 h-5 rounded-full bg-[#0369A1] text-white flex items-center justify-center text-[8px] font-bold shrink-0">
                    {getInitials(item.assigneeName || 'Unassigned')}
                  </div>
                  <span className="font-semibold text-[#111827]">{item.assigneeName || 'Unassigned'}</span>
                </button>
                {activePopover === 'assignee' && (
                  <div className="absolute left-0 mt-1 w-44 bg-white border border-[#E5E7EB] rounded-[6px] py-1 z-50 premium-popover shadow-md" onClick={(e) => e.stopPropagation()}>
                    {[
                      'Cahyadi Prasetyo', 'Putra Adhi', 'prasetyo', 'fia magang', 'fla magang', 'Aldil Baihaqi'
                    ].map(name => (
                      <button
                        key={name}
                        onClick={() => {
                          const code = name.split(' ').map(n => n[0]).join('').toUpperCase();
                          handleUpdate({
                            assignees: [code],
                            assigneeName: name
                          });
                          setActivePopover(null);
                          showToast(`Assigned to ${name}`);
                        }}
                        className="w-full text-left px-3 py-1.5 hover:bg-[#F9FAFB] text-xs text-[#111827] flex items-center justify-between"
                      >
                        <span>{name}</span>
                        {item.assigneeName === name && <span className="text-[#0284C7] font-bold">✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. Priority */}
              <div className="text-[#6B7280] font-medium flex items-center gap-2 select-none">
                <svg className="w-3.5 h-3.5 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <span>Priority</span>
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePopover(prev => prev === 'priority' ? null : 'priority');
                  }}
                  className="flex items-center gap-2 hover:bg-[#F3F4F6] px-2 py-1 rounded-[6px] cursor-pointer border border-transparent hover:border-[#E5E7EB] bg-white transition-all font-semibold text-[#111827]"
                >
                  {item.priority === 'urgent' && <IconPriorityUrgent />}
                  {item.priority === 'high' && <IconPriorityHigh />}
                  {item.priority === 'medium' && <IconPriorityMedium />}
                  {item.priority === 'low' && <IconPriorityLow />}
                  {(!item.priority || item.priority === 'none') && <IconPriorityNone />}
                  <span className="capitalize">{item.priority || 'None'}</span>
                </button>
                {activePopover === 'priority' && (
                  <div className="absolute left-0 mt-1 w-40 bg-white border border-[#E5E7EB] rounded-[6px] py-1 z-50 premium-popover shadow-md" onClick={(e) => e.stopPropagation()}>
                    {(['none', 'low', 'medium', 'high', 'urgent'] as const).map(pr => (
                      <button
                        key={pr}
                        onClick={() => {
                          handleUpdate({ priority: pr });
                          setActivePopover(null);
                          showToast(`Priority set to ${pr}`);
                        }}
                        className="w-full text-left px-3 py-1.5 hover:bg-[#F9FAFB] text-xs text-[#111827] flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          {pr === 'low' && <IconPriorityLow />}
                          {pr === 'medium' && <IconPriorityMedium />}
                          {pr === 'high' && <IconPriorityHigh />}
                          {pr === 'urgent' && <IconPriorityUrgent />}
                          {pr === 'none' && <IconPriorityNone />}
                          <span className="capitalize">{pr}</span>
                        </div>
                        {item.priority === pr && <span className="text-[#0284C7] font-bold">✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. Created by */}
              <div className="text-[#6B7280] font-medium flex items-center gap-2 select-none">
                <svg className="w-3.5 h-3.5 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Created by</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1 select-none">
                <div className="w-5 h-5 rounded-full bg-slate-500 text-white flex items-center justify-center text-[8px] font-bold shrink-0">
                  AB
                </div>
                <span className="font-semibold text-[#4B5563]">Aidil Baihaqi</span>
              </div>

              {/* 5. Start Date */}
              <div className="text-[#6B7280] font-medium flex items-center gap-2 select-none">
                <IconCalendar />
                <span>Start date</span>
              </div>
              <div className="relative flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => startPickerRef.current?.showPicker()}
                  className="flex items-center gap-1.5 hover:bg-[#F3F4F6] px-2 py-1 rounded-[6px] cursor-pointer border border-transparent hover:border-[#E5E7EB] bg-white transition-all text-[#111827] font-semibold"
                >
                  {item.startDate && item.startDate !== '-' ? item.startDate : 'Add start date'}
                </button>
                <input
                  ref={startPickerRef}
                  type="date"
                  value={formatDateToInput(item.startDate || '')}
                  onChange={(e) => {
                    const val = e.target.value;
                    const readable = val ? formatDateToReadable(val) : '-';
                    handleUpdate({
                      startDate: readable,
                      dateRange: readable !== '-' && item.dueDate && item.dueDate !== '-' ? `${readable.split(',')[0]} - ${item.dueDate.split(',')[0]}, 2026` : item.dateRange
                    });
                    showToast('Start date updated');
                  }}
                  className="absolute inset-0 opacity-0 pointer-events-none"
                />
              </div>

              {/* 6. Due Date */}
              <div className="text-[#6B7280] font-medium flex items-center gap-2 select-none">
                <IconCalendar />
                <span>Due date</span>
              </div>
              <div className="relative flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => duePickerRef.current?.showPicker()}
                  className="flex items-center gap-1.5 hover:bg-[#F3F4F6] px-2 py-1 rounded-[6px] cursor-pointer border border-transparent hover:border-[#E5E7EB] bg-white transition-all text-[#111827] font-semibold"
                >
                  {item.dueDate && item.dueDate !== '-' ? item.dueDate : 'Add due date'}
                </button>
                <input
                  ref={duePickerRef}
                  type="date"
                  value={formatDateToInput(item.dueDate || '')}
                  onChange={(e) => {
                    const val = e.target.value;
                    const readable = val ? formatDateToReadable(val) : '-';
                    handleUpdate({
                      dueDate: readable,
                      dateRange: readable !== '-' ? `${readable.split(',')[0]} - ${readable.split(',')[0]}, 2026` : undefined
                    });
                    showToast('Due date updated');
                  }}
                  className="absolute inset-0 opacity-0 pointer-events-none"
                />
              </div>

              {/* 7. Parent */}
              <div className="text-[#6B7280] font-medium flex items-center gap-2 select-none">
                <svg className="w-3.5 h-3.5 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2" /></svg>
                <span>Parent</span>
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePopover(prev => prev === 'parent' ? null : 'parent');
                  }}
                  className="flex items-center gap-1.5 hover:bg-[#F3F4F6] px-2 py-1 rounded-[6px] cursor-pointer border border-transparent hover:border-[#E5E7EB] bg-white transition-all text-[#111827] font-semibold"
                >
                  {item.parentId ? `Parent: ${item.parentId}` : 'Add parent work item'}
                </button>
                {activePopover === 'parent' && (
                  <div className="absolute left-0 mt-1 w-64 bg-white border border-[#E5E7EB] rounded-[6px] py-1 z-50 premium-popover shadow-md max-h-48 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => {
                        handleUpdate({ parentId: undefined });
                        setActivePopover(null);
                        showToast('Parent relationship removed');
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-[#F9FAFB] text-xs font-semibold text-[#EF4444]"
                    >
                      None (No Parent)
                    </button>
                    <div className="border-t border-[#E5E7EB] my-1"></div>
                    {allItems.filter(it => it.id !== item.id && it.id).map(it => (
                      <button
                        key={it.id}
                        onClick={() => {
                          handleUpdate({ parentId: it.id });
                          setActivePopover(null);
                          showToast(`Parent linked to ${it.id}`);
                        }}
                        className="w-full text-left px-3 py-1.5 hover:bg-[#F9FAFB] text-xs text-[#111827] flex flex-col"
                      >
                        <span className="font-mono text-[9px] text-[#6B7280]">{it.id}</span>
                        <span className="font-semibold truncate">{it.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 8. Labels */}
              <div className="text-[#6B7280] font-medium flex items-center gap-2 select-none">
                <svg className="w-3.5 h-3.5 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <span>Labels</span>
              </div>
              <div className="relative flex flex-wrap items-center gap-1">
                {item.labels && item.labels.map(lbl => (
                  <span key={lbl} className="px-2 py-0.5 rounded bg-slate-100 text-[#4B5563] text-[10px] font-semibold border border-slate-200">
                    {lbl}
                  </span>
                ))}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePopover(prev => prev === 'labels' ? null : 'labels');
                  }}
                  className="flex items-center gap-1.5 hover:bg-[#F3F4F6] px-2 py-1 rounded-[6px] cursor-pointer text-sky-600 font-semibold border border-dashed border-sky-200 bg-white transition-all"
                >
                  + Add labels
                </button>
                {activePopover === 'labels' && (
                  <div className="absolute left-0 mt-1 w-40 bg-white border border-[#E5E7EB] rounded-[6px] py-1 z-50 premium-popover shadow-md" onClick={(e) => e.stopPropagation()}>
                    {['Feature', 'Bug', 'Documentation', 'Refactor'].map(lbl => {
                      const hasLabel = item.labels?.includes(lbl);
                      return (
                        <button
                          key={lbl}
                          onClick={() => {
                            const currentLabels = item.labels || [];
                            const nextLabels = hasLabel ? currentLabels.filter(l => l !== lbl) : [...currentLabels, lbl];
                            handleUpdate({ labels: nextLabels });
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-[#F9FAFB] text-xs text-[#111827] flex items-center justify-between"
                        >
                          <span>{lbl}</span>
                          {hasLabel && <span className="text-[#0284C7] font-bold">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Activity Section */}
          <div className="space-y-4 pt-4 border-t border-[#F3F4F6]">
            <div className="flex items-center justify-between select-none">
              <h3 className="text-sm font-bold text-[#111827]">Activity</h3>
              <div className="flex items-center gap-1">
                <button className="p-1 hover:bg-[#F3F4F6] rounded text-[#6B7280] cursor-pointer" title="Sort activity">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" /></svg>
                </button>
                <button className="p-1 hover:bg-[#F3F4F6] rounded text-[#6B7280] cursor-pointer" title="Filter activity">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                </button>
              </div>
            </div>

            {/* Activities List */}
            <div className="space-y-4 relative pl-3 border-l border-[#E5E7EB] ml-3">
              {activities.map((act) => (
                <div key={act.id} className="relative space-y-1 text-xs">
                  {/* Left bullet marker icon */}
                  <div className="absolute -left-[21px] top-0.5 bg-white p-0.5 border border-[#E5E7EB] rounded-full text-[#9CA3AF] flex items-center justify-center w-5.5 h-5.5 shadow-sm">
                    {act.type === 'create' && (
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    )}
                    {act.type === 'assignee' && (
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    )}
                    {act.type === 'comment' && (
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    )}
                  </div>

                  <div className="flex flex-col text-[#4B5563]">
                    <div className="font-semibold text-[#111827] flex items-center gap-1">
                      <span>{act.author}</span>
                      <span className="font-normal text-[#6B7280]">{act.text}</span>
                      <span className="font-normal text-[#9CA3AF] text-[10px] ml-1 font-mono">{act.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Comment Form */}
            <form onSubmit={handlePostComment} className="border border-[#E5E7EB] rounded-[6px] overflow-hidden bg-white shadow-sm mt-3">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add comment..."
                className="w-full p-3 text-xs text-[#374151] placeholder-[#9CA3AF] focus:outline-none min-h-[70px] bg-transparent resize-y"
              />
              
              {/* Rich text editing toolbar */}
              <div className="flex items-center justify-between px-3 py-2 border-t border-[#F3F4F6] bg-slate-50/50 select-none">
                <div className="flex items-center gap-1 text-[#6B7280]">
                  <button type="button" className="p-1 hover:bg-[#F3F4F6] rounded text-[11px] font-bold h-6 w-6">B</button>
                  <button type="button" className="p-1 hover:bg-[#F3F4F6] rounded text-[11px] italic h-6 w-6">I</button>
                  <button type="button" className="p-1 hover:bg-[#F3F4F6] rounded text-[11px] underline h-6 w-6">U</button>
                  <button type="button" className="p-1 hover:bg-[#F3F4F6] rounded text-[11px] line-through h-6 w-6">S</button>
                  <span className="h-4 border-l border-[#E5E7EB] mx-1"></span>
                  <button type="button" className="p-1 hover:bg-[#F3F4F6] rounded h-6 w-6" title="Bullets">
                    <svg className="w-3.5 h-3.5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
                  </button>
                  <button type="button" className="p-1 hover:bg-[#F3F4F6] rounded h-6 w-6" title="Numbers">
                    <svg className="w-3.5 h-3.5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 6h13M7 12h13M7 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>
                  </button>
                  <span className="h-4 border-l border-[#E5E7EB] mx-1"></span>
                  <button type="button" className="p-1 hover:bg-[#F3F4F6] rounded h-6 w-6" title="Code">
                    <svg className="w-3.5 h-3.5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  </button>
                </div>
                
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className={`h-7 px-4 text-xs font-semibold rounded-[6px] transition-colors cursor-pointer
                    ${commentText.trim() ? 'bg-[#0284C7] hover:bg-[#0369A1] text-white shadow-sm' : 'bg-slate-100 text-[#9CA3AF] cursor-not-allowed'}`}
                >
                  Comment
                </button>
              </div>
            </form>

          </div>

        </div>

      </div>
    </>
  );
}
