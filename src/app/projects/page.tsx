"use client";
 
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardShell, {
  IconPlus,
  IconCircle,
  IconSuccess,
  IconChartProject,
  IconCalendar,
  IconTrash,
  IconChevronDown,
  SidebarToggleButton,
  IconLayout,
  IconList,
  IconTableLayout,
  IconTimeline,
  IconShieldProject,
} from '../../components/DashboardShell';
import WorkItemDetailDrawer, { CommentItem, ActivityItem } from '../../components/WorkItemDetailDrawer';

// --- DATA STRUCTURES ---
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

const IconChevronRight = () => (
  <svg className="w-3.5 h-3.5 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const IconTag = () => (
  <svg className="w-3.5 h-3.5 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l6.499 6.499c.404.404.935.61 1.464.61s1.06-.206 1.464-.61l4.318-4.318c.404-.404.61-.935.61-1.464s-.206-1.06-.61-1.464L11.16 3.659A2.25 2.25 0 009.568 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 7.5h.008v.008H6V7.5z" />
  </svg>
);

const IconDots = () => (
  <svg className="w-3.5 h-3.5 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5h.01M12 12h.01M12 19h.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
  </svg>
);

// --- Custom Priority SVGs ---
const IconPriorityNone = () => (
  <svg className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1">
    <rect x="1" y="8" width="2" height="3" rx="0.5" />
    <rect x="5" y="5" width="2" height="6" rx="0.5" />
    <rect x="9" y="2" width="2" height="9" rx="0.5" />
  </svg>
);

const IconPriorityLow = () => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 12 12">
    <rect x="1" y="8" width="2" height="3" rx="0.5" fill="#3B82F6" />
    <rect x="5" y="5" width="2" height="6" rx="0.5" fill="#E5E7EB" />
    <rect x="9" y="2" width="2" height="9" rx="0.5" fill="#E5E7EB" />
  </svg>
);

const IconPriorityMedium = () => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 12 12">
    <rect x="1" y="8" width="2" height="3" rx="0.5" fill="#EAB308" />
    <rect x="5" y="5" width="2" height="6" rx="0.5" fill="#EAB308" />
    <rect x="9" y="2" width="2" height="9" rx="0.5" fill="#E5E7EB" />
  </svg>
);

const IconPriorityHigh = () => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 12 12">
    <rect x="1" y="8" width="2" height="3" rx="0.5" fill="#EF4444" />
    <rect x="5" y="5" width="2" height="6" rx="0.5" fill="#EF4444" />
    <rect x="9" y="2" width="2" height="9" rx="0.5" fill="#EF4444" />
  </svg>
);

const IconPriorityUrgent = () => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 12 12">
    <rect x="1" y="8" width="2" height="3" rx="0.5" fill="#B91C1C" />
    <rect x="5" y="5" width="2" height="6" rx="0.5" fill="#B91C1C" />
    <rect x="9" y="2" width="2" height="9" rx="0.5" fill="#B91C1C" />
    <rect x="0.5" y="0.5" width="11" height="11" rx="1.5" fill="none" stroke="#B91C1C" strokeWidth="1" className="opacity-50" />
  </svg>
);

