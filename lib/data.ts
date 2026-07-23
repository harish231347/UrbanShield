export type ComplaintStatus = 'Pending' | 'In Progress' | 'Resolved' | 'Rejected';
export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface Complaint {
  id: string;
  title: string;
  category: string;
  status: ComplaintStatus;
  priority: RiskLevel;
  ward: string;
  location: string;
  description: string;
  date: string;
  upvotes: number;
  daysOpen: number;
  officer?: string;
  updates: { date: string; text: string }[];
}

export const categories = [
  { id: 'pothole', label: 'Pothole', icon: 'CircleDot' },
  { id: 'streetlight', label: 'Street Light', icon: 'Lightbulb' },
  { id: 'garbage', label: 'Garbage', icon: 'Trash2' },
  { id: 'water', label: 'Water Leak', icon: 'Droplets' },
  { id: 'drainage', label: 'Drainage', icon: 'Waves' },
  { id: 'illegal', label: 'Illegal Parking', icon: 'Car' },
  { id: 'noise', label: 'Noise', icon: 'Volume2' },
  { id: 'other', label: 'Other', icon: 'Flag' },
];

export const citizenComplaints: Complaint[] = [
  {
    id: 'URB-2041',
    title: 'Large pothole near bus stop',
    category: 'Pothole',
    status: 'In Progress',
    priority: 'High',
    ward: 'Ward 7 - Riverside',
    location: 'MG Road, near Stop 12',
    description: 'A large pothole has formed near the bus stop, causing traffic to swerve into oncoming lanes. Risk of accidents at night.',
    date: 'Jul 18, 2026',
    upvotes: 42,
    daysOpen: 4,
    officer: 'Insp. R. Mehta',
    updates: [
      { date: 'Jul 18', text: 'Complaint registered and assigned to Ward 7 maintenance.' },
      { date: 'Jul 20', text: 'Inspection completed. Repair crew scheduled for Jul 22.' },
    ],
  },
  {
    id: 'URB-2038',
    title: 'Street light not working for a week',
    category: 'Street Light',
    status: 'Pending',
    priority: 'Medium',
    ward: 'Ward 3 - Lakeview',
    location: 'Park Avenue, Block C',
    description: 'Three consecutive street lights are out, making the lane unsafe for pedestrians after dusk.',
    date: 'Jul 21, 2026',
    upvotes: 17,
    daysOpen: 2,
    updates: [{ date: 'Jul 21', text: 'Complaint registered. Awaiting ward assignment.' }],
  },
  {
    id: 'URB-2019',
    title: 'Garbage piling near school',
    category: 'Garbage',
    status: 'Resolved',
    priority: 'High',
    ward: 'Ward 5 - Central',
    location: 'Sunrise School Lane',
    description: 'Garbage has accumulated near the school gate, creating a health hazard for children.',
    date: 'Jul 10, 2026',
    upvotes: 88,
    daysOpen: 6,
    officer: 'Sgt. A. Khan',
    updates: [
      { date: 'Jul 10', text: 'Complaint registered.' },
      { date: 'Jul 12', text: 'Sanitation team dispatched.' },
      { date: 'Jul 15', text: 'Area cleaned. Marked resolved.' },
    ],
  },
  {
    id: 'URB-2050',
    title: 'Water leak on main pipeline',
    category: 'Water Leak',
    status: 'Pending',
    priority: 'Critical',
    ward: 'Ward 1 - Old Town',
    location: 'Heritage Square',
    description: 'Major water leak flooding the street. Supply to 3 blocks affected.',
    date: 'Jul 22, 2026',
    upvotes: 61,
    daysOpen: 1,
    updates: [{ date: 'Jul 22', text: 'Complaint registered. Critical priority flagged.' }],
  },
  {
    id: 'URB-2033',
    title: 'Blocked drainage after rain',
    category: 'Drainage',
    status: 'In Progress',
    priority: 'Medium',
    ward: 'Ward 9 - Greenfield',
    location: 'Sector 4, Plot 22',
    description: 'Drainage overflow after recent rainfall, waterlogging the approach road.',
    date: 'Jul 16, 2026',
    upvotes: 23,
    daysOpen: 7,
    officer: 'Insp. P. Nair',
    updates: [
      { date: 'Jul 16', text: 'Complaint registered.' },
      { date: 'Jul 19', text: 'Desilting crew assigned.' },
    ],
  },
];

export const nearbyIssues = [
  { id: 'N1', title: 'Pothole cluster', category: 'Pothole', distance: '120 m', ward: 'Ward 7', x: 0.32, y: 0.4, risk: 'High' as RiskLevel, reports: 14 },
  { id: 'N2', title: 'Broken street light', category: 'Street Light', distance: '340 m', ward: 'Ward 3', x: 0.6, y: 0.28, risk: 'Medium' as RiskLevel, reports: 6 },
  { id: 'N3', title: 'Garbage overflow', category: 'Garbage', distance: '510 m', ward: 'Ward 5', x: 0.5, y: 0.62, risk: 'Low' as RiskLevel, reports: 3 },
  { id: 'N4', title: 'Water leak', category: 'Water Leak', distance: '780 m', ward: 'Ward 1', x: 0.22, y: 0.7, risk: 'Critical' as RiskLevel, reports: 22 },
  { id: 'N5', title: 'Drainage block', category: 'Drainage', distance: '900 m', ward: 'Ward 9', x: 0.78, y: 0.55, risk: 'Medium' as RiskLevel, reports: 9 },
];

export const citizenNotifications = [
  { id: '1', title: 'Your complaint URB-2041 is now In Progress', body: 'Repair crew scheduled for Jul 22.', time: '2h ago', type: 'progress' },
  { id: '2', title: 'URB-2019 has been Resolved', body: 'Sanitation team completed cleanup at Sunrise School Lane.', time: '1d ago', type: 'resolved' },
  { id: '3', title: 'New alert for your ward', body: 'Water supply disruption expected in Ward 7 on Jul 24.', time: '2d ago', type: 'alert' },
  { id: '4', title: 'Community upvote', body: 'Your pothole report reached 42 upvotes.', time: '3d ago', type: 'social' },
];

export const officerStats = {
  todayReports: 28,
  pendingCases: 47,
  highRiskAreas: 5,
  resolvedCases: 132,
  avgResponse: '3.2 days',
  satisfaction: '92%',
};

export const priorityQueue: Complaint[] = [
  {
    id: 'URB-2050',
    title: 'Water leak on main pipeline',
    category: 'Water Leak',
    status: 'Pending',
    priority: 'Critical',
    ward: 'Ward 1 - Old Town',
    location: 'Heritage Square',
    description: 'Major water leak flooding the street.',
    date: 'Jul 22, 2026',
    upvotes: 61,
    daysOpen: 1,
    updates: [],
  },
  {
    id: 'URB-2041',
    title: 'Large pothole near bus stop',
    category: 'Pothole',
    status: 'In Progress',
    priority: 'High',
    ward: 'Ward 7 - Riverside',
    location: 'MG Road, near Stop 12',
    description: 'Pothole causing traffic hazard.',
    date: 'Jul 18, 2026',
    upvotes: 42,
    daysOpen: 4,
    updates: [],
  },
  {
    id: 'URB-2046',
    title: 'Illegal dumping near river',
    category: 'Garbage',
    status: 'Pending',
    priority: 'High',
    ward: 'Ward 8 - Eastside',
    location: 'River Bank Road',
    description: 'Industrial waste dumped near riverbank.',
    date: 'Jul 21, 2026',
    upvotes: 35,
    daysOpen: 2,
    updates: [],
  },
  {
    id: 'URB-2038',
    title: 'Street light not working',
    category: 'Street Light',
    status: 'Pending',
    priority: 'Medium',
    ward: 'Ward 3 - Lakeview',
    location: 'Park Avenue, Block C',
    description: 'Three street lights out.',
    date: 'Jul 21, 2026',
    upvotes: 17,
    daysOpen: 2,
    updates: [],
  },
];