const IconLinkSmallTable = () => (
  <svg className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

const IconPaperclip = () => (
  <svg className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 0l-5.656 5.656a4.002 4.002 0 11-5.656-5.656l8.485-8.485a6.002 6.002 0 118.486 8.486L10.5 17.75a2.002 2.002 0 11-2.828-2.828l5.656-5.656" />
  </svg>
);

// --- Custom Status Option SVGs matching screenshot ---
const IconStatusBacklog = () => (
  <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3">
    <circle cx="12" cy="12" r="9" />
  </svg>
);

const IconStatusTodo = () => (
  <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="9" />
  </svg>
);

const IconStatusInProgress = () => (
  <svg className="w-3.5 h-3.5 text-orange-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4" fill="currentColor" />
  </svg>
);

const IconStatusDone = () => (
  <svg className="w-3.5 h-3.5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconStatusCancelled = () => (
  <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l4-4m0 4l-4-4" />
  </svg>
);

const IconUserOutline = () => (
  <svg className="w-3.5 h-3.5 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const IconParent = () => (
  <svg className="w-3.5 h-3.5 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2" />
  </svg>
);

// Date formatting helpers for interactive calendars without timezone shifts
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
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
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

export default function ProjectsPage() {
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dynamic View & Display states
  const [currentView, setCurrentView] = useState<'list' | 'board' | 'timeline' | 'calendar' | 'table'>('table');
  const [activeProjectId, setActiveProjectId] = useState<string>('magangumra');
  const [projectName, setProjectName] = useState<string>('MAGANG UMRAH 2026');
  const [projectIcon, setProjectIcon] = useState<string>('shield');
  const [showProjectListing, setShowProjectListing] = useState<boolean>(true);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectId, setNewProjectId] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [newProjectEmoji, setNewProjectEmoji] = useState('😀');
  const [newProjectPublic, setNewProjectPublic] = useState(true);
  const [showCoverPicker, setShowCoverPicker] = useState(false);
  const [coverSearchQuery, setCoverSearchQuery] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [selectedLead, setSelectedLead] = useState<string>('');
  const [showLeadPicker, setShowLeadPicker] = useState(false);
  const [leadSearchQuery, setLeadSearchQuery] = useState('');
  const [coverTab, setCoverTab] = useState<'images' | 'upload'>('images');

  // Curated Unsplash cover images
  const unsplashGallery = [
    { url: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&h=400&fit=crop', label: 'Starry Sky' },
    { url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=400&fit=crop', label: 'Chevron' },
    { url: 'https://images.unsplash.com/photo-1532978379173-523e16f371f2?w=800&h=400&fit=crop', label: 'Star Trail' },
    { url: 'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?w=800&h=400&fit=crop', label: 'Leaves' },
    { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop', label: 'Glass Building' },
    { url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=400&fit=crop', label: 'Green Paper' },
    { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop', label: 'Workspace' },
    { url: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&h=400&fit=crop', label: 'Notebooks' },
    { url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=400&fit=crop', label: 'Marble' },
    { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=400&fit=crop', label: 'Sunset' },
    { url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=400&fit=crop', label: 'Pebbles' },
    { url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=400&fit=crop', label: 'Pier' },
    { url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=400&fit=crop', label: 'Blocks' },
    { url: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&h=400&fit=crop', label: 'Skyline' },
    { url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=400&fit=crop', label: 'Aurora' },
    { url: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?w=800&h=400&fit=crop', label: 'Fluid Red' },
    { url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop', label: 'Skyscrapers' },
    { url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop', label: 'Denim' }
  ];

  const gradientCovers = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
    'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
  ];
  const [selectedCoverIndex, setSelectedCoverIndex] = useState(0);

  const emojiOptions = ['😀', '🚀', '📊', '🎯', '💼', '🔬', '📝', '⚡', '🌟', '🎨', '🏗️', '🔧', '📦', '🧪', '🎓', '🌐'];

  // Workspace members list
  const workspaceMembers = [
    { id: 'you', name: 'You', initials: 'Y', email: 'you@workspace.com', role: 'Admin', avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop' },
    { id: 'candra', name: '21-Ketua-TI-Candra', initials: 'C', email: 'candra@workspace.com', role: 'Member', avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop' },
    { id: 'adit', name: 'Adit', initials: 'AD', email: 'adit@workspace.com', role: 'Member', avatarUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&fit=crop' },
    { id: 'adminmap', name: 'Admin Map Kepri', initials: 'AM', email: 'adminmap@workspace.com', role: 'Admin', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
    { id: 'adnan', name: 'Adnan Ab...', initials: 'AA', email: 'adnan@workspace.com', role: 'Member', status: 'Suspended', avatarUrl: '' }
  ];

  const filteredGallery = coverSearchQuery.trim()
    ? unsplashGallery.filter(img => img.label.toLowerCase().includes(coverSearchQuery.toLowerCase()))
    : unsplashGallery;

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImageUrl(reader.result as string);
        setShowCoverPicker(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper to get cover style
  const getCoverStyle = (): React.CSSProperties => {
    if (coverImageUrl) {
      return { backgroundImage: `url(${coverImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' };
    }
    return { background: gradientCovers[selectedCoverIndex] };
  };

  // Parse project search param client-side safely
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const proj = params.get('project');
      if (proj) {
        setActiveProjectId(proj);
        setShowProjectListing(false);
      } else {
        setShowProjectListing(true);
      }
    }
  }, [typeof window !== 'undefined' ? window.location.search : '']);

  // Load project details
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedProjects = localStorage.getItem('projects');
      if (storedProjects) {
        const parsed = JSON.parse(storedProjects);
        const match = parsed.find((p: any) => p.id === activeProjectId);
        if (match) {
          setProjectName(match.name);
          setProjectIcon(match.type || '💼');
        } else {
          setProjectName('MAGANG UMRAH 2026');
          setProjectIcon('shield');
        }
      }
    }
  }, [activeProjectId]);

  // Load view preference per project (Default to 'list' for new projects, 'table' for magangumra)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedView = localStorage.getItem(`view-pref-${activeProjectId}`);
      if (savedView) {
        setCurrentView(savedView as any);
      } else {
        const defaultView = activeProjectId === 'magangumra' ? 'table' : 'list';
        setCurrentView(defaultView);
      }
    }
  }, [activeProjectId]);

  const changeView = (view: 'list' | 'board' | 'timeline' | 'calendar' | 'table') => {
    setCurrentView(view);
    localStorage.setItem(`view-pref-${activeProjectId}`, view);
  };
  const [isDisplayDropdownOpen, setIsDisplayDropdownOpen] = useState(false);
  const [groupBy, setGroupBy] = useState<'status' | 'assignee' | 'none'>('status');
  const [sortBy, setSortBy] = useState<'id' | 'title' | 'date'>('id');
  const [activeRowMenuId, setActiveRowMenuId] = useState<string | null>(null);
  
  // Interactive spreadsheet dropdowns state
  const [activeCellDropdown, setActiveCellDropdown] = useState<{ itemId: string, column: 'state' | 'priority' | 'assignees' | 'labels' } | null>(null);
  const [stateSearch, setStateSearch] = useState('');

  // Accordion expanded states
  const [expandedGroups, setExpandedGroups] = useState({
    backlog: false,
    todo: false,
    inprogress: false,
    done: true, // expand done by default
    cancelled: false
  });

  // Modals & form state
  const [isNewItemModalOpen, setIsNewItemModalOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState<number>(4); // Default to May (0-indexed: 4)
  const [calendarYear, setCalendarYear] = useState<number>(2026);
  const [timelineScale, setTimelineScale] = useState<'week' | 'month'>('week');
  const [selectedWorkItem, setSelectedWorkItem] = useState<WorkItem | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newId, setNewId] = useState('');
  const [newStatus, setNewStatus] = useState<'backlog' | 'todo' | 'inprogress' | 'completed' | 'cancelled'>('backlog');
  const [newPriority, setNewPriority] = useState<'none' | 'low' | 'medium' | 'high' | 'urgent'>('none');
  const [newAssignee, setNewAssignee] = useState<string>('Unassigned');
  const [newLabels, setNewLabels] = useState<string[]>([]);
  const [newStartDate, setNewStartDate] = useState<string>('Start date');
  const [newDueDate, setNewDueDate] = useState<string>('Due date');
  const [newLinksCount, setNewLinksCount] = useState<number>(0);
  const [newAttachmentsCount, setNewAttachmentsCount] = useState<number>(0);
  const [newDescription, setNewDescription] = useState<string>('');
  const [createMore, setCreateMore] = useState<boolean>(false);
  const [newParentId, setNewParentId] = useState<string | null>(null);
  const [activeModalDropdown, setActiveModalDropdown] = useState<'status' | 'priority' | 'assignee' | 'labels' | 'parent' | null>(null);

  // ref hooks for native date inputs in the creation modal
  const modalStartRef = React.useRef<HTMLInputElement>(null);
  const modalDueRef = React.useRef<HTMLInputElement>(null);

  // Work items state
  const [items, setItems] = useState<WorkItem[]>([]);
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string } | null>(null);

  // Close dropdowns on window clicks
  useEffect(() => {
    const handleOutsideClick = () => {
      setActiveCellDropdown(null);
      setActiveModalDropdown(null);
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  useEffect(() => {
    const rawUser = localStorage.getItem('user');
    if (rawUser) {
      setCurrentUser(JSON.parse(rawUser));
    }

    if (typeof window !== 'undefined') {
      const storageKey = activeProjectId === 'magangumra' ? 'recents' : `recents_${activeProjectId}`;
      const storedRecents = localStorage.getItem(storageKey);
      if (storedRecents) {
        const parsed: any[] = JSON.parse(storedRecents);
        const mapped = parsed.map(item => {
          let mappedStatus = item.status;
          if (item.status === 'completed') mappedStatus = 'completed';
          if (item.status === 'todo') mappedStatus = 'inprogress';
          return {
            ...item,
            status: mappedStatus,
            priority: item.priority || 'medium',
            assigneeName: item.assigneeName || (item.assignees && item.assignees.length > 0 ? (item.assignees[0] === 'CP' ? 'Cahyadi Prasetyo' : item.assignees[0] === 'PA' ? 'Putra Adhi' : item.assignees[0] === 'PR' ? 'prasetyo' : item.assignees[0] === 'FI' ? 'fia magang' : item.assignees[0] === 'FL' ? 'fla magang' : item.assignees[0] === 'AB' ? 'Aldil Baihaqi' : item.assignees[0]) : 'Unassigned'),
            labels: item.labels || [],
            dueDate: item.dueDate || item.startDate || (item.dateRange ? item.dateRange.split(' - ')[0] : 'Mar 13, 2026'),
            createdOn: item.createdOn || 'Mar 06, 2026',
            updatedOn: item.updatedOn || 'Mar 06, 2026',
            linksCount: item.linksCount !== undefined ? item.linksCount : 0,
            attachmentsCount: item.attachmentsCount !== undefined ? item.attachmentsCount : 0,
            dateRange: item.dateRange || 'Mar 13 - 13, 2026'
          };
        });
        setItems(mapped);
      } else {
        if (activeProjectId === 'magangumra') {
          // Default list specified in STICH-2.md + user screenshot
          const defaultItems: WorkItem[] = [
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
              updatedOn: "Mar 13, 2026",
              linksCount: 0,
              attachmentsCount: 0,
              projectBadge: 'calendar',
              dateRange: 'Mar 13 - 13, 2026'
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
              updatedOn: "Mar 06, 2026",
              linksCount: 0,
              attachmentsCount: 0,
              projectBadge: 'chart',
              dateRange: 'Mar 05 - 05, 2026'
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
              updatedOn: "Mar 05, 2026",
              linksCount: 0,
              attachmentsCount: 0,
              projectBadge: 'chart',
              dateRange: 'Mar 05 - 05, 2026'
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
              updatedOn: "Mar 06, 2026",
              linksCount: 0,
              attachmentsCount: 0,
              projectBadge: 'calendar',
              dateRange: 'Mar 04 - 04, 2026'
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
              updatedOn: "Mar 06, 2026",
              linksCount: 0,
              attachmentsCount: 0,
              projectBadge: 'chart',
              dateRange: 'Mar 04 - 04, 2026'
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
              updatedOn: "Mar 06, 2026",
              linksCount: 0,
              attachmentsCount: 0,
              projectBadge: 'chart',
              dateRange: 'Mar 04 - 04, 2026'
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
              updatedOn: "Mar 06, 2026",
              linksCount: 0,
              attachmentsCount: 0,
              projectBadge: 'calendar',
              dateRange: 'Mar 04 - 04, 2026'
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
              updatedOn: "Mar 06, 2026",
              linksCount: 0,
              attachmentsCount: 0,
              projectBadge: 'chart',
              dateRange: 'Mar 04 - 04, 2026'
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
              updatedOn: "Mar 06, 2026",
              linksCount: 0,
              attachmentsCount: 0,
              projectBadge: 'chart',
              dateRange: 'Mar 04 - 04, 2026'
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
              updatedOn: "Mar 06, 2026",
              linksCount: 0,
              attachmentsCount: 0,
              projectBadge: 'calendar',
              dateRange: 'Mar 03 - 03, 2026'
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
              updatedOn: "Mar 06, 2026",
              linksCount: 0,
              attachmentsCount: 0,
              projectBadge: 'chart',
              dateRange: 'Mar 03 - 03, 2026'
            },
            {
              id: "MAGANGUMRA-173",
              title: "Troubleshooting internet pada Lt 1 R.Arsip",
              timestamp: "55 mins ago",
              completed: true,
              status: "completed",
              priority: "medium",
              assignees: ["PR"],
              assigneeName: "prasetyo",
              labels: [],
              startDate: "Mar 03, 2026",
              dueDate: "Mar 03, 2026",
              createdOn: "Mar 06, 2026",
              updatedOn: "Mar 06, 2026",
              linksCount: 0,
              attachmentsCount: 0,
              projectBadge: 'chart',
              dateRange: 'Mar 03 - 03, 2026'
            }
          ];
          localStorage.setItem('recents', JSON.stringify(defaultItems));
          setItems(defaultItems);
        } else {
          setItems([]);
        }
      }
    }
  }, [activeProjectId]);

  const saveItems = (updated: WorkItem[]) => {
    setItems(updated);
    const storageKey = activeProjectId === 'magangumra' ? 'recents' : `recents_${activeProjectId}`;
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const handleUpdateWorkItem = (updatedItem: WorkItem) => {
    const updatedList = items.map(it => it.id === updatedItem.id ? updatedItem : it);
    saveItems(updatedList);
    if (selectedWorkItem?.id === updatedItem.id) {
      setSelectedWorkItem(updatedItem);
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleCreateWorkItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      showToast('Work item title is required!');
      return;
    }
    const prefix = activeProjectId === 'magangumra' ? 'MAGANGUMRA' : activeProjectId.toUpperCase();
    const idString = newId.trim() 
      ? newId.trim().toUpperCase() 
      : (activeProjectId === 'magangumra' 
          ? `MAGANGUMRA-${items.length + 185}` 
          : `${prefix}-${items.length + 1}`);

    const finalAssignees = newAssignee === 'Unassigned' ? [] : [newAssignee];
    const finalAssigneeName = newAssignee === 'CP' ? 'Cahyadi Prasetyo' : newAssignee === 'PA' ? 'Putra Adhi' : newAssignee === 'PR' ? 'prasetyo' : newAssignee === 'FI' ? 'fia magang' : newAssignee === 'FL' ? 'fla magang' : newAssignee === 'AB' ? 'Aldil Baihaqi' : 'Unassigned';
    const finalPriority = newPriority;
    const displayDueDate = newDueDate === 'Due date' ? 'Mar 13, 2026' : newDueDate;
    const displayStartDate = newStartDate === 'Start date' ? 'Mar 13, 2026' : newStartDate;

    const newItem: WorkItem = {
      id: idString,
      title: newTitle.trim(),
      timestamp: 'just now',
      completed: newStatus === 'completed',
      status: newStatus,
      priority: finalPriority,
      assignees: finalAssignees,
      assigneeName: finalAssigneeName,
      labels: newLabels,
      startDate: displayStartDate,
      dueDate: displayDueDate,
      createdOn: 'Mar 13, 2026',
      updatedOn: 'Mar 13, 2026',
      linksCount: newLinksCount,
      attachmentsCount: newAttachmentsCount,
      projectBadge: 'chart',
      dateRange: `${displayStartDate.split(',')[0]} - ${displayDueDate.split(',')[0]}, 2026`,
      description: newDescription.trim() || undefined,
      parentId: newParentId || undefined
    };
    const updated = [newItem, ...items];
    saveItems(updated);

    if (createMore) {
      setNewTitle('');
      setNewDescription('');
      setNewId('');
      setNewParentId(null);
    } else {
      setIsNewItemModalOpen(false);
      setNewTitle('');
      setNewDescription('');
      setNewId('');
      setNewStatus('backlog');
      setNewPriority('none');
      setNewAssignee('Unassigned');
      setNewLabels([]);
      setNewStartDate('Start date');
      setNewDueDate('Due date');
      setNewLinksCount(0);
      setNewAttachmentsCount(0);
      setNewParentId(null);
    }
    showToast(`Work item ${idString} created successfully.`);
  };

  const toggleTaskCompleted = (id: string) => {
    const updated = items.map(item => {
      if (item.id === id) {
        const nextCompleted = !item.completed;
        showToast(nextCompleted ? `Marked ${id} as completed` : `Reopened ${id}`);
        return {
          ...item,
          completed: nextCompleted,
          status: nextCompleted ? 'completed' : 'inprogress' as 'completed' | 'inprogress'
        };
      }
      return item;
    });
    saveItems(updated);
  };

  const deleteTask = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = items.filter(item => item.id !== id);
    saveItems(updated);
    showToast(`Deleted ${id}`);
  };

  const [collapsedFolders, setCollapsedFolders] = useState<Record<string, boolean>>({});

  // Sorting helper
  const sortItems = (itemArray: WorkItem[]) => {
    return [...itemArray].sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'date') {
        return (a.dueDate || '').localeCompare(b.dueDate || '');
      }
      // Default 'id' sort descending (highest number first) to match chronological dashboard order
      return b.id.localeCompare(a.id);
    });
  };

  // Grouping elements
  const backlogItems = sortItems(items.filter(i => i.status === 'backlog'));
  const todoItems = sortItems(items.filter(i => i.status === 'todo'));
  const inProgressItems = sortItems(items.filter(i => i.status === 'inprogress'));
  const doneItems = sortItems(items.filter(i => i.status === 'completed'));
  const cancelledItems = sortItems(items.filter(i => (i.status as string) === 'cancelled'));

  // Render Row Menu Dropdown
  const renderRowMenu = (item: WorkItem, isNearBottom?: boolean) => {
    return (
      <div className={`absolute right-8 w-44 bg-white border border-[#E5E7EB] rounded-[6px] py-1.5 z-40 premium-popover text-left shadow-sm ${isNearBottom ? 'bottom-0' : 'top-0'}`}>
        <div className="px-3 py-1 text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider select-none">Actions</div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            const nextTitle = prompt("Edit Work Item Title:", item.title);
            if (nextTitle && nextTitle.trim()) {
              const updated = items.map(it => it.id === item.id ? { ...it, title: nextTitle.trim() } : it);
              saveItems(updated);
              showToast(`Updated title for ${item.id}`);
            }
            setActiveRowMenuId(null);
          }}
          className="w-full text-left px-3 py-1 hover:bg-[#F9FAFB] text-xs font-semibold text-[#111827]"
        >
          Edit Title
        </button>

        <div className="border-t border-[#E5E7EB] my-1"></div>
        <div className="px-3 py-1 text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider select-none">Change Status</div>
        {(['backlog', 'todo', 'inprogress', 'completed', 'cancelled'] as const).map(st => (
          <button
            key={st}
            onClick={(e) => {
              e.stopPropagation();
              const updated = items.map(it => it.id === item.id ? { ...it, status: st, completed: st === 'completed' } : it);
              saveItems(updated);
              showToast(`Changed status of ${item.id} to ${st}`);
              setActiveRowMenuId(null);
            }}
            className="w-full text-left px-3 py-1 hover:bg-[#F9FAFB] text-xs text-[#111827] flex items-center justify-between"
          >
            <span className="capitalize">{st === 'completed' ? 'Done' : st}</span>
            {item.status === st && <IconSuccess />}
          </button>
        ))}

        <div className="border-t border-[#E5E7EB] my-1"></div>
        <div className="px-3 py-1 text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider select-none">Assignee</div>
        {(['CP', 'PA', 'CP, PA'] as const).map(asg => (
          <button
            key={asg}
            onClick={(e) => {
              e.stopPropagation();
              const updated = items.map(it => it.id === item.id ? { ...it, assignees: asg.split(', ') } : it);
              saveItems(updated);
              showToast(`Assigned ${item.id} to ${asg}`);
              setActiveRowMenuId(null);
            }}
            className="w-full text-left px-3 py-1 hover:bg-[#F9FAFB] text-xs text-[#111827] flex items-center justify-between"
          >
            <span>{asg}</span>
            {item.assignees.join(', ') === asg && <IconSuccess />}
          </button>
        ))}

        <div className="border-t border-[#E5E7EB] my-1"></div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(item.id, e);
            setActiveRowMenuId(null);
          }}
          className="w-full text-left px-3 py-1.5 hover:bg-[#EF4444]/5 text-xs text-[#EF4444] font-semibold border-t border-[#E5E7EB]"
        >
          Delete Item
        </button>
      </div>
    );
  };

  // Render row helper for react items state
  const renderRow = (item: WorkItem, isNearBottom?: boolean) => {
    const isDone = item.status === 'completed' || item.completed;
    return (
      <div
        key={item.id}
        onClick={() => setSelectedWorkItem(item)}
        className={`group flex items-center justify-between min-h-[38px] py-1.5 px-3.5 hover:bg-[#F9FAFB] transition-colors cursor-pointer text-xs relative ${activeRowMenuId === item.id ? 'z-30' : ''}`}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0 mr-4">
          <div 
            onClick={(e) => {
              e.stopPropagation();
              toggleTaskCompleted(item.id);
            }}
            className="shrink-0 flex items-center"
          >
            {isDone ? <IconSuccess /> : <IconCircle />}
          </div>

          {item.projectBadge && (
            <div className="shrink-0 flex items-center">
              {item.projectBadge === 'chart' ? <IconChartProject /> : <IconCalendar />}
            </div>
          )}

          <span className="text-[11px] text-[#6B7280] font-mono shrink-0 select-all tracking-normal w-28">{item.id}</span>

          <div className="flex flex-col min-w-0 truncate">
            <span className={`truncate font-medium text-[#111827] ${isDone ? 'line-through text-[#9CA3AF]' : ''}`}>
              {item.title}
            </span>
            {item.parentId && (
              <span className="text-[9px] text-[#6B7280] font-semibold text-slate-500 mt-0.5">
                ↳ Subtask of {item.parentId}
              </span>
            )}
          </div>

          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase leading-tight ml-2 border ${isDone ? 'bg-[#E5E7EB]/50 text-[#4B5563] border-transparent' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>
            {isDone ? 'Done' : item.status.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0 text-[#6B7280]">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-75 flex items-center">
            <button
              onClick={(e) => deleteTask(item.id, e)}
              className="p-1 hover:bg-[#EF4444]/10 rounded text-[#EF4444] cursor-pointer"
              title="Delete Item"
            >
              <IconTrash />
            </button>
          </div>

          <IconTag />
          <span className="text-[11px] text-[#9CA3AF] font-medium font-mono select-none">{item.dateRange || 'Mar 13 - 13, 2026'}</span>

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

          <div className="relative">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setActiveRowMenuId(prev => prev === item.id ? null : item.id);
              }}
              className="p-1 hover:bg-[#F3F4F6] rounded select-none cursor-pointer"
            >
              <IconDots />
            </button>
            {activeRowMenuId === item.id && renderRowMenu(item, isNearBottom)}
          </div>
        </div>
      </div>
    );
  };

  // Helper for task durations in days
  const getDuration = (item: WorkItem) => {
    if (!item.startDate || item.startDate === '-' || !item.dueDate || item.dueDate === '-') {
      return '1 day';
    }
    const start = new Date(formatDateToInput(item.startDate));
    const end = new Date(formatDateToInput(item.dueDate));
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return '1 day';
    }
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
  };

  // Helper to calculate calendar week of the year
  const getWeekNumber = (d: Date) => {
    const date = new Date(d.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    const week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  };

  // Helper to generate 35 days centered around a target date
  const generateTimelineDays = (centerDate: Date) => {
    const days = [];
    const start = new Date(centerDate.getTime());
    start.setDate(start.getDate() - 10);
    for (let i = 0; i < 35; i++) {
      const d = new Date(start.getTime());
      d.setDate(d.getDate() + i);
      days.push(d);
    }
    return days;
  };

  // Helper to generate 15 Sundays centered around a target date
  const generateTimelineWeeks = (centerDate: Date) => {
    const weeks = [];
    const start = new Date(centerDate.getTime());
    start.setDate(start.getDate() - start.getDay() - 28); // 4 weeks ago Sunday
    for (let i = 0; i < 15; i++) {
      const d = new Date(start.getTime());
      d.setDate(d.getDate() + i * 7);
      weeks.push(d);
    }
    return weeks;
  };

  // Render timescale month header segmented by weeks
  const renderTimescaleMonthHeader = (days: Date[]) => {
    const weeks: { label: string; weekNum: number; count: number }[] = [];
    days.forEach(d => {
      const weekStart = new Date(d.getTime());
      weekStart.setDate(d.getDate() - d.getDay());
      const weekEnd = new Date(weekStart.getTime());
      weekEnd.setDate(weekStart.getDate() + 6);

      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      let label = '';
      if (weekStart.getMonth() === weekEnd.getMonth()) {
        label = `${months[weekStart.getMonth()]} ${weekStart.getFullYear()}`;
      } else {
        label = `${months[weekStart.getMonth()]} ${weekStart.getFullYear()} - ${months[weekEnd.getMonth()]} ${weekEnd.getFullYear()}`;
      }
      const weekNum = getWeekNumber(d);

      if (weeks.length === 0 || weeks[weeks.length - 1].weekNum !== weekNum) {
        weeks.push({ label, weekNum, count: 1 });
      } else {
        weeks[weeks.length - 1].count++;
      }
    });

    return weeks.map((w, idx) => (
      <div 
        key={idx} 
        className="border-r border-[#E5E7EB]/50 h-full flex items-center justify-between px-3 font-semibold text-[#4B5563] truncate text-[9px] uppercase tracking-wider"
        style={{ width: `${w.count * 40}px` }}
      >
        <span className="truncate">{w.label}</span>
        <span className="text-[#9CA3AF] text-[8px] font-mono shrink-0">WK {w.weekNum}</span>
      </div>
    ));
  };

  // Render timescale month header for weeks segmented by months
  const renderTimescaleWeeksMonthHeader = (weeks: Date[]) => {
    const groups: { monthYear: string; count: number }[] = [];
    weeks.forEach(d => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const my = `${months[d.getMonth()]} ${d.getFullYear()}`;
      if (groups.length === 0 || groups[groups.length - 1].monthYear !== my) {
        groups.push({ monthYear: my, count: 1 });
      } else {
        groups[groups.length - 1].count++;
      }
    });

    return groups.map(g => (
      <div 
        key={g.monthYear} 
        className="border-r border-[#E5E7EB]/50 h-full flex items-center justify-center font-bold text-[#374151] truncate text-[10px]"
        style={{ width: `${g.count * 80}px` }}
      >
        {g.monthYear}
      </div>
    ));
  };

  // Helper for dynamic calendar cell task retrieval
  const getTasksForCurrentMonthDay = (day: number, month: number, year: number) => {
    return items.filter(item => {
      if (!item.dueDate || item.dueDate === '-') return false;
      const dueInput = formatDateToInput(item.dueDate);
      const due = new Date(dueInput);
      if (isNaN(due.getTime())) return false;
      return due.getDate() === day && due.getMonth() === month && due.getFullYear() === year;
    });
  };

  // Render Timeline/Gantt bars or boundary navigation buttons
  const renderTimelineBar = (item: WorkItem, cols: Date[], today: Date, scale: 'week' | 'month') => {
    const colWidth = scale === 'week' ? 40 : 80;
    
    if (!item.startDate || item.startDate === '-' || !item.dueDate || item.dueDate === '-') {
      return (
        <div className="absolute left-2 z-10 flex items-center">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              const startVal = prompt("Enter Start Date (YYYY-MM-DD):", "2026-05-31");
              if (startVal) {
                const dueVal = prompt("Enter Due Date (YYYY-MM-DD):", startVal);
                if (dueVal) {
                  const updated = items.map(it => it.id === item.id ? {
                    ...it,
                    startDate: formatDateToReadable(startVal),
                    dueDate: formatDateToReadable(dueVal),
                    dateRange: `${formatDateToReadable(startVal).split(',')[0]} - ${formatDateToReadable(dueVal).split(',')[0]}, 2026`
                  } : it);
                  saveItems(updated);
                  showToast(`Scheduled ${item.id}`);
                }
              }
            }}
            className="px-2 py-0.5 border border-dashed border-[#E5E7EB] hover:border-[#9CA3AF] rounded text-[10px] text-[#9CA3AF] bg-white cursor-pointer"
          >
            + Schedule
          </button>
        </div>
      );
    }

    const startInput = formatDateToInput(item.startDate);
    const dueInput = formatDateToInput(item.dueDate);
    const start = new Date(startInput);
    const due = new Date(dueInput);
    
    if (isNaN(start.getTime()) || isNaN(due.getTime())) {
      return null;
    }

    start.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    const firstDay = new Date(cols[0].getTime());
    firstDay.setHours(0, 0, 0, 0);
    
    const lastDay = new Date(cols[cols.length - 1].getTime());
    if (scale === 'month') {
      lastDay.setDate(lastDay.getDate() + 6);
    }
    lastDay.setHours(0, 0, 0, 0);

    if (due.getTime() < firstDay.getTime()) {
      return (
        <div className="absolute left-1 z-10">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              showToast(`Task runs from ${item.startDate} to ${item.dueDate}`);
            }}
            className="w-6 h-6 flex items-center justify-center bg-[#F3F4F6] border border-[#E5E7EB] rounded hover:bg-[#E5E7EB] text-[#6B7280] font-semibold text-xs cursor-pointer shadow-sm"
            title={`Scheduled in the past: ${item.startDate} - ${item.dueDate}`}
          >
            ←
          </button>
        </div>
      );
    }

    if (start.getTime() > lastDay.getTime()) {
      return (
        <div className="absolute right-1 z-10">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              showToast(`Task runs from ${item.startDate} to ${item.dueDate}`);
            }}
            className="w-6 h-6 flex items-center justify-center bg-[#F3F4F6] border border-[#E5E7EB] rounded hover:bg-[#E5E7EB] text-[#6B7280] font-semibold text-xs cursor-pointer shadow-sm"
            title={`Scheduled in the future: ${item.startDate} - ${item.dueDate}`}
          >
            →
          </button>
        </div>
      );
    }

    let startIdx = -1;
    let endIdx = -1;

    for (let i = 0; i < cols.length; i++) {
      const colStart = new Date(cols[i].getTime());
      colStart.setHours(0, 0, 0, 0);
      const colEnd = new Date(colStart.getTime());
      if (scale === 'month') {
        colEnd.setDate(colEnd.getDate() + 6);
      }
      colEnd.setHours(0, 0, 0, 0);

      if (scale === 'week') {
        if (colStart.getTime() >= start.getTime() && startIdx === -1) {
          startIdx = i;
        }
        if (colStart.getTime() <= due.getTime()) {
          endIdx = i;
        }
      } else {
        if (colEnd.getTime() >= start.getTime() && startIdx === -1) {
          startIdx = i;
        }
        if (colStart.getTime() <= due.getTime()) {
          endIdx = i;
        }
      }
    }

    if (startIdx === -1) startIdx = 0;
    if (endIdx === -1) endIdx = cols.length - 1;

    const leftOffset = startIdx * colWidth + 4;
    const barWidth = (endIdx - startIdx + 1) * colWidth - 8;

    const isCompleted = item.status === 'completed' || item.completed;
    
    let barColor = 'bg-sky-50 text-[#0369A1] border-sky-200';
    if (isCompleted) {
      barColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    } else if (item.status === 'inprogress') {
      barColor = 'bg-amber-50 text-amber-700 border-amber-200';
    } else if (item.status === 'cancelled') {
      barColor = 'bg-slate-50 text-slate-500 border-slate-200 line-through';
    }

    return (
      <div 
        className={`absolute z-10 h-6 rounded-[4px] border px-2 flex items-center justify-between text-[10px] font-bold shadow-sm select-none truncate ${barColor}`}
        style={{ 
          left: `${leftOffset}px`, 
          width: `${barWidth}px` 
        }}
        title={`${item.id}: ${item.startDate} - ${item.dueDate}`}
      >
        <span className="truncate pr-1">{item.title}</span>
        <span className="text-[9px] font-semibold opacity-70 shrink-0">{getDuration(item)}</span>
      </div>
    );
  };

  // Render Table Layout spreadsheet grid
  const renderTableView = () => {
    const sorted = sortItems(items);
    return (
      <div className="p-0 flex flex-col items-stretch select-none">
        
        {/* Horizontally scrollable wrapper */}
        <div className="overflow-x-auto border-b border-[#E5E7EB] bg-white shadow-none">
          <table className="min-w-[1650px] w-full table-fixed border-collapse border-spacing-0 text-xs">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[11px] font-bold text-[#6B7280] h-10 select-none">
                <th className="w-[320px] font-bold text-left px-3.5 border-r border-[#E5E7EB] align-middle sticky left-0 bg-[#F9FAFB] z-20 shadow-[1px_0_0_0_#E5E7EB]">Work items</th>
                <th className="w-[130px] font-bold text-left px-3.5 border-r border-[#E5E7EB] align-middle cursor-pointer hover:bg-[#F3F4F6]">
                  <div className="flex items-center justify-between">
                    <span>State</span>
                    <IconChevronDown />
                  </div>
                </th>
                <th className="w-[130px] font-bold text-left px-3.5 border-r border-[#E5E7EB] align-middle cursor-pointer hover:bg-[#F3F4F6]">
                  <div className="flex items-center justify-between">
                    <span>Priority</span>
                    <IconChevronDown />
                  </div>
                </th>
                <th className="w-[180px] font-bold text-left px-3.5 border-r border-[#E5E7EB] align-middle cursor-pointer hover:bg-[#F3F4F6]">
                  <div className="flex items-center justify-between">
                    <span>Assignees</span>
                    <IconChevronDown />
                  </div>
                </th>
                <th className="w-[130px] font-bold text-left px-3.5 border-r border-[#E5E7EB] align-middle cursor-pointer hover:bg-[#F3F4F6]">
                  <div className="flex items-center justify-between">
                    <span>Labels</span>
                    <IconChevronDown />
                  </div>
                </th>
                <th className="w-[150px] font-bold text-left px-3.5 border-r border-[#E5E7EB] align-middle cursor-pointer hover:bg-[#F3F4F6]">
                  <div className="flex items-center justify-between">
                    <span>Start due</span>
                    <IconChevronDown />
                  </div>
                </th>
                <th className="w-[150px] font-bold text-left px-3.5 border-r border-[#E5E7EB] align-middle cursor-pointer hover:bg-[#F3F4F6]">
                  <div className="flex items-center justify-between">
                    <span>Due date</span>
                    <IconChevronDown />
                  </div>
                </th>
                <th className="w-[120px] font-bold text-left px-3.5 border-r border-[#E5E7EB] align-middle cursor-pointer hover:bg-[#F3F4F6]">
                  <div className="flex items-center justify-between">
                    <span>Created on</span>
                    <IconChevronDown />
                  </div>
                </th>
                <th className="w-[120px] font-bold text-left px-3.5 border-r border-[#E5E7EB] align-middle cursor-pointer hover:bg-[#F3F4F6]">
                  <div className="flex items-center justify-between">
                    <span>Updated on</span>
                    <IconChevronDown />
                  </div>
                </th>
                <th className="w-[110px] font-bold text-left px-3.5 border-r border-[#E5E7EB] align-middle cursor-pointer hover:bg-[#F3F4F6]">
                  <div className="flex items-center justify-between">
                    <span>Link</span>
                    <IconChevronDown />
                  </div>
                </th>
                <th className="w-[140px] font-bold text-left px-3.5 align-middle cursor-pointer hover:bg-[#F3F4F6]">
                  <div className="flex items-center justify-between">
                    <span>Attachment</span>
                    <IconChevronDown />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] align-middle">
              {sorted.map((item, index) => {
                const isDone = item.status === 'completed' || item.completed;
                const isNearBottom = index >= sorted.length - 4;
                
                // Status options filtering
                const statuses = [
                  { id: 'backlog', label: 'Backlog', icon: <IconStatusBacklog /> },
                  { id: 'todo', label: 'Todo', icon: <IconStatusTodo /> },
                  { id: 'inprogress', label: 'In Progress', icon: <IconStatusInProgress /> },
                  { id: 'completed', label: 'Done', icon: <IconStatusDone /> },
                  { id: 'cancelled', label: 'Cancelled', icon: <IconStatusCancelled /> },
                ] as const;
                const filteredStatuses = statuses.filter(st => 
                  st.label.toLowerCase().includes(stateSearch.toLowerCase())
                );

                return (
                  <tr key={item.id} className="min-h-[38px] group hover:bg-[#F9FAFB]/60 transition-colors">
                    {/* Work items cell (Frozen sticky left) */}
                    <td 
                      onClick={() => setSelectedWorkItem(item)}
                      className="px-3.5 border-r border-[#E5E7EB] font-medium align-middle sticky left-0 bg-white group-hover:bg-[#F9FAFB] z-10 transition-colors shadow-[1px_0_0_0_#E5E7EB] py-1.5 cursor-pointer"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-[11px] text-[#6B7280] font-mono shrink-0 select-all tracking-normal w-28 hover:underline">{item.id}</span>
                        <div className="flex flex-col min-w-0 truncate">
                          <span className={`truncate text-[#111827] font-semibold text-xs hover:underline ${isDone ? 'line-through text-[#9CA3AF]' : ''}`}>
                            {item.title}
                          </span>
                          {item.parentId && (
                            <span className="text-[9px] text-[#6B7280] font-semibold text-slate-500 mt-0.5">
                              ↳ Subtask of {item.parentId}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    
                    {/* State cell (searchable popover) */}
                    <td className="px-3.5 border-r border-[#E5E7EB] align-middle">
                      <div className={`relative w-full ${activeCellDropdown?.itemId === item.id && activeCellDropdown?.column === 'state' ? 'z-30' : ''}`}>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setStateSearch('');
                            setActiveCellDropdown(prev => prev?.itemId === item.id && prev?.column === 'state' ? null : { itemId: item.id, column: 'state' });
                          }}
                          className="flex items-center gap-1.5 hover:bg-[#F3F4F6] px-1.5 py-0.5 rounded cursor-pointer text-left w-full justify-between"
                        >
                          <div className="flex items-center gap-1.5">
                            {item.status === 'completed' && <IconStatusDone />}
                            {item.status === 'todo' && <IconStatusTodo />}
                            {item.status === 'inprogress' && <IconStatusInProgress />}
                            {item.status === 'backlog' && <IconStatusBacklog />}
                            {item.status === 'cancelled' && <IconStatusCancelled />}
                            <span className="capitalize">{item.status === 'completed' ? 'Done' : item.status === 'inprogress' ? 'In Progress' : item.status}</span>
                          </div>
                          <IconChevronDown />
                        </button>
                        {activeCellDropdown?.itemId === item.id && activeCellDropdown?.column === 'state' && (
                          <div 
                            className={`absolute left-0 w-48 bg-white border border-[#E5E7EB] rounded-[6px] py-1 z-50 premium-popover shadow-md ${isNearBottom ? 'bottom-8' : 'top-8'}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {/* Search box header */}
                            <div className="px-2 py-1.5 border-b border-[#E5E7EB] flex items-center gap-1.5 bg-white">
                              <svg className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                              <input 
                                type="text" 
                                placeholder="Search" 
                                value={stateSearch} 
                                onChange={(e) => setStateSearch(e.target.value)}
                                className="w-full text-xs text-[#111827] placeholder-[#9CA3AF] focus:outline-none bg-transparent"
                                autoFocus
                              />
                            </div>

                            {/* List container */}
                            <div className="max-h-60 overflow-y-auto py-1">
                              {filteredStatuses.length > 0 ? (
                                filteredStatuses.map(st => (
                                  <button
                                    key={st.id}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const updated = items.map(it => it.id === item.id ? { ...it, status: st.id, completed: st.id === 'completed' } : it);
                                      saveItems(updated);
                                      setActiveCellDropdown(null);
                                      showToast(`Changed status to ${st.label}`);
                                    }}
                                    className={`w-full text-left px-3 py-1.5 hover:bg-[#F3F4F6]/50 text-xs text-[#111827] flex items-center justify-between ${item.status === st.id ? 'bg-[#F3F4F6]/30 font-semibold' : ''}`}
                                  >
                                    <div className="flex items-center gap-2">
                                      {st.icon}
                                      <span>{st.label}</span>
                                    </div>
                                    {item.status === st.id && (
                                      <svg className="w-3 h-3 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                      </svg>
                                    )}
                                  </button>
                                ))
                              ) : (
                                <div className="px-3 py-2 text-xs text-[#9CA3AF] text-center">No results found</div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Priority cell */}
                    <td className="px-3.5 border-r border-[#E5E7EB] align-middle">
                      <div className={`relative w-full ${activeCellDropdown?.itemId === item.id && activeCellDropdown?.column === 'priority' ? 'z-30' : ''}`}>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveCellDropdown(prev => prev?.itemId === item.id && prev?.column === 'priority' ? null : { itemId: item.id, column: 'priority' });
                          }}
                          className="flex items-center gap-1.5 hover:bg-[#F3F4F6] px-1.5 py-0.5 rounded cursor-pointer text-left w-full justify-between"
                        >
                          <div className="flex items-center gap-1.5">
                            {item.priority === 'urgent' && <IconPriorityUrgent />}
                            {item.priority === 'high' && <IconPriorityHigh />}
                            {item.priority === 'medium' && <IconPriorityMedium />}
                            {item.priority === 'low' && <IconPriorityLow />}
                            {(!item.priority || item.priority === 'none') && <IconPriorityNone />}
                            <span className="capitalize">{item.priority || 'None'}</span>
                          </div>
                          <IconChevronDown />
                        </button>
                        {activeCellDropdown?.itemId === item.id && activeCellDropdown?.column === 'priority' && (
                          <div className={`absolute left-0 w-40 bg-white border border-[#E5E7EB] rounded-[6px] py-1 z-50 premium-popover shadow-sm ${isNearBottom ? 'bottom-8' : 'top-8'}`}>
                            {(['none', 'low', 'medium', 'high', 'urgent'] as const).map(pr => (
                              <button
                                key={pr}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const updated = items.map(it => it.id === item.id ? { ...it, priority: pr } : it);
                                  saveItems(updated);
                                  setActiveCellDropdown(null);
                                  showToast(`Changed priority to ${pr}`);
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
                                {item.priority === pr && <IconSuccess />}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Assignees cell */}
                    <td className="px-3.5 border-r border-[#E5E7EB] align-middle">
                      <div className={`relative w-full ${activeCellDropdown?.itemId === item.id && activeCellDropdown?.column === 'assignees' ? 'z-30' : ''}`}>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveCellDropdown(prev => prev?.itemId === item.id && prev?.column === 'assignees' ? null : { itemId: item.id, column: 'assignees' });
                          }}
                          className="flex items-center gap-1.5 hover:bg-[#F3F4F6] px-1.5 py-0.5 rounded cursor-pointer text-left w-full justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <div className="flex items-center -space-x-1 select-none">
                              {item.assignees.map((init, i) => (
                                <div 
                                  key={i}
                                  className={`w-4.5 h-4.5 rounded-full border border-white flex items-center justify-center text-[7px] font-bold shrink-0 text-white
                                    ${init === 'CP' ? 'bg-[#F59E0B]' : init === 'PA' ? 'bg-[#3B82F6]' : init === 'PR' ? 'bg-[#6B7280]' : init === 'FI' ? 'bg-[#14B8A6]' : init === 'FL' ? 'bg-[#6366F1]' : 'bg-[#D97706]'}`}
                                >
                                  {init}
                                </div>
                              ))}
                            </div>
                            <span className="truncate text-xs text-[#111827]">
                              {item.assigneeName || (item.assignees.length > 0 ? item.assignees.join(', ') : 'Unassigned')}
                            </span>
                          </div>
                          <IconChevronDown />
                        </button>
                        {activeCellDropdown?.itemId === item.id && activeCellDropdown?.column === 'assignees' && (
                          <div className={`absolute left-0 w-44 bg-white border border-[#E5E7EB] rounded-[6px] py-1 z-50 premium-popover shadow-sm ${isNearBottom ? 'bottom-8' : 'top-8'}`}>
                            {[
                              { name: 'Cahyadi Prasetyo', init: 'CP' },
                              { name: 'Putra Adhi', init: 'PA' },
                              { name: 'prasetyo', init: 'PR' },
                              { name: 'fia magang', init: 'FI' },
                              { name: 'fla magang', init: 'FL' },
                              { name: 'Aldil Baihaqi', init: 'AB' }
                            ].map(user => (
                              <button
                                key={user.name}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const updated = items.map(it => it.id === item.id ? { 
                                    ...it, 
                                    assignees: [user.init],
                                    assigneeName: user.name
                                  } : it);
                                  saveItems(updated);
                                  setActiveCellDropdown(null);
                                  showToast(`Assigned to ${user.name}`);
                                }}
                                className="w-full text-left px-3 py-1.5 hover:bg-[#F9FAFB] text-xs text-[#111827] flex items-center justify-between"
                              >
                                <span>{user.name}</span>
                                {item.assigneeName === user.name && <IconSuccess />}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Labels cell */}
                    <td className="px-3.5 border-r border-[#E5E7EB] align-middle">
                      <div className={`relative w-full ${activeCellDropdown?.itemId === item.id && activeCellDropdown?.column === 'labels' ? 'z-30' : ''}`}>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveCellDropdown(prev => prev?.itemId === item.id && prev?.column === 'labels' ? null : { itemId: item.id, column: 'labels' });
                          }}
                          className="flex items-center gap-1.5 hover:bg-[#F3F4F6] px-1.5 py-0.5 rounded cursor-pointer text-left w-full justify-between"
                        >
                          <div className="flex items-center gap-1.5 text-[#6B7280]">
                            <IconTag />
                            <span className="truncate text-xs">
                              {item.labels && item.labels.length > 0 ? item.labels.join(', ') : 'Select labels'}
                            </span>
                          </div>
                          <IconChevronDown />
                        </button>
                        {activeCellDropdown?.itemId === item.id && activeCellDropdown?.column === 'labels' && (
                          <div className={`absolute left-0 w-40 bg-white border border-[#E5E7EB] rounded-[6px] py-1 z-50 premium-popover shadow-sm ${isNearBottom ? 'bottom-8' : 'top-8'}`}>
                            {['Feature', 'Bug', 'Documentation', 'Refactor'].map(lbl => {
                              const hasLabel = item.labels?.includes(lbl);
                              return (
                                <button
                                  key={lbl}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const currentLabels = item.labels || [];
                                    const nextLabels = hasLabel ? currentLabels.filter(l => l !== lbl) : [...currentLabels, lbl];
                                    const updated = items.map(it => it.id === item.id ? { ...it, labels: nextLabels } : it);
                                    saveItems(updated);
                                  }}
                                  className="w-full text-left px-3 py-1.5 hover:bg-[#F9FAFB] text-xs text-[#111827] flex items-center justify-between"
                                >
                                  <span>{lbl}</span>
                                  {hasLabel && <IconSuccess />}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Start Due cell */}
                    <td className="px-3.5 border-r border-[#E5E7EB] relative align-middle">
                      <div className="flex items-center justify-between w-full">
                        <div className="relative">
                          <button 
                            type="button"
                            onClick={(e) => {
                              const sibling = e.currentTarget.nextElementSibling;
                              if (sibling) {
                                try {
                                  (sibling as any).showPicker();
                                } catch (err) {
                                  (sibling as any).focus();
                                }
                              }
                            }}
                            className="flex items-center gap-1.5 hover:bg-[#F3F4F6] px-1.5 py-0.5 rounded cursor-pointer text-left text-xs"
                          >
                            <IconCalendar />
                            <span className="text-[11px] text-[#6B7280] font-medium font-mono">
                              {item.startDate && item.startDate !== '-' ? item.startDate : 'No date'}
                            </span>
                          </button>
                          <input
                            type="date"
                            value={formatDateToInput(item.startDate || '')}
                            onChange={(e) => {
                              const val = e.target.value;
                              const newS = val ? formatDateToReadable(val) : '-';
                              const updated = items.map(it => it.id === item.id ? { 
                                ...it, 
                                startDate: newS, 
                                dateRange: newS !== '-' && it.dueDate && it.dueDate !== '-' ? `${newS.split(',')[0]} - ${it.dueDate.split(',')[0]}, 2026` : it.dateRange 
                              } : it);
                              saveItems(updated);
                              showToast(`Updated start date for ${item.id}`);
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="absolute inset-0 opacity-0 pointer-events-none"
                          />
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const updated = items.map(it => it.id === item.id ? { ...it, startDate: '-' } : it);
                            saveItems(updated);
                            showToast(`Cleared start date for ${item.id}`);
                          }}
                          className="p-0.5 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600 relative z-10"
                          title="Clear date"
                        >
                          ✕
                        </button>
                      </div>
                    </td>

                    {/* Due Date cell */}
                    <td className="px-3.5 border-r border-[#E5E7EB] relative align-middle">
                      <div className="flex items-center justify-between w-full">
                        <div className="relative">
                          <button 
                            type="button"
                            onClick={(e) => {
                              const sibling = e.currentTarget.nextElementSibling;
                              if (sibling) {
                                try {
                                  (sibling as any).showPicker();
                                } catch (err) {
                                  (sibling as any).focus();
                                }
                              }
                            }}
                            className="flex items-center gap-1.5 hover:bg-[#F3F4F6] px-1.5 py-0.5 rounded cursor-pointer text-left text-xs"
                          >
                            <IconCalendar />
                            <span className="text-[11px] text-[#6B7280] font-medium font-mono">
                              {item.dueDate && item.dueDate !== '-' ? item.dueDate : 'No date'}
                            </span>
                          </button>
                          <input
                            type="date"
                            value={formatDateToInput(item.dueDate || '')}
                            onChange={(e) => {
                              const val = e.target.value;
                              const newD = val ? formatDateToReadable(val) : '-';
                              const updated = items.map(it => it.id === item.id ? { 
                                ...it, 
                                dueDate: newD, 
                                dateRange: newD !== '-' ? `${newD.split(',')[0]} - ${newD.split(',')[0]}, 2026` : undefined 
                              } : it);
                              saveItems(updated);
                              showToast(`Updated due date for ${item.id}`);
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="absolute inset-0 opacity-0 pointer-events-none"
                          />
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const updated = items.map(it => it.id === item.id ? { ...it, dueDate: '-', dateRange: undefined } : it);
                            saveItems(updated);
                            showToast(`Cleared due date for ${item.id}`);
                          }}
                          className="p-0.5 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600 relative z-10"
                          title="Clear date"
                        >
                          ✕
                        </button>
                      </div>
                    </td>

                    {/* Created on cell */}
                    <td className="px-3.5 border-r border-[#E5E7EB] align-middle">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const val = prompt("Edit Created Date:", item.createdOn || 'Mar 06, 2026');
                          if (val !== null) {
                            const updated = items.map(it => it.id === item.id ? { ...it, createdOn: val } : it);
                            saveItems(updated);
                          }
                        }}
                        className="hover:bg-[#F3F4F6] px-1.5 py-0.5 rounded text-[#4B5563] text-left w-full cursor-pointer"
                      >
                        {item.createdOn || 'Mar 06, 2026'}
                      </button>
                    </td>

                    {/* Updated on cell */}
                    <td className="px-3.5 border-r border-[#E5E7EB] align-middle">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const val = prompt("Edit Updated Date:", item.updatedOn || 'Mar 06, 2026');
                          if (val !== null) {
                            const updated = items.map(it => it.id === item.id ? { ...it, updatedOn: val } : it);
                            saveItems(updated);
                          }
                        }}
                        className="hover:bg-[#F3F4F6] px-1.5 py-0.5 rounded text-[#4B5563] text-left w-full cursor-pointer"
                      >
                        {item.updatedOn || 'Mar 06, 2026'}
                      </button>
                    </td>

                    {/* Link cell */}
                    <td className="px-3.5 border-r border-[#E5E7EB] align-middle">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const count = prompt("Edit Links count:", String(item.linksCount || 0));
                          if (count !== null) {
                            const updated = items.map(it => it.id === item.id ? { ...it, linksCount: parseInt(count) || 0 } : it);
                            saveItems(updated);
                          }
                        }}
                        className="flex items-center gap-1.5 hover:bg-[#F3F4F6] px-1.5 py-0.5 rounded text-[#6B7280] text-left w-full cursor-pointer"
                      >
                        <IconLinkSmallTable />
                        <span>{item.linksCount || 0} links</span>
                      </button>
                    </td>

                    {/* Attachment cell */}
                    <td className="px-3.5 align-middle">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const count = prompt("Edit Attachments count:", String(item.attachmentsCount || 0));
                          if (count !== null) {
                            const updated = items.map(it => it.id === item.id ? { ...it, attachmentsCount: parseInt(count) || 0 } : it);
                            saveItems(updated);
                          }
                        }}
                        className="flex items-center gap-1.5 hover:bg-[#F3F4F6] px-1.5 py-0.5 rounded text-[#6B7280] text-left w-full cursor-pointer"
                      >
                        <IconPaperclip />
                        <span>{item.attachmentsCount || 0} attachments</span>
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Add work item link below the table layout */}
        <div className="flex select-none pl-4 py-3 border-b border-[#E5E7EB] bg-white">
          <button
            onClick={() => setIsNewItemModalOpen(true)}
            className="flex items-center gap-1.5 text-xs text-[#6B7280] hover:text-[#111827] font-semibold cursor-pointer transition-colors"
>
            <span className="text-sm font-bold">+</span>
            <span>New Work Item</span>
          </button>
        </div>

      </div>
    );
  };

  // Render active view contents
  const renderViewContent = () => {
    if (currentView === 'table') {
      return renderTableView();
    }

    if (currentView === 'list') {
      if (groupBy === 'status') {
        return (
          <div className="max-w-full w-full">
            {/* Accordion 1: Backlog */}
            <div className="border-b border-[#E5E7EB]">
              <div
                onClick={() => setExpandedGroups(prev => ({ ...prev, backlog: !prev.backlog }))}
                className="w-full h-10 px-5 hover:bg-[#F9FAFB] flex items-center justify-between text-[13px] font-bold text-[#111827] select-none transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9" /></svg>
                  <span>Backlog</span>
                  <span className="text-[#9CA3AF] font-medium text-xs ml-1">{backlogItems.length}</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setNewStatus('backlog'); setIsNewItemModalOpen(true); }}
                  className="p-1 hover:bg-[#F3F4F6] rounded text-[#9CA3AF] hover:text-[#6B7280] cursor-pointer transition-colors"
                  title="Add backlog item"
                >
                  <IconPlus />
                </button>
              </div>
              {expandedGroups.backlog && (
                <div className="divide-y divide-[#E5E7EB]">
                  {backlogItems.length > 0 ? (
                    backlogItems.map((item, idx) => renderRow(item, idx >= backlogItems.length - 2))
                  ) : (
                    <div className="py-4 text-center text-xs text-[#9CA3AF]">No backlog items found.</div>
                  )}
                </div>
              )}
            </div>

            {/* Accordion 2: Todo */}
            <div className="border-b border-[#E5E7EB]">
              <div
                onClick={() => setExpandedGroups(prev => ({ ...prev, todo: !prev.todo }))}
                className="w-full h-10 px-5 hover:bg-[#F9FAFB] flex items-center justify-between text-[13px] font-bold text-[#111827] select-none transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9" /></svg>
                  <span>Todo</span>
                  <span className="text-[#9CA3AF] font-medium text-xs ml-1">{todoItems.length}</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setNewStatus('todo'); setIsNewItemModalOpen(true); }}
                  className="p-1 hover:bg-[#F3F4F6] rounded text-[#9CA3AF] hover:text-[#6B7280] cursor-pointer transition-colors"
                  title="Add todo item"
                >
                  <IconPlus />
                </button>
              </div>
              {expandedGroups.todo && (
                <div className="divide-y divide-[#E5E7EB]">
                  {todoItems.length > 0 ? (
                    todoItems.map((item, idx) => renderRow(item, idx >= todoItems.length - 2))
                  ) : (
                    <div className="py-4 text-center text-xs text-[#9CA3AF]">No todo items found.</div>
                  )}
                </div>
              )}
            </div>

            {/* Accordion 3: In Progress */}
            <div className="border-b border-[#E5E7EB]">
              <div
                onClick={() => setExpandedGroups(prev => ({ ...prev, inprogress: !prev.inprogress }))}
                className="w-full h-10 px-5 hover:bg-[#F9FAFB] flex items-center justify-between text-[13px] font-bold text-[#111827] select-none transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-[#F59E0B]" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6" /></svg>
                  <span>In Progress</span>
                  <span className="text-[#9CA3AF] font-medium text-xs ml-1">{inProgressItems.length}</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setNewStatus('inprogress'); setIsNewItemModalOpen(true); }}
                  className="p-1 hover:bg-[#F3F4F6] rounded text-[#9CA3AF] hover:text-[#6B7280] cursor-pointer transition-colors"
                  title="Add in-progress item"
                >
                  <IconPlus />
                </button>
              </div>
              {expandedGroups.inprogress && (
                <div className="divide-y divide-[#E5E7EB]">
                  {inProgressItems.length > 0 ? (
                    inProgressItems.map((item, idx) => renderRow(item, idx >= inProgressItems.length - 2))
                  ) : (
                    <div className="py-4 text-center text-xs text-[#9CA3AF]">No in-progress items found.</div>
                  )}
                </div>
              )}
            </div>

            {/* Accordion 4: Done */}
            <div className="border-b border-[#E5E7EB]">
              <div
                onClick={() => setExpandedGroups(prev => ({ ...prev, done: !prev.done }))}
                className="w-full h-10 px-5 hover:bg-[#F9FAFB] flex items-center justify-between text-[13px] font-bold text-[#111827] select-none transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>Done</span>
                  <span className="text-[#9CA3AF] font-medium text-xs ml-1">{doneItems.length}</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setNewStatus('completed'); setIsNewItemModalOpen(true); }}
                  className="p-1 hover:bg-[#F3F4F6] rounded text-[#9CA3AF] hover:text-[#6B7280] cursor-pointer transition-colors"
                  title="Add done item"
                >
                  <IconPlus />
                </button>
              </div>
              {expandedGroups.done && (
                <div className="divide-y divide-[#E5E7EB]">
                  {doneItems.length > 0 ? (
                    doneItems.map((item, idx) => renderRow(item, idx >= doneItems.length - 2))
                  ) : (
                    <div className="py-4 text-center text-xs text-[#9CA3AF]">No completed items found.</div>
                  )}
                </div>
              )}
            </div>

            {/* Accordion 5: Cancelled */}
            <div className="border-b border-[#E5E7EB]">
              <div
                onClick={() => setExpandedGroups(prev => ({ ...prev, cancelled: !prev.cancelled }))}
                className="w-full h-10 px-5 hover:bg-[#F9FAFB] flex items-center justify-between text-[13px] font-bold text-[#111827] select-none transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>Cancelled</span>
                  <span className="text-[#9CA3AF] font-medium text-xs ml-1">{cancelledItems.length}</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setNewStatus('cancelled'); setIsNewItemModalOpen(true); }}
                  className="p-1 hover:bg-[#F3F4F6] rounded text-[#9CA3AF] hover:text-[#6B7280] cursor-pointer transition-colors"
                  title="Add cancelled item"
                >
                  <IconPlus />
                </button>
              </div>
              {expandedGroups.cancelled && (
                <div className="divide-y divide-[#E5E7EB]">
                  {cancelledItems.length > 0 ? (
                    cancelledItems.map((item, idx) => renderRow(item, idx >= cancelledItems.length - 2))
                  ) : (
                    <div className="py-4 text-center text-xs text-[#9CA3AF]">No cancelled items found.</div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      }

      if (groupBy === 'assignee') {
        const assignees = ['CP', 'PA', 'PR', 'FI', 'FL', 'AB', 'Unassigned'];
        return (
          <div className="max-w-full w-full">
            {assignees.map(asg => {
              const filtered = sortItems(items.filter(item => {
                if (asg === 'Unassigned') return item.assignees.length === 0;
                return item.assignees.includes(asg);
              }));
              const isCollapsed = collapsedFolders[asg];
              const toggleAsg = () => {
                setCollapsedFolders(prev => ({ ...prev, [asg]: !prev[asg] }));
              };

              return (
                <div key={asg} className="border-b border-[#E5E7EB]">
                  <div
                    onClick={toggleAsg}
                    className="w-full h-10 px-5 hover:bg-[#F9FAFB] flex items-center justify-between text-[13px] font-bold text-[#111827] select-none transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-4.5 h-4.5 rounded-full bg-[#0369A1] text-white flex items-center justify-center text-[7px] font-bold shrink-0">{asg}</div>
                      <span>{asg === 'Unassigned' ? 'Unassigned' : asg === 'CP' ? 'Cahyadi Prasetyo (CP)' : asg === 'PA' ? 'Putra Adhi (PA)' : asg === 'PR' ? 'prasetyo' : asg === 'FI' ? 'fia magang' : asg === 'FL' ? 'fla magang' : 'Aldil Baihaqi'}</span>
                      <span className="text-[#9CA3AF] font-medium text-xs ml-1">{filtered.length}</span>
                    </div>
                  </div>
                  {!isCollapsed && (
                    <div className="divide-y divide-[#E5E7EB]">
                      {filtered.length > 0 ? (
                        filtered.map((item, idx) => renderRow(item, idx >= filtered.length - 2))
                      ) : (
                        <div className="py-4 text-center text-xs text-[#9CA3AF]">No items for this assignee.</div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      }

      // groupBy === 'none'
      return (
        <div className="divide-y divide-[#E5E7EB] w-full">
          {sortItems(items).map((item, idx, arr) => renderRow(item, idx >= arr.length - 2))}
        </div>
      );
    }

    if (currentView === 'board') {
      const columns = [
        { id: 'backlog', label: 'Backlog', dot: <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="9" /></svg> },
        { id: 'todo', label: 'Todo', dot: <svg className="w-3.5 h-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="9" /></svg> },
        { id: 'inprogress', label: 'In Progress', dot: <svg className="w-3.5 h-3.5 text-orange-500" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" /></svg> },
        { id: 'completed', label: 'Done', dot: <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" /></svg> },
        { id: 'cancelled', label: 'Cancelled', dot: <svg className="w-3.5 h-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg> },
      ] as const;

      return (
        <div className="flex gap-4 p-5 overflow-x-auto min-h-[calc(100vh-100px)] bg-slate-50/40 select-none items-start">
          {columns.map(col => {
            const colItems = sortItems(items.filter(it => it.status === col.id));
            return (
              <div key={col.id} className="w-[280px] shrink-0 flex flex-col bg-white border border-[#E5E7EB] rounded-[8px] p-3 space-y-3">
                {/* Column Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#111827]">
                    {col.dot}
                    <span>{col.label}</span>
                    <span className="text-[#9CA3AF] font-medium font-mono text-[10px] ml-1">{colItems.length}</span>
                  </div>
                  <button
                    onClick={() => { setNewStatus(col.id); setIsNewItemModalOpen(true); }}
                    className="p-1 hover:bg-[#F3F4F6] rounded text-[#9CA3AF] hover:text-[#6B7280] cursor-pointer"
                  >
                    <IconPlus />
                  </button>
                </div>

                {/* Cards List */}
                <div className="flex-1 overflow-y-auto space-y-2 max-h-[65vh] pr-0.5">
                  {colItems.map(item => (
                    <div 
                      key={item.id}
                      onClick={() => setSelectedWorkItem(item)}
                      className="bg-white border border-[#E5E7EB] hover:border-[#9CA3AF] rounded-[6px] p-3 space-y-2.5 relative transition-colors shadow-none cursor-pointer"
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] text-[#6B7280] font-mono select-all tracking-normal">{item.id}</span>
                        
                        <div className="relative">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveRowMenuId(prev => prev === item.id ? null : item.id);
                            }}
                            className="p-0.5 hover:bg-[#F3F4F6] rounded text-[#9CA3AF] hover:text-[#6B7280] cursor-pointer"
                          >
                            <IconDots />
                          </button>
                          {activeRowMenuId === item.id && renderRowMenu(item)}
                        </div>
                      </div>

                      <p className="text-xs font-semibold text-[#111827] leading-relaxed line-clamp-3">{item.title}</p>
                      
                      <div className="flex items-center justify-between text-[10px] text-[#6B7280] pt-1">
                        <span className="font-mono text-[#9CA3AF]">{item.dueDate || 'Mar 13, 2026'}</span>
                        
                        <div className="flex items-center gap-1.5">
                          {/* Shifting Arrows */}
                          <div className="flex items-center border border-[#E5E7EB] rounded bg-white">
                            <button
                              disabled={col.id === 'backlog'}
                              onClick={(e) => {
                                e.stopPropagation();
                                const idx = columns.findIndex(c => c.id === col.id);
                                if (idx > 0) {
                                  const nextCol = columns[idx - 1].id;
                                  const updated = items.map(it => it.id === item.id ? { ...it, status: nextCol, completed: nextCol === 'completed' } : it);
                                  saveItems(updated);
                                  showToast(`Moved ${item.id} left`);
                                }
                              }}
                              className="px-1.5 py-0.5 hover:bg-[#F3F4F6] disabled:opacity-30 disabled:hover:bg-transparent rounded-l text-[#6B7280] cursor-pointer font-bold"
                            >
                              ←
                            </button>
                            <button
                              disabled={col.id === 'cancelled'}
                              onClick={(e) => {
                                e.stopPropagation();
                                const idx = columns.findIndex(c => c.id === col.id);
                                if (idx < columns.length - 1) {
                                  const nextCol = columns[idx + 1].id;
                                  const updated = items.map(it => it.id === item.id ? { ...it, status: nextCol, completed: nextCol === 'completed' } : it);
                                  saveItems(updated);
                                  showToast(`Moved ${item.id} right`);
                                }
                              }}
                              className="px-1.5 py-0.5 hover:bg-[#F3F4F6] disabled:opacity-30 disabled:hover:bg-transparent rounded-r border-l border-[#E5E7EB] text-[#6B7280] cursor-pointer font-bold"
                            >
                              →
                            </button>
                          </div>

                          {/* Assignee initials */}
                          <div className="flex -space-x-1 ml-1 select-none">
                            {item.assignees.map((init, i) => (
                              <div 
                                key={i}
                                className="w-4 h-4 rounded-full border border-white bg-[#0369A1] text-white flex items-center justify-center text-[7px] font-bold shrink-0"
                              >
                                {init}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {colItems.length === 0 && (
                    <div className="py-8 text-center text-xs text-[#9CA3AF] border border-dashed border-[#E5E7EB] rounded-[6px]">
                      No items
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    if (currentView === 'timeline') {
      const today = new Date(2026, 4, 31); // May 31, 2026 is today in SIMANTAP mock
      const cols = timelineScale === 'week' ? generateTimelineDays(today) : generateTimelineWeeks(today);
      const sorted = sortItems(items);
      const isWeekScale = timelineScale === 'week';
      const colWidthClass = isWeekScale ? 'w-[40px]' : 'w-[80px]';
      const minWidthStyle = isWeekScale ? '1400px' : '1200px';

      return (
        <div className="p-0 flex flex-col items-stretch select-none bg-white">
          {/* Header Controls for Timeline (Row 1) */}
          <div className="h-10 px-4 border-b border-[#E5E7EB] bg-white flex items-center justify-between text-xs select-none">
            <span className="text-[#6B7280] font-semibold">{items.length} Work items</span>
            <div className="flex items-center gap-1.5">
              <div className="flex items-center border border-[#E5E7EB] rounded-[6px] p-0.5 bg-[#F9FAFB] gap-0.5">
                <button 
                  onClick={() => setTimelineScale('week')}
                  className={`px-2.5 py-1 rounded-[4px] font-semibold transition-colors cursor-pointer ${timelineScale === 'week' ? 'bg-white border border-[#E5E7EB] text-[#111827]' : 'hover:bg-white/50 text-[#6B7280]'}`}
                >
                  Week
                </button>
                <button 
                  onClick={() => setTimelineScale('month')}
                  className={`px-2.5 py-1 rounded-[4px] font-semibold transition-colors cursor-pointer ${timelineScale === 'month' ? 'bg-white border border-[#E5E7EB] text-[#111827]' : 'hover:bg-white/50 text-[#6B7280]'}`}
                >
                  Month
                </button>
              </div>
              <button 
                onClick={() => {
                  setTimelineScale('week');
                  showToast("Centered timeline to Today (May 31, 2026)");
                }} 
                className="h-7 px-3 border border-[#E5E7EB] hover:bg-[#F9FAFB] text-xs font-semibold text-[#374151] rounded-[6px] bg-white cursor-pointer"
              >
                Today
              </button>
            </div>
          </div>

          {/* Split Container */}
          <div className="flex flex-row overflow-hidden w-full">
            {/* Left sticky pane: Work items list & Duration */}
            <div className="w-[480px] shrink-0 border-r border-[#E5E7EB] bg-white flex flex-col sticky left-0 z-20 shadow-[1px_0_0_0_#E5E7EB]">
              {/* Header */}
              <div className="flex h-20 bg-[#F9FAFB] border-b border-[#E5E7EB] text-[11px] font-bold text-[#6B7280] select-none items-center">
                <div className="w-[340px] px-4 border-r border-[#E5E7EB] h-full flex items-center">Work items</div>
                <div className="flex-1 px-4 h-full flex items-center">Duration</div>
              </div>
              {/* Rows */}
              <div className="divide-y divide-[#E5E7EB]">
                {sorted.map(item => {
                  const isDone = item.status === 'completed' || item.completed;
                  return (
                    <div 
                      key={item.id} 
                      onClick={() => setSelectedWorkItem(item)}
                      className="flex h-11 items-center hover:bg-[#F9FAFB]/60 transition-colors text-xs border-b border-[#E5E7EB] cursor-pointer"
                    >
                      <div className="w-[340px] px-4 border-r border-[#E5E7EB] h-full flex items-center min-w-0">
                        <span className="text-[11px] text-[#6B7280] font-mono shrink-0 select-all tracking-normal w-28 hover:underline">{item.id}</span>
                        <span className={`truncate font-semibold text-[#111827] hover:underline ${isDone ? 'line-through text-[#9CA3AF]' : ''}`}>{item.title}</span>
                      </div>
                      <div className="flex-1 px-4 h-full flex items-center text-[#4B5563] font-medium border-b border-[#E5E7EB]">
                        {getDuration(item)}
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Bottom Row: Add work item */}
              <div className="h-12 border-t border-[#E5E7EB] border-b border-[#E5E7EB] bg-white flex items-center pl-4 shrink-0">
                <button
                  onClick={() => setIsNewItemModalOpen(true)}
                  className="flex items-center gap-1.5 text-xs text-[#6B7280] hover:text-[#111827] font-semibold cursor-pointer transition-colors"
                >
                  <span className="text-sm font-bold">+</span>
                  <span>New work Item</span>
                </button>
              </div>
            </div>

            {/* Right scrollable pane: Timeline sheet */}
            <div className="flex-1 overflow-x-auto bg-white flex flex-col">
              {/* Timeline Header wrapper */}
              <div className="flex flex-col bg-[#F9FAFB] border-b border-[#E5E7EB] text-[10px] font-bold text-[#6B7280] select-none shrink-0" style={{ minWidth: minWidthStyle }}>
                {/* Months & Weeks Row (Row 1) */}
                <div className="flex h-10 border-b border-[#E5E7EB]/50 items-center">
                  {isWeekScale ? renderTimescaleMonthHeader(cols) : renderTimescaleWeeksMonthHeader(cols)}
                </div>
                {/* Days Row (Row 2) */}
                <div className="flex h-10 items-center">
                  {isWeekScale ? (
                    cols.map(d => {
                      const isToday = d.getDate() === today.getDate() && d.getMonth() === today.getMonth();
                      const dayName = ['Su', 'M', 'T', 'W', 'Th', 'F', 'Sa'][d.getDay()];
                      return (
                        <div key={d.toISOString()} className="w-[40px] shrink-0 text-center flex flex-col items-center justify-center border-r border-[#E5E7EB]/30 h-full">
                          <span className="text-[10px] text-[#4B5563]">{d.getDate()}</span>
                          <span className={`text-[9px] px-1 rounded-sm ${isToday ? 'bg-[#0284C7] text-white font-bold' : 'text-[#9CA3AF]'}`}>{dayName}</span>
                        </div>
                      );
                    })
                  ) : (
                    cols.map(d => {
                      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                      const weekNum = getWeekNumber(d);
                      const isTodayWeek = today.getTime() >= d.getTime() && today.getTime() < d.getTime() + 7 * 86400000;
                      return (
                        <div key={d.toISOString()} className="w-[80px] shrink-0 text-center flex flex-col items-center justify-center border-r border-[#E5E7EB]/30 h-full">
                          <span className="text-[10px] text-[#4B5563] font-semibold">{months[d.getMonth()]} {d.getDate()}</span>
                          <span className={`text-[9px] px-1 rounded-sm ${isTodayWeek ? 'bg-[#0284C7] text-white font-bold' : 'text-[#9CA3AF]'}`}>WK {weekNum}</span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Timeline Rows wrapper */}
              <div className="divide-y divide-[#E5E7EB] flex flex-col relative" style={{ minWidth: minWidthStyle }}>
                {sorted.map(item => {
                  return (
                    <div 
                      key={item.id} 
                      onClick={() => setSelectedWorkItem(item)}
                      className="flex h-11 items-center relative hover:bg-[#F9FAFB]/20 transition-colors border-b border-[#E5E7EB] cursor-pointer"
                    >
                      {/* Vertical Grid Lines background */}
                      <div className="absolute inset-0 flex pointer-events-none">
                        {cols.map(d => (
                          <div key={d.toISOString()} className={`shrink-0 border-r border-[#F3F4F6] h-full ${colWidthClass}`} />
                        ))}
                      </div>

                      {/* Timeline content (Bar or scroll indicator) */}
                      {renderTimelineBar(item, cols, today, timelineScale)}
                    </div>
                  );
                })}
              </div>

              {/* Bottom spacing to match left pane footer */}
              <div className="h-12 border-t border-[#E5E7EB] border-b border-[#E5E7EB] bg-[#F9FAFB]/30 shrink-0" style={{ minWidth: minWidthStyle }} />
            </div>
          </div>
        </div>
      );
    }

    // currentView === 'calendar'
    const monthsName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    // Get calendar grid days
    const firstDayIndex = new Date(calendarYear, calendarMonth, 1).getDay();
    const totalDays = new Date(calendarYear, calendarMonth + 1, 0).getDate();
    const prevMonthTotalDays = new Date(calendarYear, calendarMonth, 0).getDate();

    const cells: { day: number; isCurrent: boolean; isPrev?: boolean; isNext?: boolean }[] = [];

    // Prev month padding cells
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      cells.push({ day: prevMonthTotalDays - i, isCurrent: false, isPrev: true });
    }

    // Current month cells
    for (let i = 1; i <= totalDays; i++) {
      cells.push({ day: i, isCurrent: true });
    }

    // Next month padding cells to make it multiple of 7 (6 rows = 42 cells)
    const remaining = 42 - cells.length;
    for (let i = 1; i <= remaining; i++) {
      cells.push({ day: i, isCurrent: false, isNext: true });
    }

    const prevMonth = () => {
      if (calendarMonth === 0) {
        setCalendarMonth(11);
        setCalendarYear(prev => prev - 1);
      } else {
        setCalendarMonth(prev => prev - 1);
      }
    };

    const nextMonth = () => {
      if (calendarMonth === 11) {
        setCalendarMonth(0);
        setCalendarYear(prev => prev + 1);
      } else {
        setCalendarMonth(prev => prev + 1);
      }
    };

    const goToday = () => {
      const today = new Date(2026, 4, 31); // May 31, 2026 is today in SIMANTAP mock
      setCalendarMonth(today.getMonth());
      setCalendarYear(today.getFullYear());
    };

    return (
      <div className="p-0 select-none max-w-full overflow-x-auto bg-white flex flex-col items-stretch">
        <div className="min-w-[800px] bg-white overflow-hidden">
          {/* Calendar Header Month */}
          <div className="h-10 px-4 bg-white border-b border-[#E5E7EB] flex items-center justify-between text-xs font-bold text-[#111827]">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#111827]">{monthsName[calendarMonth]} {calendarYear}</span>
              <span className="text-[10px] text-[#9CA3AF] font-normal uppercase tracking-wider">Monthly view</span>
            </div>
            
            {/* Nav controls */}
            <div className="flex items-center gap-1.5">
              <button 
                onClick={prevMonth}
                className="h-7 w-7 border border-[#E5E7EB] hover:bg-[#F9FAFB] text-xs font-semibold text-[#6B7280] hover:text-[#111827] rounded-[6px] flex items-center justify-center cursor-pointer transition-colors bg-white font-bold"
              >
                ←
              </button>
              <button 
                onClick={goToday}
                className="h-7 px-3 border border-[#E5E7EB] hover:bg-[#F9FAFB] text-xs font-semibold text-[#6B7280] hover:text-[#111827] rounded-[6px] cursor-pointer transition-colors bg-white"
              >
                Today
              </button>
              <button 
                onClick={nextMonth}
                className="h-7 w-7 border border-[#E5E7EB] hover:bg-[#F9FAFB] text-xs font-semibold text-[#6B7280] hover:text-[#111827] rounded-[6px] flex items-center justify-center cursor-pointer transition-colors bg-white font-bold"
              >
                →
              </button>
            </div>
          </div>

          {/* Weekday Names Header */}
          <div className="grid grid-cols-7 border-b border-[#E5E7EB] bg-[#F9FAFB] text-center py-2 text-[10px] font-bold text-[#6B7280]">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 divide-x divide-y divide-[#E5E7EB] border-b border-[#E5E7EB]">
            {cells.map((cell, idx) => {
              const cellMonth = cell.isCurrent ? calendarMonth : (cell.isPrev ? (calendarMonth === 0 ? 11 : calendarMonth - 1) : (calendarMonth === 11 ? 0 : calendarMonth + 1));
              const cellYear = cell.isCurrent ? calendarYear : (cell.isPrev ? (calendarMonth === 0 ? calendarYear - 1 : calendarYear) : (calendarMonth === 11 ? calendarYear + 1 : calendarYear));
              
              const dayTasks = getTasksForCurrentMonthDay(cell.day, cellMonth, cellYear);
              const isToday = cell.day === 31 && cellMonth === 4 && cellYear === 2026;
              
              return (
                <div 
                  key={idx} 
                  onClick={() => {
                    const dateStr = `${cellYear}-${String(cellMonth + 1).padStart(2, '0')}-${String(cell.day).padStart(2, '0')}`;
                    const selectedDateStr = formatDateToReadable(dateStr);
                    setNewStartDate(selectedDateStr);
                    setNewDueDate(selectedDateStr);
                    setIsNewItemModalOpen(true);
                  }}
                  className="h-24 p-2 bg-white flex flex-col justify-between hover:bg-[#F9FAFB]/60 transition-colors cursor-pointer group relative"
                >
                  <span className={`text-[11px] font-bold flex items-center justify-center w-5 h-5 rounded-full ${isToday ? 'bg-[#0284C7] text-white shadow-sm font-extrabold' : (cell.isCurrent ? 'text-[#374151]' : 'text-[#9CA3AF] opacity-50')}`}>
                    {cell.day}
                  </span>
                  
                  {/* Tasks on this day */}
                  <div className="flex-1 overflow-y-auto mt-1 space-y-1">
                    {dayTasks.map(t => (
                      <div 
                        key={t.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedWorkItem(t);
                        }}
                        className={`text-[8px] font-bold px-1.5 py-0.5 rounded border truncate cursor-pointer leading-tight ${t.completed ? 'bg-green-50 text-green-700 border-green-200 line-through' : 'bg-orange-50 text-orange-700 border-orange-200'}`}
                        title={`${t.id}: ${t.title}`}
                      >
                        {t.id}
                      </div>
                    ))}
                  </div>

                  <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-sky-600 bg-sky-50 px-1 rounded">
                    + Add
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // --- PROJECT LISTING HELPERS ---
  const getStoredProjects = () => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('projects');
    if (stored) return JSON.parse(stored);
    // Default projects
    const defaults = [
      { id: 'magangumra', name: 'MAGANG UMRAH 2026', code: 'MAGANGUMRA', type: 'shield', emoji: '🕋', coverIndex: 0, isPublic: false, createdOn: 'Jan 12, 2026', members: ['CP', 'PA', 'PR', 'FI', 'FL', 'AB'] }
    ];
    localStorage.setItem('projects', JSON.stringify(defaults));
    return defaults;
  };

  const openProject = (projectId: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('project', projectId);
    window.history.pushState({}, '', url.toString());
    setActiveProjectId(projectId);
    setShowProjectListing(false);
  };

  // --- PROJECT LISTING VIEW ---
  if (showProjectListing) {
    const projects = getStoredProjects();
    return (
      <DashboardShell
        onOpenNewItemModal={() => setIsNewItemModalOpen(true)}
        toastMessage={toastMessage}
        setToastMessage={setToastMessage}
      >
        <div className="flex-1 flex flex-col items-stretch">
          {/* Projects Header Bar */}
          <div className="h-11 px-4 border-b border-[#E5E7EB] bg-white flex items-center justify-between shrink-0 select-none">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#6B7280]">
              <SidebarToggleButton />
              <svg className="w-4 h-4 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>
              <span className="text-[#111827] font-bold">Projects</span>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => {
                  setNewProjectName('');
                  setNewProjectId('');
                  setNewProjectDesc('');
                  setNewProjectEmoji('😀');
                  setNewProjectPublic(true);
                  setSelectedCoverIndex(Math.floor(Math.random() * gradientCovers.length));
                  setCoverImageUrl('');
                  setSelectedLead('');
                  setShowCoverPicker(false);
                  setShowLeadPicker(false);
                  setCoverSearchQuery('');
                  setLeadSearchQuery('');
                  setCoverTab('images');
                  setIsAddProjectModalOpen(true);
                }}
                className="h-7 px-3 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold rounded-[6px] flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
              >
                Add Project
              </button>
            </div>
          </div>

          {/* Project Cards Grid */}
          <div className="p-6 flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {projects.map((proj: any) => (
                <div
                  key={proj.id}
                  onClick={() => openProject(proj.id)}
                  className="group border border-[#E5E7EB] rounded-xl overflow-hidden bg-white hover:shadow-lg hover:border-[#9CA3AF] transition-all duration-200 cursor-pointer"
                >
                  {/* Cover Image */}
                  <div 
                    className="relative h-[120px] overflow-hidden"
                    style={
                      proj.coverImage 
                        ? { backgroundImage: `url(${proj.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                        : { background: gradientCovers[proj.coverIndex !== undefined ? proj.coverIndex : 0] }
                    }
                  >
                    {!proj.coverImage && (
                      <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 800 300\'%3E%3Crect fill=\'%23fff\' x=\'50\' y=\'80\' width=\'120\' height=\'220\' rx=\'4\' opacity=\'0.3\'/%3E%3Crect fill=\'%23fff\' x=\'200\' y=\'40\' width=\'100\' height=\'260\' rx=\'4\' opacity=\'0.2\'/%3E%3Crect fill=\'%23fff\' x=\'350\' y=\'100\' width=\'140\' height=\'200\' rx=\'4\' opacity=\'0.25\'/%3E%3Crect fill=\'%23fff\' x=\'530\' y=\'60\' width=\'110\' height=\'240\' rx=\'4\' opacity=\'0.2\'/%3E%3Crect fill=\'%23fff\' x=\'680\' y=\'90\' width=\'90\' height=\'210\' rx=\'4\' opacity=\'0.15\'/%3E%3C/svg%3E")', backgroundSize:'cover', backgroundPosition:'center'}} />
                    )}
                    <div className="absolute inset-0 bg-black/20" />
                    
                    {/* Project icon badge */}
                    <div className="absolute top-3 left-3">
                      <div className="w-7 h-7 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-md text-base select-none">
                        {proj.emoji || '😀'}
                      </div>
                    </div>

                    {/* Top right actions */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-6 h-6 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded flex items-center justify-center text-white transition-colors">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" /></svg>
                      </button>
                      <button className="w-6 h-6 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded flex items-center justify-center text-white transition-colors">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                      </button>
                    </div>

                    {/* Project Name Overlay */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white font-bold text-sm leading-tight drop-shadow-lg">{proj.name}</h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-white/80 text-[10px] font-semibold tracking-wide">{proj.code}</span>
                        {proj.isPublic === false ? (
                          <svg className="w-3 h-3 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" title="Private"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        ) : (
                          <svg className="w-3.5 h-3.5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" title="Public"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="px-3.5 py-3 space-y-3">
                    <div className="flex items-center justify-between">
                      {/* Member Avatars */}
                      <div className="flex items-center">
                        <div className="flex -space-x-1.5">
                          {(proj.members || ['CP', 'PA']).slice(0, 2).map((m: string, i: number) => {
                            const colors = ['bg-rose-500', 'bg-emerald-500', 'bg-amber-500', 'bg-violet-500', 'bg-sky-500', 'bg-pink-500'];
                            return (
                              <div key={i} className={`w-6 h-6 rounded-full ${colors[i % colors.length]} text-white flex items-center justify-center text-[8px] font-bold border-2 border-white shrink-0`}>
                                {m}
                              </div>
                            );
                          })}
                        </div>
                        {(proj.members || []).length > 2 && (
                          <span className="text-[10px] text-[#6B7280] font-semibold ml-1.5">+{(proj.members || []).length - 2}</span>
                        )}
                      </div>

                      {/* Settings gear */}
                      <button 
                        onClick={(e) => { e.stopPropagation(); showToast(`Settings for ${proj.name}`); }}
                        className="w-6 h-6 hover:bg-[#F3F4F6] rounded flex items-center justify-center text-[#9CA3AF] hover:text-[#6B7280] transition-colors cursor-pointer"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* === ADD PROJECT MODAL === */}
          {isAddProjectModalOpen && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-50 p-4" onClick={() => { setShowCoverPicker(false); setShowLeadPicker(false); }}>
              <div className="w-full max-w-[760px] bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col" style={{maxHeight:'90vh'}} onClick={(e) => e.stopPropagation()}>
                
                {/* Cover Image Section */}
                <div 
                  className={`relative h-[160px] ${showCoverPicker ? 'z-30' : 'z-10'}`} 
                  style={getCoverStyle()}
                >
                  {!coverImageUrl && (
                    <div className="absolute inset-0 opacity-30" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 800 300\'%3E%3Crect fill=\'%23fff\' x=\'50\' y=\'80\' width=\'120\' height=\'220\' rx=\'4\' opacity=\'0.3\'/%3E%3Crect fill=\'%23fff\' x=\'200\' y=\'40\' width=\'100\' height=\'260\' rx=\'4\' opacity=\'0.2\'/%3E%3Crect fill=\'%23fff\' x=\'350\' y=\'100\' width=\'140\' height=\'200\' rx=\'4\' opacity=\'0.25\'/%3E%3Crect fill=\'%23fff\' x=\'530\' y=\'60\' width=\'110\' height=\'240\' rx=\'4\' opacity=\'0.2\'/%3E%3Crect fill=\'%23fff\' x=\'680\' y=\'90\' width=\'90\' height=\'210\' rx=\'4\' opacity=\'0.15\'/%3E%3C/svg%3E")', backgroundSize:'cover', backgroundPosition:'center'}} />
                  )}
                  
                  {/* Close button */}
                  <button 
                    onClick={() => setIsAddProjectModalOpen(false)}
                    className="absolute top-3 right-3 w-7 h-7 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors cursor-pointer z-20"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>

                  {/* Change cover button + popover */}
                  <div className="absolute bottom-3 right-3 z-20">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setShowCoverPicker(!showCoverPicker); }}
                      className="h-7 px-3 bg-white/90 hover:bg-white border border-white/50 text-[11px] font-semibold text-[#374151] rounded-md flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
                    >
                      Change cover
                    </button>

                    {/* Cover Picker Popover */}
                    {showCoverPicker && (
                      <div className="absolute top-full right-0 mt-2 w-[480px] bg-white border border-[#E5E7EB] rounded-xl shadow-2xl overflow-hidden z-40 p-4 space-y-4" onClick={(e) => e.stopPropagation()}>
                        {/* Tab Segment Control */}
                        <div className="flex bg-[#F3F4F6] rounded-lg p-0.5 select-none h-8 shrink-0">
                          <button
                            type="button"
                            onClick={() => setCoverTab('images')}
                            className={`flex-1 text-center text-[11px] font-bold rounded-md transition-all cursor-pointer ${
                              coverTab === 'images' 
                                ? 'bg-white text-[#111827] shadow-sm' 
                                : 'text-[#6B7280] hover:text-[#111827]'
                            }`}
                          >
                            Images
                          </button>
                          <button
                            type="button"
                            onClick={() => setCoverTab('upload')}
                            className={`flex-1 text-center text-[11px] font-bold rounded-md transition-all cursor-pointer ${
                              coverTab === 'upload' 
                                ? 'bg-white text-[#111827] shadow-sm' 
                                : 'text-[#6B7280] hover:text-[#111827]'
                            }`}
                          >
                            Upload
                          </button>
                        </div>

                        {/* Tab Content */}
                        {coverTab === 'images' ? (
                          <div className="grid grid-cols-4 gap-2.5 max-h-[220px] overflow-y-auto pr-1">
                            {unsplashGallery.map((img, i) => (
                              <button
                                key={i}
                                type="button"
                                onClick={() => {
                                  setCoverImageUrl(img.url);
                                  setShowCoverPicker(false);
                                }}
                                className="relative aspect-[1.8/1] rounded-lg overflow-hidden border-2 border-transparent hover:border-[#0284C7] transition-all cursor-pointer group shadow-sm bg-slate-50 shrink-0"
                              >
                                <img src={img.url} alt={img.label} className="w-full h-full object-cover animate-none" loading="lazy" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="py-2">
                            <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#D1D5DB] hover:border-[#0284C7] rounded-xl cursor-pointer transition-colors group p-5 text-center bg-slate-50/50">
                              <svg className="w-6 h-6 text-[#9CA3AF] group-hover:text-[#0284C7] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                              </svg>
                              <span className="text-[11px] font-semibold text-[#374151] group-hover:text-[#0284C7]">Upload image from your computer</span>
                              <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
                            </label>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Emoji Icon - overlapping cover */}
                <div className="relative px-6 z-50">
                  <div className="absolute -top-10">
                    <div className="relative group">
                      <div className="w-16 h-16 bg-white border border-[#E5E7EB] rounded-xl shadow-md flex items-center justify-center text-4xl cursor-pointer hover:shadow-lg transition-shadow">
                        {newProjectEmoji}
                      </div>
                      {/* Emoji picker dropdown on hover */}
                      <div className="absolute top-full left-0 mt-1 bg-white border border-[#E5E7EB] rounded-lg p-2 shadow-xl z-10 hidden group-hover:grid grid-cols-8 gap-1 w-[210px]">
                        {emojiOptions.map((emoji, i) => (
                          <button
                            key={i}
                            onClick={() => setNewProjectEmoji(emoji)}
                            className={`w-6 h-6 flex items-center justify-center text-base rounded hover:bg-[#F3F4F6] cursor-pointer transition-colors ${newProjectEmoji === emoji ? 'bg-[#DBEAFE]' : ''}`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Content */}
                <div className={`px-6 pt-10 pb-0 space-y-4 flex-1 ${showLeadPicker ? 'z-30 overflow-visible' : (showCoverPicker ? 'z-10 overflow-visible' : 'overflow-y-auto z-20')}`}>
                  {/* Project Name + Project ID Row */}
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Project name"
                        value={newProjectName}
                        onChange={(e) => {
                          setNewProjectName(e.target.value);
                          if (!newProjectId || newProjectId === newProjectName.replace(/\s+/g, '').toUpperCase().slice(0, 12)) {
                            setNewProjectId(e.target.value.replace(/\s+/g, '').toUpperCase().slice(0, 12));
                          }
                        }}
                        className="w-full h-10 px-3 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7]/20 transition-all font-medium"
                        autoFocus
                      />
                    </div>
                    <div className="w-[200px]">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Project ID"
                          value={newProjectId}
                          onChange={(e) => setNewProjectId(e.target.value.toUpperCase().replace(/\s+/g, '').slice(0, 12))}
                          className="w-full h-10 px-3 pr-8 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7]/20 transition-all font-medium"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /></svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <textarea
                      placeholder="Description"
                      value={newProjectDesc}
                      onChange={(e) => setNewProjectDesc(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7]/20 transition-all font-medium resize-y"
                    />
                  </div>

                  {/* Access + Lead Controls */}
                  <div className="flex items-center gap-2">
                    {/* Access Toggle: Public / Private */}
                    <button 
                      onClick={() => setNewProjectPublic(!newProjectPublic)}
                      className={`h-8 px-3 border rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
                        newProjectPublic 
                          ? 'border-[#0284C7] bg-[#F0F9FF] text-[#0284C7]' 
                          : 'border-[#E5E7EB] text-[#6B7280] hover:bg-[#F9FAFB]'
                      }`}
                    >
                      {newProjectPublic ? (
                        <>
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>
                          <span>Public</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                          <span>Private</span>
                        </>
                      )}
                    </button>

                    {/* Lead Picker */}
                    <div className="relative">
                      <button 
                        onClick={() => setShowLeadPicker(!showLeadPicker)}
                        className={`h-8 px-3 border rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
                          selectedLead 
                            ? 'border-[#0284C7] bg-[#F0F9FF] text-[#0284C7]' 
                            : 'border-[#E5E7EB] text-[#6B7280] hover:bg-[#F9FAFB]'
                        }`}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
                        <span>{selectedLead ? workspaceMembers.find(m => m.id === selectedLead)?.name : 'Lead'}</span>
                        <svg className="w-3 h-3 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                      </button>

                      {/* Lead Picker Dropdown */}
                      {showLeadPicker && (
                        <div className="absolute bottom-full left-0 mb-1.5 w-[280px] bg-white border border-[#E5E7EB] rounded-xl shadow-2xl z-40 overflow-hidden p-2.5 space-y-2" onClick={(e) => e.stopPropagation()}>
                          {/* Search box (matching screenshot) */}
                          <div className="relative shrink-0">
                            <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            <input
                              type="text"
                              placeholder="Search"
                              value={leadSearchQuery}
                              onChange={(e) => setLeadSearchQuery(e.target.value)}
                              className="w-full h-8 pl-8 pr-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-xs text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#E5E7EB] font-medium"
                              autoFocus
                            />
                          </div>

                          <div className="max-h-[220px] overflow-y-auto pr-0.5 space-y-0.5">
                            {/* No lead option */}
                            <button
                              type="button"
                              onClick={() => { setSelectedLead(''); setShowLeadPicker(false); }}
                              className={`w-full px-2 py-1.5 flex items-center gap-2.5 hover:bg-[#F9FAFB] rounded-lg transition-colors cursor-pointer text-left ${
                                !selectedLead ? 'bg-[#F0F9FF] text-[#0284C7]' : ''
                              }`}
                            >
                              <div className="w-7 h-7 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center shrink-0">
                                <svg className="w-3.5 h-3.5 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                              </div>
                              <span className="text-xs font-semibold text-[#6B7280]">No lead assigned</span>
                              {!selectedLead && (
                                <svg className="w-4 h-4 text-[#0284C7] ml-auto shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                              )}
                            </button>

                            {/* Members list */}
                            {workspaceMembers
                              .filter(member => member.name.toLowerCase().includes(leadSearchQuery.toLowerCase()))
                              .map((member) => {
                                const colors = ['bg-rose-500', 'bg-emerald-500', 'bg-amber-500', 'bg-violet-500', 'bg-sky-500', 'bg-pink-500'];
                                const colorIdx = workspaceMembers.indexOf(member) % colors.length;
                                return (
                                  <button
                                    key={member.id}
                                    type="button"
                                    onClick={() => { setSelectedLead(member.id); setShowLeadPicker(false); }}
                                    className={`w-full px-2 py-1.5 flex items-center gap-2.5 hover:bg-[#F9FAFB] rounded-lg transition-colors cursor-pointer text-left ${
                                      selectedLead === member.id ? 'bg-[#F0F9FF]' : ''
                                    }`}
                                  >
                                    {member.avatarUrl ? (
                                      <img src={member.avatarUrl} alt={member.name} className="w-7 h-7 rounded-full object-cover shrink-0" />
                                    ) : (
                                      <div className={`w-7 h-7 rounded-full ${colors[colorIdx]} text-white flex items-center justify-center text-[9px] font-bold shrink-0`}>
                                        {member.initials}
                                      </div>
                                    )}
                                    <span className="text-xs font-semibold text-[#374151] truncate">{member.name}</span>
                                    
                                    {member.status === 'Suspended' && (
                                      <span className="bg-[#F3F4F6] text-[#6B7280] text-[9px] font-bold px-1.5 py-0.5 rounded ml-auto shrink-0">Suspended</span>
                                    )}
                                    
                                    {selectedLead === member.id && !member.status && (
                                      <svg className="w-4 h-4 text-[#0284C7] shrink-0 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    )}
                                  </button>
                                );
                              })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="px-6 py-4 border-t border-[#E5E7EB] mt-4 flex items-center justify-end gap-2">
                  <button
                    onClick={() => setIsAddProjectModalOpen(false)}
                    className="h-9 px-5 border border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#374151] text-xs font-semibold rounded-lg cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (!newProjectName.trim()) {
                        showToast('Project name is required!');
                        return;
                      }
                      const code = newProjectId.trim() || newProjectName.trim().replace(/\s+/g, '').toUpperCase().slice(0, 12);
                      const newProj = {
                        id: code.toLowerCase(),
                        name: newProjectName.trim(),
                        code: code.toUpperCase(),
                        type: 'shield',
                        emoji: newProjectEmoji,
                        description: newProjectDesc,
                        isPublic: newProjectPublic,
                        coverImage: coverImageUrl || '',
                        coverIndex: selectedCoverIndex,
                        lead: selectedLead,
                        createdOn: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                        members: ['CP']
                      };
                      const current = getStoredProjects();
                      const updated = [...current, newProj];
                      localStorage.setItem('projects', JSON.stringify(updated));
                      setIsAddProjectModalOpen(false);
                      showToast(`Project "${newProjectName.trim()}" created!`);
                      openProject(newProj.id);
                    }}
                    className="h-9 px-5 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-sm"
                  >
                    Create project
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell
      onOpenNewItemModal={() => setIsNewItemModalOpen(true)}
      toastMessage={toastMessage}
      setToastMessage={setToastMessage}
    >
      <div className="flex-1 flex flex-col items-stretch animate-none">

        {/* Workspace Breadcrumb Header */}
        <div className="h-11 px-4 border-b border-[#E5E7EB] bg-white flex items-center justify-between shrink-0 select-none">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#6B7280]">
            <SidebarToggleButton />
            <span>{projectName}</span>
            <IconChevronRight />
            <span className="text-[#111827]">Work Items</span>
            <span className="ml-1 px-1.5 py-0.5 bg-[#F3F4F6] text-[#4B5563] text-[10px] font-bold rounded-full">
              {items.length}
            </span>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2 select-none">
            {/* View selectors */}
            <div className="flex items-center border border-[#E5E7EB] rounded-[6px] p-0.5 bg-[#F9FAFB] gap-0.5">
              <button 
                onClick={() => changeView('list')}
                className={`p-1 rounded-[4px] transition-colors cursor-pointer ${currentView === 'list' ? 'bg-white border border-[#E5E7EB] text-[#111827]' : 'hover:bg-white/50 text-[#6B7280]'}`} 
                title="List view"
              >
                <IconList className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => changeView('board')}
                className={`p-1 rounded-[4px] transition-colors cursor-pointer ${currentView === 'board' ? 'bg-white border border-[#E5E7EB] text-[#111827]' : 'hover:bg-white/50 text-[#6B7280]'}`} 
                title="Board view"
              >
                <IconLayout className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => changeView('calendar')}
                className={`p-1 rounded-[4px] transition-colors cursor-pointer ${currentView === 'calendar' ? 'bg-white border border-[#E5E7EB] text-[#111827]' : 'hover:bg-white/50 text-[#6B7280]'}`} 
                title="Calendar view"
              >
                <IconCalendar />
              </button>
              <button
                onClick={() => changeView('table')}
                className={`p-1 rounded-[4px] transition-colors cursor-pointer ${currentView === 'table' ? 'bg-white border border-[#E5E7EB] text-[#111827]' : 'hover:bg-white/50 text-[#6B7280]'}`} 
                title="Table view"
              >
                <IconTableLayout className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => changeView('timeline')}
                className={`p-1 rounded-[4px] transition-colors cursor-pointer ${currentView === 'timeline' ? 'bg-white border border-[#E5E7EB] text-[#111827]' : 'hover:bg-white/50 text-[#6B7280]'}`} 
                title="Timeline view"
              >
                <IconTimeline className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Display options dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDisplayDropdownOpen(prev => !prev)}
                className="h-7 px-3 border border-[#E5E7EB] hover:bg-[#F9FAFB] text-xs font-semibold text-[#6B7280] hover:text-[#111827] rounded-[6px] transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>Display</span>
                <IconChevronDown />
              </button>
              
              {isDisplayDropdownOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white border border-[#E5E7EB] rounded-[6px] py-1.5 z-30 premium-popover text-left">
                  <div className="px-3 py-1 text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider">Group by</div>
                  {(['status', 'assignee', 'none'] as const).map(group => (
                    <button
                      key={group}
                      onClick={() => {
                        setGroupBy(group);
                        setIsDisplayDropdownOpen(false);
                        showToast(`Grouped by ${group}`);
                      }}
                      className="w-full text-left px-3 py-1 hover:bg-[#F9FAFB] text-xs text-[#111827] flex items-center justify-between"
                    >
                      <span className="capitalize">{group}</span>
                      {groupBy === group && <IconSuccess />}
                    </button>
                  ))}
                  <div className="border-t border-[#E5E7EB] my-1"></div>
                  <div className="px-3 py-1 text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider">Sort by</div>
                  {(['id', 'title', 'date'] as const).map(sort => (
                    <button
                      key={sort}
                      onClick={() => {
                        setSortBy(sort);
                        setIsDisplayDropdownOpen(false);
                        showToast(`Sorted by ${sort}`);
                      }}
                      className="w-full text-left px-3 py-1 hover:bg-[#F9FAFB] text-xs text-[#111827] flex items-center justify-between"
                    >
                      <span className="capitalize">{sort}</span>
                      {sortBy === sort && <IconSuccess />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => router.push('/profile')}
              className="h-7 px-3 border border-[#E5E7EB] hover:bg-[#F9FAFB] text-xs font-semibold text-[#6B7280] hover:text-[#111827] rounded-[6px] transition-colors cursor-pointer"
            >
              Analytics
            </button>
            <button
              onClick={() => setIsNewItemModalOpen(true)}
              className="h-7 px-3 bg-[#0369A1] hover:bg-[#0284C7] text-white text-xs font-semibold rounded-[6px] transition-colors cursor-pointer"
            >
              Add work item
            </button>
          </div>
        </div>

        {/* Main Contents (switchable based on currentView) */}
        <div className="flex-1 overflow-y-auto">
          {renderViewContent()}
        </div>

      </div>

      {/* ==========================================
          MODAL: CREATE NEW WORK ITEM
          ========================================== */}
      {isNewItemModalOpen && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-[1px] flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-[800px] bg-white border border-[#E5E7EB] rounded-[8px] flex flex-col premium-popover overflow-visible shadow-lg">

            {/* Modal Body: Title, Project selector, Title Input, Description Textarea */}
            <form onSubmit={handleCreateWorkItem} className="flex flex-col max-h-[90vh]">
              <div className="p-6 space-y-4">
                
                {/* Header Title */}
                <div className="text-sm font-bold text-[#111827]">
                  Create new work item
                </div>

                {/* Project Badge */}
                <div className="flex select-none">
                  <div className="rounded-[6px] border border-[#E5E7EB] bg-white px-2.5 py-1.5 flex items-center gap-1.5 text-xs text-[#374151] font-semibold shadow-none">
                    {projectIcon === 'shield' && <IconShieldProject />}
                    {projectIcon === 'chart' && <IconChartProject />}
                    {projectIcon === 'calendar' && <IconCalendar />}
                    {projectIcon !== 'shield' && projectIcon !== 'chart' && projectIcon !== 'calendar' && (
                      <span className="text-xs shrink-0 flex items-center justify-center w-4 h-4 select-none">{projectIcon}</span>
                    )}
                    <span>{projectName}</span>
                  </div>
                </div>

                {/* Title Input with border area */}
                <div className="pt-2">
                  <input
                    type="text"
                    placeholder="Title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full text-sm font-semibold text-[#111827] placeholder-[#9CA3AF] bg-[#F9FAFB] border border-[#E5E7EB] rounded-[6px] focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] focus:bg-white px-3 py-2 transition-all font-semibold"
                    required
                    autoFocus
                  />
                </div>

                {/* Description Textarea with border area */}
                <div>
                  <textarea
                    placeholder="Click to add description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full min-h-[120px] text-xs text-[#374151] placeholder-[#9CA3AF] bg-[#F9FAFB] border border-[#E5E7EB] rounded-[6px] focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] focus:bg-white px-3 py-2 resize-none font-medium leading-relaxed transition-all"
                  />
                </div>

                {/* Attributes Toolbar */}
                <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#F3F4F6]">
                  {/* Status Dropdown Button */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModalDropdown(prev => prev === 'status' ? null : 'status');
                      }}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 border border-[#E5E7EB] rounded-[6px] text-xs font-semibold text-[#374151] hover:bg-[#F9FAFB] cursor-pointer bg-white"
                    >
                      {newStatus === 'backlog' && <IconStatusBacklog />}
                      {newStatus === 'todo' && <IconStatusTodo />}
                      {newStatus === 'inprogress' && <IconStatusInProgress />}
                      {newStatus === 'completed' && <IconStatusDone />}
                      {newStatus === 'cancelled' && <IconStatusCancelled />}
                      <span className="capitalize">{newStatus === 'completed' ? 'Done' : newStatus === 'inprogress' ? 'In Progress' : newStatus}</span>
                    </button>
                    {activeModalDropdown === 'status' && (
                      <div className="absolute left-0 mt-1 w-44 bg-white border border-[#E5E7EB] rounded-[6px] py-1 z-50 premium-popover shadow-md">
                        {(['backlog', 'todo', 'inprogress', 'completed', 'cancelled'] as const).map(st => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => {
                              setNewStatus(st);
                              setActiveModalDropdown(null);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-[#F9FAFB] text-xs text-[#111827] flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              {st === 'backlog' && <IconStatusBacklog />}
                              {st === 'todo' && <IconStatusTodo />}
                              {st === 'inprogress' && <IconStatusInProgress />}
                              {st === 'completed' && <IconStatusDone />}
                              {st === 'cancelled' && <IconStatusCancelled />}
                              <span className="capitalize">{st === 'completed' ? 'Done' : st === 'inprogress' ? 'In Progress' : st}</span>
                            </div>
                            {newStatus === st && <IconSuccess />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Priority Dropdown Button */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModalDropdown(prev => prev === 'priority' ? null : 'priority');
                      }}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 border border-[#E5E7EB] rounded-[6px] text-xs font-semibold text-[#374151] hover:bg-[#F9FAFB] cursor-pointer bg-white"
                    >
                      {newPriority === 'low' && <IconPriorityLow />}
                      {newPriority === 'medium' && <IconPriorityMedium />}
                      {newPriority === 'high' && <IconPriorityHigh />}
                      {newPriority === 'urgent' && <IconPriorityUrgent />}
                      {newPriority === 'none' && <IconPriorityNone />}
                      <span className="capitalize">{newPriority === 'none' ? 'None' : newPriority}</span>
                    </button>
                    {activeModalDropdown === 'priority' && (
                      <div className="absolute left-0 mt-1 w-40 bg-white border border-[#E5E7EB] rounded-[6px] py-1 z-50 premium-popover shadow-md">
                        {(['none', 'low', 'medium', 'high', 'urgent'] as const).map(pr => (
                          <button
                            key={pr}
                            type="button"
                            onClick={() => {
                              setNewPriority(pr);
                              setActiveModalDropdown(null);
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
                            {newPriority === pr && <IconSuccess />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Assignees Dropdown Button */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModalDropdown(prev => prev === 'assignee' ? null : 'assignee');
                      }}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 border border-[#E5E7EB] rounded-[6px] text-xs font-semibold text-[#374151] hover:bg-[#F9FAFB] cursor-pointer bg-white"
                    >
                      <IconUserOutline />
                      <span>{newAssignee === 'Unassigned' ? 'Assignees' : newAssignee}</span>
                    </button>
                    {activeModalDropdown === 'assignee' && (
                      <div className="absolute left-0 mt-1 w-44 bg-white border border-[#E5E7EB] rounded-[6px] py-1 z-50 premium-popover shadow-md">
                        {[
                          { name: 'Unassigned', init: 'Unassigned' },
                          { name: 'Cahyadi Prasetyo', init: 'CP' },
                          { name: 'Putra Adhi', init: 'PA' },
                          { name: 'prasetyo', init: 'PR' },
                          { name: 'fia magang', init: 'FI' },
                          { name: 'fla magang', init: 'FL' },
                          { name: 'Aldil Baihaqi', init: 'AB' }
                        ].map(user => (
                          <button
                            key={user.init}
                            type="button"
                            onClick={() => {
                              setNewAssignee(user.init);
                              setActiveModalDropdown(null);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-[#F9FAFB] text-xs text-[#111827] flex items-center justify-between"
                          >
                            <span>{user.name}</span>
                            {newAssignee === user.init && <IconSuccess />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Labels Dropdown Button */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModalDropdown(prev => prev === 'labels' ? null : 'labels');
                      }}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 border border-[#E5E7EB] rounded-[6px] text-xs font-semibold text-[#374151] hover:bg-[#F9FAFB] cursor-pointer bg-white"
                    >
                      <IconTag />
                      <span>{newLabels.length === 0 ? 'Labels' : `${newLabels.length} selected`}</span>
                    </button>
                    {activeModalDropdown === 'labels' && (
                      <div className="absolute left-0 mt-1 w-40 bg-white border border-[#E5E7EB] rounded-[6px] py-1 z-50 premium-popover shadow-md" onClick={(e) => e.stopPropagation()}>
                        {['Feature', 'Bug', 'Documentation', 'Refactor'].map(lbl => {
                          const isSelected = newLabels.includes(lbl);
                          return (
                            <button
                              key={lbl}
                              type="button"
                              onClick={() => {
                                setNewLabels(prev => isSelected ? prev.filter(l => l !== lbl) : [...prev, lbl]);
                              }}
                              className="w-full text-left px-3 py-1.5 hover:bg-[#F9FAFB] text-xs text-[#111827] flex items-center justify-between"
                            >
                              <span>{lbl}</span>
                              {isSelected && <IconSuccess />}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Start Date Button with calendar overlay */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => modalStartRef.current?.showPicker()}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 border border-[#E5E7EB] rounded-[6px] text-xs font-semibold text-[#374151] hover:bg-[#F9FAFB] cursor-pointer bg-white"
                    >
                      <IconCalendar />
                      <span>{newStartDate}</span>
                    </button>
                    <input
                      ref={modalStartRef}
                      type="date"
                      value={formatDateToInput(newStartDate)}
                      onChange={(e) => {
                        const val = e.target.value;
                        setNewStartDate(val ? formatDateToReadable(val) : 'Start date');
                      }}
                      className="absolute inset-0 opacity-0 pointer-events-none"
                    />
                  </div>

                  {/* Due Date Button with calendar overlay */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => modalDueRef.current?.showPicker()}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 border border-[#E5E7EB] rounded-[6px] text-xs font-semibold text-[#374151] hover:bg-[#F9FAFB] cursor-pointer bg-white"
                    >
                      <IconCalendar />
                      <span>{newDueDate}</span>
                    </button>
                    <input
                      ref={modalDueRef}
                      type="date"
                      value={formatDateToInput(newDueDate)}
                      onChange={(e) => {
                        const val = e.target.value;
                        setNewDueDate(val ? formatDateToReadable(val) : 'Due date');
                      }}
                      className="absolute inset-0 opacity-0 pointer-events-none"
                    />
                  </div>

                  {/* Add Parent Button with interactive dropdown */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModalDropdown(prev => prev === 'parent' ? null : 'parent');
                      }}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 border border-[#E5E7EB] rounded-[6px] text-xs font-semibold text-[#374151] hover:bg-[#F9FAFB] cursor-pointer bg-white"
                    >
                      <IconParent />
                      <span>{newParentId ? `Parent: ${newParentId}` : 'Add parent'}</span>
                    </button>
                    {activeModalDropdown === 'parent' && (
                      <div 
                        className="absolute bottom-10 left-0 w-64 bg-white border border-[#E5E7EB] rounded-[6px] py-1 z-50 premium-popover shadow-md max-h-60 overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="px-3 py-1 text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider select-none">Select Parent Task</div>
                        <button
                          type="button"
                          onClick={() => {
                            setNewParentId(null);
                            setActiveModalDropdown(null);
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-[#F9FAFB] text-xs font-semibold text-[#EF4444] flex items-center justify-between"
                        >
                          <span>None (No Parent)</span>
                          {!newParentId && <IconSuccess />}
                        </button>
                        <div className="border-t border-[#E5E7EB] my-1"></div>
                        {items.filter(it => it.id).map(it => (
                          <button
                            key={it.id}
                            type="button"
                            onClick={() => {
                              setNewParentId(it.id);
                              setActiveModalDropdown(null);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-[#F9FAFB] text-xs text-[#111827] flex items-center justify-between truncate"
                          >
                            <div className="flex flex-col text-left truncate min-w-0">
                              <span className="font-mono text-[9px] text-[#6B7280]">{it.id}</span>
                              <span className="truncate font-semibold text-[#374151]">{it.title}</span>
                            </div>
                            {newParentId === it.id && <IconSuccess />}
                          </button>
                        ))}
                        {items.length === 0 && (
                          <div className="px-3 py-2 text-xs text-[#9CA3AF] text-center">No tasks available in project</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer (fixed at bottom) */}
              <div className="p-4 border-t border-[#F3F4F6] bg-white flex items-center justify-between text-xs select-none rounded-b-[8px]">

                {/* Right Side: Actions */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsNewItemModalOpen(false)}
                    className="h-8 px-4 border border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#374151] rounded-[6px] cursor-pointer transition-colors font-semibold bg-white"
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    className="h-8 px-4 bg-[#0284C7] hover:bg-[#0369A1] text-white rounded-[6px] cursor-pointer transition-colors font-semibold shadow-sm animate-none"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>
      )}

      {selectedWorkItem && (
        <WorkItemDetailDrawer
          item={selectedWorkItem}
          allItems={items}
          onClose={() => setSelectedWorkItem(null)}
          onUpdateItem={handleUpdateWorkItem}
          showToast={showToast}
        />
      )}
    </DashboardShell>
  );
}

// Render clean rows based on mock parameters
function renderMockRow(id: string, title: string, date: string, assignees: string[], icon: 'chart' | 'calendar') {
  return (
    <div key={id} className="flex items-center justify-between h-[38px] px-3.5 hover:bg-[#F9FAFB] transition-colors text-xs select-none">
      <div className="flex items-center gap-3 flex-1 min-w-0 mr-4">
        <div className="shrink-0 flex items-center"><IconSuccess /></div>

        {icon === 'chart' ? <IconChartProject /> : <IconCalendar />}

        <span className="text-[11px] text-[#6B7280] font-mono shrink-0 select-all tracking-normal w-28">{id}</span>
        <span className="truncate font-medium text-[#9CA3AF] line-through">{title}</span>

        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#E5E7EB]/50 text-[#4B5563] uppercase border border-transparent leading-tight ml-2">Done</span>
      </div>

      <div className="flex items-center gap-3 shrink-0 text-[#6B7280]">
        <IconTag />
        <span className="text-[11px] text-[#9CA3AF] font-medium font-mono select-none">{date}</span>

        <div className="flex items-center -space-x-1 ml-1">
          {assignees.map((init, index) => (
            <div
              key={index}
              className="w-4.5 h-4.5 rounded-full border border-white bg-[#0369A1] text-white flex items-center justify-center text-[7px] font-bold shrink-0"
            >
              {init}
            </div>
          ))}
        </div>

        <button className="p-1 hover:bg-[#F3F4F6] rounded">
          <IconDots />
        </button>
      </div>
    </div>
  );
}

// Render row helper for react items state
function renderRow(item: WorkItem, onToggle: (id: string) => void, onDelete: (id: string, e: React.MouseEvent) => void) {
  const isDone = item.status === 'completed' || item.completed;
  return (
    <div
      key={item.id}
      onClick={() => onToggle(item.id)}
      className="group flex items-center justify-between min-h-[38px] py-1.5 px-3.5 hover:bg-[#F9FAFB] transition-colors cursor-pointer text-xs"
    >
      <div className="flex items-center gap-3 flex-1 min-w-0 mr-4">
        <div className="shrink-0 flex items-center">
          {isDone ? <IconSuccess /> : <IconCircle />}
        </div>

        {item.projectBadge && (
          <div className="shrink-0 flex items-center">
            {item.projectBadge === 'chart' ? <IconChartProject /> : <IconCalendar />}
          </div>
        )}

        <span className="text-[11px] text-[#6B7280] font-mono shrink-0 select-all tracking-normal w-28">{item.id}</span>

        <div className="flex flex-col min-w-0 truncate">
          <span className={`truncate font-medium text-[#111827] ${isDone ? 'line-through text-[#9CA3AF]' : ''}`}>
            {item.title}
          </span>
          {item.parentId && (
            <span className="text-[9px] text-[#6B7280] font-semibold text-slate-500 mt-0.5">
              ↳ Subtask of {item.parentId}
            </span>
          )}
        </div>

        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase leading-tight ml-2 border ${isDone ? 'bg-[#E5E7EB]/50 text-[#4B5563] border-transparent' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>
          {isDone ? 'Done' : item.status.toUpperCase()}
        </span>
      </div>

      <div className="flex items-center gap-3 shrink-0 text-[#6B7280]">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-75 flex items-center">
          <button
            onClick={(e) => onDelete(item.id, e)}
            className="p-1 hover:bg-[#EF4444]/10 rounded text-[#EF4444] cursor-pointer"
            title="Delete Item"
          >
            <IconTrash />
          </button>
        </div>

        <IconTag />
        <span className="text-[11px] text-[#9CA3AF] font-medium font-mono select-none">{item.dateRange || 'Mar 13 - 13, 2026'}</span>

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

        <button className="p-1 hover:bg-[#F3F4F6] rounded select-none">
          <IconDots />
        </button>
      </div>
    </div>
  );
}