export const wards = [
  { id: 'W1', name: 'Ward 1 - Old Town', risk: 'Critical' as RiskLevel, open: 12, resolved: 45, x: 0.22, y: 0.7 },
  { id: 'W7', name: 'Ward 7 - Riverside', risk: 'High' as RiskLevel, open: 9, resolved: 38, x: 0.32, y: 0.4 },
  { id: 'W3', name: 'Ward 3 - Lakeview', risk: 'Medium' as RiskLevel, open: 6, resolved: 52, x: 0.6, y: 0.28 },
  { id: 'W5', name: 'Ward 5 - Central', risk: 'Low' as RiskLevel, open: 3, resolved: 61, x: 0.5, y: 0.62 },
  { id: 'W9', name: 'Ward 9 - Greenfield', risk: 'Medium' as RiskLevel, open: 7, resolved: 40, x: 0.78, y: 0.55 },
  { id: 'W8', name: 'Ward 8 - Eastside', risk: 'High' as RiskLevel, open: 11, resolved: 33, x: 0.7, y: 0.8 },
];

export const weeklyTrend = [
  { day: 'Mon', reports: 18, resolved: 12 },
  { day: 'Tue', reports: 22, resolved: 15 },
  { day: 'Wed', reports: 15, resolved: 18 },
  { day: 'Thu', reports: 27, resolved: 14 },
  { day: 'Fri', reports: 31, resolved: 22 },
  { day: 'Sat', reports: 19, resolved: 17 },
  { day: 'Sun', reports: 12, resolved: 9 },
];

export const categoryBreakdown = [
  { label: 'Potholes', value: 32, color: '#1565D8' },
  { label: 'Garbage', value: 24, color: '#0FB890' },
  { label: 'Street Light', value: 18, color: '#F0A030' },
  { label: 'Water', value: 14, color: '#5AA3FF' },
  { label: 'Other', value: 12, color: '#94A3B8' },
];

export const emergencyAlerts = [
  { id: 'A1', title: 'Water supply disruption', area: 'Ward 7 - Riverside', severity: 'High' as RiskLevel, time: '15 min ago', body: 'Scheduled maintenance on main pipeline. Supply restored by 6 PM.' },
  { id: 'A2', title: 'Heavy rainfall warning', area: 'Citywide', severity: 'Critical' as RiskLevel, time: '1h ago', body: 'Met dept warns of 80mm rainfall. Drainage teams on standby.' },
  { id: 'A3', title: 'Traffic diversion', area: 'Ward 1 - Old Town', severity: 'Medium' as RiskLevel, time: '3h ago', body: 'Heritage Square closed due to water leak repair.' },
];

export const officerComplaints: Complaint[] = [
  ...priorityQueue,
  {
    id: 'URB-2033',
    title: 'Blocked drainage after rain',
    category: 'Drainage',
    status: 'In Progress',
    priority: 'Medium',
    ward: 'Ward 9 - Greenfield',
    location: 'Sector 4, Plot 22',
    description: 'Drainage overflow after rainfall.',
    date: 'Jul 16, 2026',
    upvotes: 23,
    daysOpen: 7,
    officer: 'Insp. P. Nair',
    updates: [],
  },
  {
    id: 'URB-2019',
    title: 'Garbage piling near school',
    category: 'Garbage',
    status: 'Resolved',
    priority: 'High',
    ward: 'Ward 5 - Central',
    location: 'Sunrise School Lane',
    description: 'Garbage near school gate.',
    date: 'Jul 10, 2026',
    upvotes: 88,
    daysOpen: 6,
    officer: 'Sgt. A. Khan',
    updates: [],
  },
];
